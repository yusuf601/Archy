import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Projects = () => {
    const projects = [
        {
            name: "SVector",
            desc: "C++ STL std::vector rebuilt from scratch — custom allocator, capacity management, iterators, and full API compatibility.",
            github: "https://github.com/Build-X-From-Scratch/SVector",
            tech: ["C++", "STL", "Data Structures"],
            private: false,
            featured: true,
        },
        {
            name: "forward_list_scratch",
            desc: "Singly linked forward list implementation replicating std::forward_list with push, pop, merge, sort, and splice.",
            github: "https://github.com/Build-X-From-Scratch/forward_list_sratch",
            tech: ["C++", "Linked List", "STL"],
            private: false,
            featured: true,
        },
        {
            name: "Stack_Scratch",
            desc: "Stack data structure implemented from scratch over a custom dynamic array, matching std::stack interface.",
            github: "https://github.com/Build-X-From-Scratch/Stack_Scratch",
            tech: ["C++", "Stack", "STL"],
            private: false,
            featured: false,
        },
        {
            name: "Queue_Scratch",
            desc: "FIFO queue built from scratch — circular buffer internals, iterator support, STL-compatible interface.",
            github: "https://github.com/Build-X-From-Scratch/Queue-Sratch",
            tech: ["C++", "Queue", "STL"],
            private: false,
            featured: false,
        },
        {
            name: "supreme-chainsaw",
            desc: "Binary tree library with traversal algorithms, node insertion/deletion, and tree property queries.",
            github: "#",
            tech: ["C++", "Trees", "Algorithms"],
            private: true,
            featured: false,
        },
        {
            name: "algo-stl",
            desc: "Algorithms library built from scratch — reimplementing std::algorithm with sort, binary_search, transform, reduce, and more.",
            github: "#",
            tech: ["C++", "Algorithms", "STL"],
            private: true,
            featured: false,
        },
        {
            name: "my-paper",
            desc: "Research papers and academic work — explorations in systems programming, ML theory, and computational methods.",
            github: "https://github.com/yusuf601/my-paper",
            tech: ["Research", "ML", "Systems"],
            private: false,
            featured: false,
        }
    ];

    const featured = projects.filter(p => p.featured);
    const secondary = projects.filter(p => !p.featured);

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl w-full">
                <motion.h3
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2 flex items-center gap-3"
                >
                    <span
                        className="w-[3px] self-stretch rounded"
                        style={{ background: 'var(--accent-blue)', opacity: 0.7 }}
                    />
                    ./projects
                </motion.h3>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-blue)] mb-10 ml-5"
                >
                    // Build-X-From-Scratch — hand-crafted in C++
                </motion.p>

                {/* Featured tier */}
                <div className="flex flex-col gap-4 mb-6">
                    {featured.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="p-5 border border-[var(--accent-green)] bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-hover)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:gap-8"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[0.6rem] uppercase tracking-[0.15em] text-[var(--accent-green)] opacity-70">
                                        ≥ featured
                                    </span>
                                </div>
                                <h4 className="text-[var(--text-primary)] font-bold text-lg mb-2">{project.name}</h4>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.desc}</p>
                            </div>
                            <div className="flex flex-col justify-between items-start sm:items-end mt-4 sm:mt-0 sm:w-36 shrink-0">
                                <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-end">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[0.7rem] text-[var(--accent-blue)] font-mono">#{t}</span>
                                    ))}
                                </div>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 text-xs text-[var(--accent-green)] hover:underline font-mono flex items-center gap-1"
                                >
                                    github ↗
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Secondary tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {secondary.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4, delay: 0.2 + idx * 0.06 }}
                            className="p-4 border border-[var(--border-light)] bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-hover)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex flex-col group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[var(--text-primary)] font-bold text-sm">{project.name}</h4>
                                    {project.private && (
                                        <span
                                            className="text-[0.6rem] px-1.5 py-0.5 border font-mono"
                                            style={{
                                                borderColor: 'var(--accent-red)',
                                                color: 'var(--accent-red)',
                                                opacity: 0.8,
                                            }}
                                        >
                                            [locked]
                                        </span>
                                    )}
                                </div>
                                {!project.private && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent-green)] hover:underline text-xs shrink-0 flex items-center gap-1 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        → github
                                    </a>
                                )}
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] mb-4 flex-grow leading-relaxed">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map(t => (
                                    <span key={t} className="text-[0.65rem] text-[var(--accent-blue)] font-mono">#{t}</span>
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
