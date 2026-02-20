import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OverclockMode — activated by the Konami Code (↑↑↓↓←→←→BA).
 * Renders a full-screen matrix-rain canvas for 5 seconds, then fades out.
 */

const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

const OverclockMode = ({ onActivate }) => {
    const sequence = useRef([]);

    useEffect(() => {
        const onKey = (e) => {
            sequence.current.push(e.key);
            if (sequence.current.length > KONAMI.length) {
                sequence.current.shift();
            }
            if (sequence.current.join(',') === KONAMI.join(',')) {
                onActivate();
                sequence.current = [];
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onActivate]);

    return null;
};

/* ─── Matrix Rain Canvas ─────────────────────────────── */
const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アイウエオABCDEF>_#$';

export const MatrixRainOverlay = ({ onDone }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const cols = Math.floor(canvas.width / fontSize);
        const drops = Array(cols).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(35, 42, 45, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#8ccf7e';
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                ctx.fillStyle = drops[i] * fontSize < 30
                    ? '#ffffff'
                    : `rgba(140, 207, 126, ${0.4 + Math.random() * 0.6})`;
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        const timer = setTimeout(() => {
            cancelAnimationFrame(animRef.current);
            onDone();
        }, 5000);

        return () => {
            cancelAnimationFrame(animRef.current);
            clearTimeout(timer);
        };
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <motion.div
                className="relative z-10 text-center font-mono"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                <div className="text-everblush-green text-4xl sm:text-6xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(140,207,126,0.9)]">
                    OVERCLOCK MODE
                </div>
                <div className="text-everblush-green/70 text-sm tracking-[0.5em]">
                    PERFORMANCE BOOST: +∞%
                </div>
                <div className="text-everblush-fg/40 text-xs mt-3 tracking-widest">
                    ↑↑↓↓←→←→BA — nice one.
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OverclockMode;
