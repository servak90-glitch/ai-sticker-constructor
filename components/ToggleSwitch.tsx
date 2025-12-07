import React from 'react';

interface ToggleSwitchProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    disabledReason?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, checked, onChange, disabled = false, disabledReason = '' }) => {
    return (
        <label htmlFor={id} title={disabledReason} className={`flex items-center justify-between ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <div className="relative inline-flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e.target.checked)}
                    disabled={disabled}
                />
                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-500/50 peer-checked:bg-sky-500 transition-colors"></div>
                <div
                    className="absolute top-0.5 left-[2px] bg-white border-slate-300 border w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full peer-checked:border-white"
                ></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;