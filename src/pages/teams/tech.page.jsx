import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";
import Button from "../../components/ui/Button";


const WebTechPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-28 px-6 md:px-16 flex flex-col items-center text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 "></div>
        <motion.div
          className="absolute w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -top-40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        ></motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Web & <span className="text-blue-400">Tech</span> Team
        </motion.h1>

        <motion.p
          className="max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          The digital backbone of Antariksh — building experiences that orbit excellence.
          From interactive portals to automated systems, we make technology seamless and stellar.
        </motion.p>

        <motion.div
          className="mt-10 z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/built-by")}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Meet the Builders 🚀
          </Button>
        </motion.div>
      </section>

      {/* Our Responsibilities */}
      <section className="py-20 px-6 md:px-16  mx-4 md:mx-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Responsibilities
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {[
            {
              title: "Website & Portals",
              desc: "Design, develop, and maintain dynamic event websites and portals.",
              icon: "🌐",
            },
            {
              title: "Automation & Tools",
              desc: "Build automation systems to make workflows smarter and faster.",
              icon: "⚙️",
            },
            {
              title: "Technical Support",
              desc: "Provide on-ground and digital tech support during all major events.",
              icon: "🖥️",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-blue-700/20 to-black/60 border border-blue-400/20 backdrop-blur-xl p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl hover:shadow-blue-400/50 hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 px-6 md:px-16 flex flex-col items-center text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Follow Us on Contact
        </motion.h2>
        <motion.p
          className="text-white/80 mb-6 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get exclusive behind-the-scenes looks, development updates, and creative insights from our tech team.
        </motion.p>
        <Button
          variant="primary"
          size="lg"
          onClick={() =>
            window.open("/contact", "_blank")
          }
          className=" text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300"
        >
          Contact Us ✨
        </Button>
      </section>

      <Footer />
    </>
  );
};

export default WebTechPage;
