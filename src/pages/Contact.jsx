import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Contact = () => {
    const triggerTerminal = () => {
        const event = new KeyboardEvent('keydown', { key: '`', ctrlKey: true });
        window.dispatchEvent(event);
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-2xl w-full text-center">

                <motion.h3
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-info)] mb-8 flex items-center justify-center gap-2"
                >
                    <span className="text-[var(--text-secondary)]">&gt;</span> ./init_connection.sh
                </motion.h3>

                <motion.h4
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black tracking-tight mb-6"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                    Ping me.<br />
                    <span style={{ color: 'var(--accent-success)' }}>I compile fast.</span>
                </motion.h4>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-[var(--text-secondary)] mb-10 max-w-md mx-auto text-sm leading-relaxed"
                >
                    Systems architecture questions, C++ collaboration, algorithm deep-dives —
                    all packets accepted.
                </motion.p>

                {/* Terminal trigger — primary CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mb-10"
                >
                    <button
                        onClick={triggerTerminal}
                        className="group w-full sm:w-auto border border-[var(--accent-success)] px-8 py-5 text-left font-mono transition-all duration-200 hover:bg-[rgba(67,217,173,0.05)] hover:shadow-[0_0_24px_rgba(67,217,173,0.15)]"
                    >
                        <div className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--accent-success)] opacity-60 mb-1">
                            // primary interface
                        </div>
                        <div className="text-[var(--text-primary)] flex items-center gap-2">
                            <span className="text-[var(--accent-success)]">$</span>
                            <span>open terminal</span>
                            <span className="animate-[blink_1s_step-end_infinite] text-[var(--accent-success)]">_</span>
                        </div>
                        <div className="text-[0.65rem] text-[var(--text-secondary)] mt-2 opacity-50">
                            Press <kbd className="px-1 bg-[var(--bg-panel)] border border-[var(--border-light)]">Ctrl</kbd> + <kbd className="px-1 bg-[var(--bg-panel)] border border-[var(--border-light)]">`</kbd>
                        </div>
                    </button>
                </motion.div>

                {/* Secondary links */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
                >
                    <a
                        href="mailto:yusufmuhyusuh@gmail.com"
                        className="terminal-btn terminal-btn-primary w-full sm:w-auto justify-center"
                    >
                        <span className="text-[var(--accent-success)]">→</span> send_email()
                    </a>
                    <a
                        href="https://linkedin.com/in/yusufxxxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-btn terminal-btn-secondary w-full sm:w-auto justify-center"
                    >
                        <span style={{ color: 'var(--accent-info)' }}>→</span> connect --platform=linkedin
                    </a>
                </motion.div>

                {/* Exit line */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-[0.65rem] text-[var(--text-secondary)] opacity-30 font-mono"
                >
                    exit 0 <span className="opacity-60">// thanks for reading</span>
                </motion.p>
            </div>
        </section>
    );
};

export default Contact;
