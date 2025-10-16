import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";

const discussionTopics = [
  {
    title: "Black Holes",
    desc: "Exploring the mysteries of black holes, event horizons, and singularities.",
  },
  {
    title: "Exoplanets",
    desc: "Understanding newly discovered planets beyond our solar system.",
  },
  {
    title: "Space Missions",
    desc: "Discussing recent ISRO, NASA, and SpaceX missions.",
  },
  {
    title: "Astrophysics Phenomena",
    desc: "Concept discussions on gravitational waves, dark matter, and cosmic events.",
  },
];

const DiscussionPage = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-16 flex flex-col items-center text-center rounded-3xl mx-4 md:mx-16">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        <span className="text-blue-400">Discussion</span>
        </motion.h1>
        <motion.p
          className="max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Regular discussions on fascinating astronomy concepts! Join the team to learn, debate, and explore cosmic mysteries every week.
        </motion.p>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 md:px-16  rounded-3xl mx-4 md:mx-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Discussions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discussionTopics.map((topic, i) => (
            <motion.div
              key={i}
              className=" p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-blue-400/50 transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
              <p className="text-white/70">{topic.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default DiscussionPage;
