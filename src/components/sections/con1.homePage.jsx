import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
      
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex mb-20 flex-col items-center justify-center overflow-hidden bg-black perspective-1000">
      
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Nebula Gradient */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Earth with Parallax */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full">
          <img
            src="/19617.jpg"
            alt="Earth"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* 3D Floating Planets SVG */}
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="absolute top-20 right-20 w-32 h-32 opacity-80"
      >
        <motion.svg
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <radialGradient id="planetGrad1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="100" cy="100" r="40" fill="url(#planetGrad1)" filter="url(#glow)" />
          <ellipse cx="100" cy="100" rx="60" ry="15" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
        </motion.svg>
      </motion.div>

      {/* 3D Saturn SVG */}
      <motion.div
        style={{ 
          x: useTransform(smoothMouseX, (x) => -x * 1.5), 
          y: useTransform(smoothMouseY, (y) => -y * 1.5) 
        }}
        className="absolute bottom-32 left-20 w-40 h-40 opacity-70"
      >
        <motion.svg
          viewBox="0 0 200 200"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <radialGradient id="saturnGrad">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" opacity="0.3" />
              <stop offset="50%" stopColor="#f59e0b" opacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" opacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="100" rx="80" ry="20" fill="url(#ringGrad)" opacity="0.6" />
          <circle cx="100" cy="100" r="35" fill="url(#saturnGrad)" filter="url(#glow)" />
          <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
        </motion.svg>
      </motion.div>

      {/* 3D Asteroid SVG */}
      <motion.div
        style={{ 
          x: useTransform(smoothMouseX, (x) => x * 0.8), 
          y: useTransform(smoothMouseY, (y) => y * 0.8) 
        }}
        className="absolute top-40 left-32 w-20 h-20 opacity-60"
      >
        <motion.svg
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <radialGradient id="asteroidGrad">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          <polygon points="50,10 90,35 80,75 20,80 10,40" fill="url(#asteroidGrad)" filter="url(#glow)" opacity="0.8" />
        </motion.svg>
      </motion.div>

      {/* Orbiting Satellite */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64"
        style={{ x: '-50%', y: '-50%' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full"
        >
          <motion.svg
            className="absolute -top-8 left-1/2"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{ x: '-50%' }}
          >
            <defs>
              <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="15" y="10" width="10" height="20" fill="url(#satGrad)" rx="2" />
            <rect x="5" y="18" width="10" height="4" fill="#60a5fa" />
            <rect x="25" y="18" width="10" height="4" fill="#60a5fa" />
            <circle cx="20" cy="15" r="2" fill="#fbbf24" />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Dynamic Orbital Rings */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: mousePosition.x, y: mousePosition.y }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${400 + i * 200}px`,
              height: `${400 + i * 200}px`,
              borderColor: `rgba(${i % 2 === 0 ? '59, 130, 246' : '147, 51, 234'}, ${0.2 - i * 0.04})`,
              borderWidth: '2px',
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </motion.div>

      {/* Cosmic Grid */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(rgba(59,130,246,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(59,130,246,0.05) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
            transformStyle: 'preserve-3d',
            rotateX: '60deg',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content Container with 3D Transform */}
      <motion.div 
        className="relative z-20 px-6 max-w-6xl"
        style={{
          x: useTransform(smoothMouseX, (x) => x * 0.5),
          y: useTransform(smoothMouseY, (y) => y * 0.5),
          rotateX: useTransform(smoothMouseY, (y) => y * 0.3),
          rotateY: useTransform(smoothMouseX, (x) => x * 0.3),
        }}
      >
        
        {/* Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="35" fill="none" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.5" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="url(#logoGrad)" strokeWidth="3" opacity="0.8" />
              <circle cx="40" cy="40" r="20" fill="url(#logoGrad)" opacity="0.3" />
              <path d="M 40 25 L 45 35 L 55 35 L 47 42 L 50 52 L 40 45 L 30 52 L 33 42 L 25 35 L 35 35 Z" fill="#fff" />
            </motion.svg>
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Mission Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-block mb-6 mx-auto"
        >
          <div className="px-6 py-3 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-pink-500/20 border border-blue-400/40 rounded-full backdrop-blur-md relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-400/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative text-blue-300 text-sm font-semibold flex items-center gap-3 uppercase tracking-wider">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#60a5fa" strokeWidth="2" />
                <circle cx="8" cy="8" r="2" fill="#60a5fa" className="animate-pulse" />
              </svg>
              Official Space Society of NITkkr
            </span>
          </div>
        </motion.div>

        {/* Main Title with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-center leading-none"
            style={{
              textShadow: '0 0 80px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.5)',
            }}
          >
            <motion.span 
              className="block text-white mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(147, 51, 234, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ANTARIKSH
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-400 via-blue-400 via-pink-400 to-blue-400 text-transparent bg-clip-text bg-300%"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              SPACE SOCIETY
            </motion.span>
          </motion.h1>
          
          {/* 3D Text Shadow Effect */}
          <div className="absolute inset-0 -z-10 blur-2xl opacity-50">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-center leading-none text-blue-500">
              <span className="block mb-4">ANTARIKSH</span>
              <span className="block">SPACE SOCIETY</span>
            </h1>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-center"
        >
          Embark on an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-400 font-bold">extraordinary journey</span> through the cosmos. 
          Where innovation meets exploration, and dreams become reality.
        </motion.p>

        {/* CTA Buttons */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            onClick={() => navigate("/events")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-blue-500 to-pink-100 text-blue-100 font-bold rounded-full overflow-hidden text-lg shadow-2xl shadow-blue-500/50"
          >
            <motion.div

              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"
              initial={{ x: '100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-3">
              Explore Events
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/> 
              </svg>
            </span>
          </motion.button>
          
<motion.button
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/launchpad")}
  className="group px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-3 text-lg shadow-xl"
>
  Upcoming Launches

  <svg
    className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
</motion.button>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 grid grid-cols-3 gap-8">
            {[
              { label: 'Active Teams', value: '10+', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { label: 'Members', value: '300+', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { label: 'Events In Techspardha', value: '5', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="mb-3 flex justify-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-xl">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                </div>
                <motion.div 
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-blue-400 to-pink-400 text-transparent bg-clip-text mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>


    </div>
  );
};

export default HeroSection;