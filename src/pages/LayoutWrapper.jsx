import React from "react";
import { Outlet } from "react-router-dom";
import StarBackground from "../components/layout/StarBackground";

const LayoutWrapper = () => (
  <div className="relative min-h-screen overflow-hidden ">
    {/* 🌌 Global Moving Star Background */}
    <StarBackground />

    {/* Page Content */}
    <main className="flex-grow relative z-10">
      <Outlet />
    </main>
  </div>
);

export default LayoutWrapper;