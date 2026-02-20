import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
    const systemsRow = [
        '-std=c++20', 'make', '-O3', 'cmake', '-march=native',
        '-lpthread', 'gcc', 'clang', '-Wall', '-Wextra',
        'linux-kernel', '-DNDEBUG', 'gdb', 'valgrind', '-std=c++17',
    ];

    const aiRow = [
        'numpy', 'scikit-learn', 'pandas', 'fuzzy-logic',
        'matplotlib', 'python3', 'ml-research', 'clustering',
        'deep-learning', 'scipy', 'statsmodels', 'data-science',
    ];

    const MarqueeRow = ({ items, direction = 1, colorClass = 'text-everblush-green/70 border-everblush-green/20 hover:text-everblush-green hover:border-everblush-green/50' }) => (
        <div className="overflow-hidden flex">
            <motion.div
                className="flex gap-4 whitespace-nowrap shrink-0"
                animate={{ x: direction === 1 ? [0, '-50%'] : ['-50%', 0] }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, i) => (
                    <motion.span
                        key={i}
                        className={`font-mono text-xs sm:text-sm px-3 py-1.5 border rounded transition-all duration-300 cursor-default shrink-0 ${colorClass}`}
                        whileHover={{ scale: 1.08, y: -2 }}
                    >
                        {item}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );

    return (
        <div className="overflow-hidden bg-everblush-bg/50 border-y border-everblush-green/30 py-5 space-y-3">
            {/* Row 1: Systems (→ right) */}
            <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-everblush-green/40 uppercase tracking-widest shrink-0 pl-4 hidden sm:block">
                    sys
                </span>
                <MarqueeRow
                    items={systemsRow}
                    direction={1}
                    colorClass="text-everblush-green/70 border-everblush-green/20 hover:text-everblush-green hover:border-everblush-green/60 hover:shadow-glow-green"
                />
            </div>

            {/* Row 2: AI (← left) */}
            <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-everblush-blue/40 uppercase tracking-widest shrink-0 pl-4 hidden sm:block">
                    ai
                </span>
                <MarqueeRow
                    items={aiRow}
                    direction={-1}
                    colorClass="text-everblush-blue/70 border-everblush-blue/20 hover:text-everblush-blue hover:border-everblush-blue/60 hover:shadow-glow-blue"
                />
            </div>

            {/* Label */}
            <p className="text-center font-mono text-[10px] text-everblush-fg/30 pt-1">
                // Compilation Flags &amp; Research Libraries
            </p>
        </div>
    );
};

export default TechMarquee;
