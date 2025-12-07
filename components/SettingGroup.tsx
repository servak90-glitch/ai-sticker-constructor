
import React from 'react';

interface SettingGroupProps {
    title: string;
    children: React.ReactNode;
}

const SettingGroup: React.FC<SettingGroupProps> = ({ title, children }) => {
    return (
        <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/90">
            <h3 className="text-base font-bold text-slate-700 mb-3 border-b border-slate-200/90 pb-2">
                {title}
            </h3>
            {children}
        </div>
    );
};

export default SettingGroup;