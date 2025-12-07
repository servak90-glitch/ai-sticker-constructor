import React, { useState } from 'react';
import { Preset } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface PresetManagerProps {
    presets: Preset[];
    onSave: (name: string) => void;
    onApply: (id: string) => void;
    onDelete: (id: string) => void;
}

const PresetManager: React.FC<PresetManagerProps> = ({ presets, onSave, onApply, onDelete }) => {
    const { t } = useTranslation();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [presetName, setPresetName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');

    const handleSave = () => {
        if (presetName.trim()) {
            onSave(presetName.trim());
            setIsSaveModalOpen(false);
            setPresetName('');
        }
    };

    const handleApply = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        if (id) {
            onApply(id);
            setSelectedPreset(id);
        } else {
            setSelectedPreset('');
        }
    };

    return (
        <div className="mt-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                    <select
                        value={selectedPreset}
                        onChange={handleApply}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors appearance-none"
                    >
                        <option value="">{t('presets.title')}</option>
                        {presets.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                <button
                    onClick={() => setIsSaveModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>{t('presets.save')}</span>
                </button>
            </div>
             {selectedPreset && (
                    <div className="text-right mt-1">
                        <button
                            onClick={() => {
                                if (window.confirm(t('presets.confirmDelete'))) {
                                    onDelete(selectedPreset);
                                    setSelectedPreset('');
                                }
                            }}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                            {t('presets.delete')}
                        </button>
                    </div>
                )}
            {isSaveModalOpen && (
                <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center" onClick={() => setIsSaveModalOpen(false)}>
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <h4 className="text-lg font-bold text-slate-800">{t('presets.modal.title')}</h4>
                        <p className="text-sm text-slate-500 mt-1">{t('presets.modal.description')}</p>
                        <input
                            type="text"
                            autoFocus
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            placeholder={t('presets.modal.placeholder')}
                            className="w-full mt-4 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setIsSaveModalOpen(false)} className="w-full px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300">
                                {t('presets.modal.cancel')}
                            </button>
                            <button onClick={handleSave} className="w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600">
                                {t('presets.save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresetManager;