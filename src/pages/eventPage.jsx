import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Html } from "@react-three/drei";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "../components/layout/StarBackground"; // ✅ Added import


// --- Event Data ---
const events = [
  {
    id: 1,
    title: "Astrohunt",
    date: "",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSf-0uwqZm6BHT8kep_5Reil0x_AWbWqiOkoCsoGdNnJ_1yLKA/viewform",
    description:
      "Team-based treasure hunt where teams solve astronomy-related clues to reach the final destination.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760899192/AKSHIT_7814969870_3_t5mert.png",
    details:
      "Curious mind, hidden clues, and cosmic solutions! Astrophiles, do you love solving puzzles and answering riddles? Are you captivated by cosmic mysteries that make your mind wander into the deep realms of space? Antariksh presents you with Astrohunt. Gather your wits and dive deep into solving the cosmic riddles. Solve a riddle, find a clue, and move on to the next mystery. Each clue takes you to a different location. Be the first one to find your destination, be the first one to unravel the conundrums space holds. It is a race against time, are you fast enough?",  },
  {
    id: 2,
    title: "Astroarena",
    date: "",
    link: "https://forms.gle/vw9svfDNGFFEbV4t8",
    description:
      "A Squid Game-inspired team event with space-themed elimination challenges.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1761053499/Astro_arena_Instagram_Post_4_gij7ei.png",
    details:
      "Team-based event (2-3 members) inspired by Squid Games, where each round will be an elimination round...",
  },
  {
    id: 3,
    title: "Prakshepan",
    date: "",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSchzNiQcxtcraKuKCk-ZL2hvT1tI2gaQSd3_plrRg92QuETRw/viewform?usp=header",
    description:
      "Design and launch your own water bottle rocket with creativity and precision.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760897520/pfin3_dwvuvf.png",
    details:
      "Have you ever been dazzled by rockets piercing the blue skies? Don't you want to launch one yourself? We, here at Antariksh, organize an annual event as part of NIT Kurukshetra's tech fest, Techsparadha, called 'Prakshepan' - a water rocket event. It's an event where you push your limits to reach the Kármán line and conquer the depths of the cosmos. This event gives astrophiles a chance to witness Newton's third law of motion in action and to send their aspirations rocketing high into the sky. The event begins with practical workshops that introduce you to the world of rocket science, followed by fascinating preliminaries and the competitive and sky-high finals. Join us on a journey from the blue skies to the infinite with our cosmic family, 'Antariksh,' using your imaginative mind, skillful hands, and a willingness to learn.",
  },
  {
    id: 4,
    title: "Zathura",
    date: "",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfuc3s2iY2YuWdmDwoOQxoFuYNAtUL_E2ZsENSSxSQ-JMVL9A/viewform?usp=header",
    description:
      "Two-round event blends astrohunt with a space-themed board game for an unforgettable experience!",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1761064292/Zathura_3_y8wqr6.png",
    details:
      "Zathura- a thrilling game inspired by the timeless classic -‘Zathura’, is an astronomy-themed board game that takes you on a journey through the cosmos like never before! A team event that is designed to take you into the awe-inspiring depths of space, where you explore distant galaxies, discover celestial wonders, and conquer the challenges of the unknown universe. Your mission is to unravel the mysteries of the cosmos- from the birth of stars to exploring the dark mysteries of black holes, challenging your brains by solving mind-bending puzzles on physics and breathtaking cosmic phenomena like supernovae and nebulae, all while competing with fellow explorers to become the ultimate cosmic conqueror. We at Antariksh organize Zathura every year to attract space enthusiasts to embark on an exciting journey through the cosmos while testing their skills in the endless vastness and darkness of space.",
  },
  {
    id: 5,
    title: "Stellar Screens",
    date: "",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScYHtUq3DPPVRcHiqjcc11OAJkh1VN5jb4Y_kyHwZsyZLE7AA/viewform?usp=header",
    description:
      "Cinematic science screenings exploring the cosmos through sci-fi and science shows.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1761063287/Resized_Stellar_Final_1_xykqbl.png",
    details:
      "Cinema is a part of everybody's life, and the same goes for Antariksh. Here at Antariksh, we use it as a tool to dive into the mysteries of the cosmos and to explore the imagination of the human mind through science fiction and science shows. Throughout the year, Antariksh organizes screenings of various science shows and movies for the sci-fi fans of NIT Kurukshetra. Last year, we screened some episodes of one of the best science shows of all time, 'Cosmos: A Spacetime Odyssey.' The show took the audience on a cosmic journey, delving into the dimensions of fascinating scientific exploration and the mysteries of limitless space. Antariksh will always extend invitations to cosmic adventurers by organizing events such as 'The Stellar Screens' to explore the boundless dimensions of possibilities.",
  },
];

// --- Rotating Earth Component ---
function Earth() {
  const earthRef = useRef();
  const [texture] = useTexture(["/earth_texture.jpg"]);

  useFrame(() => {
    earthRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[3.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// --- Floating Card Component ---
function FloatingCard({ event, index, position, onClick }) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(({ clock }) => {
    if (!isMobile) {
      const t = clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.6 + index) * 0.2;
      const orbitSpeed = 0.15;
      const angle = (index / 5) * Math.PI * 2 + t * orbitSpeed;
      const radius = 6;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
    }
  });

  const finalPosition = isMobile ? [0, 3 - index * 2, -2] : position;

  return (
    <group ref={ref} position={finalPosition} onClick={() => onClick(event)}>
      <mesh
        onPointerOver={() => !isMobile && setHover(true)}
        onPointerOut={() => !isMobile && setHover(false)}
      >
        <meshStandardMaterial
          color={hover ? "#2563eb" : "#0f172a"}
          transparent
          opacity={0.85}
          emissive={hover ? "#3b82f6" : "#000"}
          emissiveIntensity={hover ? 0.6 : 0.2}
        />
      </mesh>
      <Html zIndexRange={[0, 10]}>
        <div onClick={() => onClick(event)}>
          <HtmlCard event={event} />
        </div>
      </Html>
    </group>
  );
}

// --- HTML Overlay for Event Info ---
function HtmlCard({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute bg-gray-800/90 text-white text-center p-5 rounded-2xl border border-blue-400 shadow-lg w-64 cursor-pointer select-none backdrop-blur-md"
      style={{ transform: "translate(-50%, -50%)", pointerEvents: "auto", zIndex: 20 }}
    >
      {event.image && (
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-36 object-cover rounded-lg mb-3 border border-blue-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
      <p className="text-sm font-bold text-blue-300">{event.title}</p>
      <a
  href={event.link}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="m-2 inline-block text-sm font-medium text-blue-300 hover:text-white transition-colors duration-300 
             bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-400/30 
             shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
    🚀
  </span>{" "} Register Here
</a>

      <p className="text-xs text-gray-400 mt-1">{event.description}</p>
    </motion.div>
  );
}

// --- Event Details Modal ---
function EventDetailsModal({ event, onClose }) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="bg-gray-900 text-white p-6 rounded-2xl w-[90%] sm:w-[500px] border border-blue-500 shadow-lg"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-bold text-blue-400 mb-2">
              {event.title}
            </h2>
            <p className="text-sm text-gray-300 mb-1">{event.date}</p>
            <p className="text-sm text-gray-400 mb-4">{event.details}</p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main Page ---
export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = 6;
  const verticalOffset = 2.0;
  const positions = events.map((_, i) => {
    const angle = (i / events.length) * Math.PI * 2;
    return [Math.cos(angle) * radius, verticalOffset, Math.sin(angle) * radius];
  });

  return (
    <>
      <Navbar />

      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <StarBackground speedFactor={0.05} starCount={2500} />
      </div>

      {/* --- Desktop 3D Layout --- */}
      {!isMobile && (
        <section className="w-full h-screen">
          <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
            <ambientLight intensity={4.0} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Stars
              radius={100}
              depth={80}
              count={3000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <Earth />
            {events.map((event, i) => (
              <FloatingCard
                key={event.id}
                event={event}
                index={i}
                position={positions[i]}
                onClick={setSelectedEvent}
              />
            ))}
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.3}
              minPolarAngle={Math.PI / 2.7}
              maxPolarAngle={Math.PI / 2.0}
            />
          </Canvas>
        </section>
      )}

      {/* --- Mobile Layout --- */}
      {isMobile && (
        <section className="relative flex flex-col items-center w-full min-h-screen px-4 py-6 space-y-6 overflow-hidden bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10">
            <StarBackground speedFactor={0.05} starCount={1800} /> 
          </div>

          {events.map((event) => (
            <motion.div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-gray-800/90 text-white text-center p-4 rounded-2xl border border-blue-400 shadow-lg w-full max-w-sm cursor-pointer backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-42 object-cover rounded-lg mb-3 border border-blue-500/30"
              />
              <h3 className="text-lg font-bold text-blue-300">{event.title}</h3>
              <a
  href={event.link}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="m-2 inline-block text-sm font-medium text-blue-300 hover:text-white transition-colors duration-300 
             bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-400/30 
             shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
    🚀
  </span>{" "} Register Here
</a>


              
              <p className="text-sm text-gray-400 mt-1">{event.description}</p>
              
              <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
                Know More
              </button>
            </motion.div>
          ))}
        </section>
      )}

      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      <Footer />
    </>
  );
}