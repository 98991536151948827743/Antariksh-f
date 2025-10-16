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
import { getFullDeviceInfo } from "./getFullDeviceInfo";

const ContactPage = () => {
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

  // Get device info & precise location
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
    const API_URL = process.env.REACT_APP_BACKEND_API_URL;
    console.log("API URL:", API_URL);
    if (!formData.name || !formData.email || !formData.subject || !formData.message)
      return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/services/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, deviceInfo }),
      });

      const data = await response.json();
      setPopupData({ success: data.success, message: data.message });
      setShowPopup(true);
    } catch {
      setPopupData({ success: false, message: "Network error" });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center px-4 py-16 text-white">
      <motion.div
        className="w-full max-w-2xl p-10 md:p-14 bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-lg">
          Get in <span className="text-blue-400">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Full Name *
            </label>
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Email *
            </label>
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Phone
            </label>
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Issue Type *
            </label>
            <div className="relative">
              <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
              <select
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 text-white cursor-pointer"
              >
                <option value="general" className="bg-slate-800">
                  General Inquiry
                </option>
                <option value="feedback" className="bg-slate-800">
                  Feedback
                </option>
                <option value="other" className="bg-slate-800">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Subject *
            </label>
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Message *
            </label>
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
          className="w-full mt-6 py-4 font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
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

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-lg max-w-md w-full p-8 border border-white/10">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
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
                popupData.success
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
