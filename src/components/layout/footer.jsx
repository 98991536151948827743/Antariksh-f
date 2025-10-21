import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";


const footerSections = {
  Explore: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ],
  Teams: [
    { name: "Observatory", path: "/teams/observatory" },
    { name: "Newsletter", path: "/teams/newsletter" },
    { name: "Web & Tech", path: "/teams/web-tech" },
    { name: "Design & Media", path: "/teams/design-media" },
    { name: "Kalpa", path: "/teams/kalpa" },
    { name: "Khagol Quizzing", path: "/teams/khagol" },
    { name: "Discussion", path: "/teams/discussion" },
    { name: "Core Management", path: "/teams/core-management" },
  ],
  Blog: [
    { name: "All Articles", path: "/blog" },
    { name: "Space Explorations", path: "/blog/space" },
    { name: "Astro Facts", path: "/blog/facts" },
    { name: "Upcoming Launches", path: "/launchpad" },
      {name : "planet-observation", path:"/blog/planet-observation"}
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full text-gray-200 border-t border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 mb-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start gap-5 text-center sm:text-left">
            <motion.img
              src="/logo512.png"
              alt="Antariksh Logo"
              className="h-16 w-auto sm:h-20 rounded-2xl"
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0px 0px 10px rgba(74,222,128,0.3))",
                  "drop-shadow(0px 0px 20px rgba(74,222,128,0.6))",
                  "drop-shadow(0px 0px 10px rgba(74,222,128,0.3))",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Antariksh — igniting curiosity, fostering innovation, and exploring
              the cosmos through creativity, technology, and teamwork.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-5 mt-2">
              {[
                {
                  Icon: FaGithub,
                  color: "hover:text-gray-300",
                  href: "https://github.com/antariksh-nit-kurukshetra",
                },
                {
                  Icon: FaInstagram,
                  color: "hover:text-pink-400",
                  href: "https://www.instagram.com/antariksh_nitkkr/",
                },
                {
                  Icon: FaLinkedin,
                  color: "hover:text-blue-400",
                  href: "https://www.linkedin.com/company/antariksh-nit-kurukshetra?originalSubdomain=in",
                },
                {
                  Icon: FaYoutube,
                  color: "hover:text-red-500",
                  href: "https://youtube.com/",
                },
              ].map(({ Icon, color, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-400 transition ${color}`}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Dynamic Footer Links */}
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section} className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                {section}
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-blue-400 transition duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10" />

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
          {[
            {
              title: "Upcoming Event",
              text: (
                <>
                  <strong>Astrohunt:</strong> Solve cosmic clues and uncover
                  secrets among the stars!
                </>
              ),
              link: "/events",
              btn: "Explore Events →",
            },
            {
              title: "Meet Our Teams",
              text: "From Design to Web Tech, meet the brilliant minds shaping Antariksh’s galaxy.",
              link: "/about",
              btn: "Meet the Teams →",
            },
            {
              title: "Featured Blog",
              text: `"The Mysteries of Space" — by Rahul Gupta. Journey through the stars and beyond.`,
              link: "/blog/the-mysteries-of-space",
              btn: "Read Blog →",
            },
          ].map(({ title, text, link, btn }) => (
            <motion.div
              key={title}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl hover:bg-white/10 transition flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-blue-400 mb-2">
                  {title}
                </h4>
                <p className="text-sm text-gray-300 mb-4">{text}</p>
              </div>
              <Link
                to={link}
                className="text-blue-400 hover:underline text-sm font-semibold"
              >
                {btn}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-3 sm:gap-4 text-center">
          <p>© {new Date().getFullYear()} Antariksh. All rights reserved.</p>
          <p className="text-gray-500">
            Built with 💫 by{" "}
<Link to="/built-by">
  <span className="text-green-400 font-medium hover:underline">Web & Tech Team</span>
</Link>

          </p>
        </div>
      </div>

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/30 via-transparent to-blue-400/30 blur-md" />
    </footer>
  );
}
