import { useEffect, useRef, useState } from 'react';

const AntarikshLoader = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // 3D Star Background with depth effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;

    const setCanvasSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    setCanvasSize();

    const makeStars = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }));

    let stars = makeStars(3000);

    const clear = () => ctx.clearRect(0, 0, w, h);

    const putPixel = (x, y, brightness) => {
      const size = brightness * 2.5;
      ctx.fillStyle = `rgba(150, 180, 255, ${brightness * 0.9})`;
      ctx.fillRect(x, y, size, size);
    };

    const moveStars = (distance) => {
      for (const s of stars) {
        s.z -= distance;
        if (s.z <= 1) s.z += 1000;
      }
    };

    let prevTime;
    const tick = (time) => {
      if (!prevTime) prevTime = time;
      const elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * 0.08);
      clear();

      const cx = w / 2;
      const cy = h / 2;

      for (const s of stars) {
        const x = cx + s.x / (s.z * 0.001);
        const y = cy + s.y / (s.z * 0.001);
        if (x < 0 || x >= w || y < 0 || y >= h) continue;

        const d = s.z / 1000.0;
        const b = 1 - d * d;
        putPixel(x, y, b);
      }

      requestAnimationFrame(tick);
    };

    const handleResize = () => setCanvasSize();
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(tick);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Floating particles for the loader area
  useEffect(() => {
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* Canvas Star Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#000011",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Nebula glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(150, 200, 255, 0.8)`,
          }}
        ></div>
      ))}

      {/* Concentric orbital rings */}
      <div className="absolute w-96 h-96 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-72 h-72 border-2 border-cyan-400/40 rounded-full" style={{ animation: 'spin-reverse 12s linear infinite' }}></div>
      <div className="absolute w-48 h-48 border-2 border-indigo-400/50 rounded-full animate-spin-slow" style={{ animationDuration: '8s' }}></div>
      <div className="absolute w-32 h-32 border border-cyan-300/60 rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}></div>

      {/* Pulsing central core */}
      <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full filter blur-xl opacity-50" style={{ animation: 'pulse-core 3s ease-in-out infinite' }}></div>

      {/* Orbiting Rocket */}
      <div className="absolute w-80 h-80 animate-spin-slow" style={{ animationDuration: '25s' }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Rocket SVG */}
          <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-lg">
            {/* Nose cone */}
            <polygon points="20,0 30,15 10,15" fill="#ff4444" />
            {/* Body */}
            <rect x="12" y="15" width="16" height="30" fill="#0066ff" />
            {/* Window */}
            <circle cx="20" cy="22" r="3" fill="#ffff00" />
            {/* Left fin */}
            <polygon points="12,35 5,50 12,45" fill="#ff8800" />
            {/* Right fin */}
            <polygon points="28,35 35,50 28,45" fill="#ff8800" />
            {/* Flame 1 */}
            <polygon points="16,45 14,58 16,50" fill="#ff3300" />
            {/* Flame 2 */}
            <polygon points="20,45 20,60 20,50" fill="#ffaa00" />
            {/* Flame 3 */}
            <polygon points="24,45 26,58 24,50" fill="#ff3300" />
          </svg>
        </div>
      </div>

      {/* Orbiting Spaceship */}
      <div className="absolute w-96 h-96" style={{ animation: 'spin-reverse 30s linear infinite' }}>
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
          {/* Spaceship SVG */}
          <svg width="50" height="45" viewBox="0 0 50 45" className="drop-shadow-lg">
            {/* Main hull */}
            <ellipse cx="25" cy="22" rx="18" ry="20" fill="#00ccff" opacity="0.8" />
            {/* Cockpit */}
            <circle cx="25" cy="10" r="6" fill="#ffff00" />
            {/* Left wing */}
            <polygon points="25,22 5,25 10,20" fill="#0088ff" />
            {/* Right wing */}
            <polygon points="25,22 45,25 40,20" fill="#0088ff" />
            {/* Bottom thruster 1 */}
            <rect x="18" y="35" width="4" height="10" fill="#ff6600" />
            {/* Bottom thruster 2 */}
            <rect x="28" y="35" width="4" height="10" fill="#ff6600" />
            {/* Thruster glow 1 */}
            <polygon points="20,45 18,55 22,48" fill="#ffaa00" opacity="0.7" />
            {/* Thruster glow 2 */}
            <polygon points="30,45 28,55 32,48" fill="#ffaa00" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-6xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 animate-pulse drop-shadow-lg" style={{ letterSpacing: '0.2em', textShadow: '0 0 30px rgba(100, 200, 255, 0.5)' }}>
          ANTARIKSH
        </div>
        <div className="h-1 w-40 bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-6 animate-pulse drop-shadow-md"></div>
        <p className="mt-8 text-cyan-200/60 text-xs tracking-[0.2em] font-light">
          EXPLORING THE COSMOS
        </p>
        <div className="mt-10 flex gap-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg" style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`, boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: var(--opacity); }
          90% { opacity: var(--opacity); }
          100% { opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default AntarikshLoader;