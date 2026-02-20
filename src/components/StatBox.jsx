import React, { useState, useEffect } from 'react';

const StatBox = ({ label, value, unit = "", updateInterval = 0 }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (!updateInterval) return;

        const interval = setInterval(() => {
            if (typeof value === 'number') {
                const variation = Math.floor(Math.random() * 10) - 5; // +/- 5
                setDisplayValue(prev => Math.max(0, prev + variation));
            }
        }, updateInterval);

        return () => clearInterval(interval);
    }, [value, updateInterval]);

    return (
        <div className="flex flex-col justify-between h-full">
            <h3 className="text-xs font-mono text-everblush-fg/50 uppercase tracking-widest">{label}</h3>
            <div className="flex items-end gap-1">
                <span className="text-2xl font-mono font-bold text-everblush-green">{displayValue}</span>
                <span className="text-xs font-mono text-everblush-fg/50 mb-1">{unit}</span>
            </div>
            {/* Mini Graph Bar */}
            <div className="w-full h-1 bg-everblush-fg/10 mt-2 rounded overflow-hidden">
                <div
                    className="h-full bg-everblush-green/50 animate-pulse"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                />
            </div>
        </div>
    );
};

export default StatBox;
