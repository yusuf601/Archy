import React from 'react';

const About = () => {
    const skills = ['C++', 'Python', 'Linux', 'Docker', 'ML'];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-2xl w-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center">
                    <span className="text-[var(--accent-green)] mr-2">&gt;</span> ./about-me
                </h3>

                <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                    <p>
                        I am a Systems Programmer and AI Researcher focusing on creating high-performance computational solutions.
                        My journey began deeply embedded in low-level systems, where I learned the meticulous art of memory management
                        and parallel processing to squeeze out every drop of efficiency.
                    </p>
                    <p>
                        Today, I bridge the gap between heavy computational models and robust software architecture.
                        Whether I'm optimizing algorithms or integrating machine learning into scalable backends,
                        my philosophy remains the same: write clean, efficient, and reliable code that solves real-world problems.
                    </p>
                </div>

                <div className="mt-10">
                    <p className="mb-4 text-sm text-[var(--accent-blue)] font-medium">// core_technologies</p>
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-sm border border-[var(--border-light)] rounded bg-[var(--bg-panel)] text-[var(--text-primary)]"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
