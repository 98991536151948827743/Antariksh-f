import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";

const ObservatoryTeamPage = () => {
  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-16 flex flex-col items-center text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Observatory <span className="text-blue-400">Team</span>
        </motion.h1>
        <motion.p
          className="max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Exploring the cosmos through observations and stargazing — our Observatory team brings the universe closer to everyone. From telescope observations to celestial events, we unlock the mysteries of the night sky.
        </motion.p>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 md:px-16 bg-black/80 backdrop-blur-sm rounded-3xl mx-4 md:mx-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Responsibilities
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Telescope Observations",
              desc: "Conduct stargazing sessions and celestial observations using state-of-the-art telescopes.",
              icon: "🔭",
            },
            {
              title: "Astronomy Events",
              desc: "Organize celestial events, meteor showers, planet alignments, and eclipse viewing parties.",
              icon: "✨",
            },
            {
              title: "Sky Mapping & Education",
              desc: "Educate students about constellations, stars, planets, and cosmic phenomena.",
              icon: "🌌",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-black/60 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-blue-400/50 transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="py-20 px-6 md:px-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What We Focus On
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Celestial Observations",
              items: ["Moon & Lunar Craters", "Planets in Solar System", "Deep Sky Objects", "Binary Stars"],
            },
            {
              title: "Cosmic Events",
              items: ["Meteor Showers", "Planet Alignments", "Solar & Lunar Eclipses", "Conjunctions"],
            },
            {
              title: "Education & Outreach",
              items: ["Astronomy Workshops", "Sky Identification", "Astrophotography", "Star Tales & Mythology"],
            },
            {
              title: "Community Engagement",
              items: ["Public Stargazing Sessions", "Campus Events", "School Programs", "Social Media Updates"],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              className="bg-blue-900/20 border border-blue-400/30 backdrop-blur-md p-8 rounded-2xl"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-white/80 flex items-center">
                    <span className="text-blue-400 mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>



      <Footer/>
    </>
  );
};

export default ObservatoryTeamPage;