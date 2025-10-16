import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  User,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import { getFullDeviceInfo } from "../pages/api/getFullDeviceInfo";

const Contact = () => {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    issue: "general",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ success: false, message: "" });
  const [deviceInfo, setDeviceInfo] = useState({});

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-blue-400" />,
      label: "Email",
      value: "antariksh@nitkkr.ac.in",
      link: "mailto:antariksh@nitkkr.ac.in",
    },
    {
      icon: <FaInstagram className="text-pink-500" />,
      label: "Instagram",
      value: "@antariksh_nitkkr",
      link: "https://www.instagram.com/antariksh_nitkkr/",
    },
  ];

  // Get device info & location
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const info = await getFullDeviceInfo();
      if (info.preciseLocation && !info.preciseLocation.error) {
        const { latitude, longitude } = info.preciseLocation;
        info.mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      } else {
        info.mapLink = null;
      }
      setDeviceInfo(info);
    };
    fetchDeviceInfo();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {

    if (!formData.name || !formData.email || !formData.subject || !formData.message)
      return;

    setLoading(true);
    try {
      console.log(API_URL)
      const response = await fetch(`${API_URL}/api/services/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, deviceInfo }),
      });
      const data = await response.json();
      setPopupData({ success: data.success, message: data.message });
      setShowPopup(true);
    } catch (err) {
      setPopupData({ success: false, message: "Network error" });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <>
      <Navbar />

      <section className="relative py-24 md:py-40 px-6 md:px-20 flex justify-center items-center  text-white">
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-blue-500/20 blur-[180px] rounded-full -z-0"></div>

        {/* Glassmorphic Container */}
        <motion.div
          className="relative z-10 w-full max-w-6xl p-10 md:p-16 bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg">
            Get in <span className="text-blue-400">Touch</span>
          </h2>

          {/* Grid: Contact Info + Form */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* --- Left: Contact Info --- */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/20 rounded-2xl shadow-md hover:scale-105 transition-transform backdrop-blur-md hover:shadow-blue-400/30"
                >
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{info.label}</h3>
                    <p className="text-blue-400 text-sm md:text-base">{info.value}</p>
                  </div>
                </a>
              ))}

              <p className="mt-8 text-white/80 leading-relaxed text-sm md:text-base">
                We love connecting with fellow space enthusiasts 🌌. Reach out for collaboration, events, or astronomy discussions. Let’s explore the cosmos together!
              </p>
            </motion.div>

            {/* --- Right: Contact Form --- */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Issue Type */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Issue Type *</label>
                  <div className="relative">
                    <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
                    <select
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white cursor-pointer"
                    >
                      <option value="general" className="bg-slate-800">General Inquiry</option>
                      <option value="feedback" className="bg-slate-800">Feedback</option>
                      <option value="other" className="bg-slate-800">Other</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 py-4 font-semibold text-lg rounded-xl bg-blue-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* --- Map Below --- */}
          <div className="mt-12 h-80 w-full rounded-2xl overflow-hidden shadow-md border border-white/20 backdrop-blur-md hover:shadow-blue-400/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.635541580832!2d76.81727777544316!3d29.945690127867506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e6f9f0e8911a3%3A0x2c6c6cbbfe65e8c3!2sNational%20Institute%20of%20Technology%2C%20Kurukshetra!5e0!3m2!1sen!2sin!4v1696500456507!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIT Kurukshetra Map"
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-lg max-w-md w-full p-8 border border-white/10">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="flex justify-center mb-6">
              {popupData.success ? (
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center animate-shake">
                  <AlertCircle className="w-12 h-12 text-red-400" />
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-center mb-4 text-white">
              {popupData.success ? "Message Sent!" : "Error Occurred"}
            </h3>
            <p className="text-gray-300 text-center mb-6">{popupData.message}</p>
            <button
              onClick={closePopup}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                popupData.success ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Contact;
