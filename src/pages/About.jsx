import React from 'react';
import { motion } from 'framer-motion';
import MotionText from '../components/MotionText';
import ContributionHeatmap from '../components/ContributionHeatmap';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const SyntaxTerm = ({ tone = 'info', children }) => (
    <motion.span
        initial={{ opacity: 0.72 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.35 }}
        className={tone === 'warning' ? 'text-[var(--accent-warning)]' : 'text-[var(--accent-info)]'}
    >
        {children}
    </motion.span>
);

const About = () => {
    const principles = [
        {
            title: 'Rebuild the abstraction',
            body: 'I learn systems by recreating the pieces most people only import: containers, algorithms, memory behavior, and the tradeoffs behind clean APIs',
        },
        {
            title: 'Measure before decorating',
            body: 'The work starts with constraints: runtime, memory, data layout, build behavior, and the shape of the problem before the interface gets polished',
        },
        {
            title: 'Keep research close to implementation',
            body: 'Machine learning and computational ideas stay grounded when they meet real code, real data structures, and real failure modes',
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
                        className="mb-3 font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]"
                    >
                        Working principles
                    </motion.p>
                    <MotionText
                        as="h3"
                        segments={['I care about the layer where', 'abstractions become cost']}
                        delay={0.05}
                        stagger={0.08}
                        className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
                        itemClassName="block"
                    />
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-6 max-w-3xl font-sans text-base leading-8 text-[var(--text-secondary)]"
                    >
                        My work sits between low-level C++ <SyntaxTerm tone="info">systems</SyntaxTerm>, Linux-first workflows, and computational <SyntaxTerm tone="warning">research</SyntaxTerm>; the common thread is simple: understand the machinery deeply enough to build with <SyntaxTerm tone="warning">intent</SyntaxTerm>
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
