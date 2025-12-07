import React from 'react';
import { Settings, StyleKey, InterpretationMode, StickerMode, NotificationType, Category } from '../types';
import { STYLE_LIBRARY } from '../constants';
import StyleLibrary from './StyleLibrary';
import TextSettings from './TextSettings';
import VfxSettings from './VfxSettings';
import FormatSettings from './FormatSettings';
import QualitySettings from './QualitySettings';
import BackgroundSettings from './BackgroundSettings';
import { useTranslation } from '../contexts/LanguageContext';

interface SettingsPanelProps {
    settings: Settings;
    onSettingsChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
    onStyleChange: (style: StyleKey) => void;
    onStickerModeChange: (mode: StickerMode) => void;
    showNotification: (message: string, type: NotificationType) => void;
    activeCategory: Category;
}

const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
    const { settings, onSettingsChange, activeCategory } = props;
    const { t } = useTranslation();
    const styleConfig = STYLE_LIBRARY[settings.style as StyleKey];

    const renderActiveCategory = () => {
        switch (activeCategory) {
            case 'style':
                return <StyleLibrary 
                    selectedStyle={settings.style} 
                    onSelectStyle={props.onStyleChange}
                    interpretationMode={settings.interpretationMode}
                    onModeChange={(mode) => onSettingsChange('interpretationMode', mode)}
                    showNotification={props.showNotification}
                />;
            case 'format':
                return <FormatSettings 
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                    onStickerModeChange={props.onStickerModeChange}
                />
            case 'quality':
                return <QualitySettings
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                />
            case 'background':
                return <BackgroundSettings 
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                />;
            case 'text':
                return <TextSettings settings={settings} onSettingsChange={onSettingsChange} />;
            case 'vfx':
                 return <VfxSettings 
                    settings={settings} 
                    onSettingsChange={onSettingsChange}
                    styleConfig={styleConfig}
                />;
            default:
                return null;
        }
    }

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">{t(`category.title.${activeCategory}`)}</h2>
            {renderActiveCategory()}
        </div>
    );
};

export default SettingsPanel;