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

    const canCopy = !isLoading && !error && !!promptData;

    return (
        <div className="p-6 flex flex-col h-full bg-white">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{t('preview.title')}</h3>
            
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