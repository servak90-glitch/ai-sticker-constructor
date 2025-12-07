import React, { useState, useMemo } from 'react';
import { StyleKey, InterpretationMode, NotificationType, StyleInfo, StyleCategoryKey } from '../types';
import { STYLE_LIBRARY, ALWAYS_ARTISTIC_STYLES, ARTISTIC_STYLES, STYLE_CATEGORIES_ORDER } from '../constants';
import SettingGroup from './SettingGroup';
import { useTranslation } from '../contexts/LanguageContext';

interface StyleLibraryProps {
    selectedStyle: StyleKey;
    onSelectStyle: (style: StyleKey) => void;
    interpretationMode: InterpretationMode;
    onModeChange: (mode: InterpretationMode) => void;
    showNotification: (message: string, type: NotificationType) => void;
}

const StyleLibrary: React.FC<StyleLibraryProps> = ({ selectedStyle, onSelectStyle, interpretationMode, onModeChange, showNotification }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleStyleClick = (styleKey: StyleKey) => {
        const styleName = t(STYLE_LIBRARY[styleKey].nameKey);
        if (interpretationMode === 'STRICT' && ALWAYS_ARTISTIC_STYLES.includes(styleKey)) {
            onModeChange('ARTISTIC');
            showNotification(t('notification.style.artisticRequired', { style: styleName }), 'warning');
        } else if (interpretationMode === 'STRICT' && ARTISTIC_STYLES.includes(styleKey)) {
             showNotification(t('notification.style.artisticRecommended', { style: styleName }), 'info');
        }
        onSelectStyle(styleKey);
    };

    const groupedAndFilteredStyles = useMemo(() => {
        const query = searchTerm.toLowerCase();
        
        const filteredStyles = Object.entries(STYLE_LIBRARY).filter(([key, style]) => {
            return (
                t(style.nameKey).toLowerCase().includes(query) ||
                style.tagKeys.some(tagKey => t(tagKey).toLowerCase().includes(query)) ||
                t(style.badgeKey).toLowerCase().includes(query) ||
                style.emoji.includes(query)
            );
        });

        if (filteredStyles.length === 0) {
            return null;
        }

        const grouped = filteredStyles.reduce((acc, [key, style]) => {
            const category = style.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push([key as StyleKey, style as StyleInfo]);
            return acc;
        }, {} as Record<StyleCategoryKey, [StyleKey, StyleInfo][]>);
        
        return STYLE_CATEGORIES_ORDER
            .map(categoryName => ({
                categoryName,
                styles: grouped[categoryName] || [],
            }))
            .filter(group => group.styles.length > 0);

    }, [searchTerm, t]);

    return (
        <div className="space-y-4">
            <SettingGroup title={t('style.interpretationMode')}>
                 <div className="relative flex items-center justify-center p-1 bg-slate-200 rounded-xl">
                    <span 
                        className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out transform ${
                            interpretationMode === 'ARTISTIC' ? 'translate-x-full' : 'translate-x-0'
                        }`}
                    />
                    <button 
                        onClick={() => onModeChange('STRICT')}
                        className="relative z-10 px-4 py-2 text-sm font-semibold rounded-md transition-colors w-1/2 text-slate-700"
                    >
                        🔒 {t('style.strict')}
                    </button>
                    <button 
                        onClick={() => onModeChange('ARTISTIC')}
                        className="relative z-10 px-4 py-2 text-sm font-semibold rounded-md transition-colors w-1/2 text-slate-700"
                    >
                        🎨 {t('style.artistic')}
                    </button>
                </div>
            </SettingGroup>
            
            <div className="relative">
                <input
                    type="text"
                    placeholder={t('style.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {groupedAndFilteredStyles ? groupedAndFilteredStyles.map(({ categoryName, styles }) => (
                <div key={categoryName}>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">{t(`category.${categoryName}`)}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
                        {styles.map(([key, style]) => {
                            const isSelected = selectedStyle === key;
                            const isArtisticRecommended = ARTISTIC_STYLES.includes(key);
                            const requiresArtistic = ALWAYS_ARTISTIC_STYLES.includes(key);

                            return (
                                <button
                                    key={key}
                                    onClick={() => handleStyleClick(key)}
                                    className={`p-3 border rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        isSelected
                                            ? 'bg-sky-50 border-2 border-sky-500 ring-sky-500/20 shadow-md'
                                            : 'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50 hover:-translate-y-0.5 focus:ring-sky-500/30'
                                    }`}
                                >
                                    <div className="text-2xl">{style.emoji}</div>
                                    <div className="font-semibold text-sm mt-1 text-slate-800">{t(style.nameKey)}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{t(style.badgeKey)}</div>
                                    {(isArtisticRecommended || requiresArtistic) && (
                                        <div className={`mt-1.5 text-[10px] font-bold p-1 rounded-full text-center ${requiresArtistic ? 'text-red-700 bg-red-100' : 'text-purple-700 bg-purple-100'}`}>
                                            🎨 {requiresArtistic ? t('style.artisticNeeded') : t('style.artisticRecommended')}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )) : (
                <div className="text-center py-10 text-slate-500">
                    <p className="font-semibold">{t('style.notFound.title')}</p>
                    <p className="text-sm">{t('style.notFound.description')}</p>
                </div>
            )}
        </div>
    );
};

export default StyleLibrary;