// src/components/layout/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const NAV_HEIGHT = 96;

const teamsDropdown = [
    { name: "Observatory", path: "/teams/observatory" },
    { name: "Newsletter", path: "/teams/newsletter" },
    { name: "Web & Tech", path: "/teams/web-tech" },
    { name: "Design & Media", path: "/teams/design-media" },
    { name: "Kalpa", path: "/teams/kalpa" },
    { name: "Khagol Quizzing", path: "/teams/khagol" },
    { name: "Discussion", path: "/teams/discussion" },
    { name: "Core Management", path: "/teams/core-management" },
];

const blogDropdown = [
  { name: "All Articles", path: "/blog" },
  { name: "Space Explorations", path: "/blog/space" },
  { name: "Astro Facts", path: "/blog/facts" },
  { name: "Upcoming Launches", path: "/launchpad" },
  {name : "planet-observation", path:"/blog/planet-observation"}

];

const navItems = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Teams", path: "/teams", dropdown: teamsDropdown },
  { name: "Blog", path: "/blog", dropdown: blogDropdown },
  { name: "Gallery", path: "/gallery" },
  { name: "About Us", path: "/about" },

];

/* ---------------- Framer Motion Variants ---------------- */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.03 } },
};

const linkVariants = {
  hidden: { y: -6, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

/* ---------------- utility: getFocusable ---------------- */
function getFocusable(container) {
  if (!container) return [];
  const selectors = [
    'a[href]:not([tabindex="-1"])',
    "button:not([disabled]):not([tabindex='-1'])",
    "input:not([type=hidden]):not([tabindex='-1'])",
    "select:not([tabindex='-1'])",
    "textarea:not([tabindex='-1'])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");
  return Array.from(container.querySelectorAll(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

/* ---------------- Desktop Dropdown (keyboard + hover accessible) ---------------- */
function DesktopDropdown({ item, location }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // keyboard: close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive =
    location.pathname === item.path ||
    item.dropdown.some((sub) => sub.path === location.pathname);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={menuRef}
    >
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-150 px-2 py-1 rounded ${
          isActive ? "text-white" : "text-gray-300 hover:text-white"
        }`}
        onClick={() => setOpen((v) => !v)} // allow click to toggle on keyboard users
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            const first = menuRef.current?.querySelector("a");
            first?.focus();
          }
        }}
      >
        {item.name}
        <FaChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl p-2 ring-1 ring-white/6 z-40"
            role="menu"
          >
            {item.dropdown.map((sub) => (
              <Link
                key={sub.path}
                to={sub.path}
                className={`block px-3 py-2 text-sm rounded-lg whitespace-nowrap transition ${
                  location.pathname === sub.path
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Mobile Dropdown (works reliably inside mobile panel) ---------------- */
function MobileDropdown({ item, location, closeMenu }) {
  // initialize open state if current path is inside dropdown
  const activeInside = item.dropdown.some((d) => d.path === location.pathname);
  const [isOpen, setIsOpen] = useState(activeInside);

  useEffect(() => {
    // keep open state in sync if route changes externally
    if (!activeInside) setIsOpen(false);
  }, [location.pathname, activeInside]);

  return (
    <motion.div variants={linkVariants}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`w-full flex justify-between items-center text-lg font-semibold px-3 py-3 rounded-lg transition-colors focus:outline-none ${
          isOpen || activeInside ? "text-white bg-white/6" : "text-gray-200 hover:text-white"
        }`}
        aria-expanded={isOpen}
        aria-controls={`mobile-sub-${item.name.replace(/\s+/g, "-")}`}
      >
        <span>{item.name}</span>
        <FaChevronUp className={`w-4 h-4 transition-transform ${isOpen ? "" : "rotate-180"}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`mobile-sub-${item.name.replace(/\s+/g, "-")}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", duration: 0.28, bounce: 0 }}
            style={{ overflow: "hidden" }}
            className="mt-1 ml-3 border-l border-white/10"
          >
            <div className="flex flex-col py-2">
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  onClick={() => closeMenu()}
                  className={`block pl-4 py-2 text-base transition-colors ${
                    location.pathname === sub.path
                      ? "text-blue-400 font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- Main Navbar Component ---------------- */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // matchMedia handler: close menu when resizing to desktop
  useEffect(() => {
    const mql = window.matchMedia ? window.matchMedia("(min-width: 768px)") : null;
    const handler = (e) => {
      if (e.matches) setOpen(false);
    };
    if (mql) {
      // support older browsers
      if (mql.addEventListener) mql.addEventListener("change", handler);
      else if (mql.addListener) mql.addListener(handler);
    }
    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener("change", handler);
        else if (mql.removeListener) mql.removeListener(handler);
      }
    };
  }, []);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = open ? "hidden" : original || "";
    return () => (document.documentElement.style.overflow = original || "");
  }, [open]);

  // focus trap + escape + restore focus when mobile panel opens
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prevActive = document.activeElement;

    const focusable = getFocusable(panel);
    if (focusable.length) focusable[0].focus();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        prevActive?.focus?.();
      }
      if (e.key === "Tab") {
        // re-calc focusable in case DOM changed
        const list = getFocusable(panel);
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      prevActive?.focus?.();
    };
  }, [open]);

  // click outside to close mobile panel
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (!panel) return;
      if (panel.contains(e.target)) return;
      if (toggle && toggle.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("touchstart", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onClick);
    };
  }, [open]);

  return (
    <header className="relative">
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.36 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/85 backdrop-blur-md border-b border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
        style={{ WebkitBackdropFilter: scrolled ? "blur(6px)" : undefined }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-24 md:h-28">
            {/* logo */}
<div className="flex-shrink-0">
  <Link to="/" className="flex items-center gap-3">
    <motion.img
      src="/logo512.png"
      alt="Antariksh Logo"
      animate={{
        scale: [1, 1.06, 1],
        y: [0, -5, 0],
        filter: [
          "drop-shadow(0px 0px 20px rgba(59,130,246,0.5))",
          "drop-shadow(0px 0px 35px rgba(59,130,246,0.9))",
          "drop-shadow(0px 0px 20px rgba(59,130,246,0.5))",
        ],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{
        scale: 1.2, // Bigger on hover
        rotate: 5,  // Slight rotation
        filter: "drop-shadow(0px 0px 50px rgba(59,130,246,1)) brightness(1.3)", // Highlight glow
      }}
      className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-44 2xl:h-52 w-auto rounded-2xl transition-all duration-300"
    />
  </Link>
</div>


            {/* desktop nav */}
            <div className="hidden md:flex items-center justify-center gap-10">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * idx, duration: 0.32 }}
                >
                  {item.dropdown ? (
                    <DesktopDropdown item={item} location={location} />
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-lg font-semibold px-2 py-1 rounded transition-colors duration-150 ${
                        location.pathname === item.path ? "text-white" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* mobile toggle */}
            <div className="md:hidden">
              <button
                ref={toggleRef}
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex items-start justify-center px-4 pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={overlayVariants}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
            />

            {/* panel */}
            <motion.div
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md mx-auto bg-gray-900/98 rounded-2xl shadow-2xl ring-1 ring-white/6 overflow-hidden max-h-[70vh] flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
            >
              <div className="px-6 py-6 flex flex-col space-y-4 overflow-y-auto">
                {navItems.map((it) =>
                  it.dropdown ? (
                    <MobileDropdown
                      key={it.name}
                      item={it}
                      location={location}
                      closeMenu={() => setOpen(false)}
                    />
                  ) : (
                    <motion.div key={it.path} variants={linkVariants}>
                      <Link
                        to={it.path}
                        onClick={() => setOpen(false)}
                        className="block text-lg font-semibold text-gray-200 hover:text-white px-3 py-3 rounded-lg transition-colors"
                      >
                        {it.name}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* spacer so page content doesn't jump under fixed nav */}
      <div style={{ height: NAV_HEIGHT }} aria-hidden />
    </header>
  );
}
