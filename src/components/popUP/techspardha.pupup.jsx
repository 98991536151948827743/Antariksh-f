import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_STORAGE_KEY = process.env.REACT_APP_POPUP_STORAGE_KEY;
const POPUP_INTERVAL = Number(process.env.REACT_APP_POPUP_INTERVAL);


const TechspardhaPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Safe localStorage getter
  const safeGetItem = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("LocalStorage getItem failed:", e);
      return null;
    }
  };

  // Safe localStorage setter
  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("LocalStorage setItem failed:", e);
    }
  };

  // Show popup based on interval
  useEffect(() => {
    const lastSeen = safeGetItem(POPUP_STORAGE_KEY);
    const now = Date.now();
    if (!lastSeen || now - Number(lastSeen) > POPUP_INTERVAL) {
      const timer = setTimeout(() => setIsOpen(true), 1500); // 1.5s delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    safeSetItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
    if (focusableElements?.length) focusableElements[0].focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <div className="relative w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center text-white overflow-hidden">

              {/* Gradient glass card */}
              <div className="absolute inset-0 rounded-3xl "></div>

              <h2 className="text-3xl font-extrabold mb-4 drop-shadow-lg">
                TechSpardha 2025 is Live! 🎉
              </h2>
              <p className="mb-6 text-lg drop-shadow-md">
                Registration for various exciting events is now open. Check Events Registration from event section .Don’t miss out!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/events"
                  className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-white/30 transition-all"
                >
                  Register Now
                </a>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full font-semibold shadow-lg transition-all"
                >
                  Close
                </button>
              </div>

              {/* Floating orbs*/}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-400/30 rounded-full opacity-50 blur-2xl"
                animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-12 -left-12 w-24 h-24 bg-pink-400/30 rounded-full opacity-50 blur-3xl"
                animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TechspardhaPopup;
