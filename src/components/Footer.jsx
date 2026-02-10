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
            <div className="flex items-center justify-between px-4 h-8 font-mono text-xs sm:text-sm">

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

                {/* Center: Filename */}
                <div className="hidden sm:block text-everblush-fg text-glow-green">
                    {currentFile}
                </div>

                {/* Right: File info */}
                <div className="text-everblush-fg/70 flex items-center gap-2">
                    <span className="hidden sm:inline">utf-8</span>
                    <span className="hidden sm:inline">|</span>
                    <span>{getLanguage(currentFile)}</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline">100%</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
