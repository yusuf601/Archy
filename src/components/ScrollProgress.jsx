import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Get the main content area
            const mainContent = document.querySelector('.section-transition');
            if (mainContent) {
                const totalHeight = mainContent.scrollHeight - mainContent.clientHeight;
                const progress = (mainContent.scrollTop / totalHeight) * 100;
                setScrollProgress(progress || 0);
            }
        };

        const mainContent = document.querySelector('.section-transition');
        if (mainContent) {
            mainContent.addEventListener('scroll', handleScroll);
            return () => mainContent.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-everblush-bg/50">
            <motion.div
                className="h-full bg-everblush-green shadow-glow-green"
                style={{ width: `${scrollProgress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
            />
            <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-[8px] font-mono text-everblush-green/50">
                <span>[BUFFER: {Math.round(scrollProgress)}%]</span>
                <span>[LOADING...]</span>
            </div>
        </div>
    );
};

export default ScrollProgress;
