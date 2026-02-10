import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const Blog = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center"
        >
            <div className="max-w-4xl mx-auto w-full">
                <div className="border border-everblush-green/30 rounded-lg p-8 sm:p-12 bg-everblush-bg/50 backdrop-blur-sm">
                    {/* Header */}
                    <ScrollReveal>
                        <div className="mb-12">
                            <h1 className="text-5xl sm:text-6xl font-mono font-bold text-syntax-header mb-6">
                                <span className="syntax-comment">// Blog</span>
                            </h1>
                            <p className="font-mono text-xl text-syntax-meta leading-relaxed">
                                <span className="syntax-keyword">struct</span> <span className="syntax-function">BlogPost</span> {'{'}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Placeholder Content */}
                    <ScrollReveal delay={0.2}>
                        <div className="space-y-6 font-mono ml-4 mb-8">
                            <p className="text-syntax-meta text-lg leading-relaxed">
                                <span className="syntax-comment">// Coming soon...</span>
                            </p>
                            <p className="text-syntax-meta text-lg leading-relaxed">
                                <span className="syntax-comment">// Technical articles on AI, Systems Programming, and more</span>
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Future Topics */}
                    <ScrollReveal delay={0.3}>
                        <div className="space-y-4 font-mono text-base ml-4 mb-8">
                            <p className="text-syntax-meta">
                                <span className="syntax-comment">// Planned topics:</span>
                            </p>
                            <div className="space-y-3 text-syntax-content text-lg leading-relaxed">
                                <p className="flex items-start gap-3">
                                    <span className="text-everblush-green">→</span>
                                    <span>Fuzzy C-Means optimization techniques</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-everblush-green">→</span>
                                    <span>AI Code Stylometry research insights</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-everblush-green">→</span>
                                    <span>Linux kernel development deep dives</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-everblush-green">→</span>
                                    <span>Modern C++ best practices</span>
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Footer */}
                    <ScrollReveal delay={0.4}>
                        <div className="font-mono text-base text-syntax-meta">
                            <p>{'}'};'</p>
                            <p className="mt-6 text-lg leading-relaxed">
                                <span className="syntax-comment">
                                    // Stay tuned for in-depth technical content!
                                </span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </motion.div>
    );
};

export default Blog;
