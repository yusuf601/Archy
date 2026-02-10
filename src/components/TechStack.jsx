import React from 'react';

const TechStack = () => {
    const includes = [
        { lib: 'iostream', comment: 'C++ Expert' },
        { lib: 'pandas', comment: 'Python & Data Science' },
        { lib: 'react', comment: 'Frontend' },
        { lib: 'linux/module.h', comment: 'Kernel/Systems' },
    ];

    return (
        <section id="tech-stack" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="border border-everblush-blue/30 rounded-lg p-6 sm:p-8 md:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Headline */}
                    <h2 className="text-xl sm:text-2xl font-mono syntax-comment mb-6">
            // Dependencies & Libraries
                    </h2>

                    {/* Include statements */}
                    <div className="space-y-3">
                        {includes.map((item, index) => (
                            <div
                                key={index}
                                className="font-mono text-sm sm:text-base p-3 rounded
                         border border-transparent hover:border-everblush-green/50
                         hover:bg-everblush-green/5 hover:shadow-lg hover:shadow-everblush-green/20
                         transition-all duration-300 cursor-pointer"
                            >
                                <span className="syntax-keyword">#include</span>
                                <span className="text-everblush-fg"> &lt;</span>
                                <span className="text-everblush-blue">{item.lib}</span>
                                <span className="text-everblush-fg">&gt;</span>
                                <span className="syntax-comment ml-4">// {item.comment}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
