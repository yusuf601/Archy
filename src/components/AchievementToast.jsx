import React, { useEffect, useState } from 'react';

const AchievementToast = ({ achievement, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Slide in animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto-dismiss after 4 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300); // Wait for slide-out animation
        }, 4000);

        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            onClick={() => {
                setIsVisible(false);
                setTimeout(onDismiss, 300);
            }}
        >
            <div className="bg-everblush-bg-light border border-everblush-green rounded-lg shadow-lg shadow-everblush-green/20 p-4 min-w-[300px] max-w-[400px] cursor-pointer hover:border-everblush-green/80 transition-colors">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">🎉</div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-everblush-green font-bold text-sm">
                                Easter Egg! ({achievement.count}/30)
                            </span>
                            <span className="text-everblush-fg/40 text-xs">
                                Click to dismiss
                            </span>
                        </div>
                        <div className="text-everblush-fg font-semibold mb-1">
                            {achievement.title}
                        </div>
                        <div className="text-everblush-fg/60 text-sm">
                            {achievement.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementToast;
