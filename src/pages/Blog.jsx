import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl w-full">
                <div className="border border-everblush-green/30 rounded-lg p-6 sm:p-8 bg-everblush-bg/50 backdrop-blur-sm">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
                            <span className="syntax-comment">// Blog</span>
                        </h1>
                        <p className="font-mono text-sm sm:text-base text-everblush-fg/70">
                            <span className="syntax-keyword">struct</span> <span className="syntax-function">BlogPost</span> {'{'}
                            <br />
                            <span className="ml-4 text-everblush-fg/60">// Coming soon...</span>
                            <br />
                            <span className="ml-4 text-everblush-fg/60">// Technical articles on AI, Systems Programming, and more</span>
                            <br />
                            {'}'};
                        </p>
                    </div>

                    {/* Placeholder Content */}
                    <div className="space-y-4 font-mono text-sm text-everblush-fg/60">
                        <p className="syntax-comment">
                            // This section is under construction
                        </p>
                        <p className="text-everblush-fg/80">
                            → Future topics: Fuzzy C-Means optimization
                            <br />
                            → AI Code Stylometry research
                            <br />
                            → Linux kernel development insights
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Blog;
