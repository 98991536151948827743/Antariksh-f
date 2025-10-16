import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />

      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 md:px-16">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3219/3219982.png" // rocket icon
            alt="Rocket"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto animate-bounce"
          />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-white/80 text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Oops! The page you are looking for is lost in space.
        </motion.p>
        <motion.a
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-transform hover:scale-105"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Go Back Home
        </motion.a>
      </section>

      <Footer />
    </>
  );
};

export default NotFoundPage;
