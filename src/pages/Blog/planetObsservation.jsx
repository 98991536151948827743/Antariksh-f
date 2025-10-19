import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";
import Button from "../../components/ui/Button";

const PlanetObservatoryPage = () => {

const NOMINATIM_API = process.env.REACT_APP_NOMINATIM_API;
const PLANETS_API = process.env.REACT_APP_VISIBLEPLANETS_API;
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    name: "Detecting...",
  });
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [manualInput, setManualInput] = useState("");

  // 🔭 Detect current user location
  const detectLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await reverseGeocode(latitude, longitude);
          fetchPlanets(latitude, longitude);
        },
        async () => {
          // fallback to Kurukshetra
          const lat = 29.9695,
            lon = 76.8783;
          await reverseGeocode(lat, lon);
          fetchPlanets(lat, lon);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  // 🌍 Convert lat/lon to readable location
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `${NOMINATIM_API}/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      setLocation({
        latitude: lat,
        longitude: lon,
        name:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state ||
          "Unknown Location",
      });
    } catch {
      setLocation({ latitude: lat, longitude: lon, name: "Unknown" });
    }
  };

  // 🌐 Fetch visible planets from API
  const fetchPlanets = async (lat, lon) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${PLANETS_API}?latitude=${lat}&longitude=${lon}`
      );
      const data = await res.json();
      const planets = (data.data || [])
        .filter((p) => p.altitude && p.magnitude)
        .sort((a, b) => b.altitude - a.altitude);
      setPlanets(planets);
    } catch (err) {
      console.error("Error fetching planet data:", err);
      setError("Unable to load sky data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Manual location search
  const handleManualLocation = async () => {
    if (!manualInput.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${manualInput}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          name: display_name.split(",")[0],
        });
        fetchPlanets(lat, lon);
      } else {
        setError("City not found. Try again.");
        setLoading(false);
      }
    } catch {
      setError("Failed to fetch city coordinates.");
      setLoading(false);
    }
  };

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  // 🌠 Determine visibility color
  const getVisibilityStatus = (altitude) => {
    if (altitude > 30)
      return { label: "Perfect", color: "text-green-400", bg: "bg-green-400/20" };
    if (altitude > 15)
      return { label: "Good", color: "text-blue-400", bg: "bg-blue-400/20" };
    if (altitude > 5)
      return { label: "Low", color: "text-yellow-400", bg: "bg-yellow-400/20" };
    return { label: "Below Horizon", color: "text-gray-400", bg: "bg-gray-700/20" };
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {/* 🌌 HERO */}
      <section className="relative py-24 px-6 md:px-16 text-center overflow-hidden">
        <div className="absolute inset-0 blur-3xl -z-10"></div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]"
        >
          🔭 Sky Observation Center
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 max-w-3xl mx-auto text-lg mt-4"
        >
          Discover real-time visible planets above your horizon — Observed through{" "}
          <span className="text-blue-400 font-semibold">
            Telescope
          </span>
          .
        </motion.p>
      </section>

      {/* 📍 LOCATION PANEL */}
      <section className="max-w-4xl mx-auto py-10 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">
          🌍 Current Observation Point
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <input
            type="text"
            placeholder="Enter city name (e.g., Delhi)"
            className="px-4 py-3 rounded-lg border border-blue-500/40 bg-black/60 text-white w-full md:w-2/3"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
          />
          <Button variant="primary" onClick={handleManualLocation}>
            Search
          </Button>
        </div>
        <p className="text-white/70 mt-3">
          Showing planets for:{" "}
          <span className="text-blue-400 font-semibold">{location.name}</span>
        </p>
      </section>

      {/* 🪐 PLANETS DISPLAY */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-blue-400 mb-10">
          🪐 Visible Planets Tonight
        </h2>

        {loading ? (
          <div className="flex flex-col items-center py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-400 border-t-blue-400 rounded-full mb-6"
            />
            <p className="text-white/60 text-lg">Scanning your sky...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : planets.length === 0 ? (
          <p className="text-center text-white/70">
            No visible planets above the horizon at this time.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {planets.map((planet, i) => {
              const status = getVisibilityStatus(planet.altitude);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 
                    border border-white/10 hover:border-blue-400/40 transition-all backdrop-blur-lg group`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.4),transparent_70%)]"></div>
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-2xl font-bold text-blue-300">
                      {planet.name}
                    </h3>
                    <p className="text-sm text-white/60">
                      Constellation:{" "}
                      <span className="text-blue-300 font-semibold">
                        {planet.constellation || "Unknown"}
                      </span>
                    </p>
                    <div className="flex flex-col mt-3 text-white/80 text-sm space-y-1">
                      <span>Altitude: {planet.altitude.toFixed(1)}°</span>
                      <span>Azimuth: {planet.azimuth.toFixed(1)}°</span>
                      <span>
                        Brightness:{" "}
                        <span className="text-yellow-300 font-semibold">
                          {planet.magnitude}
                        </span>
                      </span>
                    </div>
                    <div
                      className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold border border-current ${status.color} ${status.bg}`}
                    >
                      {status.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 📘 INFO GUIDE */}
      <section className="py-16 px-6 bg-black/80 text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">
          🧠 Understand Your Sky
        </h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8 text-left">
          {[
            {
              icon: "📏",
              title: "Altitude",
              desc: "Height above the horizon. Positive = visible, Negative = below horizon.",
            },
            {
              icon: "🧭",
              title: "Azimuth",
              desc: "Direction in degrees — N(0°), E(90°), S(180°), W(270°).",
            },
            {
              icon: "💡",
              title: "Magnitude",
              desc: "Brightness level — smaller (or negative) = brighter planet.",
            },
            {
              icon: "✨",
              title: "Constellation",
              desc: "Star group where the planet currently appears.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 rounded-2xl border border-blue-400/20 hover:bg-white/10 transition"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PlanetObservatoryPage;
