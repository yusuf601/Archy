import React, { useState, useEffect, useRef } from 'react';

const COMPILERS = ['g++', 'clang++', 'zig cc'];
const SECTION_FILES = {
    home: 'main.cpp',
    about: 'about.cpp',
    projects: 'projects.cpp',
    contact: 'contact.cpp',
};
const FLAGS = ['-O2 -std=c++20', '-O3 -std=c++20', '-Wall -Wextra', '-O2 -std=c++17'];
const BUILD_STATUSES = [
    { label: '✓ compiled', color: 'var(--accent-success)' },
    { label: '● linking', color: 'var(--accent-warning)' },
    { label: '✓ compiled', color: 'var(--accent-success)' },
];

function useNow() {
    const [time, setTime] = useState(() => {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    });
    useEffect(() => {
        const id = setInterval(() => {
            const d = new Date();
            setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
        }, 10000);
        return () => clearInterval(id);
    }, []);
    return time;
}

const CppStatusBar = () => {
    const [compilerIdx, setCompilerIdx] = useState(0);
    const [flagIdx, setFlagIdx] = useState(0);
    const [statusIdx, setStatusIdx] = useState(0);
    const [buildMs, setBuildMs] = useState(42);
    const [lineNum, setLineNum] = useState(1);
    const [section, setSection] = useState('home');
    const [gitBranch] = useState('main');
    const now = useNow();

    // Compiler rotation every 5s
    useEffect(() => {
        const id = setInterval(() => {
            setCompilerIdx(i => (i + 1) % COMPILERS.length);
            setFlagIdx(i => (i + 1) % FLAGS.length);
            setStatusIdx(i => (i + 1) % BUILD_STATUSES.length);
            setBuildMs(Math.floor(Math.random() * 60) + 20);
        }, 5000);
        return () => clearInterval(id);
    }, []);

    // Track scroll position → update LN and current section
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const approxLine = Math.floor((scrollY / Math.max(docH, 1)) * 450) + 1;
            setLineNum(approxLine);

            // Detect which section is in view
            const sectionIds = ['contact', 'projects', 'about', 'home'];
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
                    setSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cycleCompiler = () => setCompilerIdx(i => (i + 1) % COMPILERS.length);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentStatus = BUILD_STATUSES[statusIdx];
    const filename = SECTION_FILES[section] || 'main.cpp';

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 font-mono select-none"
            style={{
                background: 'color-mix(in srgb, var(--bg-panel) 97%, transparent)',
                borderTop: '1px solid var(--border-light)',
                backdropFilter: 'blur(8px)',
            }}
        >
            {/* Desktop */}
            <div className="hidden sm:flex max-w-full px-4 py-1.5 items-center justify-between text-xs gap-4 overflow-hidden">
                {/* Left */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={cycleCompiler}
                        title="Click to cycle compiler"
                        className="transition-opacity hover:opacity-75"
                        style={{ color: 'var(--accent-info)' }}
                    >
                        [{COMPILERS[compilerIdx]}]
                    </button>
                    <button
                        onClick={scrollToTop}
                        title="Scroll to top"
                        className="transition-opacity hover:opacity-75"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {filename}
                    </button>
                    <span style={{ color: 'var(--text-secondary)' }}>{FLAGS[flagIdx]}</span>
                </div>

                {/* Center */}
                <div className="flex items-center gap-4">
                    <span
                        title={`Last build: ${buildMs}ms`}
                        style={{ color: currentStatus.color }}
                        className="transition-colors duration-700"
                    >
                        {currentStatus.label}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {buildMs}ms
                    </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 shrink-0">
                    <span style={{ color: 'var(--accent-warning)' }}>
                        LN:{String(lineNum).padStart(3, '0')} COL:1
                    </span>
                    <span style={{ color: 'var(--accent-info)' }}>
                        [{gitBranch} +0~2]
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{now}</span>
                </div>
            </div>

            {/* Mobile — collapsed */}
            <div className="flex sm:hidden px-3 py-1.5 items-center justify-between text-xs gap-2">
                <button onClick={cycleCompiler} style={{ color: 'var(--accent-info)' }}>
                    [{COMPILERS[compilerIdx]}]
                </button>
                <button onClick={scrollToTop} style={{ color: 'var(--text-primary)' }}>
                    {filename}
                </button>
                <span style={{ color: currentStatus.color }}>{currentStatus.label}</span>
                <span style={{ color: 'var(--accent-warning)' }}>{lineNum}:1</span>
                <span style={{ color: 'var(--accent-info)' }}>[{gitBranch}]</span>
            </div>
        </div>
    );
};

export default CppStatusBar;
