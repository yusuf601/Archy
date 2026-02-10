import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NowPlaying = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bars, setBars] = useState([3, 5, 2, 6, 4, 7, 3, 5]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setBars(bars.map(() => Math.floor(Math.random() * 8) + 1));
            }, 200);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    return (
        <div className="border-t border-everblush-green/30 p-3 bg-everblush-bg/80">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-everblush-green text-xs font-mono font-bold">
                    NOW PLAYING
                </span>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-everblush-green hover:text-everblush-blue transition-colors"
                >
                    <span className="text-xs font-mono">
                        {isPlaying ? '[||]' : '[▶]'}
                    </span>
                </button>
            </div>

            {/* Track Info */}
            <div className="space-y-1 mb-2">
                <div className="text-everblush-fg/80 text-xs font-mono truncate">
                    Track: Lo-fi Coding Beats
                </div>
                <div className="text-everblush-fg/60 text-xs font-mono">
                    {isPlaying ? 'PLAYING' : 'PAUSED'}
                </div>
            </div>

            {/* Visualizer */}
            <div className="flex items-end gap-1 h-8">
                {bars.map((height, index) => (
                    <motion.div
                        key={index}
                        className="flex-1 bg-everblush-green/50 rounded-sm"
                        animate={{
                            height: isPlaying ? `${height * 12.5}%` : '12.5%',
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>

            {/* Progress */}
            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-everblush-fg/60">
                <span>2:34</span>
                <div className="flex-1 h-1 bg-everblush-fg/10 rounded">
                    <div className="h-full w-1/3 bg-everblush-green rounded" />
                </div>
                <span>4:12</span>
            </div>
        </div>
    );
};

export default NowPlaying;
