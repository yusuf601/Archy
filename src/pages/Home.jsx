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
        <section className="min-h-screen flex items-center justify-center -mt-14 pt-20 px-6 relative">
            <div className="max-w-5xl w-full flex flex-col md:flex-row md:items-center md:gap-16">

                {/* ── Left: Identity ── */}
                <div className="flex-none md:w-[52%] flex flex-col items-start mb-10 md:mb-0">
                    {/* $ whoami breadcrumb */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-6 flex items-center gap-2"
                    >
                        <span style={{ color: 'var(--accent-success)' }}>$</span> whoami
                        <span className="text-[var(--border-light)]">|</span>
                        <span>Systems Programmer</span>
                        <span className="text-[var(--border-light)]">|</span>
                        <span>Kendari</span>
                    </motion.p>

                    {/* Name — display font, wipe-reveal */}
                    <div className="overflow-hidden mb-3">
                        <motion.h1
                            initial={{ y: '102%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[var(--text-primary)]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            YUSUF
                        </motion.h1>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="text-sm font-medium mb-4 tracking-widest uppercase"
                        style={{ color: 'var(--accent-info)' }}
                    >
                        C++ · Systems · ML Researcher
                    </motion.h2>

                    {/* Live GitHub stats strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="mb-6"
                    >
                        <GitHubStatsStrip />
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="flex flex-col gap-1.5"
                    >
                        {[
                            { label: 'github.com/yusuf601', href: 'https://github.com/yusuf601' },
                            { label: 'Build-X-From-Scratch', href: 'https://github.com/Build-X-From-Scratch' },
                            { label: 'yusufmuhyusuh@gmail.com', href: 'mailto:yusufmuhyusuh@gmail.com' },
                        ].map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-success)] transition-colors flex items-center gap-1.5 group"
                            >
                                <span className="text-[var(--accent-dim)] group-hover:text-[var(--accent-success)] transition-colors">→</span>
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* ── Right: Terminal Code Snippet ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="flex-1 terminal-chrome cursor-pointer group relative"
                    onClick={handleCopy}
                    title="Click to copy"
                >
                    {/* Chrome header */}
                    <div className="terminal-chrome-header">
                        <span className="terminal-dot" style={{ background: 'var(--accent-danger)' }} />
                        <span className="terminal-dot" style={{ background: 'var(--accent-warning)' }} />
                        <span className="terminal-dot" style={{ background: 'var(--accent-success)' }} />
                        <span className="text-[0.65rem] text-[var(--text-secondary)] ml-2 tracking-wide opacity-60">
                            main.cpp
                        </span>
                        <span className="ml-auto text-[0.6rem] text-[var(--text-secondary)] opacity-40 group-hover:opacity-80 transition-opacity">
                            {copied ? '✓ copied' : 'click to copy'}
                        </span>
                    </div>

                    {/* Code body */}
                    <div className="p-4 font-mono text-sm sm:text-[0.9rem] min-h-[6rem] flex flex-col justify-center">
                        <div className={`w-full transition-opacity duration-500 ${phase === 'fading_out' ? 'opacity-0' : 'opacity-100'}`}>
                            {renderCode()}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator — blinking ▼ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-secondary)]"
            >
                <span className="text-[0.6rem] tracking-[0.2em] uppercase opacity-50">scroll</span>
                <span
                    className="text-[var(--accent-success)] text-xs animate-[blink_1.4s_step-end_infinite]"
                    style={{ opacity: 0.7 }}
                >
                    ▼
                </span>
            </motion.div>
        </section>
    );
};

export default Home;
