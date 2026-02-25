import React from 'react';

const Navbar = ({ onTerminalToggle, terminalOpen }) => {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-navbar)] border-b border-[var(--border-light)] backdrop-blur-sm bg-opacity-90">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Brand */}
                <a href="#home" className="text-sm font-bold text-[var(--accent-blue)]">
                    yusuf.cpp
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={onTerminalToggle}
                        className={`text-xs px-3 py-1 border rounded transition-colors ${terminalOpen
                                ? 'border-[var(--accent-green)] text-[var(--accent-green)] bg-[var(--accent-green)] bg-opacity-10'
                                : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                            }`}
                    >
                        &gt;_ terminal
                    </button>
                </div>

                {/* Mobile Menu Button - simple for now */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={onTerminalToggle}
                        className="text-xs text-[var(--accent-green)]"
                    >
                        &gt;_
                    </button>
                    <button className="text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
