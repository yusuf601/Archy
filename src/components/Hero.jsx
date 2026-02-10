import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
    const systemFlags = [
        { label: 'UPTIME', value: '21 YEARS' },
        { label: 'LOC', value: 'MAKASSAR' },
        { label: 'STATUS', value: 'COMPILING...' }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="home"
            className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-5xl w-full">
                {/* Code Block Container */}
                <div className="border border-everblush-green/30 rounded-lg p-8 sm:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Avatar & Name Section */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                        {/* Avatar */}
                        <ScrollReveal delay={0.5}>
                            <div className="flex flex-col items-center">
                                <div className="font-mono text-everblush-green text-sm mb-2">
                                    [ USER_AVATAR ]
                                </div>
                                <div className="relative">
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-everblush-green/50 rounded-lg overflow-hidden">
                                        {/* Placeholder - Replace with actual image */}
                                        <div className="w-full h-full bg-everblush-fg/10 flex items-center justify-center avatar-dithered">
                                            <span className="text-6xl">👨‍💻</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-everblush-green text-everblush-bg px-2 py-1 text-xs font-mono font-bold">
                                        [ONLINE]
                                    </div>
                                </div>
                                <div className="font-mono text-everblush-green/50 text-xs mt-2">
                                    [ /home/muhyusuf ]
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Main Headline */}
                        <div className="flex-1">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-4 leading-tight">
                                <span className="syntax-function text-syntax-header">std</span>
                                <span className="text-everblush-fg">::</span>
                                <span className="syntax-function text-syntax-header">cout</span>
                                <span className="text-everblush-fg"> &lt;&lt; </span>
                                <TypewriterText
                                    text={`"Hi, I'm Muh Yusuf";`}
                                    speed={80}
                                    className="syntax-string"
                                />
                            </h1>

                            {/* System Flags */}
                            <ScrollReveal delay={2}>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {systemFlags.map((flag, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 2.5 + index * 0.1 }}
                                            className="system-flag"
                                        >
                                            [ {flag.label}: {flag.value} ]
                                        </motion.div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Comment Block - Description */}
                    <ScrollReveal delay={3}>
                        <div className="mb-10 space-y-3 text-base sm:text-lg md:text-xl font-mono leading-relaxed">
                            <p className="text-syntax-meta">// Informatics Student (Sem 4)</p>
                            <p className="text-syntax-meta">// Focus: Low-level Systems, C++, & AI Research</p>
                            <p className="text-syntax-meta">// Distro: CachyOS</p>
                        </div>
                    </ScrollReveal>

                    {/* Call to Action Buttons */}
                    <ScrollReveal delay={3.5}>
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            {/* Primary Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 font-mono text-base sm:text-lg font-semibold
                                         bg-transparent border-2 border-everblush-green 
                                         text-everblush-green hover:bg-everblush-green 
                                         hover:text-everblush-bg transition-all duration-300 
                                         rounded shadow-glow-green hover:shadow-glow-green-lg"
                            >
                                <span className="syntax-keyword">sh</span>
                                <span className="ml-2">view_work.sh</span>
                            </motion.button>

                            {/* Secondary Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 font-mono text-base sm:text-lg font-semibold
                                         bg-transparent border-2 border-everblush-blue/50 
                                         text-everblush-blue hover:border-everblush-blue 
                                         hover:bg-everblush-blue/10 transition-all duration-300 
                                         rounded hover:shadow-glow-blue"
                            >
                                <span className="syntax-keyword">git</span>
                                <span className="ml-2">status</span>
                            </motion.button>
                        </div>
                    </ScrollReveal>

                    {/* Additional Code-like Element */}
                    <ScrollReveal delay={4}>
                        <div className="mt-16 pt-8 border-t border-everblush-green/20">
                            <p className="font-mono text-sm sm:text-base text-syntax-meta leading-loose">
                                <span className="syntax-comment">// Currently exploring:</span>
                                <br />
                                <span className="text-syntax-content">
                                    → Fuzzy Clustering Algorithms
                                    <br />
                                    → Systems Programming with C++
                                    <br />
                                    → Linux Kernel Development
                                </span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
