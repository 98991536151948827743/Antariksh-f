import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UploadPage = () => {
    const API_URL = process.env.REACT_APP_BACKEND_API_URL;
  // Hardcoded credentials (same as backend)
  const ADMIN_USERNAME = "admin123";
  const ADMIN_PASSWORD = "secret@123";

  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      toast.success("Login successful!");
      setAuth(true);
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    setLoading(true);
    try {
        console.log(API_URL)
      const res = await axios.post(`${API_URL}/api/pdf/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
        },
      });
      toast.success("PDF uploaded successfully!");
      console.log("Uploaded PDF:", res.data);
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      if (!err.response) {
        toast.error("Network error: Could not connect to server");
      } else if (err.response.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Upload failed: Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Glassmorphism wrapper style
  const glassStyle = "bg-white/10 backdrop-blur-md shadow-lg border border-white/20 p-8 rounded-2xl w-full max-w-md";

  if (!auth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-cyan-900">
        <Toaster />
        <div className={glassStyle}>
          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-white/30 bg-white/20 text-white p-2 rounded mb-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/30 bg-white/20 text-white p-2 rounded mb-4 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Toaster />
      <div className={glassStyle}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">Upload PDF</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter PDF title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-white/30 bg-white/20 text-white p-2 rounded placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-white/30 bg-white/20 text-white p-2 rounded placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
