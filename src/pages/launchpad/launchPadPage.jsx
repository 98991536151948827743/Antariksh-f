import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaBuilding, FaInfoCircle } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";
import Button from "../../components/ui/Button";

const LaunchPadPage = () => {
  const [launches, setLaunches] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [loading, setLoading] = useState(true);


const API_URL = process.env.REACT_APP_LAUNCH;
useEffect(() => {
  const fetchLaunches = async () => {
    try {
      if (!API_URL) {
        console.warn('REACT_APP_LAUNCH is not defined!');
        return;
      }
      const res = await fetch(API_URL);
      const data = await res.json();
      setLaunches(data.results || []);
    } catch (err) {
      console.error('Error fetching launches:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchLaunches();
}, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit",
      timeZoneName: "short"
    });
  };

  const getCountdown = (dateString) => {
    const now = new Date();
    const launch = new Date(dateString);
    const diff = launch - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `T-${days}d ${hours}h`;
    if (hours > 0) return `T-${hours}h`;
    return "Soon";
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, launches.length));
  };

  return (
    <div className="min-h-screen  text-white">
     <Navbar/>
      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <FaRocket className="text-white text-3xl" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
            🚀 Launch Timeline
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-blue-200/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Witness humanity's next steps into space — explore upcoming rocket launches around the world in real time
          </motion.p>
        </motion.div>

        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full blur-sm"
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full blur-sm"
          animate={{ y: [0, 50, 0], x: [0, -40, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      {/* Timeline Section */}
      <section className="relative py-12 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mb-4"
              />
              <p className="text-blue-300 text-xl">Fetching launch data...</p>
              <p className="text-white/50 mt-2">Loading upcoming missions</p>
            </div>
          ) : (
            <>
              <div className="space-y-10">
                {launches.slice(0, visibleCount).map((launch, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <motion.div
                      key={launch.id}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`flex flex-col md:flex-row ${
                        isLeft ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <motion.div
                        onClick={() => setSelectedLaunch(launch)}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="cursor-pointer relative w-full md:w-7/12 lg:w-6/12 group"
                      >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Card */}
                        <div className="relative bg-gradient-to-br from-[#0b1120]/70 via-[#111a2e]/70 to-[#0a0f1e]/70 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:border-blue-400/30 transition-all duration-300">
                          {/* Countdown Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              <FaClock className="text-xs" />
                              {getCountdown(launch.net)}
                            </span>
                          </div>

                          {/* Launch Name */}
                          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 mb-4 pr-24 leading-tight group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                            {launch.name}
                          </h3>

                          {/* Info Grid */}
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <FaCalendarAlt className="text-blue-400 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Launch Date</p>
                                <p className="text-white font-semibold">{formatDate(launch.net)}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <FaClock className="text-purple-400 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Launch Time</p>
                                <p className="text-white font-semibold">{formatTime(launch.net)}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <FaRocket className="text-blue-400 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Rocket</p>
                                <p className="text-white font-semibold">
                                  {launch.rocket?.configuration?.full_name || 
                                   launch.rocket?.configuration?.name || 
                                   "Unknown"}
                                </p>
                              </div>
                            </div>

                            {launch.launch_service_provider && (
                              <div className="flex items-start gap-3">
                                <FaBuilding className="text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-white/50 text-xs uppercase tracking-wider">Provider</p>
                                  <p className="text-white font-semibold">
                                    {launch.launch_service_provider.name}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-start gap-3">
                              <FaMapMarkerAlt className="text-pink-400 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Launch Site</p>
                                <p className="text-white font-semibold">
                                  {launch.pad?.name || "Unknown"}
                                </p>
                                {launch.pad?.location?.name && (
                                  <p className="text-white/60 text-sm">
                                    {launch.pad.location.name}
                                  </p>
                                )}
                              </div>
                            </div>

                            {launch.mission?.name && (
                              <div className="flex items-start gap-3">
                                <FaInfoCircle className="text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-white/50 text-xs uppercase tracking-wider">Mission</p>
                                  <p className="text-white font-semibold">
                                    {launch.mission.name}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Status Badge */}
                          {launch.status?.name && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                launch.status.name === "Go" 
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              }`}>
                                Status: {launch.status.name}
                              </span>
                            </div>
                          )}

                          {/* Hover Gradient Line */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-blue-500 to-purple-100 rounded-b-2xl"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {visibleCount < launches.length && (
                <motion.div 
                  className="flex justify-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={handleLoadMore}
                    className="group relative bg-blue-300 text-white font-bold py-4 px-10 rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Load More Launches
                      <motion.span
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ↓
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <p className="absolute mt-20 text-white/40 text-sm">
                    Showing {visibleCount} of {launches.length} launches
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal for Launch Details */}
      <AnimatePresence>
        {selectedLaunch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLaunch(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto pt-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#0b1120] via-[#111a2e] to-[#0a0f1e] backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-4xl w-full border border-blue-500/30 shadow-2xl mb-8"
            >
              {/* Images */}
              {selectedLaunch.image && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={selectedLaunch.image}
                  alt={selectedLaunch.name}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-xl"
                />
              )}

              <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-450 to-blue-500 mb-6 leading-tight">
                {selectedLaunch.name}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <InfoItem 
                    icon={<FaCalendarAlt />} 
                    label="Launch Date" 
                    value={formatDate(selectedLaunch.net)} 
                  />
                  <InfoItem 
                    icon={<FaClock />} 
                    label="Launch Time" 
                    value={formatTime(selectedLaunch.net)} 
                  />
                  <InfoItem 
                    icon={<FaRocket />} 
                    label="Rocket" 
                    value={selectedLaunch.rocket?.configuration?.full_name || "Unknown"} 
                  />
                </div>
                
                <div className="space-y-3">
                  {selectedLaunch.launch_service_provider && (
                    <InfoItem 
                      icon={<FaBuilding />} 
                      label="Provider" 
                      value={selectedLaunch.launch_service_provider.name} 
                    />
                  )}
                  <InfoItem 
                    icon={<FaMapMarkerAlt />} 
                    label="Launch Pad" 
                    value={selectedLaunch.pad?.name || "Unknown"} 
                  />
                  {selectedLaunch.pad?.location?.name && (
                    <InfoItem 
                      icon={<FaMapMarkerAlt />} 
                      label="Location" 
                      value={selectedLaunch.pad.location.name} 
                    />
                  )}
                </div>
              </div>

              {selectedLaunch.mission?.description && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
                  <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                    <FaInfoCircle /> Mission Description
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {selectedLaunch.mission.description}
                  </p>
                </div>
              )}

              {selectedLaunch.pad?.map_image && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={selectedLaunch.pad.map_image}
                  alt="Launch site"
                  className="w-full h-48 object-cover rounded-xl mb-6 shadow-lg"
                />
              )}

              {/* Links Section */}
              {(selectedLaunch.rocket?.configuration?.wiki_url || 
                selectedLaunch.pad?.wiki_url || 
                selectedLaunch.launch_service_provider?.wiki_url ||
                selectedLaunch.url) && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
                  <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                    <FaInfoCircle /> Quick Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedLaunch.rocket?.configuration?.wiki_url && (
                      <a
                        href={selectedLaunch.rocket.configuration.wiki_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-blue-500/20 hover:from-blue-500/30 hover:to-blue-500/30 border border-blue-500/30 text-white-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        🚀 Rocket Wiki
                      </a>
                    )}
                    {selectedLaunch.pad?.wiki_url && (
                      <a
                        href={selectedLaunch.pad.wiki_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        📍 Launch Pad Wiki
                      </a>
                    )}
                    {selectedLaunch.launch_service_provider?.wiki_url && (
                      <a
                        href={selectedLaunch.launch_service_provider.wiki_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        🏢 Provider Wiki
                      </a>
                    )}

                  </div>
                </div>
              )}

              <Button
                onClick={() => setSelectedLaunch(null)}
                className="w-full "
              >
                Close Details
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
    <span className="text-blue-400 text-lg mt-0.5">{icon}</span>
    <div>
      <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

export default LaunchPadPage;