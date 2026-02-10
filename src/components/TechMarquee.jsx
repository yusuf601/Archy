import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
    const techs = [
        '-std=c++20',
        '-std=c++17',
        '-DCMAKE_BUILD_TYPE=Release',
        '-lpthread',
        '-lm',
        '-O3',
        '-march=native',
        '-DNDEBUG',
        '-Wall',
        '-Wextra',
        '-lpython3',
        '-lnumpy',
        '-arch=linux',
        '-std=c++20',
        '-std=c++17',
        '-DCMAKE_BUILD_TYPE=Release',
    ];

    return (
        <div className="overflow-hidden bg-everblush-bg/50 border-y border-everblush-green/30 py-4">
            <div className="flex">
                <motion.div
                    className="flex gap-6 whitespace-nowrap"
                    animate={{
                        x: [0, -1400],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {techs.map((tech, index) => (
                        <motion.span
                            key={index}
                            className="font-mono text-sm text-everblush-green/70 hover:text-everblush-green 
                       hover:shadow-glow-green transition-all duration-300 cursor-default px-3 py-1
                       border border-everblush-green/20 hover:border-everblush-green/50 rounded"
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
            <div className="text-center mt-2">
                <span className="text-xs font-mono text-everblush-fg/40">
          // Compilation Flags & Libraries
                </span>
            </div>
        </div>
    );
};

export default TechMarquee;
