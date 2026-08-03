import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Terminal from './components/Terminal';
import CppStatusBar from './components/CppStatusBar';
import SectionDivider from './components/SectionDivider';

function App() {
    const [terminalOpen, setTerminalOpen] = useState(false);

    // Global toggle for terminal via Ctrl+`
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                setTerminalOpen(prev => !prev);
            }
            if (e.key === 'Escape' && terminalOpen) {
                setTerminalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [terminalOpen]);

    const toggleTerminal = () => setTerminalOpen(!terminalOpen);

    return (
        <div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-primary)] font-mono selection:bg-[var(--accent-info)] selection:text-white">
            <Navbar onTerminalToggle={toggleTerminal} terminalOpen={terminalOpen} />

            <main className="flex flex-col pb-8">
                <div id="home"><Home /></div>
                <SectionDivider
                    kicker="systems notes"
                    title="Systems, written close to the metal."
                />
                <div id="about"><About /></div>
                <SectionDivider
                    kicker="build artifacts"
                    title="Repositories shaped like engineering notebooks."
                />
                <div id="projects"><Projects /></div>
                <SectionDivider
                    kicker="interface"
                    title="Start a conversation through the terminal."
                />
                <div id="contact"><Contact /></div>
            </main>

            {/* Terminal Overlay */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${terminalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="h-[50vh] border-t border-[var(--border-light)] shadow-2xl relative bg-[var(--bg-terminal)]">
                    <Terminal isOpen={terminalOpen} onToggle={toggleTerminal} />
                </div>
            </div>

            {/* C++ Compiler Status Bar */}
            <CppStatusBar />
        </div>
    );
}

export default App;
