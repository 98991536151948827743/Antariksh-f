import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import StarBackground from "../components/layout/StarBackground";
import * as THREE from "three";

// --- Categories ---
const categories = ["Techspardha", "Observation Sessions", "Workshops", "Events", "Trips"];

// --- Rotating Earth Component ---
function Earth() {
  const earthRef = useRef();
  const [texture] = useTexture(["/earth_texture.jpg"]);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[24.0, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// --- Floating Gallery Card ---
function FloatingGalleryCard({ src, index, total, radius = 34, onClick }) {
  const ref = useRef();
  const texture = useTexture(src);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const speed = 0.12;
    const angleOffset = (index / total) * Math.PI * 2;
    const angle = angleOffset + clock.getElapsedTime() * speed;
    const yLevel = 0;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(angle) * radius,
        yLevel,
        Math.sin(angle) * radius
      );
      ref.current.lookAt(0, 0, 0);

      // Smooth scale for hover
      const targetScale = hovered ? 1.2 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={ref}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      cursor="pointer"
    >
      <planeGeometry args={[10, 7.5]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={1}
      />
      {/* Optional: glowing outline */}
      {hovered && (
        <mesh>
          <planeGeometry args={[10.5, 8]} />
          <meshBasicMaterial color="#3b82f6" opacity={0.3} transparent />
        </mesh>
      )}
    </mesh>
  );
}


// --- Modal ---
function GalleryModal({ src, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="bg-gray-900 p-4 rounded-2xl border border-blue-500 shadow-lg max-w-4xl w-[90%]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <img
                src={src}
                alt="Gallery"
                className="w-full max-h-[80vh] object-contain rounded-xl border-4 border-blue-400 shadow-[0_0_25px_#3b82f6]"
              />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
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

// --- Main Gallery Page ---
export default function GalleryPage() {
  const [images, setImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/images.json")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to load")))
      .then((data) => {
        setImages(data.images);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categoryImages = images[selectedCategory] || [];

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <StarBackground speedFactor={0.05} starCount={2500} />
      </div>

      <section className="relative py-20 md:py-32 px-6 md:px-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-white">
          Our <span className="text-blue-400">Gallery</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12 z-20 relative">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white border-blue-400"
                  : "bg-transparent text-gray-200 border-white/30 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!isMobile && !loading && (
          <div className="w-full h-[950px] md:h-[1150px] relative z-10">
            <Canvas camera={{ position: [0, 10, 70], fov: 60 }}>
              <ambientLight intensity={2.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />

              <Stars
                radius={150}
                depth={120}
                count={2500}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
              />

              <Earth />

              {categoryImages.map((src, i) => (
                <FloatingGalleryCard
                  key={i}
                  src={src}
                  index={i}
                  total={categoryImages.length}
                  radius={34}
                  onClick={() => setSelectedImage(src)}
                />
              ))}

              <OrbitControls
                enableZoom={false}
                enableRotate={true}
                enablePan={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        )}

        {isMobile && !loading && (
          <section className="flex flex-col items-center w-full px-4 py-6 space-y-6 bg-black/80 backdrop-blur-sm">
            {categoryImages.map((src, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedImage(src)}
                className="bg-gray-800/90 p-4 rounded-2xl border border-blue-400 shadow-[0_0_20px_#3b82f6] w-full max-w-sm cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx}`}
                  className="w-full h-64 object-cover rounded-lg border-2 border-blue-400 shadow-[0_0_15px_#3b82f6]"
                />
              </motion.div>
            ))}
          </section>
        )}

        {loading && (
          <div className="text-white text-center py-32">Loading Images...</div>
        )}
      </section>

      <GalleryModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      <Footer />
    </>
  );
}