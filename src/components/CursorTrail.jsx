import { useEffect, useRef } from 'react';

/**
 * CursorTrail — canvas layer that renders fading binary "0"/"1" chars
 * at the cursor position. Desktop-only (skipped on touch devices).
 */
const CHARS = ['0', '1', '>', '_', '#', '$'];
const COLOR = '140, 207, 126'; // everblush-green rgb

const CursorTrail = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only run on pointer devices
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            // Spawn 1-2 particles per move event
            const count = Math.random() > 0.5 ? 2 : 1;
            for (let i = 0; i < count; i++) {
                particles.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 10,
                    y: e.clientY + (Math.random() - 0.5) * 10,
                    char: CHARS[Math.floor(Math.random() * CHARS.length)],
                    alpha: 0.8 + Math.random() * 0.2,
                    size: 9 + Math.floor(Math.random() * 5),
                    vy: -0.4 - Math.random() * 0.6,
                    vx: (Math.random() - 0.5) * 0.4,
                    decay: 0.022 + Math.random() * 0.015,
                });
            }
        };
        window.addEventListener('mousemove', onMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `bold ${12}px "JetBrains Mono", monospace`;

            particles.current = particles.current.filter(p => p.alpha > 0.01);
            for (const p of particles.current) {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = `rgba(${COLOR}, ${p.alpha})`;
                ctx.font = `bold ${p.size}px "JetBrains Mono", monospace`;
                ctx.fillText(p.char, p.x, p.y);
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;
            }
            ctx.globalAlpha = 1;
            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9998]"
            aria-hidden="true"
        />
    );
};

export default CursorTrail;
