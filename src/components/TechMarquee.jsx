import React from 'react';
import { motion } from 'framer-motion';

const TECHS = [
    'C++20', 'OpenMP', 'POSIX', 'Linux Kernel', 'ELF',
    'CUDA', 'clang++', 'g++', 'CMake', 'Makefile',
    'valgrind', 'gdb', 'std::algorithm', 'SIMD', 'ASM',
    'Python', 'Docker', 'git', 'ML', 'Fuzzy Logic',
];

const TechMarquee = () => {
    const doubled = [...TECHS, ...TECHS]; // seamless loop

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden py-6 border-y border-[var(--border-light)]"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
            <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-0">
                {doubled.map((tech, i) => (
                    <span
                        key={i}
                        className="text-xs text-[var(--text-secondary)] mx-5 shrink-0 select-none"
                    >
                        <span className="text-[var(--accent-blue)] mr-1.5">∷</span>
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default TechMarquee;
