import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY || "lastSeenTechspardhaPopup";
const POPUP_INTERVAL = Number(process.env.REACT_APP_INTERVAL) || 86400;

const TechspardhaPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const timerRef = useRef(null);

  // Safe localStorage getter
  const safeGetItem = useCallback((key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("LocalStorage getItem failed:", e);
      return null;
    }
  }, []);

  // Safe localStorage setter
  const safeSetItem = useCallback((key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("LocalStorage setItem failed:", e);
    }
  }, []);

  // Handle popup close with cleanup
  const handleClose = useCallback(() => {
    setIsOpen(false);
    safeSetItem(POPUP_STORAGE_KEY, Date.now().toString());
  }, [safeSetItem]);

  // Show popup based on interval
  useEffect(() => {
    const lastSeen = safeGetItem(POPUP_STORAGE_KEY);
    const now = Date.now();
    
    if (!lastSeen || now - Number(lastSeen) > POPUP_INTERVAL) {
      timerRef.current = setTimeout(() => setIsOpen(true), 1500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [safeGetItem]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      modalRef.current.querySelectorAll(focusableSelector)
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Trap focus within modal
    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
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
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            role="alertdialog"
            aria-labelledby="popup-title"
            aria-describedby="popup-description"
          >
            <div className="relative w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center text-white overflow-hidden">
              
              {/* Floating orbs */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-400/30 rounded-full opacity-50 blur-2xl pointer-events-none"
                animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute -bottom-12 -left-12 w-24 h-24 bg-pink-400/30 rounded-full opacity-50 blur-3xl pointer-events-none"
                animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <h2 id="popup-title" className="text-3xl font-extrabold mb-4 drop-shadow-lg">
                TechSpardha 2025 is Live! 🎉
              </h2>
              <p id="popup-description" className="mb-6 text-lg drop-shadow-md">
                Registration for various exciting events is now open. Check Events Registration from event section. Don't miss out!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <a
                  href="/events"
                  onClick={handleClose}
                  className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Register Now
                </a>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Close announcement popup"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TechspardhaPopup;