import { useEffect, useRef } from 'react';

/**
 * BackgroundFx — canvas layer rendering very faint, slow-drifting C++ and
 * terminal code tokens. Purely ambient: opacity 3-7%, no interaction.
 * Desktop-only (hidden on touch). Uses requestAnimationFrame.
 */

const CODE_TOKENS = [
    'std::vector<T>', '#include', 'nullptr', 'constexpr',
    'template<class T>', 'auto', 'if __name__', '0x1F', '::iterator',
    'malloc()', 'void*', '>> ', '<< endl', 'fork()', 'mmap()',
    '{0}', '#define', 'chmod 755', 'git push', 'sudo', 'grep -r',
    'ls -la', 'make -j8', '0b1010', '0xFF', 'size_t', 'reinterpret_cast',
    'static_assert', 'cmake ..', './configure', 'seg fault', 'errno',
    '::begin()', '::end()', 'O(log n)', 'O(n²)', 'SIMD', '__builtin_clz',
    'posix_spawn', 'pthread_t', 'std::atomic', 'volatile',
];

const COL = '140, 207, 126'; // everblush green rgb

function randomToken() {
    return CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
}

function spawnParticle(w, h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        text: randomToken(),
        alpha: 0.02 + Math.random() * 0.05,      // 2–7% opacity
        size: 10 + Math.floor(Math.random() * 4), // 10–13px
        vx: (Math.random() - 0.5) * 0.08,        // very slow drift
        vy: -0.05 - Math.random() * 0.1,          // float upward slowly
        life: 1,
        decay: 0.0002 + Math.random() * 0.0003,   // very long life
    };
}

const PARTICLE_COUNT = 60;

const BackgroundFx = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animRef = useRef(null);

    useEffect(() => {
        // Desktop-only
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Seed initial particles spread across the whole canvas
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.current.push(spawnParticle(canvas.width, canvas.height));
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                const a = p.alpha * p.life;

                ctx.globalAlpha = a;
                ctx.fillStyle = `rgb(${COL})`;
                ctx.font = `${p.size}px "JetBrains Mono", monospace`;
                ctx.fillText(p.text, p.x, p.y);

                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                if (p.life <= 0 || p.y < -30) {
                    // Respawn at the bottom edge
                    particles.current[i] = {
                        ...spawnParticle(canvas.width, canvas.height),
                        y: canvas.height + 20,
                    };
                }
            }

            ctx.globalAlpha = 1;
            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        />
    );
};

export default BackgroundFx;
