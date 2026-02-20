import React from 'react';
import { motion } from 'framer-motion';

export const BentoGrid = ({ children, className = "" }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    );
};

export const BentoItem = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`
                bg-everblush-bg/50 backdrop-blur-md 
                border border-everblush-green/20 rounded-xl
                hover:border-everblush-green/50 transition-colors duration-300
                overflow-hidden relative group
                ${className}
            `}
        >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-everblush-green/50 rounded-tl-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-everblush-green/50 rounded-tr-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-everblush-green/50 rounded-bl-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-everblush-green/50 rounded-br-sm opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="h-full w-full p-6">
                {children}
            </div>
        </motion.div>
    );
};
