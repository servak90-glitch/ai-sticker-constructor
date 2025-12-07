import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface OptionSelectorProps {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: any) => void;
    gridCols?: string;
    disabled?: boolean;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ name, options, value, onChange, gridCols = 'grid-cols-2 md:grid-cols-3', disabled = false }) => {
    return (
        <div className={`grid ${gridCols} gap-2 p-1 bg-slate-200 rounded-lg ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`flex items-center justify-center text-center px-2 py-2 text-xs font-semibold rounded-md transition-colors ${
                        disabled 
                            ? 'bg-slate-200 text-slate-500'
                            : value === option.value
                                ? 'bg-white text-sky-800 shadow-sm'
                                : 'bg-transparent text-slate-600 hover:bg-slate-100'
                    } ${disabled ? '' : 'cursor-pointer'}`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="sr-only"
                        disabled={disabled}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default OptionSelector;