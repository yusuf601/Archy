import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    const messages = [
        'std::cout << "Segmentation fault (core dumped) - Just kidding!" << std::endl;',
        'std::cout << "Iterative > Recursive. Always." << std::endl;',
        'std::cout << "g++ -O3 -std=c++20 main.cpp..." << std::endl;\nstd::cout << "Optimizing memory layout..." << std::endl;',
        'std::cout << "Implementing custom STL containers..." << std::endl;',
        'std::cout << "Manual memory management is an art" << std::endl;',
        'std::cout << "King Yusuf is Here" << std::endl;'
    ];

    const [messageIndex, setMessageIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [phase, setPhase] = useState('typing'); // 'typing', 'pausing', 'fading_out'
    const [copied, setCopied] = useState(false);

    const currentText = messages[messageIndex];

    // Typing and rotation effect
    useEffect(() => {
        let timeout;

        if (phase === 'typing') {
            if (textIndex < currentText.length) {
                timeout = setTimeout(() => {
                    setTextIndex(prev => prev + 1);
                }, 50); // 50ms per character
            } else {
                setPhase('pausing');
            }
        } else if (phase === 'pausing') {
            timeout = setTimeout(() => {
                setPhase('fading_out');
            }, 3000); // 3 seconds pause before fade out
        } else if (phase === 'fading_out') {
            timeout = setTimeout(() => {
                setMessageIndex(prev => (prev + 1) % messages.length);
                setTextIndex(0);
                setPhase('typing');
            }, 500); // 0.5s fade out duration
        }

        return () => clearTimeout(timeout);
    }, [phase, textIndex, currentText.length, messages.length]);

    const handleCopy = () => {
        navigator.clipboard.writeText(currentText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Syntax highlighting rendering
    const renderCode = () => {
        const lines = currentText.split('\n');
        let charsAllowed = textIndex;

        return lines.map((line, lineIdx) => {
            if (lineIdx > 0) charsAllowed--; // Account for the newline character

            // Tokenize the full line to ensure colors are applied even while typing
            const tokens = line.split(/(std::cout|std::endl)/g).filter(Boolean);

            return (
                <div key={lineIdx} className={`flex items-start w-full ${lineIdx > 0 ? "mt-1" : ""}`}>
                    <span className="text-[var(--text-secondary)] w-6 shrink-0 select-none mr-4">{lineIdx + 1}</span>
                    <div className="flex-1 text-left break-all sm:break-normal whitespace-pre-wrap">
                        {tokens.map((token, i) => {
                            if (charsAllowed <= 0) return null;

                            const toShow = token.substring(0, charsAllowed);
                            charsAllowed -= token.length;

                            let colorStyle = { color: '#ABB2BF' }; // Gray for strings and operators
                            if (token === 'std::cout' || token === 'std::endl') {
                                colorStyle = { color: '#61AFEF' }; // Blue for keywords
                            }

                            return <span key={i} style={colorStyle}>{toShow}</span>;
                        })}
                        {lineIdx === lines.length - 1 && (
                            <span className="inline-block w-[0.5em] h-[1em] bg-[var(--text-secondary)] ml-1 animate-[blink_1s_step-end_infinite] align-middle"></span>
                        )}
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="min-h-screen flex items-center justify-center -mt-14 pt-20 px-6">
            <div className="max-w-3xl w-full flex flex-col items-center md:items-start text-center md:text-left">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4 text-[var(--text-primary)] relative"
                >
                    YUSUF
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg sm:text-xl font-medium text-[var(--accent-blue)] mb-8 tracking-wide"
                >
                    C++ | Systems | ML Researcher
                </motion.h2>

                {/* Animated C++ Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 relative group cursor-pointer w-full max-w-2xl mx-auto md:mx-0"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                >
                    <div className="bg-transparent rounded py-5 font-mono text-sm sm:text-base md:text-[1.1rem] min-h-[6rem] flex flex-col justify-center">
                        <div className={`w-full transition-opacity duration-500 ${phase === 'fading_out' ? 'opacity-0' : 'opacity-100'}`}>
                            {renderCode()}
                        </div>
                    </div>
                    {/* Copied tooltip */}
                    {copied && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--accent-green)] text-[var(--bg-body)] text-xs font-bold px-2 py-1 rounded">
                            Copied!
                        </div>
                    )}
                </motion.div>

                <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    href="https://github.com/yusuf601"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b border-[var(--text-secondary)] hover:border-[var(--text-primary)] pb-0.5 transition-colors"
                >
                    github.com/yusuf601
                </motion.a>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[var(--text-secondary)]"
                >
                    <span className="text-xs mb-2">scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--text-secondary)] to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
