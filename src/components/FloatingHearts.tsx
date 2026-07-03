import { useEffect, useState } from "react";

const HEART_COUNT = 20;

const FloatingHearts = () => {
  const [hearts] = useState(() =>
    Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.3,
      color: ['hsl(330, 100%, 65%)', 'hsl(280, 100%, 70%)', 'hsl(340, 80%, 75%)', 'hsl(300, 70%, 60%)'][Math.floor(Math.random() * 4)],
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            top: "-20px",
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animation: `petal-fall ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill={h.color} className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
