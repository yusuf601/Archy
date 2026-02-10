import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/yusuf601',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/muh-yusuf-7154b7204',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'Email',
            url: 'mailto:yusufmuhyusuh@gmail.com',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

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
                                <span className="syntax-comment">// Contact</span>
                            </h1>
                            <p className="font-mono text-xl text-syntax-meta leading-relaxed">
                                <span className="syntax-keyword">void</span> <span className="syntax-function">get_in_touch</span>() {'{'}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Contact Information */}
                    <ScrollReveal delay={0.2}>
                        <div className="space-y-6 font-mono text-base ml-4 mb-12">
                            <div className="flex items-start gap-4">
                                <span className="text-everblush-green text-xl">→</span>
                                <div>
                                    <span className="text-everblush-blue font-semibold text-lg">Email:</span>
                                    <span className="text-syntax-content ml-3 text-lg">yusufmuhyusuh@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-everblush-green text-xl">→</span>
                                <div>
                                    <span className="text-everblush-blue font-semibold text-lg">GitHub:</span>
                                    <span className="text-syntax-content ml-3 text-lg">github.com/yusuf601</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-everblush-green text-xl">→</span>
                                <div>
                                    <span className="text-everblush-blue font-semibold text-lg">LinkedIn:</span>
                                    <span className="text-syntax-content ml-3 text-lg">linkedin.com/in/muh-yusuf-7154b7204</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-everblush-green text-xl">→</span>
                                <div>
                                    <span className="text-everblush-blue font-semibold text-lg">Location:</span>
                                    <span className="text-syntax-content ml-3 text-lg">Makassar, Indonesia</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Social Links */}
                    <ScrollReveal delay={0.3}>
                        <div className="mb-12">
                            <p className="font-mono text-syntax-meta mb-6 text-lg">
                                <span className="syntax-comment">// Connect with me:</span>
                            </p>
                            <div className="flex gap-6">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-4 bg-everblush-bg/50 border border-everblush-green/20 rounded
                                                 hover:border-everblush-green hover:shadow-glow-green
                                                 text-everblush-fg/70 hover:text-everblush-green
                                                 transition-all duration-300"
                                        title={link.name}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Download Resume CTA */}
                    <ScrollReveal delay={0.4}>
                        <div className="mb-8">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 font-mono text-lg font-semibold
                                         bg-transparent border-2 border-everblush-green 
                                         text-everblush-green hover:bg-everblush-green 
                                         hover:text-everblush-bg transition-all duration-300 
                                         rounded shadow-glow-green hover:shadow-glow-green-lg
                                         inline-flex items-center justify-center gap-3"
                            >
                                <span className="syntax-keyword">wget</span>
                                <span>resume.pdf</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </motion.button>
                        </div>
                    </ScrollReveal>

                    {/* Footer */}
                    <ScrollReveal delay={0.5}>
                        <div className="font-mono text-base text-syntax-meta">
                            <p>{'}'}</p>
                            <p className="mt-6 leading-relaxed">
                                <span className="syntax-comment">
                                    // Feel free to reach out for collaborations, discussions, or just to say hi!
                                </span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
