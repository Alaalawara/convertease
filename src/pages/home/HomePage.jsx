// src/pages/Home.jsx
import React from "react";
import HeroSection from "../../components/herosection/HeroSection";

const Home = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeroSection />
    </div>
  );
};

export default Home;
