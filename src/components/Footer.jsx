import React from 'react';

const Footer = ({ mode = 'NORMAL', currentFile = 'main.cpp' }) => {
    // Determine language based on file extension
    const getLanguage = (filename) => {
        if (filename.endsWith('.cpp')) return 'C++';
        if (filename.endsWith('.h')) return 'C/C++';
        if (filename.endsWith('.log')) return 'Log';
        return 'Text';
    };

    return (
        <footer className="bg-everblush-bg border-t border-everblush-green/30">
            <div className="flex items-center justify-between px-4 min-h-[32px] h-8 font-mono text-xs sm:text-sm">

                {/* Left: Mode indicator */}
                <div className="flex items-center">
                    <span
                        className={`px-3 py-1 font-semibold ${mode === 'INSERT'
                            ? 'bg-everblush-blue text-everblush-bg'
                            : 'bg-everblush-green text-everblush-bg'
                            }`}
                    >
                        {mode}
                    </span>
                </div>

                {/* Center: Filename - hidden on mobile */}
                <div className="hidden sm:block text-everblush-fg text-glow-green">
                    {currentFile}
                </div>

                {/* Right: File info - hidden on mobile */}
                <div className="hidden sm:flex text-everblush-fg/70 items-center gap-2">
                    <span>utf-8</span>
                    <span>|</span>
                    <span>{getLanguage(currentFile)}</span>
                    <span>|</span>
                    <span>100%</span>
                </div>

                {/* Mobile only: compact right side */}
                <div className="sm:hidden text-everblush-fg/50 text-xs font-mono">
                    {getLanguage(currentFile)}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
