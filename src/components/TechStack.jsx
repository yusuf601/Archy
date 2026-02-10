import React from 'react';
import ScrollReveal from './ScrollReveal';
import SkillGroup from './SkillGroup';

const TechStack = () => {
    const competitiveProgramming = [
        'C++20', 'STL', 'Algorithms', 'Data Structures', 'Graph Theory', 'Dynamic Programming'
    ];

    const lowLevelSystems = [
        'Linux Kernel', 'CMake', 'GCC/Clang', 'Multithreading', 'Memory Management', 'System Calls'
    ];

    const aiResearch = [
        'Fuzzy Logic', 'Machine Learning', 'Python', 'NumPy', 'Pandas', 'Scikit-learn'
    ];

    return (
        <section id="tech" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-4xl sm:text-5xl font-mono font-bold text-syntax-header mb-4">
                            <span className="syntax-comment">// Dependencies & Libraries</span>
                        </h2>
                        <p className="font-mono text-lg text-syntax-meta leading-relaxed">
                            <span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;expertise.h&gt;</span>
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <SkillGroup
                        title="Competitive Programming"
                        skills={competitiveProgramming}
                        icon="🏆"
                    />
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                    <SkillGroup
                        title="Low-Level Systems"
                        skills={lowLevelSystems}
                        icon="⚙️"
                    />
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                    <SkillGroup
                        title="AI & Research"
                        skills={aiResearch}
                        icon="🧠"
                    />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default TechStack;
