import React from 'react';
import ScrollReveal from './ScrollReveal';

const RecentActivity = () => {
    const activities = [
        {
            date: '2024-02',
            title: 'Optimized Fuzzy C-Means Algorithm',
            description: 'Improved clustering performance by 40% using parallel processing',
            type: 'research'
        },
        {
            date: '2024-01',
            title: 'Published AI Stylometry Paper',
            description: 'Code authorship attribution using machine learning',
            type: 'publication'
        },
        {
            date: '2023-12',
            title: 'Contributed to Linux Kernel',
            description: 'Performance monitoring module for system optimization',
            type: 'contribution'
        }
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'research':
                return 'text-everblush-green border-everblush-green/30';
            case 'publication':
                return 'text-everblush-blue border-everblush-blue/30';
            case 'contribution':
                return 'text-everblush-red border-everblush-red/30';
            default:
                return 'text-everblush-fg border-everblush-fg/30';
        }
    };

    return (
        <section id="activity" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-4xl sm:text-5xl font-mono font-bold text-syntax-header mb-4">
                            <span className="syntax-comment">// Recent Activity</span>
                        </h2>
                        <p className="font-mono text-lg text-syntax-meta leading-relaxed">
                            <span className="syntax-keyword">git</span> log --oneline --graph
                        </p>
                    </div>
                </ScrollReveal>

                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className={`border ${getTypeColor(activity.type)} rounded-lg p-6 
                                          bg-everblush-bg/50 backdrop-blur-sm hover:shadow-glow-green 
                                          transition-all duration-300 glow-on-hover`}>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-everblush-green font-mono text-sm">
                                                {activity.date}
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-mono rounded border ${getTypeColor(activity.type)}`}>
                                                {activity.type}
                                            </span>
                                        </div>
                                        <h3 className="font-mono text-xl font-bold text-syntax-header mb-2">
                                            {activity.title}
                                        </h3>
                                        <p className="font-mono text-base text-syntax-content leading-relaxed">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentActivity;
