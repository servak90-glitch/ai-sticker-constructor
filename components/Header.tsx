import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const Header: React.FC = () => {
    const { t, language, setLanguage } = useTranslation();
    const interpretationMode = 'STRICT'; // This needs to come from App state if it's dynamic

    const toggleLanguage = () => {
        setLanguage(language === 'ru' ? 'en' : 'ru');
    };

    return (
        <header className="relative p-5 bg-white text-center border-b border-slate-200/80">
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1.5 text-sm font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    {language === 'ru' ? 'EN' : 'RU'}
                </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {t('header.title')}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                {t('header.subtitle')}
            </p>
        </header>
    );
};

export default Header;