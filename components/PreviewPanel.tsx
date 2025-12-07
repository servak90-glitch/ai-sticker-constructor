import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { PromptData, Preset } from '../types';
import PresetManager from './PresetManager';
import { APP_VERSION } from '../constants';
import { useTranslation } from '../contexts/LanguageContext';

interface PreviewPanelProps {
    promptData: PromptData | null;
    isLoading: boolean;
    error: string | null;
    onReset: () => void;
    presets: Preset[];
    onSavePreset: (name: string) => void;
    onApplyPreset: (id: string) => void;
    onDeletePreset: (id: string) => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = (props) => {
    const { promptData, isLoading, error, onReset, presets, onSavePreset, onApplyPreset, onDeletePreset } = props;
    const { t } = useTranslation();
    const [copyButtonText, setCopyButtonText] = useState(t('preview.copy'));
    
    // New state for image generation
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generationError, setGenerationError] = useState<string | null>(null);

    useEffect(() => {
        setCopyButtonText(t('preview.copy'));
    }, [t]);

    const formattedPrompt = useMemo(() => {
        if (isLoading) return t('preview.loadingPrompt');
        if (error) return `${t('preview.promptError')}: ${error}`;
        if (!promptData) return t('preview.promptStart');
        return JSON.stringify(promptData, null, 2);
    }, [promptData, isLoading, error, t]);


    const copyPrompt = useCallback(() => {
        if (isLoading || error || !promptData) return;
        navigator.clipboard.writeText(formattedPrompt).then(() => {
            setCopyButtonText(t('preview.copied'));
            setTimeout(() => setCopyButtonText(t('preview.copy')), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [formattedPrompt, t, isLoading, error, promptData]);

    const handleGenerateImage = useCallback(async () => {
        if (!promptData || isGenerating) return;

        setIsGenerating(true);
        setGenerationError(null);
        setImageUrl(null);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: promptData.prompt,
                    negative_prompt: promptData.negative_prompt,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate image');
            }

            const { imageBase64 } = await response.json();
            setImageUrl(`data:image/png;base64,${imageBase64}`);

        } catch (err) {
            setGenerationError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsGenerating(false);
        }
    }, [promptData, isGenerating]);

    const canCopy = !isLoading && !error && !!promptData;
    const canGenerate = canCopy && !isGenerating;

    return (
        <div className="p-6 flex flex-col h-full bg-white">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{t('preview.title')}</h3>
            
            <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center border border-slate-200 overflow-hidden">
                {isGenerating ? (
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 text-sky-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-sm font-semibold text-slate-600">{t('preview.generating')}</p>
                    </div>
                ) : generationError ? (
                     <div className="p-4 text-center">
                         <p className="font-bold text-red-600">{t('preview.generationFailed')}</p>
                         <p className="text-xs text-slate-600 mt-1">{generationError}</p>
                     </div>
                ) : imageUrl ? (
                    <img src={imageUrl} alt="Generated Sticker" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-center text-slate-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="mt-2 text-sm font-semibold">{t('preview.stickerPreview')}</p>
                        <p className="text-xs">{t('preview.stickerPreview.description')}</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleGenerateImage}
                disabled={!canGenerate}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:transform-none"
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <span>{t('preview.generateSticker')}</span>
            </button>
            
            <textarea
                id="promptPreview"
                readOnly
                value={formattedPrompt}
                className={`w-full flex-grow p-4 border border-slate-300 rounded-xl font-mono text-xs leading-5 resize-none bg-slate-50/70 focus:ring-2 focus:ring-sky-500 focus:outline-none transition ${isLoading ? 'animate-pulse' : ''}`}
            />
            
            <PresetManager 
                presets={presets}
                onSave={onSavePreset}
                onApply={onApplyPreset}
                onDelete={onDeletePreset}
            />

            <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                    onClick={copyPrompt}
                    disabled={!canCopy}
                    className="group w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <svg className={`w-5 h-5 transition-transform duration-300 ${copyButtonText === t('preview.copied') ? 'scale-0' : 'scale-100'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                     <svg className={`w-5 h-5 absolute transition-transform duration-300 ${copyButtonText === t('preview.copied') ? 'scale-100' : 'scale-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{copyButtonText}</span>
                </button>
                <button
                    onClick={onReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
                >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
                    </svg>
                    <span>{t('preview.reset')}</span>
                </button>
            </div>
            <div className="mt-6 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-r-lg text-sm text-sky-900">
                <h4 className="font-bold mb-2">{t('preview.howTo.title')}</h4>
                <ol className="list-decimal list-inside space-y-1">
                    <li>{t('preview.howTo.1')}</li>
                    <li>{t('preview.howTo.2')}</li>
                    <li>{t('preview.howTo.3')}</li>
                    <li>{t('preview.howTo.4')}</li>
                    <li>{t('preview.howTo.5')}</li>
                </ol>
            </div>

            <footer className="mt-auto pt-6 text-center text-xs text-slate-400 space-y-1">
                <p className="font-semibold">{t('preview.footer.version')} {APP_VERSION}</p>
                <p>{t('preview.footer.copyright')}</p>
                <p>
                    {t('preview.footer.contact')} <a href="mailto:servak90@mail.ru" className="font-semibold text-sky-600 hover:underline">servak90@mail.ru</a>
                </p>
            </footer>
        </div>
    );
};

export default PreviewPanel;
