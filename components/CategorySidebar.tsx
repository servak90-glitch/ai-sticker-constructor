import React from 'react';
import { Category } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface CategorySidebarProps {
    activeCategory: Category;
    onSelectCategory: (category: Category) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onSelectCategory }) => {
    const { t } = useTranslation();
    
    const categories: { id: Category; nameKey: string; icon: React.ReactNode }[] = [
        { id: 'style', nameKey: 'category.style', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> },
        { id: 'format', nameKey: 'category.format', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m2 2 7.5 7.5"/></svg> },
        { id: 'quality', nameKey: 'category.quality', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
        { id: 'background', nameKey: 'category.background', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg> },
        { id: 'text', nameKey: 'category.text', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18.1H3"/></svg> },
        { id: 'vfx', nameKey: 'category.vfx', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/><path d="m12 3-1.8 1.8c-.8.8-2 .8-2.8 0L3 0"/><path d="m12 21 1.8-1.8c.8-.8 2 .8 2.8 0L21 24"/><path d="M12 12.5a2.5 2.5 0 0 1 0-5 .5.5 0 0 0 0-1c-1.7 0-3 1.3-3 3s1.3 3 3 3a.5.5 0 0 0 0-1Z"/><path d="M12 12.5a2.5 2.5 0 0 0 0 5 .5.5 0 0 1 0 1c1.7 0 3-1.3 3-3s-1.3-3-3-3a.5.5 0 0 1 0 1Z"/></svg> },
    ];

    return (
        <div className="bg-slate-100 border-r border-slate-200/80 p-2">
            <nav className="flex flex-col gap-2">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        title={t(category.nameKey)}
                        className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-sky-500
                        ${
                            activeCategory === category.id
                                ? 'bg-sky-500 text-white shadow-md'
                                : 'bg-white text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                        }`}
                    >
                        {category.icon}
                        <span className="sr-only">{t(category.nameKey)}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default CategorySidebar;