import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Phone } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";

const teamMembers = [

  {
    name: "Akshit Garg",
    role: "Web-Dev Head",
    quote: "Design meets function in every line.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760525772/Akshit_Event_Head_zcldln.jpg",
    github: "#",
    instagram: "#",
    phone: "#",
  },
  {
    name: "Raghvi Gupta",
    role: "Frontend Developer",
    quote: "Design is intelligence made visible.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760545899/WhatsApp_Image_2025-10-15_at_5.26.22_PM_hudxfh.jpg",
    github: "https://github.com/raghvigupta",
    instagram: "#",
    phone: "#",
  },
  {
    name: "Kartikeya Singh",
    role: "Frontend Developer",
    quote: "Logic is the foundation of innovation.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760624272/IMG_20251016_194342_r92xwd.jpg",
    github: "#",
    instagram: "#",
    phone: "#",
  },
  {
    name: "Rahul Gupta",
    role: "Full Stack Developer",
    quote: "Turning imagination into code.",
    image:
      "https://res.cloudinary.com/doejabjai/image/upload/v1760622930/WhatsApp_Image_2025-10-16_at_7.13.10_PM_kynlg1.jpg",
    github: "https://github.com/rahulgupta",
    instagram: "https://www.instagram.com/rahul5g3d/",
    phone: "+91 9877511146",
  },
];

const BuiltByPage = () => {
  return (
    <>
      <Navbar />

      <section className="relative py-28 px-6 md:px-16 text-center overflow-hidden">
        {/* Animated cosmic background */}
        <div className="absolute inset-0 "></div>
        <motion.div
          className="absolute w-[700px] h-[700px] "
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        />

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white mb-4 relative z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Meet the <span className="text-blue-400">Builders</span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg md:text-xl mb-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The masterminds behind Antariksh’s Web & Tech ecosystem.
        </motion.p>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10 relative z-10">
          {teamMembers.map((person, i) => (
            <motion.div
              key={i}
              className="w-80 bg-gradient-to-br from-blue-800/20 to-black/70 border border-blue-400/20 p-6 rounded-3xl backdrop-blur-lg shadow-xl hover:shadow-blue-400/50 transition-all duration-500 hover:-translate-y-3"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Profile Image */}
              <motion.div
                className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-lg"
                whileHover={{ scale: 1.08, rotate: 2 }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Info */}
              <h3 className="text-2xl font-bold text-white mb-1">
                {person.name}
              </h3>
              <p className="text-blue-400 mb-3">{person.role}</p>
              <p className="text-white/70 italic mb-6">“{person.quote}”</p>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-4">
                <motion.a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#60a5fa" }}
                  className="text-white/70 hover:text-blue-400 transition-colors"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#e1306c" }}
                  className="text-white/70 hover:text-pink-400 transition-colors"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  href={`tel:${person.phone}`}
                  whileHover={{ scale: 1.2, color: "#22c55e" }}
                  className="text-white/70 hover:text-green-400 transition-colors"
                >
                  <Phone size={24} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BuiltByPage;
