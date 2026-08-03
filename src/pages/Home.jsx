import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GitHubStatsStrip from '../components/GitHubStatsStrip';

const Home = () => {
    const messages = [
        'std::cout << "Segmentation fault (core dumped) - Just kidding!" << std::endl;',
        'std::cout << "Iterative > Recursive. Always." << std::endl;',
        'std::cout << "g++ -O3 -std=c++20 main.cpp..." << std::endl;',
        'std::cout << "Implementing custom STL containers..." << std::endl;',
        'std::cout << "Manual memory management is an art" << std::endl;',
        'std::cout << "King Yusuf is Here" << std::endl;'
    ];

    const [messageIndex, setMessageIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [phase, setPhase] = useState('typing');
    const [copied, setCopied] = useState(false);

    const currentText = messages[messageIndex];

    useEffect(() => {
        let timeout;
        if (phase === 'typing') {
            if (textIndex < currentText.length) {
                timeout = setTimeout(() => setTextIndex(prev => prev + 1), 50);
            } else {
                setPhase('pausing');
            }
        } else if (phase === 'pausing') {
            timeout = setTimeout(() => setPhase('fading_out'), 3000);
        } else if (phase === 'fading_out') {
            timeout = setTimeout(() => {
                setMessageIndex(prev => (prev + 1) % messages.length);
                setTextIndex(0);
                setPhase('typing');
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [phase, textIndex, currentText.length, messages.length]);

    const handleCopy = () => {
        navigator.clipboard.writeText(currentText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderCode = () => {
        const lines = currentText.split('\n');
        let charsAllowed = textIndex;

        return lines.map((line, lineIdx) => {
            if (lineIdx > 0) charsAllowed--;
            const tokens = line.split(/("[^"]*"|std|cout|endl|::)/g).filter(Boolean);

            return (
                <div key={lineIdx} className={`flex items-start w-full ${lineIdx > 0 ? 'mt-1' : ''}`}>
                    <span className="text-[var(--text-secondary)] w-6 shrink-0 select-none mr-4 opacity-40">
                        {lineIdx + 1}
                    </span>
                    <div className="flex-1 text-left break-all sm:break-normal whitespace-pre-wrap">
                        {tokens.map((token, i) => {
                            if (charsAllowed <= 0) return null;
                            const toShow = token.substring(0, charsAllowed);
                            charsAllowed -= token.length;
                            let colorStyle = { color: 'var(--text-secondary)' };
                            if (token === 'cout' || token === 'endl') {
                                colorStyle = { color: 'var(--accent-info)' };
                            } else if (token.startsWith('"') && token.endsWith('"')) {
                                colorStyle = { color: 'var(--syntax-string)' };
                            } else if (token === '::') {
                                colorStyle = { color: 'var(--text-muted)' };
                            }
                            return <span key={i} style={colorStyle}>{toShow}</span>;
                        })}
                        {lineIdx === lines.length - 1 && (
                            <span className="inline-block w-[0.5em] h-[1em] bg-[var(--text-secondary)] ml-1 animate-[blink_1s_step-end_infinite] align-middle opacity-70" />
                        )}
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28">
            <div className="mx-auto w-full max-w-6xl">
                <div className="relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
                    >
                        C++ systems programmer / research-minded builder
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="font-display max-w-6xl text-[clamp(3rem,6vw,5.8rem)] font-black leading-[0.92] tracking-tight text-[var(--text-primary)]"
                    >
                        Building systems from scratch, close to the metal.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.18 }}
                        className="mt-7 max-w-2xl font-sans text-base leading-8 text-[var(--text-secondary)] md:text-lg"
                    >
                        I rebuild core abstractions in C++, study computational systems, and turn low-level details into working artifacts.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.26 }}
                        className="mt-9 flex flex-col gap-3 sm:flex-row"
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center border border-[var(--accent-info)] bg-[var(--accent-info)] px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--bg-terminal)] transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            View build artifacts
                        </a>
                        <button
                            type="button"
                            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', ctrlKey: true }))}
                            className="inline-flex items-center justify-center border border-[var(--border-strong)] px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-warning)] hover:text-[var(--accent-warning)]"
                        >
                            Open terminal
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.34 }}
                        className="mt-8"
                    >
                        <GitHubStatsStrip />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.18 }}
                    className="group relative z-10 mt-14 max-w-2xl border border-[var(--border-strong)] bg-[var(--bg-terminal)] shadow-[0_24px_80px_rgba(0,0,0,0.42)] lg:ml-auto"
                    onClick={handleCopy}
                    title="Click to copy"
                >
                    <div className="flex items-center border-b border-[var(--border-light)] px-4 py-3">
                        <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
                            build artifact
                        </span>
                        <span className="ml-auto font-mono text-[0.62rem] text-[var(--text-muted)]">
                            {copied ? 'copied' : 'click to copy'}
                        </span>
                    </div>

                    <div className="space-y-5 p-5">
                        <div className="grid grid-cols-3 gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            <span>target: stl</span>
                            <span>mode: scratch</span>
                            <span>lang: c++20</span>
                        </div>

                        <div className="min-h-[7rem] border border-[var(--border-light)] bg-[rgba(0,0,0,0.22)] p-4 font-mono text-sm">
                            <div className={`transition-opacity duration-500 ${phase === 'fading_out' ? 'opacity-0' : 'opacity-100'}`}>
                                {renderCode()}
                            </div>
                        </div>

                        <div className="grid gap-2 font-mono text-xs text-[var(--text-secondary)]">
                            <div className="flex justify-between border-t border-[var(--border-light)] pt-3">
                                <span>allocator discipline</span>
                                <span className="text-[var(--accent-info)]">manual</span>
                            </div>
                            <div className="flex justify-between">
                                <span>abstraction depth</span>
                                <span className="text-[var(--accent-warning)]">source-level</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
