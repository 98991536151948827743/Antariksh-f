import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";

// --- Data ---
const missions = [
  {
    title: "Weekly Space Quizzes",
    desc: "Every week, Khagol challenges your cosmic intellect with fresh, engaging quizzes—ranging from astronomy trivia and space history to the mysteries of galaxies and black holes.",
    icon: "🌌",
  },
  {
    title: "Spot the Location Challenge",
    desc: "Identify celestial wonders and iconic space missions through stunning visuals—test your observational skills in this exciting visual guessing round!",
    icon: "🛰️",
  },
  {
    title: "Mystery Rounds",
    desc: "The X/Y Challenge Rounds keep participants guessing through cryptic clues, lateral thinking, and interstellar logic puzzles designed to stretch imagination.",
    icon: "🪐",
  },
  {
    title: "Observation Sessions",
    desc: "Join our live stargazing and telescope observation events where we explore the night sky, study constellations, and learn together under the stars.",
    icon: "🔭",
  },
];


// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

// --- Component ---
export default function KhagolPage() {
  return (
    <div className="relative min-h-screen  text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-36 pb-20 px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r text-blue-300 drop-shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Khagol
        </motion.h1>

        {/* Updated, deeper hero copy */}
        <motion.p
          className="mt-8 max-w-4xl text-gray-300 text-lg md:text-xl leading-relaxed font-light tracking-wide"
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Khagol is Antariksh’s curiosity engine — a hands-on community that turns wonder into action.
          Every week we craft tight, high-energy quizzes and puzzle rounds (GK, historical deep-dives, rapid-fire lightning rounds)
          alongside visual challenges like <span className="text-blue-300 font-medium">“Spot the Location”</span> and the X/Y Mystery Rounds.
          Beyond points and podiums, Khagol teaches people to observe carefully, think laterally, and communicate complex ideas simply —
          through live observation nights, themed quiz series, and collaborative research projects that bring the night sky into the classroom.
        </motion.p>

        {/* Concise "about" block to reinforce identity + impact */}
        <motion.div
          className="mt-6 max-w-3xl text-gray-400 text-base md:text-lg leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.45}
        >
          <strong className="text-blue-300">What we do:</strong> run weekly trivia drops, host inter-college contests (AstroLeague),
          organize telescope observation sessions, and design curiosity-first events that sharpen research, visual literacy and quick reasoning.
          Join Khagol if you want to learn how to read the sky, build memorable puzzles, and compete with a community that loves questions as much as answers.
        </motion.div>
      </section>

      {/* Missions Section */}
      <section className="px-6 md:px-16 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-300 mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Our Galactic Activities 🚀
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {missions.map((m, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-3xl  shadow-lg hover:shadow-blue-400/40 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={i * 0.2}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.6)",
              }}
            >
              <div className="text-6xl mb-4 text-center">{m.icon}</div>
              <h3 className="text-2xl font-bold text-blue-300 mb-3 text-center">
                {m.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      <Footer />
    </div>
  );
}
