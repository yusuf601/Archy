import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypewriterText from './TypewriterText';
import GlitchText from './GlitchText';

// ── Live uptime hook ─────────────────────────────────────
// Birth date: adjust to the real date if known
const BIRTH_DATE = new Date('2004-02-20T00:00:00+07:00');

const useLiveUptime = () => {
    const [uptime, setUptime] = useState('');

    useEffect(() => {
        const format = () => {
            const now = new Date();
            const diff = now - BIRTH_DATE;
            const totalSec = Math.floor(diff / 1000);
            const secs = totalSec % 60;
            const mins = Math.floor(totalSec / 60) % 60;
            const hours = Math.floor(totalSec / 3600) % 24;
            const days = Math.floor(totalSec / 86400) % 30;
            const months = Math.floor(totalSec / (86400 * 30.44)) % 12;
            const years = Math.floor(totalSec / (86400 * 365.25));
            const pad = (n) => String(n).padStart(2, '0');
            return `${years}Y ${pad(months)}M ${pad(days)}D ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        };
        setUptime(format());
        const id = setInterval(() => setUptime(format()), 1000);
        return () => clearInterval(id);
    }, []);

    return uptime;
};


// Animated counter hook
const useCounter = (target, duration = 1500, startOnView = true) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView && startOnView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration, startOnView]);

    return { count, ref };
};

// Individual stat box
const StatBox = ({ value, label, icon, color = 'text-everblush-green' }) => {
    const { count, ref } = useCounter(value);
    return (
        <div ref={ref} className="flex flex-col items-center border border-everblush-green/20 rounded px-4 py-3 bg-everblush-bg/60 flex-1 min-w-[70px]">
            <span className={`font-mono text-2xl font-bold ${color}`}>{count}+</span>
            <span className="font-mono text-[10px] text-everblush-fg/50 uppercase tracking-widest mt-1">{icon} {label}</span>
        </div>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    const uptime = useLiveUptime();

    const systemFlags = [
        { label: 'UPTIME', value: uptime || '...' },
        { label: 'LOC', value: 'MAKASSAR' },
        { label: 'STATUS', value: 'COMPILING...' }
    ];

    const stats = [
        { value: 6, label: 'Projects', icon: '⚡', color: 'text-everblush-green' },
        { value: 2, label: 'Papers', icon: '📄', color: 'text-everblush-blue' },
        { value: 1, label: 'Contrib', icon: '🔬', color: 'text-everblush-red' },
    ];

    const aboutLines = [
        { comment: true, text: '// Informatics Student (Sem 4)' },
        { comment: false, prefix: '>', text: 'Low-level Systems & C++20' },
        { comment: false, prefix: '>', text: 'AI Research & Fuzzy Logic' },
        { comment: false, prefix: '>', text: 'CachyOS · Neovim · Linux' },
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="home"
            className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 mobile-page-padding py-12"
        >
            <div className="max-w-5xl w-full space-y-6">

                {/* ── TOP HEADLINE ─────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-everblush-green/30 rounded-lg px-6 sm:px-10 py-6 bg-everblush-bg/50 backdrop-blur-sm"
                >
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 mb-4 -mt-1">
                        <span className="w-3 h-3 rounded-full bg-everblush-red/80" />
                        <span className="w-3 h-3 rounded-full bg-everblush-yellow/80" />
                        <span className="w-3 h-3 rounded-full bg-everblush-green/80" />
                        <span className="ml-3 font-mono text-xs text-everblush-fg/30">main.cpp — portfolio</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mono font-bold leading-tight overflow-hidden">
                        <span className="syntax-function text-syntax-header">std</span>
                        <span className="text-everblush-fg">::</span>
                        <span className="syntax-function text-syntax-header">cout</span>
                        <span className="text-everblush-fg"> &lt;&lt; </span>
                        <TypewriterText
                            text={`"Hi, I'm Muh Yusuf";`}
                            speed={75}
                            className="syntax-string"
                        />
                    </h1>

                    {/* System Flags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="flex flex-wrap gap-2 mt-5"
                    >
                        {systemFlags.map((flag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.4 + i * 0.1 }}
                                className="system-flag text-xs sm:text-sm"
                            >
                                [ {flag.label}: {flag.value} ]
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── BENTO ROW ─────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Avatar Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="border border-everblush-green/30 rounded-lg p-6 bg-everblush-bg/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                    >
                        <div className="font-mono text-everblush-green/60 text-xs tracking-widest">
                            [ USER_AVATAR ]
                        </div>
                        <div className="relative">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-everblush-green/50 rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-everblush-fg/10 flex items-center justify-center avatar-dithered">
                                    <span className="text-5xl">👨‍💻</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-everblush-green text-everblush-bg px-2 py-0.5 text-xs font-mono font-bold">
                                [ONLINE]
                            </div>
                        </div>
                        <div className="font-mono text-everblush-green/40 text-xs">
                            [ /home/muhyusuf ]
                        </div>
                    </motion.div>

                    {/* About Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="border border-everblush-green/30 rounded-lg p-6 bg-everblush-bg/50 backdrop-blur-sm flex flex-col justify-between md:col-span-2"
                    >
                        <div>
                            <div className="font-mono text-xs text-everblush-fg/40 mb-4">
                                <span className="text-everblush-green">muhyusuf</span>
                                <span className="text-everblush-fg">@</span>
                                <span className="text-everblush-green">uho</span>
                                <span className="text-everblush-blue"> ~ $</span>
                                <span className="text-everblush-fg/60"> cat about.txt</span>
                            </div>

                            <div className="space-y-2 font-mono text-sm sm:text-base">
                                {aboutLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className={line.comment
                                            ? 'text-everblush-fg/40'
                                            : 'flex items-center gap-2 text-everblush-fg/80'
                                        }
                                    >
                                        {!line.comment && (
                                            <span className="text-everblush-green font-bold">{line.prefix}</span>
                                        )}
                                        <span>{line.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Stat counters */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex gap-3 mt-6"
                        >
                            {stats.map((s, i) => (
                                <StatBox key={i} {...s} />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── CTA BUTTONS ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <motion.button
                        onClick={() => navigate('/projects')}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 sm:flex-none px-8 py-4 font-mono text-base font-semibold
                                 bg-transparent border-2 border-everblush-green
                                 text-everblush-green hover:bg-everblush-green
                                 hover:text-everblush-bg transition-all duration-300
                                 rounded shadow-glow-green hover:shadow-glow-green-lg cursor-pointer"
                        aria-label="View my projects"
                    >
                        <span className="syntax-keyword">sh</span>
                        <span className="ml-2">view_work.sh</span>
                    </motion.button>

                    <motion.button
                        onClick={() => navigate('/contact')}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 sm:flex-none px-8 py-4 font-mono text-base font-semibold
                                 bg-transparent border-2 border-everblush-blue/50
                                 text-everblush-blue hover:border-everblush-blue
                                 hover:bg-everblush-blue/10 transition-all duration-300
                                 rounded hover:shadow-glow-blue cursor-pointer"
                        aria-label="View contact information"
                    >
                        <span className="syntax-keyword">cat</span>
                        <span className="ml-2">contact.cpp</span>
                    </motion.button>

                    {/* CV download quick link */}
                    <motion.a
                        href="/cv.pdf"
                        download
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 sm:flex-none px-8 py-4 font-mono text-base font-semibold
                                 bg-transparent border-2 border-everblush-fg/20
                                 text-everblush-fg/60 hover:border-everblush-fg/50
                                 hover:text-everblush-fg transition-all duration-300
                                 rounded cursor-pointer text-center"
                        aria-label="Download CV"
                    >
                        <span className="syntax-keyword">wget</span>
                        <span className="ml-2">cv.pdf</span>
                    </motion.a>
                </motion.div>

            </div>
        </motion.section>
    );
};

export default Hero;
