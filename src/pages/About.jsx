import React from 'react';
import { motion } from 'framer-motion';
import ContributionHeatmap from '../components/ContributionHeatmap';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const About = () => {
    const principles = [
        {
            title: 'Rebuild the abstraction',
            body: 'I learn systems by recreating the pieces most people only import: containers, algorithms, memory behavior, and the tradeoffs behind clean APIs.',
        },
        {
            title: 'Measure before decorating',
            body: 'The work starts with constraints: runtime, memory, data layout, build behavior, and the shape of the problem before the interface gets polished.',
        },
        {
            title: 'Keep research close to implementation',
            body: 'Machine learning and computational ideas stay grounded when they meet real code, real data structures, and real failure modes.',
        },
    ];

    const skills = ['C++', 'Python', 'Linux', 'Julia', 'Haskell', 'ML'];

    return (
        <section className="min-h-screen px-6 py-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-12 max-w-4xl">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4 }}
                        className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
                    >
                        Working principles
                    </motion.p>
                    <motion.h3
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
                    >
                        I care about the layer where abstractions become cost.
                    </motion.h3>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-6 max-w-3xl font-sans text-base leading-8 text-[var(--text-secondary)]"
                    >
                        My work sits between low-level C++ systems, Linux-first workflows, and computational research. The common thread is simple: understand the machinery deeply enough to build with intent.
                    </motion.p>
                </div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.16 }}
                    className="grid gap-3 md:grid-cols-3"
                >
                    {principles.map((principle, index) => (
                        <article
                            key={principle.title}
                            className="border border-[var(--border-light)] bg-[var(--bg-panel)] p-5"
                        >
                            <p className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
                                0{index + 1}
                            </p>
                            <h4 className="mb-3 font-display text-xl font-black tracking-tight text-[var(--text-primary)]">
                                {principle.title}
                            </h4>
                            <p className="font-sans text-sm leading-7 text-[var(--text-secondary)]">
                                {principle.body}
                            </p>
                        </article>
                    ))}
                </motion.div>

                <div className="mt-12">
                    <ContributionHeatmap />
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="border border-[var(--border-light)] px-3 py-1.5 text-sm text-[var(--text-primary)]"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
