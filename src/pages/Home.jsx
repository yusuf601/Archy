import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
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
                    {/* Blinking block cursor */}
                    <span className="inline-block w-[0.5em] h-[0.9em] bg-[var(--accent-green)] ml-4 animate-[blink_1s_step-end_infinite] relative top-[2px]"></span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg sm:text-xl font-medium text-[var(--accent-blue)] mb-8 tracking-wide"
                >
                    C++ | Systems | ML Researcher
                </motion.h2>

                <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
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
