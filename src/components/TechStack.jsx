import React from 'react';
import ScrollReveal from './ScrollReveal';
import SkillGroup from './SkillGroup';

const TechStack = () => {
    const coreSkills = [
        'C++', 'C', 'Python', 'Algorithms', 'Data Structures', 'Linux'
    ];

    const webTools = [
        'React', 'JavaScript', 'Git', 'Neovim', 'Vite', 'Tailwind CSS'
    ];

    const aiResearch = [
        'Fuzzy Logic', 'Machine Learning', 'NumPy', 'Pandas', 'Scikit-learn'
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
                        title="Core Competencies"
                        skills={coreSkills}
                        icon="⚙️"
                    />
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                    <SkillGroup
                        title="Web & Tools"
                        skills={webTools}
                        icon="🛠️"
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
