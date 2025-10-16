import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp, FaInstagram, FaPlus, FaTimes, FaRegNewspaper } from "react-icons/fa";

const FloatingButtons = () => {
  const [open, setOpen] = useState(false);
  const inactivityTimer = useRef(null);
  const wrapperRef = useRef(null);

  const INSTAGRAM_URL = "https://www.instagram.com/antariksh_nitkkr/";
  const NEWSLETTER_URL = "/teams/newsletter";

  const buttons = [
    {
      key: "top",
      label: "Go to Top",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      icon: <FaArrowUp size={18} />,
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "instagram",
      label: "Instagram",
      onClick: () => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer"),
      icon: <FaInstagram size={18} />,
      bg: "bg-pink-500 hover:bg-pink-600",
    },
    {
      key: "newsletter",
      label: "Newsletter",
      onClick: () => window.open(NEWSLETTER_URL, "_blank", "noopener,noreferrer"),
      icon: <FaRegNewspaper size={18} />,
      bg: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  //Auto-close on scroll
  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Auto-close after 5 s inactivity
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => setOpen(false), 5000);
    };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => document.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      clearTimeout(inactivityTimer.current);
      events.forEach((e) => document.removeEventListener(e, resetTimer));
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end sm:bottom-8 sm:right-8 group"
    >
      {/* Floating action group */}
      <div
        className={`
          flex flex-col items-end gap-3 mb-3 transition-all duration-300 ease-in-out
          ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
          group-hover:opacity-100 group-hover:translate-y-0
        `}
      >
        {buttons.map(({ key, label, onClick, icon, bg }) => (
          <div key={key} className="group/button relative pointer-events-auto">
            <span
              className="
                absolute right-full top-1/2 -translate-y-1/2 mr-3
                whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded
                opacity-0 group-hover/button:opacity-100 transition-opacity duration-200
              "
            >
              {label}
            </span>

            <button
              type="button"
              onClick={onClick}
              aria-label={label}
              title={label}
              className={`
                ${bg}
                text-white p-3 rounded-full shadow-lg flex items-center justify-center
                transition-all duration-300 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
              `}
            >
              {icon}
            </button>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        className={`
          bg-gradient-to-br from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          text-white p-4 rounded-full shadow-xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400
          hover:scale-110
          ${open ? "opacity-100" : "opacity-60 hover:opacity-100"}
        `}
      >
        {open ? <FaTimes size={20} /> : <FaPlus size={20} />}
      </button>
    </div>
  );
};

export default FloatingButtons;
