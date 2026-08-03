import React, { useState } from 'react';

const Navbar = ({ onTerminalToggle, terminalOpen }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = () => setMobileOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border-light)]"
            style={{ background: 'var(--bg-navbar)', backdropFilter: 'blur(8px)' }}
        >
            <div className="w-full px-6 h-12 flex items-center">
                {/* Brand — always far left */}
                <a
                    href="#home"
                    className="shrink-0 flex flex-col justify-center"
                    onClick={handleNavClick}
                >
                    <span className="block text-[0.72rem] font-black tracking-[0.2em] text-[var(--text-primary)] leading-none">
                        YUSUF
                    </span>
                    <span className="hidden sm:block mt-1 text-[0.55rem] tracking-[0.22em] text-[var(--accent-info)] leading-none">
                        BUILD-X-FROM-SCRATCH
                    </span>
                </a>

                {/* Desktop nav — pushed to far right via ml-auto */}
                <div className="hidden md:flex items-center gap-7 ml-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={onTerminalToggle}
                        className={`text-[0.68rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${terminalOpen
                                ? 'border-[var(--accent-info)] text-[var(--accent-info)] bg-[color-mix(in_srgb,var(--accent-info)_8%,transparent)]'
                                : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                            }`}
                    >
                        &gt;_ terminal
                    </button>
                </div>

                {/* Mobile — hamburger pushed to far right */}
                <button
                    className="md:hidden ml-auto text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[var(--border-light)]"
                    style={{ background: 'var(--bg-navbar)' }}
                >
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                onClick={handleNavClick}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => { onTerminalToggle(); setMobileOpen(false); }}
                            className={`text-sm text-left transition-colors ${terminalOpen ? 'text-[var(--accent-success)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            &gt;_ terminal
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
