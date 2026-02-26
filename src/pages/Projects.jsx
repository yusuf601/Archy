import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const Projects = () => {
    const projects = [
        {
            name: "parallel-fcm",
            desc: "A high-performance parallel implementation of Fuzzy C-Means clustering using C++ and OpenMP.",
            github: "https://github.com/yusuf601/parallel-fcm",
            tech: ["C++", "OpenMP", "Algorithms"]
        },
        {
            name: "malware-analyzer",
            desc: "Static and dynamic analysis tool for Linux executables (ELF parsing).",
            github: "https://github.com/yusuf601/malware-analyzer",
            tech: ["C++", "Linux API", "Security"]
        },
        {
            name: "kernel-module-x",
            desc: "A custom Linux kernel module for monitoring system calls and deep process introspection.",
            github: "#",
            tech: ["C", "Linux Kernel"]
        },
        {
            name: "ml-inference-engine",
            desc: "Lightweight forward-pass inference engine written from scratch without heavy frameworks.",
            github: "https://github.com/yusuf601/ml-inference-engine",
            tech: ["Python", "C++", "CUDA"]
        }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl w-full">
                <motion.h3
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold text-[var(--text-primary)] mb-10 flex items-center"
                >
                    <span className="text-[var(--accent-blue)] mr-2">&gt;</span> ./projects
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-6 border border-[var(--border-light)] rounded-lg bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-hover)] transition-colors flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-[var(--text-primary)] font-bold">{project.name}</h4>
                                {project.github !== '#' && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent-green)] hover:underline text-xs"
                                    >
                                        github ↗
                                    </a>
                                )}
                            </div>

                            <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map(t => (
                                    <span key={t} className="text-xs text-[var(--accent-blue)]">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
