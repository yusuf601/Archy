import React from 'react';
import { motion } from 'framer-motion';
import ContributionHeatmap from '../components/ContributionHeatmap';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const About = () => {
    const skills = ['C++', 'Python', 'Linux', 'Julia', 'Haskell', 'ML'];

    const dossier = [
        { key: 'OS', value: 'Arch Linux' },
        { key: 'Role', value: 'Systems Programmer' },
        { key: 'Focus', value: 'Low-level · ML' },
        { key: 'Loc', value: 'Kendari, ID' },
        { key: 'Study', value: 'Informatics, UHO' },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl w-full flex flex-col md:flex-row md:gap-14">

                {/* ── Main content ── */}
                <div className="flex-1">
                    <motion.h3
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-8 flex items-center gap-3"
                    >
                        <span
                            className="w-[3px] self-stretch rounded"
                            style={{ background: 'var(--accent-green)', opacity: 0.7 }}
                        />
                        ./about-me
                    </motion.h3>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="left-rule space-y-5 text-[var(--text-secondary)] leading-relaxed mb-10"
                    >
                        <p>
                            I am a Systems Programmer and AI Researcher focusing on creating high-performance computational solutions.
                            My journey began deeply embedded in low-level systems, where I learned the meticulous art of memory management
                            and parallel processing to squeeze out every drop of efficiency.
                        </p>
                        <p>
                            Today, I bridge the gap between heavy computational models and robust software architecture.
                            Whether I'm optimizing algorithms or integrating machine learning into scalable backends,
                            my philosophy remains the same: write clean, efficient, and reliable code that solves real-world problems.
                        </p>
                    </motion.div>

                    {/* Stat counters */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-[var(--border-light)] py-6 mb-8"
                    >
                        {[
                            { value: '3+', label: 'Years C++' },
                            { value: '7', label: 'Projects' },
                            { value: '10K+', label: 'Lines written' },
                            { value: '42', label: 'Memory bugs fixed' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                                className="text-center"
                            >
                                <div
                                    className="text-4xl font-black mb-1 pb-1 inline-block"
                                    style={{
                                        color: 'var(--text-primary)',
                                        borderBottom: '1px solid var(--accent-green)',
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-[0.7rem] text-[var(--text-secondary)] tracking-wide mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contribution heatmap */}
                    <ContributionHeatmap />

                    {/* Skills */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <div className="code-block mb-0">
                            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-blue)] mb-3">
                                // core_technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                                        className="px-2.5 py-1 text-sm border border-[var(--border-light)] bg-transparent text-[var(--text-primary)] font-mono"
                                    >
                                        [{skill}]
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Dossier sidebar (desktop only) ── */}
                <motion.aside
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="hidden md:flex flex-col gap-3 w-36 shrink-0 mt-16"
                >
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-1 opacity-60">
                        // sys_info
                    </p>
                    {dossier.map((item) => (
                        <div key={item.key} className="flex flex-col">
                            <span className="text-[0.58rem] uppercase tracking-widest text-[var(--text-secondary)] opacity-50">
                                {item.key}
                            </span>
                            <span className="text-[0.72rem] text-[var(--text-secondary)] font-mono">
                                {item.value}
                            </span>
                        </div>
                    ))}
                    <div className="mt-auto pt-4 border-t border-[var(--border-light)]">
                        <span className="text-[0.6rem] text-[var(--accent-green)] opacity-50 font-mono">
                            status: active
                        </span>
                    </div>
                </motion.aside>
            </div>
        </section>
    );
};

export default About;
