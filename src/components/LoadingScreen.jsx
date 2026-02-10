import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('');
    const messages = [
        'Initializing system...',
        'Loading modules...',
        'Compiling portfolio.cpp...',
        'Ready.'
    ];

    useEffect(() => {
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length) {
                setLoadingText(messages[messageIndex]);
                messageIndex++;
            } else {
                clearInterval(messageInterval);
                setTimeout(() => {
                    setIsLoading(false);
                    onLoadingComplete();
                }, 500);
            }
        }, 400);

        return () => clearInterval(messageInterval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10000] bg-everblush-bg flex items-center justify-center"
                >
                    <div className="font-mono text-center">
                        <div className="text-everblush-green text-xl mb-4">
                            {loadingText}
                            <span className="cursor ml-1"></span>
                        </div>
                        <div className="flex gap-2 justify-center">
                            <span className="text-everblush-green animate-pulse">{'['}</span>
                            <span className="text-everblush-blue animate-pulse delay-100">{'='}</span>
                            <span className="text-everblush-green animate-pulse delay-200">{'='}</span>
                            <span className="text-everblush-blue animate-pulse delay-300">{'='}</span>
                            <span className="text-everblush-green animate-pulse">{'>'}</span>
                            <span className="text-everblush-fg/50 ml-2">Booting...</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
