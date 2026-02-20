import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import GlitchText from './GlitchText';

const SkillBar = ({ label, pct, color = 'bg-everblush-green' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="space-y-1">
            <div className="flex justify-between font-mono text-xs text-everblush-fg/60">
                <span>{label}</span>
                <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-everblush-fg/10 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
            </div>
        </div>
    );
};

const SkillCard = ({ icon, title, skills, bars, accentClass, borderClass, glowClass }) => (
    <div className={`border ${borderClass} rounded-lg p-6 bg-everblush-bg/50 backdrop-blur-sm
        hover:${glowClass} transition-all duration-300 flex flex-col gap-5`}>
        {/* Card header */}
        <div className="flex items-center gap-3">
            <span className={`font-mono text-lg ${accentClass}`}>{icon}</span>
            <h3 className={`font-mono font-bold text-base ${accentClass}`}>{title}</h3>
        </div>

        {/* Skill pill grid */}
        <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
                <span
                    key={i}
                    className={`font-mono text-xs px-2 py-1 border ${borderClass} rounded
                        text-everblush-fg/70 hover:text-everblush-fg transition-colors duration-200`}
                >
                    {s}
                </span>
            ))}
        </div>

        {/* Animated proficiency bars */}
        <div className="space-y-2 pt-2 border-t border-everblush-fg/10">
            {bars.map((b, i) => <SkillBar key={i} {...b} />)}
        </div>
    </div>
);

const TechStack = () => {
    const categories = [
        {
            icon: '⚙',
            title: 'Low-Level Systems',
            accentClass: 'text-everblush-green',
            borderClass: 'border-everblush-green/30',
            glowClass: 'shadow-glow-green',
            skills: ['C++20', 'CMake', 'GCC/Clang', 'Linux Kernel', 'Multithreading', 'Memory Mgmt', 'GDB', 'System Calls'],
            bars: [
                { label: 'C++', pct: 88, color: 'bg-everblush-green' },
                { label: 'Linux/Systems', pct: 75, color: 'bg-everblush-green' },
                { label: 'CMake/Build', pct: 70, color: 'bg-everblush-green' },
            ],
        },
        {
            icon: '#',
            title: 'AI & Research',
            accentClass: 'text-everblush-blue',
            borderClass: 'border-everblush-blue/30',
            glowClass: 'shadow-glow-blue',
            skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Fuzzy Logic', 'Clustering', 'ML', 'Matplotlib'],
            bars: [
                { label: 'Python/ML', pct: 78, color: 'bg-everblush-blue' },
                { label: 'Fuzzy Logic', pct: 82, color: 'bg-everblush-blue' },
                { label: 'Data Analysis', pct: 72, color: 'bg-everblush-blue' },
            ],
        },
        {
            icon: '>_',
            title: 'Competitive Prog.',
            accentClass: 'text-everblush-yellow',
            borderClass: 'border-everblush-yellow/30',
            glowClass: 'shadow-[0_0_15px_rgba(219,188,127,0.25)]',
            skills: ['C++20', 'STL', 'Algorithms', 'Graph Theory', 'Dynamic Prog.', 'Data Structures'],
            bars: [
                { label: 'Algorithms', pct: 80, color: 'bg-everblush-yellow' },
                { label: 'Data Structures', pct: 83, color: 'bg-everblush-yellow' },
                { label: 'Problem Solving', pct: 77, color: 'bg-everblush-yellow' },
            ],
        },
    ];

    return (
        <section id="tech" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl font-mono font-bold text-syntax-header mb-2">
                            <GlitchText text="// Dependencies & Libraries" />
                        </h2>
                        <p className="font-mono text-sm text-syntax-meta">
                            <span className="syntax-keyword">#include</span>{' '}
                            <span className="syntax-string">&lt;expertise.h&gt;</span>
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <ScrollReveal key={i} delay={i * 0.15}>
                            <SkillCard {...cat} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
