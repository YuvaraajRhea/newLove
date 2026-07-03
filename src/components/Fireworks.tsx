import { useEffect, useRef } from "react";

const COLORS = [
  "hsl(330, 100%, 65%)",
  "hsl(280, 100%, 70%)",
  "hsl(50, 100%, 65%)",
  "hsl(220, 100%, 70%)",
  "hsl(340, 80%, 75%)",
  "hsl(170, 60%, 65%)",
  "hsl(0, 85%, 60%)",
  "hsl(30, 100%, 60%)",
  "hsl(45, 100%, 85%)",  // gold sparkle
  "hsl(60, 100%, 95%)",  // white sparkle
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
  type: "burst" | "sparkle";
  twinkleSpeed: number;
}

interface Burst {
  x: number;
  y: number;
  particles: Particle[];
  sparkle: number;
}

// Persistent glitter particles
interface Glitter {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleOffset: number;
  twinkleSpeed: number;
  color: string;
  drift: number;
  fallSpeed: number;
}

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef<Burst[]>([]);
  const glittersRef = useRef<Glitter[]>([]);
  const animRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize glitter field
    const GLITTER_COUNT = 60;
    glittersRef.current = Array.from({ length: GLITTER_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2.5,
      alpha: Math.random(),
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      drift: (Math.random() - 0.5) * 0.3,
      fallSpeed: 0.1 + Math.random() * 0.3,
    }));

    const createBurst = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.6 + canvas.height * 0.05;
      const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
      const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 50 + Math.floor(Math.random() * 40); // more particles
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 2 + Math.random() * 4; // faster
        const maxLife = 70 + Math.random() * 50; // longer life
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          color: Math.random() > 0.5 ? color1 : color2,
          size: 1.5 + Math.random() * 2.5,
          trail: [],
          type: "burst",
          twinkleSpeed: 0,
        });
      }

      // Add sparkle/glitter particles that linger
      const sparkleCount = 15 + Math.floor(Math.random() * 15);
      for (let i = 0; i < sparkleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        const maxLife = 100 + Math.random() * 80;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          color: `hsl(${40 + Math.random() * 30}, 100%, ${80 + Math.random() * 15}%)`,
          size: 1 + Math.random() * 1.5,
          trail: [],
          type: "sparkle",
          twinkleSpeed: 0.1 + Math.random() * 0.2,
        });
      }

      burstsRef.current.push({ x, y, particles, sparkle: 20 });
    };

    // More frequent bursts
    const spawnInterval = setInterval(() => {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        setTimeout(createBurst, i * 150);
      }
    }, 1200);

    const animate = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw shimmering glitter background
      glittersRef.current.forEach((g) => {
        const twinkle = Math.sin(frameRef.current * g.twinkleSpeed + g.twinkleOffset);
        const alpha = 0.1 + (twinkle + 1) * 0.35; // 0.1 to 0.8

        // Move glitter slowly downward
        g.y += g.fallSpeed;
        g.x += g.drift + Math.sin(frameRef.current * 0.01 + g.twinkleOffset) * 0.2;
        if (g.y > canvas.height + 5) { g.y = -5; g.x = Math.random() * canvas.width; }
        if (g.x < -5) g.x = canvas.width + 5;
        if (g.x > canvas.width + 5) g.x = -5;

        // Draw star shape for glitter
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = g.color;
        ctx.shadowBlur = 6 + twinkle * 4;
        ctx.shadowColor = g.color;

        // 4-point star
        const s = g.size * (0.8 + twinkle * 0.3);
        ctx.beginPath();
        ctx.moveTo(g.x, g.y - s * 1.5);
        ctx.lineTo(g.x + s * 0.4, g.y - s * 0.4);
        ctx.lineTo(g.x + s * 1.5, g.y);
        ctx.lineTo(g.x + s * 0.4, g.y + s * 0.4);
        ctx.lineTo(g.x, g.y + s * 1.5);
        ctx.lineTo(g.x - s * 0.4, g.y + s * 0.4);
        ctx.lineTo(g.x - s * 1.5, g.y);
        ctx.lineTo(g.x - s * 0.4, g.y - s * 0.4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      // Draw firework bursts
      burstsRef.current.forEach((burst) => {
        if (burst.sparkle > 0) {
          const a = burst.sparkle / 20;
          ctx.beginPath();
          const grad = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, 80 * a);
          grad.addColorStop(0, `hsla(50, 100%, 95%, ${a * 0.7})`);
          grad.addColorStop(0.5, `hsla(330, 100%, 80%, ${a * 0.3})`);
          grad.addColorStop(1, `hsla(50, 100%, 90%, 0)`);
          ctx.fillStyle = grad;
          ctx.arc(burst.x, burst.y, 80, 0, Math.PI * 2);
          ctx.fill();
          burst.sparkle--;
        }

        burst.particles.forEach((p) => {
          if (p.life <= 0) return;

          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > (p.type === "sparkle" ? 3 : 8)) p.trail.shift();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.type === "sparkle" ? 0.01 : 0.03;
          p.vx *= p.type === "sparkle" ? 0.995 : 0.985;
          p.vy *= p.type === "sparkle" ? 0.995 : 0.985;
          p.life--;

          const alpha = p.life / p.maxLife;

          if (p.type === "sparkle") {
            // Twinkling sparkle
            const twinkle = Math.sin(frameRef.current * p.twinkleSpeed) * 0.5 + 0.5;
            ctx.save();
            ctx.globalAlpha = alpha * twinkle;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;

            const s = p.size * (0.6 + twinkle * 0.6);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - s * 2);
            ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3);
            ctx.lineTo(p.x + s * 2, p.y);
            ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3);
            ctx.lineTo(p.x, p.y + s * 2);
            ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3);
            ctx.lineTo(p.x - s * 2, p.y);
            ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          } else {
            // Burst particle with trail
            if (p.trail.length > 1) {
              ctx.beginPath();
              ctx.moveTo(p.trail[0].x, p.trail[0].y);
              p.trail.forEach((t) => ctx.lineTo(t.x, t.y));
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = p.color.replace(")", `, ${alpha * 0.35})`).replace("hsl(", "hsla(");
              ctx.lineWidth = p.size * 0.6;
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(")", `, ${alpha})`).replace("hsl(", "hsla(");
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });

      burstsRef.current = burstsRef.current.filter(
        (b) => b.particles.some((p) => p.life > 0)
      );

      animRef.current = requestAnimationFrame(animate);
    };

    createBurst();
    setTimeout(createBurst, 200);
    setTimeout(createBurst, 500);
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default Fireworks;
