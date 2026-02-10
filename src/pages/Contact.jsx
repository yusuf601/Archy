import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
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
                            <span className="syntax-comment">// Contact</span>
                        </h1>
                        <p className="font-mono text-sm sm:text-base text-everblush-fg/70">
                            <span className="syntax-keyword">void</span> <span className="syntax-function">get_in_touch</span>() {'{'}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4 font-mono text-sm ml-4">
                        <div className="flex items-start gap-3">
                            <span className="text-everblush-green">→</span>
                            <div>
                                <span className="text-everblush-blue">Email:</span>
                                <span className="text-everblush-fg/80 ml-2">muhyusuf@example.com</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-everblush-green">→</span>
                            <div>
                                <span className="text-everblush-blue">GitHub:</span>
                                <span className="text-everblush-fg/80 ml-2">github.com/yusuf</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-everblush-green">→</span>
                            <div>
                                <span className="text-everblush-blue">LinkedIn:</span>
                                <span className="text-everblush-fg/80 ml-2">linkedin.com/in/muhyusuf</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-everblush-green">→</span>
                            <div>
                                <span className="text-everblush-blue">Location:</span>
                                <span className="text-everblush-fg/80 ml-2">Kendari, Indonesia</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 font-mono text-sm text-everblush-fg/70">
                        <p>{'}'}</p>
                        <p className="mt-4 syntax-comment">
                            // Feel free to reach out for collaborations or discussions!
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
