import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
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
                            <span className="syntax-comment">// Projects</span>
                        </h1>
                        <p className="font-mono text-sm sm:text-base text-everblush-fg/70">
                            <span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;portfolio.h&gt;</span>
                        </p>
                    </div>

                    {/* Placeholder Content */}
                    <div className="space-y-6 font-mono text-sm">
                        <div className="border-l-2 border-everblush-blue/50 pl-4">
                            <p className="syntax-comment">// Project showcase coming soon</p>
                            <p className="text-everblush-fg/80 mt-2">
                                <span className="syntax-keyword">class</span> <span className="syntax-function">Project</span> {'{'}
                                <br />
                                <span className="ml-4 text-everblush-fg/60">std::string name;</span>
                                <br />
                                <span className="ml-4 text-everblush-fg/60">std::string description;</span>
                                <br />
                                <span className="ml-4 text-everblush-fg/60">std::vector&lt;std::string&gt; tech_stack;</span>
                                <br />
                                {'}'};
                            </p>
                        </div>

                        <div className="text-everblush-fg/60">
                            <p className="syntax-comment">// Featured projects:</p>
                            <p className="mt-2">→ Fuzzy C-Means Clustering Implementation</p>
                            <p>→ AI Code Stylometry Research</p>
                            <p>→ Systems Programming Utilities</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
