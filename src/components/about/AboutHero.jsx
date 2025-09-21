import React, { useState, useRef, useEffect } from "react";
import useAos from "../../hooks/useAos";

// Modern 3D Interactive Visual Component
const Interactive3DVisual = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation based on mouse position from the center
    const rotateY = (mouseX / width - 0.5) * -20; // Max rotation of 20 degrees
    const rotateX = (mouseY / height - 0.5) * 20; // Max rotation of 20 degrees

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center relative"
      style={{ perspective: "1200px" }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-aqua/20 via-transparent to-neon-lilac/20 rounded-3xl blur-3xl scale-110 opacity-60"></div>
      
      {/* Main 3D Container */}
      <div
        className="relative w-full max-w-lg h-[500px] transition-all duration-500 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(0)`,
        }}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Floating Icons */}
          <div className={`absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-electric-aqua to-electric-aqua/60 rounded-2xl flex items-center justify-center transition-all duration-700 ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          <div className={`absolute top-16 right-12 w-12 h-12 bg-gradient-to-br from-neon-lilac to-neon-lilac/60 rounded-xl flex items-center justify-center transition-all duration-700 delay-100 ${isHovered ? 'scale-110 -rotate-12' : 'scale-100 rotate-0'}`}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          
          <div className={`absolute bottom-20 left-12 w-14 h-14 bg-gradient-to-br from-electric-aqua/80 to-neon-lilac/80 rounded-2xl flex items-center justify-center transition-all duration-700 delay-200 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          
          <div className={`absolute bottom-8 right-8 w-10 h-10 bg-gradient-to-br from-neon-lilac/80 to-electric-aqua/80 rounded-xl flex items-center justify-center transition-all duration-700 delay-300 ${isHovered ? 'scale-110 -rotate-6' : 'scale-100 rotate-0'}`}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Central Main Visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative w-80 h-80 transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}>
            {/* Central Brain/AI Visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-aqua/20 via-neon-lilac/20 to-electric-aqua/20 rounded-full blur-sm"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-electric-aqua/30 via-neon-lilac/30 to-electric-aqua/30 rounded-full blur-sm"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-electric-aqua/40 via-neon-lilac/40 to-electric-aqua/40 rounded-full blur-sm"></div>
            
            {/* Central Core */}
            <div className="absolute inset-16 bg-gradient-to-br from-white/90 via-electric-aqua/90 to-neon-lilac/90 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-electric-aqua to-neon-lilac rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            {/* Orbiting Elements */}
            <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-electric-aqua rounded-full transition-all duration-1000 ${isHovered ? 'animate-spin' : ''}`}></div>
            <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-lilac rounded-full transition-all duration-1000 delay-500 ${isHovered ? 'animate-spin' : ''}`}></div>
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-electric-aqua/80 rounded-full transition-all duration-1000 delay-250 ${isHovered ? 'animate-spin' : ''}`}></div>
            <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-neon-lilac/80 rounded-full transition-all duration-1000 delay-750 ${isHovered ? 'animate-spin' : ''}`}></div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#40e0d0" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#9c27b0" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <path
              d="M 50 50 Q 200 100 350 50"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className={`transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
            />
            <path
              d="M 50 350 Q 200 300 350 350"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className={`transition-all duration-1000 delay-200 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
            />
            <path
              d="M 50 50 Q 200 200 50 350"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className={`transition-all duration-1000 delay-400 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
            />
            <path
              d="M 350 50 Q 200 200 350 350"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className={`transition-all duration-1000 delay-600 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const AboutHero = () => {
  useAos();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-aqua/5 via-transparent to-neon-lilac/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(64,224,208,0.1),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(156,39,176,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left Column: Enhanced Text Content */}
          <div className="relative z-10 pt-16 lg:pt-0" data-aos="fade-right">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-aqua/20 to-neon-lilac/20 backdrop-blur-sm border border-electric-aqua/30 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-electric-aqua rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-electric-aqua">Our Mission</span>
            </div>
            
            <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Where{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-electric-aqua via-neon-lilac to-electric-aqua bg-clip-text text-transparent animate-gradient-flow">
                  Curiosity Meets
                </span>
                <span className="absolute inset-0 blur-xl opacity-30 animate-gradient-flow bg-gradient-to-r from-electric-aqua via-neon-lilac to-electric-aqua bg-clip-text text-transparent" aria-hidden="true"></span>
              </span>{" "}
              <span className="bg-gradient-to-r from-neon-lilac to-electric-aqua bg-clip-text text-transparent">
                Clarity
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed mb-8">
              We're reimagining education for the AI age, empowering learners to
              explore, personalize, and master knowledge.
            </p>
            
            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-electric-aqua to-neon-lilac text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-electric-aqua/25">
                <span className="relative z-10">Explore Our Vision</span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border border-electric-aqua/30 text-electric-aqua font-semibold rounded-2xl backdrop-blur-sm hover:bg-electric-aqua/10 transition-all duration-300 hover:border-electric-aqua/50">
                Learn More
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-electric-aqua rounded-full"></div>
                <span>AI-Powered Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-lilac rounded-full"></div>
                <span>Personalized Education</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced 3D Visual */}
          <div
            className="relative h-full w-full min-h-[500px] lg:min-h-[600px]"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <Interactive3DVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
