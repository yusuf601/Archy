import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
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
        },
        {
            name: "forward_list_scratch",
            desc: "Singly linked forward list implementation replicating std::forward_list with push, pop, merge, sort, and splice.",
            github: "https://github.com/Build-X-From-Scratch/forward_list_sratch",
            tech: ["C++", "Linked List", "STL"],
            private: false,
        },
        {
            name: "Stack_Scratch",
            desc: "Stack data structure implemented from scratch over a custom dynamic array, matching std::stack interface.",
            github: "https://github.com/Build-X-From-Scratch/Stack_Scratch",
            tech: ["C++", "Stack", "STL"],
            private: false,
        },
        {
            name: "Queue_Scratch",
            desc: "FIFO queue built from scratch — circular buffer internals, iterator support, STL-compatible interface.",
            github: "https://github.com/Build-X-From-Scratch/Queue-Sratch",
            tech: ["C++", "Queue", "STL"],
            private: false,
        },
        {
            name: "supreme-chainsaw",
            desc: "Binary tree library with traversal algorithms, node insertion/deletion, and tree property queries.",
            github: "#",
            tech: ["C++", "Trees", "Algorithms"],
            private: true,
        },
        {
            name: "algo-stl",
            desc: "Algorithms library built from scratch — reimplementing std::algorithm with sort, binary_search, transform, reduce, and more.",
            github: "#",
            tech: ["C++", "Algorithms", "STL"],
            private: true,
        },
        {
            name: "my-paper",
            desc: "Research papers and academic work — explorations in systems programming, ML theory, and computational methods.",
            github: "https://github.com/yusuf601/my-paper",
            tech: ["Research", "ML", "Systems"],
            private: false,
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
                    className="text-xl font-bold text-[var(--text-primary)] mb-2 flex items-center"
                >
                    <span className="text-[var(--accent-blue)] mr-2">&gt;</span> ./projects
                </motion.h3>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="text-xs text-[var(--text-secondary)] mb-10"
                >
                    // Build X From Scratch — everything hand-crafted in C++
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="p-6 border border-[var(--border-light)] rounded-lg bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-hover)] transition-colors flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[var(--text-primary)] font-bold">{project.name}</h4>
                                    {project.private && (
                                        <span className="text-[0.65rem] px-1.5 py-0.5 border border-[var(--border-light)] rounded text-[var(--text-secondary)]">
                                            private
                                        </span>
                                    )}
                                </div>
                                {!project.private && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent-green)] hover:underline text-xs shrink-0"
                                    >
                                        github ↗
                                    </a>
                                )}
                            </div>

                            <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow leading-relaxed">
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
