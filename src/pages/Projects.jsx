import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Projects = () => {
    const artifacts = [
        {
            name: 'SVector',
            kind: 'container rebuild',
            statement: 'A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory.',
            github: 'https://github.com/Build-X-From-Scratch/SVector',
            tech: ['C++20', 'Allocator', 'STL'],
            className: 'md:col-span-3 md:row-span-2',
            public: true,
        },
        {
            name: 'forward_list_scratch',
            kind: 'linked primitive',
            statement: 'A forward-list implementation focused on splice, merge, sort, node ownership, and the real cost of pointer-shaped abstractions.',
            github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
            tech: ['C++20', 'Nodes', 'Algorithms'],
            className: 'md:col-span-3 md:row-span-2',
            public: true,
        },
        {
            name: 'Stack / Queue',
            kind: 'linear adapters',
            statement: 'Small primitives rebuilt to expose the tradeoffs behind interface simplicity.',
            github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
            tech: ['Adapters', 'Buffer'],
            className: 'md:col-span-2',
            public: true,
        },
        {
            name: 'Trees / Algorithms',
            kind: 'algorithmic internals',
            statement: 'Traversal, insertion, sorting, search, and the pieces hidden behind standard headers.',
            github: '#',
            tech: ['Trees', 'Sort', 'Search'],
            className: 'md:col-span-2',
            public: false,
        },
        {
            name: 'Research Notes',
            kind: 'systems to ML',
            statement: 'Academic and experimental notes connecting implementation details to computational models.',
            github: 'https://github.com/yusuf601/my-paper',
            tech: ['Research', 'ML'],
            className: 'md:col-span-2',
            public: true,
        },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl w-full">
                <div className="mb-10 max-w-3xl">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4 }}
                        className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
                    >
                        Build-X-From-Scratch
                    </motion.p>
                    <motion.h3
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
                    >
                        Rebuilding the standard library as a learning system.
                    </motion.h3>
                </div>

                <div className="grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-3 md:grid-cols-6 md:grid-flow-dense">
                    {artifacts.map((artifact, idx) => (
                        <motion.article
                            key={artifact.name}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className={`${artifact.className} group flex min-h-[13rem] flex-col justify-between overflow-hidden border border-[var(--border-light)] bg-[var(--bg-panel)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-info)] hover:bg-[var(--bg-panel-hover)]`}
                        >
                            <div>
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
                                        {artifact.kind}
                                    </p>
                                    <span className={`font-mono text-[0.6rem] uppercase tracking-[0.16em] ${artifact.public ? 'text-[var(--accent-info)]' : 'text-[var(--accent-danger)]'}`}>
                                        {artifact.public ? 'public' : 'locked'}
                                    </span>
                                </div>
                                <h4 className="mb-4 font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
                                    {artifact.name}
                                </h4>
                                <p className="max-w-xl font-sans text-sm leading-7 text-[var(--text-secondary)]">
                                    {artifact.statement}
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-2">
                                {artifact.tech.map((tech) => (
                                    <span key={tech} className="border border-[var(--border-light)] px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                        {tech}
                                    </span>
                                ))}
                                {artifact.public && (
                                    <a
                                        href={artifact.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-auto font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-info)]"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
