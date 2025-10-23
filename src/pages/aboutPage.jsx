// About.jsx
import  { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

const teamMembers = [
  { name: "Garvit Gupta", role: "President", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525778/Garvit_Convenor_mccjnm.jpg" },
  { name: "Diksha Dutta", role: "Vice-President", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525770/Diksha_Co-convenor_x0pytn.jpg" },
  { name: "Jiya Agrawal", role: "General-Secretary", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525779/Jiya_Co-convenor_iyyvpf.jpg" },
  { name: "Yajat Rajput", role: "Joint-Secretary", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760685129/WhatsApp_Image_2025-10-17_at_12.38.36_AM_1_rpbcbz.jpg" },
  { name: "Bhavya Arya", role: "Newsletter & Khagol Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525769/Bhavya_Event_Head_eeaor9.jpg" },
  { name: "Kartik Saraswat", role: "Quizzes Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525778/Kartik_Event_Head_tidw33.jpg" },
  { name: "Archit Chhajed", role: "Newsletter Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525769/Archit_Event_Head_rwtjxn.jpg" },
  { name: "Akshit Garg", role: "Web Development Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525772/Akshit_Event_Head_zcldln.jpg" },
    { name: "Aditya Aryan", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525768/Aditya_Event_Head_p727xh.jpg" },
      { name: "Damini Goyal", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525770/Damini_Event_Head_yrqmuo.jpg" },
        { name: "Jashan pal Singh", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525778/Jashan_Event_Head_fgruao.jpg" },
          { name: "Yash saxena", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525807/Yash_Event_Head_u6zkhz.jpg" },
            { name: "Shivam Pratap singh", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760525793/Shivam_Event_Head_pt2ttx.jpg" },
                        { name: "Rahul saini", role: "Event Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1761062915/Rahul_Event_Head_nxvnhh.jpg" },

  { name: "Malavika Gupta", role: "Content Writing Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760544925/WhatsApp_Image_2025-10-15_at_8.07.08_PM_vjrvmg.jpg" },
  { name: "Niknangra R. Marak", role: "Video Editing Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760544827/WhatsApp_Image_2025-10-15_at_8.29.48_PM_ittqym.jpg" },
  { name: "Kamya", role: "Social Media Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760545295/1000150831_wk5hy0.jpg" },
  { name: "Mohammad Rahil", role: "Graphic Design Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760544914/IMG_20251015_194758_hsqr2m.jpg" },
  { name: "Aman Sharma", role: "Discussion Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760544910/IMG_20240420_103340_2_bvx3n1.jpg" },
  { name: "Ankit Kumar", role: "Observation Astronomy Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1759940824/WhatsApp_Image_2025-10-08_at_9.56.20_PM_jr1vgq.jpg" },
  { name: "Raghvi Gupta", role: "Kalpa Head", image: "https://res.cloudinary.com/doejabjai/image/upload/v1760545899/WhatsApp_Image_2025-10-15_at_5.26.22_PM_hudxfh.jpg" },
];

export default function About() {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const start = currentIndex * itemsPerPage;
  const visibleMembers = teamMembers.slice(start, start + itemsPerPage);

  const scrollRef = useRef(null);
  const autoRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const isInteractingRef = useRef(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % totalPages);
    }, 6000);
    return () => clearInterval(t);
  }, [totalPages]);

  const startAutoScroll = (intervalMs = 4500) => {
    const container = scrollRef.current;
    if (!container) return;
    if (autoRef.current) clearInterval(autoRef.current);

    autoRef.current = setInterval(() => {
      if (!container || isInteractingRef.current) return;
      const firstCard = container.querySelector(".carousel-card");
      if (!firstCard) return;
      const gapPx = 24;
      const cardWidth = firstCard.offsetWidth + gapPx;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      let next = Math.round(container.scrollLeft + cardWidth);
      if (next > maxScrollLeft - 10) next = 0;
      container.scrollTo({ left: next, behavior: "smooth" });
    }, intervalMs);
  };

  const pauseAuto = () => {
    isInteractingRef.current = true;
    if (autoRef.current) clearInterval(autoRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const resumeAuto = (delay = 1500) => {
    isInteractingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => startAutoScroll(), delay);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const firstCard = container.querySelector(".carousel-card");
        if (!firstCard) return;
        const gapPx = 24;
        const cardWidth = firstCard.offsetWidth + gapPx;
        const index = Math.round(container.scrollLeft / cardWidth);
        setActiveMobileIndex(Math.max(0, Math.min(teamMembers.length - 1, index)));
      });
    };

    const onPointerDown = () => pauseAuto();
    const onPointerUp = () => resumeAuto(1000);

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchend", onPointerUp);
    window.addEventListener("pointerup", onPointerUp);

    startAutoScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("pointerup", onPointerUp);
      if (raf) cancelAnimationFrame(raf);
      if (autoRef.current) clearInterval(autoRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-16 flex flex-col lg:flex-row items-center justify-center gap-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/20 blur-[140px] rounded-full -z-0" />

        <motion.div
          className="relative z-10 w-full lg:w-1/2 p-8 md:p-10 bg-white/10 border border-white/20 rounded-2xl shadow-xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center md:text-left text-white drop-shadow-lg">
            About <span className="text-blue-400">Antariksh Society</span>
          </h2>

          <div className="font-mono space-y-4 text-white/90 md:text-lg leading-relaxed">
            <p>
              <span className="text-blue-400 font-semibold">Antariksh</span> is the official{" "}
              <span className="font-semibold">Space & Astronomy Society</span> of NIT Kurukshetra —
              a student-driven community that celebrates curiosity about the cosmos.
            </p>
            <p>
              We organize <span className="text-blue-300">stargazing nights</span>,{" "}
              <span className="text-blue-300">celestial observations</span>, and{" "}
              <span className="text-blue-300">ISRO mission tracking sessions</span>.
            </p>
            <p>
              From deep-space discussions to astrophotography workshops, we bring together students
              who share a passion for the stars, science, and discovery.
            </p>
            <p>Our mission is simple — look up, learn, and explore the cosmos together.</p>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnNrbTlxdWtyZW5ycDNkem1kejNvYmd6bjg3cTVjOHM0bDRveHEwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4yB1PfomOry8dJ8vdT/giphy.gif"
            alt="Rocket Launch Illustration"
            className="w-full max-w-sm md:max-w-md rounded-2xl shadow-xl border border-white/20"
          />
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-16 text-center overflow-hidden">
        <motion.h3
          className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Postholders
        </motion.h3>

        {/* Desktop */}
        <div className="hidden sm:flex flex-col items-center w-full relative">
          <motion.div
            key={currentIndex}
            className="flex justify-center flex-wrap gap-6 transition-opacity duration-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-white bg-white/10 backdrop-blur-md
                  border border-white/10 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-blue-400/30 
                  transition-all duration-300 min-w-[150px]"
              >
                <div className="relative w-20 h-20 mb-2">
                  <img
                    src={member.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={member.name}
                    className="w-full h-full rounded-full border-2 border-blue-400 object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"></div>
                </div>
                <h4 className="text-base md:text-lg font-semibold">{member.name}</h4>
                <p className="text-blue-300 text-xs md:text-sm mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "bg-blue-500 scale-125" : "bg-white/30 hover:bg-blue-300"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <motion.div
          ref={scrollRef}
          className="sm:hidden flex gap-4 overflow-x-auto px-2 snap-x snap-mandatory scrollbar-hide"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 snap-center w-[70%] mx-auto flex flex-col items-center text-white bg-white/10 backdrop-blur-md 
                border border-white/10 p-4 rounded-xl shadow-lg hover:shadow-blue-400/30 transition-all duration-300 carousel-card"
            >
              <motion.div
                className="relative w-20 h-20 mb-2"
                initial={{ rotate: -10 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={member.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={member.name}
                  className="w-full h-full rounded-full border-2 border-blue-400 object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"></div>
              </motion.div>
              <h4 className="text-base font-semibold">{member.name}</h4>
              <p className="text-blue-300 text-xs mt-0.5">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
