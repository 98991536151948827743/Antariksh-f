  import React, { useRef, useState, useEffect } from "react";
  import { Canvas, useFrame } from "@react-three/fiber";
  import { OrbitControls, Stars, useTexture, Html } from "@react-three/drei";
  import Navbar from "../components/layout/Navbar";
  import Footer from "../components/layout/footer";
  import SlidingBackground from "../components/layout/RotatingBackground";
  import { motion, AnimatePresence } from "framer-motion";

  // --- Event Data ---
  const events = [
    {
      id: 1,
      title: "Astrohunt",
      date: "",
      description: "Team-based treasure hunt where teams solve astronomy-related clues to reach the final destination.",
      image: "https://res.cloudinary.com/doejabjai/image/upload/v1759938895/ChatGPT_Image_Oct_8_2025_09_24_20_PM_pkmux6.png",
      details: "Curious mind, hidden clues, and cosmic solutions! Astrophiles, do you love solving puzzles and answering riddles? Are you captivated by cosmic mysteries that make your mind wander into the deep realms of space? Antariksh presents you with Astrohunt. Gather your wits and dive deep into solving the cosmic riddles. Solve a riddle, find a clue, and move on to the next mystery. Each clue takes you to a different location. Be the first one to find your destination, be the first one to unravel the conundrums space holds. It is a race against time, are you fast enough?",
    },
    {
      id: 2,
      title: "Astroarena",
      date: "",
      description: "A Squid Game-inspired team event with space-themed elimination challenges.",
      image: "https://res.cloudinary.com/doejabjai/image/upload/v1759938217/ChatGPT_Image_Oct_8_2025_08_34_09_PM_uzbdsw.png",
      details: "Team-based event (2-3 members) inspired by Squid Games, where each round will be an elimination round. After passing through multiple rounds, one team finally wins the game. Each round is designed with a fun astro twist, making the competition engaging and challenging.",
    },
    {
      id: 3,
      title: "Prakshepan",
      date: "",
      description: "Design and launch your own water bottle rocket with creativity and precision.",
      image: "https://res.cloudinary.com/doejabjai/image/upload/v1759938564/ChatGPT_Image_Oct_8_2025_09_18_54_PM_m8fkfa.png",
      details: "Have you ever been dazzled by rockets piercing the blue skies? Don't you want to launch one yourself? We, here at Antariksh, organize an annual event as part of NIT Kurukshetra's tech fest, Techsparadha, called 'Prakshepan' - a water rocket event. It's an event where you push your limits to reach the Kármán line and conquer the depths of the cosmos. This event gives astrophiles a chance to witness Newton's third law of motion in action and to send their aspirations rocketing high into the sky. The event begins with practical workshops that introduce you to the world of rocket science, followed by fascinating preliminaries and the competitive and sky-high finals. Join us on a journey from the blue skies to the infinite with our cosmic family, 'Antariksh,' using your imaginative mind, skillful hands, and a willingness to learn.",
    },
    {
      id: 4,
      title: "Zathura",
      date: "",
      description: "Two-round event blends astrohunt with a space-themed board game for an unforgettable experience!",
      image: "https://res.cloudinary.com/dkk4f02zv/image/upload/v1760292438/Gemini_Generated_Image_7s3fdo7s3fdo7s3f_jphpcz.png",
      details: "Zathura- a thrilling game inspired by the timeless classic -‘Zathura’, is an astronomy-themed board game that takes you on a journey through the cosmos like never before! A team event that is designed to take you into the awe-inspiring depths of space, where you explore distant galaxies, discover celestial wonders, and conquer the challenges of the unknown universe. Your mission is to unravel the mysteries of the cosmos- from the birth of stars to exploring the dark mysteries of black holes, challenging your brains by solving mind-bending puzzles on physics and breathtaking cosmic phenomena like supernovae and nebulae, all while competing with fellow explorers to become the ultimate cosmic conqueror. We at Antariksh organize Zathura every year to attract space enthusiasts to embark on an exciting journey through the cosmos while testing their skills in the endless vastness and darkness of space.",

    },
    {
      id: 5,
      title: "Stellar Screens",
      date: "",
      description: "Two-round event blends astrohunt with a space-themed board game for an unforgettable experience!",
      image: "https://res.cloudinary.com/dkk4f02zv/image/upload/v1760292304/Gemini_Generated_Image_8e65i98e65i98e65_ci6wcs.png",
      details: "Cinema is a part of everybody's life, and the same goes for Antariksh. Here at Antariksh, we use it as a tool to dive into the mysteries of the cosmos and to explore the imagination of the human mind through science fiction and science shows. Throughout the year, Antariksh organizes screenings of various science shows and movies for the sci-fi fans of NIT Kurukshetra. Last year, we screened some episodes of one of the best science shows of all time, 'Cosmos: A Spacetime Odyssey.' The show took the audience on a cosmic journey, delving into the dimensions of fascinating scientific exploration and the mysteries of limitless space. Antariksh will always extend invitations to cosmic adventurers by organizing events such as 'The Stellar Screens' to explore the boundless dimensions of possibilities.",
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
        <sphereGeometry args={[4.0, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  }

  // --- Floating Card Component ---
  function FloatingCard({ event, index, totalEvents, position, onClick }) {
    const ref = useRef();
    const [hover, setHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Floating animation only for non-mobile
    useFrame(({ clock }) => {
      if (!isMobile) {
        const t = clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
      }
    });

    // Mobile stacked positions
    const finalPosition = isMobile
      ? [
          0, // center X
          3 - index * 2, // vertical stacking
          -2, // slightly in front
        ]
      : position;

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
        <p className="text-xs text-gray-300">{event.date}</p>
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
              <h2 className="text-xl font-bold text-blue-400 mb-2">{event.title}</h2>
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

    const positions = [
      [6, 8, -4],
      [-6, 4, 4],
      [5, 3, 5],
      [-5, 2, -5],
      [0, 3, 6],
      
    ];

    return (
      <>
        <Navbar />
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
          <SlidingBackground />
        </div>

        {/* --- Desktop 3D Layout --- */}
        {!isMobile && (
          <section className="w-full h-screen">
            <Canvas camera={{ position: [0, 3, 12], fov: 60 }}>
              <ambientLight intensity={4.0} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <Stars
                radius={100}
                depth={80}
                count={5000}
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
                  totalEvents={events.length}
                  position={positions[i]}
                  onClick={setSelectedEvent}
                />
              ))}
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </section>
        )}

        {/* --- Mobile Layout (Stacked Cards with 3D background) --- */}
{isMobile && (
  <section className="relative flex flex-col items-center w-full min-h-screen px-4 py-6 space-y-6 bg-black overflow-hidden">
    {/* Starry 3D Background */}
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars
          radius={80}
          depth={60}
          count={4000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
        <Earth />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>

    {/* Stacked Event Cards */}
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
          className="w-full h-32 object-cover rounded-lg mb-3 border border-blue-500/30"
        />
        <h3 className="text-lg font-bold text-blue-300">{event.title}</h3>
        <p className="text-xs text-gray-300">{event.date}</p>
        <p className="text-sm text-gray-400 mt-1">{event.description}</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
          Know More
        </button>
      </motion.div>
    ))}
  </section>
)}


        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        <Footer />
      </>
    );
  }