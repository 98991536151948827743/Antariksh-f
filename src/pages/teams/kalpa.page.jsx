
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";


const KalpaPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-16 flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Kalpa <span className="text-blue-400">Content & Discovery Team</span>
        </motion.h1>
        <motion.p
          className="max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Kalpa is where curiosity meets creativity — the content heartbeat of Antariksh Society.
          We discover, craft, and share the most fascinating space facts, cosmic visuals, and stories
          that spark wonder. Every post is a journey across the universe — one fact at a time.
        </motion.p>
      </section>

      {/* About Kalpa */}
      <section className="py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 bg-black/80 backdrop-blur-sm rounded-3xl mx-4 md:mx-16">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Kalpa Illustration"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Kalpa</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Kalpa is the creative heartbeat of Antariksh, dedicated to discovering and presenting
            the most unique and intriguing facts about space. We craft engaging fortnightly posts
            that unravel the mysteries of the cosmos and share captivating story updates featuring
            breathtaking space imagery.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            Our goal is to make space science exciting, visually enriching, and easy to connect with.
            By turning complex celestial concepts into inspiring stories, Kalpa fuels curiosity and
            wonder — because the universe holds endless tales, and we tell them one fact at a time.
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-6 md:px-16 bg-black/80 backdrop-blur-sm rounded-3xl mx-4 md:mx-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What We Do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Content Discovery",
              desc: "Unearthing rare and fascinating space facts to share with the world.",
              icon: "🌌",
            },
            {
              title: "Cosmic Storytelling",
              desc: "Crafting visually stunning posts that make space science relatable and exciting.",
              icon: "🪐",
            },
            {
              title: "Community Engagement",
              desc: "Keeping audiences inspired with regular updates, reels, and cosmic trivia.",
              icon: "🚀",
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

      <Footer />
    </>
  );
};

export default KalpaPage;
