import React from 'react';

const RecentActivity = () => {
    const commits = [
        { hash: 'a8f1c2d', label: 'HEAD', message: 'Optimizing Fuzzy C-Means algorithm' },
        { hash: '4b2a1c0', label: null, message: 'Started research on AI Code Stylometry' },
        { hash: '9d8e7f1', label: null, message: 'Initial commit: Portfolio v1.0' },
    ];

    return (
        <section id="activity" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="border border-everblush-red/30 rounded-lg p-6 sm:p-8 md:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Git log headline */}
                    <h2 className="text-xl sm:text-2xl font-mono text-everblush-fg mb-6">
                        <span className="syntax-keyword">git</span> log --oneline --graph
                    </h2>

                    {/* Git log entries */}
                    <div className="space-y-4">
                        {commits.map((commit, index) => (
                            <div key={index} className="flex items-start font-mono text-sm sm:text-base">
                                {/* Graph line */}
                                <span className="text-everblush-green mr-3">*</span>

                                {/* Commit hash */}
                                <span className="text-everblush-red font-semibold mr-3">
                                    {commit.hash}
                                </span>

                                {/* Label (HEAD) */}
                                {commit.label && (
                                    <span className="text-everblush-blue mr-2">
                                        ({commit.label})
                                    </span>
                                )}

                                {/* Commit message */}
                                <span className="text-everblush-fg flex-1">
                                    {commit.message}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Vertical line connecting commits */}
                    <div className="ml-[7px] mt-2 mb-2 border-l-2 border-everblush-green/30 h-4"></div>

                    {/* More commits indicator */}
                    <div className="font-mono text-sm text-everblush-fg/50 ml-6">
                        ... (showing recent 3 commits)
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentActivity;
