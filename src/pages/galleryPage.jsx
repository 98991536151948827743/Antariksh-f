import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import StarBackground from "../components/layout/StarBackground";

// --- Categories ---
const categories = ["Techspardha", "Observation Sessions", "Workshops", "Events", "Trips"];

// --- Rotating Earth Component (Optimized with Texture) ---
function Earth() {
  const earthRef = useRef();
  const texture = useTexture("/earth_texture.jpg");

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[11.0, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

// --- Floating Gallery Card with Loading State ---
function FloatingGalleryCard({ src, index, total, radius = 15, onClick }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    const speed = 0.25;
    const angleOffset = (index / total) * Math.PI * 2;
    const angle = angleOffset + clock.getElapsedTime() * speed;

    // Smooth orbital motion
    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.3 + index) * 0.5;
    ref.current.position.z = Math.sin(angle) * radius;

    // Face the center
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <group 
      ref={ref} 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Html 
        zIndexRange={[0, 10]}
        distanceFactor={8}
        transform
        sprite
      >
        <motion.div
          animate={{ 
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
          style={{ 
            width: "280px", 
            height: "280px",
            pointerEvents: "auto",
            cursor: "pointer"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-blue-400/60 shadow-2xl overflow-hidden backdrop-blur-sm">
            {!loaded && (
              <div className="w-full h-full flex items-center justify-center bg-gray-800/90">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={src}
              alt="Gallery"
              className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              loading="lazy"
            />
            {hovered && loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-blue-500/20 backdrop-blur-[2px] flex items-center justify-center"
              >
                <span className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
                  Click to View
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </Html>
    </group>
  );
}

// --- Enhanced Modal with Keyboard Navigation ---
function GalleryModal({ src, onClose, allImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (src && allImages) {
      const index = allImages.findIndex(img => img === src);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [src, allImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!src) return;
      
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < allImages.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [src, currentIndex, allImages, onClose]);

  const currentSrc = allImages?.[currentIndex] || src;

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 to-black p-4 md:p-6 rounded-2xl border-2 border-blue-500/70 shadow-2xl max-w-4xl w-[95%] max-h-[90vh] overflow-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={currentSrc} 
              alt="Gallery" 
              className="w-full h-auto rounded-xl mb-4 shadow-lg"
            />
            
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <button
                onClick={() => setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-all"
              >
                ← Previous
              </button>
              
              <span className="text-gray-300 text-xs md:text-sm">
                {currentIndex + 1} / {allImages?.length || 1}
              </span>
              
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={currentIndex === allImages.length - 1}
                className="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-all"
              >
                Next →
              </button>
              
              <button
                onClick={onClose}
                className="px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Canvas Loader ---
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm">Loading Antariksh Images...</p>
      </div>
    </Html>
  );
}

// --- Main Gallery Page ---
export default function GalleryPage() {
  const [images, setImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    
    fetch("/images.json", { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load images");
        return res.json();
      })
      .then(data => {
        setImages(data.images || {});
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError("Failed to load gallery images");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const categoryImages = useMemo(() => 
    images[selectedCategory] || [], 
    [images, selectedCategory]
  );

  return (
    <>
      <Navbar />

      {/* Animated Star Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <StarBackground speedFactor={0.05} starCount={2500} />
      </div>

      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-20 flex flex-col items-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-extrabold text-center mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-blue-400 bg-clip-text">Gallery</span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore our moments captured across various events and activities
        </motion.p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 z-10 relative">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/50"
                  : "bg-transparent text-gray-200 border-white/30 hover:bg-white/10 hover:border-white/50"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Desktop 3D Layout */}
        {!isMobile && !loading && !error && categoryImages.length > 0 && (
          <motion.div 
            className="w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Canvas 
              camera={{ position: [0, 5, 25], fov: 60 }}
              shadows
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 2]}
            >
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={2.5} />
                <pointLight position={[10, 10, 10]} intensity={2} castShadow />
                <Stars radius={100} depth={80} count={2000} factor={4} saturation={0} fade speed={0.5} />
                <Earth />

                {categoryImages.map((src, i) => (
                  <FloatingGalleryCard
                    key={`${selectedCategory}-${i}`}
                    src={src}
                    index={i}
                    total={categoryImages.length}
                    radius={15}
                    onClick={() => setSelectedImage(src)}
                  />
                ))}

                <OrbitControls
                  enableZoom={true}
                  enableRotate={true}
                  enablePan={false}
                  minDistance={20}
                  maxDistance={40}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={2 * Math.PI / 3}
                  autoRotate={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
              </Suspense>
            </Canvas>
          </motion.div>
        )}

        {/* Mobile Layout */}
        {isMobile && !loading && !error && categoryImages.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4 py-6">
            {categoryImages.map((src, idx) => (
              <motion.div
                key={`${selectedCategory}-mobile-${idx}`}
                onClick={() => setSelectedImage(src)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl border-2 border-blue-400/60 shadow-xl cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-48 object-cover rounded-lg mb-2"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-xl">Loading Gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <p className="text-red-400 text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categoryImages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <p className="text-gray-400 text-xl">No images found in this category</p>
          </div>
        )}
      </section>

      <GalleryModal 
        src={selectedImage} 
        onClose={() => setSelectedImage(null)}
        allImages={categoryImages}
      />
      
      <Footer />
    </>
  );
}