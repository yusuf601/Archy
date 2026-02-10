import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const projects = [
        {
            title: 'fuzzy_clustering.cpp',
            role: 'Lead Researcher',
            description: 'Optimized Fuzzy C-Means clustering algorithm for large-scale data analysis. Implemented parallel processing techniques to improve performance by 40%.',
            techStack: ['C++', 'OpenMP', 'Python', 'NumPy'],
            githubUrl: 'https://github.com/yusuf601',
            liveUrl: null
        },
        {
            title: 'ai_stylometry.py',
            role: 'Research Assistant',
            description: 'Developed machine learning models for code authorship attribution using stylometric features. Achieved 85% accuracy in identifying coding patterns.',
            techStack: ['Python', 'Scikit-learn', 'Pandas', 'NLP'],
            githubUrl: 'https://github.com/yusuf601',
            liveUrl: null
        },
        {
            title: 'kernel_module.c',
            role: 'Systems Developer',
            description: 'Created custom Linux kernel module for performance monitoring and system optimization. Integrated with existing kernel subsystems.',
            techStack: ['C', 'Linux Kernel', 'Systems Programming'],
            githubUrl: 'https://github.com/yusuf601',
            liveUrl: null
        }
    ];

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
                        <p className="font-mono text-xl text-syntax-meta leading-relaxed">
                            <span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;portfolio.h&gt;</span>
                        </p>
                    </div>
                </ScrollReveal>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {projects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <ProjectCard {...project} />
                        </ScrollReveal>
                    ))}
                </div>

                {/* Download Resume CTA */}
                <ScrollReveal delay={0.4}>
                    <div className="border border-everblush-blue/30 rounded-lg p-8 bg-everblush-bg/50 backdrop-blur-sm text-center">
                        <p className="font-mono text-lg text-syntax-meta mb-6">
                            <span className="syntax-comment">// Want to see more?</span>
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 font-mono text-lg font-semibold
                                     bg-transparent border-2 border-everblush-green 
                                     text-everblush-green hover:bg-everblush-green 
                                     hover:text-everblush-bg transition-all duration-300 
                                     rounded shadow-glow-green hover:shadow-glow-green-lg inline-flex items-center gap-3"
                        >
                            <span className="syntax-keyword">wget</span>
                            <span>resume.pdf</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </motion.button>
                    </div>
                </ScrollReveal>
            </div>
        </motion.div>
    );
};

export default Projects;
