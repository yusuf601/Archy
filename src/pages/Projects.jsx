import React from 'react';
import { motion } from 'framer-motion';
import MotionText, { metadataItem } from '../components/MotionText';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const metadataHoverItem = {
    ...metadataItem,
    visible: {
        ...metadataItem.visible,
        opacity: 0.72,
    },
    hover: {
        opacity: 1,
        transition: { duration: 0.2 },
    },
};

const Projects = () => {
    const artifacts = [
        {
            name: 'SVector',
            kind: 'container rebuild',
            statement: 'A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory',
            github: 'https://github.com/Build-X-From-Scratch/SVector',
            tech: ['C++20', 'Allocator', 'STL'],
            public: true,
        },
        {
            name: 'forward_list_scratch',
            kind: 'linked primitive',
            statement: 'A forward-list implementation focused on splice, merge, sort, node ownership, and the real cost of pointer-shaped abstractions',
            github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
            tech: ['C++20', 'Nodes', 'Algorithms'],
            public: true,
        },
        {
            name: 'Stack / Queue',
            kind: 'linear adapters',
            statement: 'Small primitives rebuilt to expose the tradeoffs behind interface simplicity',
            github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
            tech: ['Adapters', 'Buffer'],
            public: true,
        },
        {
            name: 'Trees / Algorithms',
            kind: 'algorithmic internals',
            statement: 'Traversal, insertion, sorting, search, and the pieces hidden behind standard headers',
            github: '#',
            tech: ['Trees', 'Sort', 'Search'],
            public: false,
        },
        {
            name: 'Research Notes',
            kind: 'systems to ML',
            statement: 'Academic and experimental notes connecting implementation details to computational models',
            github: 'https://github.com/yusuf601/my-paper',
            tech: ['Research', 'ML'],
            public: true,
        },
    ];
    const featuredArtifact = artifacts.find((artifact) => artifact.name === 'SVector');
    const supportingArtifacts = artifacts.filter((artifact) => artifact.name !== 'SVector');
    const flagshipCues = ['allocator discipline', 'capacity semantics', 'iterator behavior'];

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
                    <MotionText
                        as="h3"
                        segments={['One flagship rebuild,', 'followed by supporting artifacts']}
                        delay={0.05}
                        stagger={0.08}
                        className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
                        itemClassName="block"
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-start">
                    {featuredArtifact && (
                        <motion.article
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4 }}
                            className="group min-h-[24rem] border border-[var(--border-strong)] bg-[var(--bg-panel)] p-6 transition-colors duration-300 hover:border-[var(--accent-info)] hover:bg-[var(--bg-panel-hover)] md:p-8"
                        >
                            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                                <motion.p variants={metadataHoverItem} className="font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                                    {featuredArtifact.kind}
                                </motion.p>
                                <motion.span variants={metadataHoverItem} className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-info)]">
                                    public
                                </motion.span>
                            </div>

                            <motion.h4
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.18 }}
                                className="font-display text-4xl font-black leading-none tracking-tight text-[var(--text-primary)] md:text-6xl"
                            >
                                {featuredArtifact.name}
                            </motion.h4>

                            <p className="mt-6 max-w-2xl font-sans text-base leading-8 text-[var(--text-secondary)]">
                                {featuredArtifact.statement}
                            </p>

                            <div className="mt-8 grid gap-2 sm:grid-cols-3">
                                {flagshipCues.map((cue) => (
                                    <motion.span
                                        key={cue}
                                        variants={metadataHoverItem}
                                        className="border border-[var(--border-light)] px-3 py-2 font-sans text-xs text-[var(--text-secondary)]"
                                    >
                                        {cue}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-2">
                                {featuredArtifact.tech.map((tech) => (
                                    <motion.span
                                        key={tech}
                                        variants={metadataHoverItem}
                                        className="border border-[var(--border-light)] px-2.5 py-1.5 font-mono text-[0.64rem] tracking-[0.06em] text-[var(--text-muted)]"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                                <a
                                    href={featuredArtifact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto inline-flex min-h-10 items-center border border-[var(--accent-info)] px-4 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent-info)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent-info)_8%,transparent)]"
                                >
                                    inspect source
                                </a>
                            </div>
                        </motion.article>
                    )}

                    <div className="border border-[var(--border-light)] bg-[var(--bg-panel)]">
                        {supportingArtifacts.map((artifact, idx) => (
                            <motion.article
                                key={artifact.name}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.35, delay: idx * 0.04 }}
                                className="group border-b border-[var(--border-light)] p-5 last:border-b-0 hover:bg-[var(--bg-panel-hover)]"
                            >
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                                        {artifact.kind}
                                    </p>
                                    <span className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${artifact.public ? 'text-[var(--accent-info)]' : 'text-[var(--text-muted)]'}`}>
                                        {artifact.public ? 'public' : 'locked'}
                                    </span>
                                </div>

                                <h4 className="font-display text-xl font-black tracking-tight text-[var(--text-primary)]">
                                    {artifact.name}
                                </h4>

                                <p className="mt-3 font-sans text-sm leading-7 text-[var(--text-secondary)]">
                                    {artifact.statement}
                                </p>

                                <div className="mt-5 flex flex-wrap items-center gap-2">
                                    {artifact.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="border border-[var(--border-light)] px-2 py-1 font-mono text-[0.68rem] tracking-[0.04em] text-[var(--text-muted)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {artifact.public && (
                                        <a
                                            href={artifact.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-auto text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-info)]"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
