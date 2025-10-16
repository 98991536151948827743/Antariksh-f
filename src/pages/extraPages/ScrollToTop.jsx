// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait a tiny bit if you have page transitions
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
