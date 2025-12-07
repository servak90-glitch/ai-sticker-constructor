import React, { useState, useCallback, useEffect } from 'react';
import { Settings, StyleKey, InterpretationMode, StickerMode, NotificationType, StickerShape, Category, Preset, PromptData } from './types';
import { INITIAL_SETTINGS, ALWAYS_ARTISTIC_STYLES, REQUIRES_ISOLATION_STYLES, REQUIRES_CONTAINER_STYLES, STYLE_LIBRARY } from './constants';
import SettingsPanel from './components/SettingsPanel';
import PreviewPanel from './components/PreviewPanel';
import Header from './components/Header';
import Notification from './components/Notification';
import CategorySidebar from './components/CategorySidebar';
import { useTranslation } from './contexts/LanguageContext';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
    const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
    const [lastContainerShape, setLastContainerShape] = useState<StickerShape>('CIRCLE');
    const [activeCategory, setActiveCategory] = useState<Category>('style');
    const [presets, setPresets] = useState<Preset[]>([]);
    
    const [promptData, setPromptData] = useState<PromptData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const debouncedSettings = useDebounce(settings, 500);

    useEffect(() => {
        try {
            const storedPresets = localStorage.getItem('stickerGenPresets');
            if (storedPresets) {
                setPresets(JSON.parse(storedPresets));
            }
        } catch (error) {
            console.error("Failed to load presets from localStorage", error);
            showNotification(t('notification.presets.loadFailed'), 'error');
        }
    }, [t]);

    // Fetch prompt data from server API whenever debounced settings change
    useEffect(() => {
        const generatePrompt = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/generate-prompt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(debouncedSettings),
                });

                if (!response.ok) {
                    throw new Error('Failed to generate prompt');
                }

                const data: PromptData = await response.json();
                setPromptData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setPromptData(null);
            } finally {
                setIsLoading(false);
            }
        };

        generatePrompt();
    }, [debouncedSettings]);


    const showNotification = useCallback((message: string, type: NotificationType, duration: number = 3000) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), duration);
    }, []);
    
    const handleStickerModeChange = useCallback((mode: StickerMode) => {
        if (mode === 'ISOLATION') {
            if (settings.stickerMode === 'CONTAINER' && settings.stickerShape !== 'NONE') {
                setLastContainerShape(settings.stickerShape);
            }
            setSettings(prev => ({
                ...prev, 
                stickerMode: 'ISOLATION', 
                styleBackground: false, 
                backgroundLock: true, 
                stickerShape: 'NONE' 
            }));
        } else { // CONTAINER
            setSettings(prev => ({
                ...prev, 
                stickerMode: 'CONTAINER', 
                styleBackground: true, 
                backgroundLock: false, 
                stickerShape: lastContainerShape
            }));
        }
    }, [settings.stickerMode, settings.stickerShape, lastContainerShape]);
    
    useEffect(() => {
        const styleName = t(STYLE_LIBRARY[settings.style].nameKey);

        if (settings.interpretationMode === 'STRICT' && ALWAYS_ARTISTIC_STYLES.includes(settings.style)) {
             setSettings(prev => ({ ...prev, interpretationMode: 'ARTISTIC' }));
             showNotification(t('notification.style.artisticRequired', { style: styleName }), 'warning', 5000);
        }

        if (settings.stickerMode !== 'ISOLATION' && REQUIRES_ISOLATION_STYLES.includes(settings.style)) {
            handleStickerModeChange('ISOLATION');
            showNotification(t('notification.style.isolationRequired', { style: styleName }), 'warning', 5000);
        } else if (settings.stickerMode !== 'CONTAINER' && REQUIRES_CONTAINER_STYLES.includes(settings.style)) {
            handleStickerModeChange('CONTAINER');
            showNotification(t('notification.style.containerRequired', { style: styleName }), 'warning', 5000);
        }
    }, [settings.style, settings.interpretationMode, settings.stickerMode, showNotification, handleStickerModeChange, t]);

    const handleSettingsChange = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleStyleChange = useCallback((style: StyleKey) => {
        setSettings(prev => ({ ...prev, style }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(INITIAL_SETTINGS);
        showNotification(t('notification.settings.reset'), 'success');
    }, [showNotification, t]);

    const savePreset = useCallback((name: string) => {
        if (!name.trim()) {
            showNotification(t('notification.presets.emptyName'), 'error');
            return;
        }
        const newPreset: Preset = {
            id: Date.now().toString(),
            name,
            settings,
        };
        const updatedPresets = [...presets, newPreset];
        setPresets(updatedPresets);
        localStorage.setItem('stickerGenPresets', JSON.stringify(updatedPresets));
        showNotification(t('notification.presets.saved', { name }), 'success');

        // Fire-and-forget call to the backend for analytics
        fetch('/api/save-preset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPreset),
        }).catch(err => console.error("Failed to log preset:", err)); // Log error silently

    }, [presets, settings, showNotification, t]);

    const applyPreset = useCallback((id: string) => {
        const preset = presets.find(p => p.id === id);
        if (preset) {
            setSettings(preset.settings);
            showNotification(t('notification.presets.applied', { name: preset.name }), 'info');
        }
    }, [presets, showNotification, t]);

    const deletePreset = useCallback((id: string) => {
        const updatedPresets = presets.filter(p => p.id !== id);
        setPresets(updatedPresets);
        localStorage.setItem('stickerGenPresets', JSON.stringify(updatedPresets));
        showNotification(t('notification.presets.deleted'), 'success');
    }, [presets, showNotification, t]);

    return (
        <div className="h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
            {notification && <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
            <div className="max-w-[1800px] mx-auto p-2 sm:p-4 w-full flex-grow min-h-0">
                <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 flex flex-col h-full overflow-hidden border border-slate-200/50">
                    <Header />
                    <main className="flex flex-col lg:flex-row flex-grow min-h-0">
                        <div className="flex flex-grow-[3] lg:flex-grow min-h-0 border-b lg:border-b-0 lg:border-r border-slate-200/80">
                             <CategorySidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
                             <div className="flex-grow bg-slate-50/50 overflow-y-auto">
                                <SettingsPanel
                                    activeCategory={activeCategory}
                                    settings={settings}
                                    onSettingsChange={handleSettingsChange}
                                    onStyleChange={handleStyleChange}
                                    onStickerModeChange={handleStickerModeChange}
                                    showNotification={showNotification}
                                />
                             </div>
                        </div>
                        <div className="flex-grow-[2] lg:flex-grow-0 lg:w-[450px] lg:flex-shrink-0 bg-white overflow-y-auto">
                           <PreviewPanel 
                                promptData={promptData}
                                isLoading={isLoading}
                                error={error}
                                onReset={resetSettings}
                                presets={presets}
                                onSavePreset={savePreset}
                                onApplyPreset={applyPreset}
                                onDeletePreset={deletePreset}
                           />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
