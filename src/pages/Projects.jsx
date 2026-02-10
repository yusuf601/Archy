import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProjectCard from '../components/ProjectCard';
import { projects, getProjectsByCategory } from '../data/projects';

const Projects = () => {
    const stlProjects = getProjectsByCategory('STL Implementation');
    const dsaProjects = getProjectsByCategory('Data Structure');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-16">
                        <h1 className="text-5xl sm:text-6xl font-mono font-bold text-syntax-header mb-6">
                            <span className="syntax-comment">// Projects</span>
                        </h1>
                        <div className="font-mono text-lg text-syntax-meta leading-relaxed space-y-2">
                            <p>
                                <span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;build_from_scratch.h&gt;</span>
                            </p>
                            <p className="text-everblush-fg/70 text-base">
                                // Building X from scratch to understand low-level implementations
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* STL Implementations Section */}
                <ScrollReveal delay={0.1}>
                    <div className="mb-12">
                        <h2 className="text-2xl font-mono font-bold text-everblush-green mb-6 flex items-center gap-3">
                            <span className="syntax-comment">===</span>
                            <span>STL IMPLEMENTATIONS</span>
                            <span className="syntax-comment">===</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stlProjects.map((project, index) => (
                                <ScrollReveal key={project.id} delay={index * 0.1}>
                                    <ProjectCard {...project} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Data Structures Section */}
                <ScrollReveal delay={0.2}>
                    <div className="mb-16">
                        <h2 className="text-2xl font-mono font-bold text-everblush-blue mb-6 flex items-center gap-3">
                            <span className="syntax-comment">===</span>
                            <span>DATA STRUCTURES</span>
                            <span className="syntax-comment">===</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dsaProjects.map((project, index) => (
                                <ScrollReveal key={project.id} delay={index * 0.1}>
                                    <ProjectCard {...project} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* GitHub CTA */}
                <ScrollReveal delay={0.4}>
                    <div className="border border-everblush-blue/30 rounded-lg p-8 bg-everblush-bg/50 backdrop-blur-sm text-center">
                        <p className="font-mono text-lg text-syntax-meta mb-6">
                            <span className="syntax-comment">// Want to see more?</span>
                        </p>
                        <motion.a
                            href="https://github.com/yusuf601"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 font-mono text-lg font-semibold
                                     bg-transparent border-2 border-everblush-green 
                                     text-everblush-green hover:bg-everblush-green 
                                     hover:text-everblush-bg transition-all duration-300 
                                     rounded shadow-glow-green hover:shadow-glow-green-lg inline-flex items-center gap-3"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>Visit GitHub Profile</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </motion.a>
                    </div>
                </ScrollReveal>
            </div>
        </motion.div>
    );
};

export default Projects;
