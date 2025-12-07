import React from 'react';
import { Settings } from '../types';
import SettingGroup from './SettingGroup';
import ToggleSwitch from './ToggleSwitch';
import { useTranslation } from '../contexts/LanguageContext';

interface BackgroundSettingsProps {
    settings: Settings;
    onSettingsChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ settings, onSettingsChange }) => {
    const { t } = useTranslation();
    const isIsolationMode = settings.stickerMode === 'ISOLATION';
    const isolationReason = t('background.disabled.isolation');
    const canLockBackground = !isIsolationMode && settings.styleBackground;

    return (
        <SettingGroup title={t('category.title.background')}>
            <div className="space-y-3">
                <ToggleSwitch 
                    id="styleBackground" 
                    label={t('background.styleBackground')} 
                    checked={settings.styleBackground} 
                    onChange={(c) => onSettingsChange('styleBackground', c)}
                    disabled={isIsolationMode}
                    disabledReason={isIsolationMode ? isolationReason : ''}
                />
                <ToggleSwitch 
                    id="backgroundLock" 
                    label={t('background.lockBackground')}
                    checked={settings.backgroundLock} 
                    onChange={(c) => onSettingsChange('backgroundLock', c)}
                    disabled={!canLockBackground}
                    disabledReason={
                        isIsolationMode 
                        ? isolationReason 
                        : !settings.styleBackground 
                        ? t('background.disabled.lock')
                        : ''
                    }
                />
            </div>
        </SettingGroup>
    );
};

export default BackgroundSettings;