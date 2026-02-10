import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const Hero = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="home"
            className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl w-full">
                {/* Code Block Container */}
                <div className="border border-everblush-green/30 rounded-lg p-6 sm:p-8 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Main Headline - C++ Style with Typewriter */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-2">
                            <span className="syntax-function">std</span>
                            <span className="text-everblush-fg">::</span>
                            <span className="syntax-function">cout</span>
                            <span className="text-everblush-fg"> &lt;&lt; </span>
                            <TypewriterText
                                text={`"Hi, I'm Muh Yusuf";`}
                                speed={80}
                                className="syntax-string"
                            />
                        </h1>
                    </div>

                    {/* Comment Block - Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="mb-8 space-y-2 text-sm sm:text-base md:text-lg font-mono"
                    >
                        <p className="syntax-comment">// Informatics Student (Sem 4)</p>
                        <p className="syntax-comment">// Focus: Low-level Systems, C++, & AI Research</p>
                        <p className="syntax-comment">// Distro: CachyOS</p>
                    </motion.div>

                    {/* Call to Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                    >
                        {/* Primary Button - Solid */}
                        <button className="px-6 py-3 font-mono text-sm sm:text-base
                                     bg-transparent border-2 border-everblush-green 
                                     text-everblush-green hover:bg-everblush-green 
                                     hover:text-everblush-bg transition-all duration-300 
                                     rounded flex items-center justify-center gap-2 text-glow-green">
                            <span className="syntax-keyword">sh</span>
                            <span>view_work.sh</span>
                        </button>

                        {/* Secondary Button - Ghost */}
                        <button className="px-6 py-3 font-mono text-sm sm:text-base
                                     bg-transparent border-2 border-everblush-blue/50 
                                     text-everblush-blue hover:border-everblush-blue 
                                     hover:bg-everblush-blue/10 transition-all duration-300 
                                     rounded flex items-center justify-center gap-2">
                            <span className="syntax-keyword">git</span>
                            <span>status</span>
                        </button>
                    </motion.div>

                    {/* Additional Code-like Element */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className="mt-12 pt-6 border-t border-everblush-green/20"
                    >
                        <p className="font-mono text-xs sm:text-sm text-everblush-fg/60">
                            <span className="syntax-comment">// Currently exploring:</span>
                            <br />
                            <span className="text-everblush-fg/80">
                                → Fuzzy Clustering Algorithms
                                <br />
                                → Systems Programming with C++
                                <br />
                                → Linux Kernel Development
                            </span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
