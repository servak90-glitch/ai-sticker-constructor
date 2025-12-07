import React from 'react';
import { Settings } from '../types';
import SettingGroup from './SettingGroup';
import OptionSelector from './OptionSelector';
import { useTranslation } from '../contexts/LanguageContext';

interface TextSettingsProps {
    settings: Settings;
    onSettingsChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({ settings, onSettingsChange }) => {
    const { t } = useTranslation();
    
    const textColorOptions = [
        { value: 'BLACK', label: t('text.color.black') },
        { value: 'WHITE', label: t('text.color.white') },
        { value: 'RED', label: t('text.color.red') },
        { value: 'BLUE', label: t('text.color.blue') },
        { value: 'GREEN', label: t('text.color.green') },
        { value: 'YELLOW', label: t('text.color.yellow') },
    ];
    
    return (
        <SettingGroup title={t('text.title')}>
            <OptionSelector
                name="textMode"
                value={settings.textMode}
                onChange={(val) => onSettingsChange('textMode', val)}
                options={[
                    { value: 'NO_TEXT', label: t('text.mode.noText') },
                    { value: 'CUSTOM_TEXT', label: t('text.mode.customText') },
                ]}
            />

            {settings.textMode === 'CUSTOM_TEXT' && (
                <div className="mt-4 space-y-4">
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder={t('text.placeholder')}
                        value={settings.customText}
                        onChange={(e) => onSettingsChange('customText', e.target.value)}
                    />

                    <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-2">{t('text.color')}</h4>
                        <div className="grid grid-cols-6 gap-2">
                            {textColorOptions.map(opt => (
                                <button key={opt.value} title={opt.label} onClick={() => onSettingsChange('textColor', opt.value)} className={`h-8 w-full rounded-md border-2 transition ${settings.textColor === opt.value ? 'border-sky-500 ring-2 ring-sky-500/30' : 'border-transparent'}`} style={{backgroundColor: opt.value.toLowerCase()}}>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-2">{t('text.shape')}</h4>
                        <OptionSelector
                            name="textShape"
                            value={settings.textShape}
                            onChange={(val) => onSettingsChange('textShape', val)}
                            options={[
                                { value: 'STRAIGHT', label: t('text.shape.straight') },
                                { value: 'ARCH_UP', label: t('text.shape.archUp') },
                                { value: 'ARCH_DOWN', label: t('text.shape.archDown') },
                                { value: 'CIRCULAR', label: t('text.shape.circular') },
                            ]}
                             gridCols="grid-cols-2"
                        />
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-2">{t('text.sizeAndPosition')}</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <OptionSelector
                                name="textSize"
                                value={settings.textSize}
                                onChange={(val) => onSettingsChange('textSize', val)}
                                options={[
                                    { value: 'SMALL', label: t('text.size.small') },
                                    { value: 'MEDIUM', label: t('text.size.medium') },
                                    { value: 'LARGE', label: t('text.size.large') },
                                ]}
                                gridCols="grid-cols-1"
                            />
                            <OptionSelector
                                name="textPosition"
                                value={settings.textPosition}
                                onChange={(val) => onSettingsChange('textPosition', val)}
                                options={[
                                    { value: 'TOP', label: t('text.position.top') },
                                    { value: 'BOTTOM', label: t('text.position.bottom') },
                                    { value: 'INTEGRATED', label: t('text.position.integrated') },
                                    { value: 'AROUND', label: t('text.position.around') },
                                ]}
                                 gridCols="grid-cols-2"
                            />
                        </div>
                    </div>
                </div>
            )}
        </SettingGroup>
    );
};

export default TextSettings;