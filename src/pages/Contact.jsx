import React from 'react';

const Contact = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-2xl w-full text-center">
                <h3 className="text-xl font-bold text-[var(--accent-blue)] mb-6 flex items-center justify-center">
                    <span className="text-[var(--text-primary)] mr-2">&gt;</span> ./contact
                </h3>

                <h4 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-8 tracking-tight">
                    Let's Build Something
                </h4>

                <p className="text-[var(--text-secondary)] mb-12 max-w-lg mx-auto">
                    Whether you have a question about systems architecture, want to collaborate on a C++ project,
                    or just want to talk about algorithms, my inbox is always open.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                    <a
                        href="mailto:yusufmuhyusuh@gmail.com"
                        className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-body)] font-bold rounded hover:bg-[var(--accent-green)] transition-colors w-full sm:w-auto text-center"
                    >
                        Say Hello
                    </a>
                    <a
                        href="https://linkedin.com/in/yusufxxxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-[var(--border-light)] text-[var(--text-primary)] font-bold rounded hover:border-[var(--text-primary)] transition-colors w-full sm:w-auto text-center"
                    >
                        LinkedIn
                    </a>
                </div>

                <div className="pt-10 border-t border-[var(--border-light)]">
                    <p className="text-xs text-[var(--text-secondary)] mb-4">
                        Press <kbd className="px-1.5 py-0.5 bg-[var(--bg-panel)] rounded border border-[var(--border-light)]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-[var(--bg-panel)] rounded border border-[var(--border-light)]">`</kbd> to open terminal
                    </p>
                    <button
                        className="text-xs hover:text-[var(--accent-green)] transition-colors text-[var(--text-secondary)]"
                        onClick={() => {
                            // Dispatch custom event to open terminal from anywhere
                            const event = new KeyboardEvent('keydown', {
                                key: '`',
                                ctrlKey: true
                            });
                            window.dispatchEvent(event);
                        }}
                    >
                        [ force_trigger_terminal() ]
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
