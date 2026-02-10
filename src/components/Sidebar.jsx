import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const files = [
        { name: 'main.cpp', icon: '📄', path: '/' },
        { name: 'blog/', icon: '📁', path: '/blog' },
        { name: 'projects/', icon: '📁', path: '/projects' },
        { name: 'contact.txt', icon: '📄', path: '/contact' },
    ];

    // Get current path for display
    const getCurrentPath = () => {
        const path = location.pathname;
        if (path === '/') return '~';
        return `~${path}`;
    };

    // Check if file is active
    const isActive = (filePath) => {
        return location.pathname === filePath;
    };

    return (
        <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-everblush-bg border-r border-everblush-green/30 flex flex-col h-screen"
        >
            {/* Header with Dynamic Path */}
            <div className="p-4 border-b border-everblush-green/30">
                <h2 className="font-mono text-sm text-everblush-green text-glow-green">
                    EXPLORER
                </h2>
                <div className="mt-2 font-mono text-xs text-everblush-fg/70">
                    <span className="text-everblush-green">guest</span>
                    <span className="text-everblush-fg">@</span>
                    <span className="text-everblush-green">yusuf</span>
                    <span className="text-everblush-fg">:</span>
                    <span className="text-everblush-blue">{getCurrentPath()}</span>
                    <span className="text-everblush-green">$</span>
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="font-mono text-xs text-everblush-fg/70 mb-2 px-2">
                    📁 portfolio/
                </div>
                <div className="space-y-1">
                    {files.map((file) => (
                        <button
                            key={file.name}
                            onClick={() => navigate(file.path)}
                            className={`w-full text-left px-4 py-2 font-mono text-sm rounded
                       transition-all duration-200 flex items-center gap-2
                       ${isActive(file.path)
                                    ? 'bg-everblush-green/20 text-everblush-green border-l-2 border-everblush-green'
                                    : 'text-everblush-fg/80 hover:bg-everblush-green/10 hover:text-everblush-green'
                                }`}
                        >
                            <span>{file.icon}</span>
                            <span>{file.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Info */}
            <div className="p-3 border-t border-everblush-green/30 font-mono text-xs text-everblush-fg/50">
                <div>4 items</div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
