"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize2, Minimize2, Compass } from "lucide-react";
import * as THREE from "three";
import siteConfig from "@/data/site";

// TODO: These equirectangular panoramas in /public/panoramas/ are high-resolution sample placeholders.
// The client must replace /public/panoramas/{suite,rooftop,lobby,balcony}.jpg with real 2:1 equirectangular spherical photos before official launch.

export default function VirtualTourSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const animFrameId = useRef<number | null>(null);

  // Interaction coordinates
  const isUserInteracting = useRef(false);
  const onMouseDownMouseX = useRef(0);
  const onMouseDownMouseY = useRef(0);
  const onMouseDownLon = useRef(0);
  const onMouseDownLat = useRef(0);
  const lon = useRef(0);
  const lat = useRef(0);

  const tabs = siteConfig.virtualTour.tabs;
  const currentTour = tabs[activeTab];

  // Initialize Three.js scene once
  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Clear previous canvas if any
    canvasContainer.innerHTML = "";
    canvasContainer.appendChild(renderer.domElement);

    // Inverted sphere for 360 panorama projection
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);
    textureLoader.load(currentTour.image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      sphereMeshRef.current = mesh;
      scene.add(mesh);
      setIsLoading(false);
    });

    // Animation loop
    const render = () => {
      if (isAutoRotating && !isUserInteracting.current) {
        lon.current += 0.08;
      }

      lat.current = Math.max(-80, Math.min(80, lat.current));
      const phi = THREE.MathUtils.degToRad(90 - lat.current);
      const theta = THREE.MathUtils.degToRad(lon.current);

      cameraTargetRef.current.x = 500 * Math.sin(phi) * Math.cos(theta);
      cameraTargetRef.current.y = 500 * Math.cos(phi);
      cameraTargetRef.current.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(cameraTargetRef.current);
      renderer.render(scene, camera);

      animFrameId.current = requestAnimationFrame(render);
    };
    render();

    // Handle Resize
    const handleResize = () => {
      if (!canvasContainer || !camera || !renderer) return;
      const w = canvasContainer.clientWidth;
      const h = canvasContainer.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      if (canvasContainer) canvasContainer.innerHTML = "";
    };
  }, []);

  // Update texture when active tab changes
  useEffect(() => {
    if (!sphereMeshRef.current) return;
    setIsLoading(true);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(currentTour.image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      if (sphereMeshRef.current) {
        (sphereMeshRef.current.material as THREE.MeshBasicMaterial).map = texture;
        (sphereMeshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
      setIsLoading(false);
    });
  }, [activeTab, currentTour.image]);

  // Pointer Interaction Handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    isUserInteracting.current = true;
    onMouseDownMouseX.current = clientX;
    onMouseDownMouseY.current = clientY;
    onMouseDownLon.current = lon.current;
    onMouseDownLat.current = lat.current;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isUserInteracting.current) return;
    lon.current = (onMouseDownMouseX.current - clientX) * 0.15 + onMouseDownLon.current;
    lat.current = (clientY - onMouseDownMouseY.current) * 0.15 + onMouseDownLat.current;
  };

  const handlePointerUp = () => {
    isUserInteracting.current = false;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <section id="virtual-tour" className="py-14 md:py-20 bg-[#1B1B4B] text-white overflow-hidden relative scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A24B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        
        {/* Standard Section Header - Clean one line title, degree sign never wraps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] mb-2 block">
            IMMERSIVE VIRTUAL TOUR
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-white leading-tight">
            Explore the Hotel <span className="whitespace-nowrap">in 360°</span>
          </h2>
          <p className="text-[15px] sm:text-base text-slate-300 mt-2 font-normal">
            Interact with real 360° spherical views of our suites, rooftop cafe, and Himalayan balconies.
          </p>
        </motion.div>

        {/* Tab Selector Buttons - Centered below header */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === idx
                  ? "bg-[#C9A24B] text-white shadow-md shadow-[#C9A24B]/30 scale-105"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* 360 Equirectangular Viewport: 480px Desktop, 360px Mobile */}
        <div
          ref={containerRef}
          className="relative w-full h-[360px] md:h-[480px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black select-none group"
        >
          {/* Canvas container */}
          <div
            ref={canvasContainerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 1) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={handlePointerUp}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-none z-20">
              <div className="flex items-center gap-3 bg-black/80 px-4 py-2 rounded-full border border-white/20 text-xs text-white">
                <Compass className="w-4 h-4 text-[#C9A24B] animate-spin" />
                <span>Loading 360° Panorama...</span>
              </div>
            </div>
          )}

          {/* Drag to Explore Pill Hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium text-white/90 flex items-center gap-2 pointer-events-none z-10">
            <Compass className="w-3.5 h-3.5 text-[#C9A24B] animate-spin-slow" />
            <span className="whitespace-nowrap">Drag to explore in 360°</span>
          </div>

          {/* Controls: Auto-rotate & Fullscreen */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isAutoRotating ? "Pause auto-rotation" : "Start auto-rotation"}
              title={isAutoRotating ? "Pause rotation" : "Start auto-rotation"}
            >
              {isAutoRotating ? <Pause className="w-4 h-4 text-[#C9A24B]" /> : <Play className="w-4 h-4 text-white" />}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#C9A24B]" /> : <Maximize2 className="w-4 h-4 text-white" />}
            </button>
          </div>

          {/* Small Caption Card at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-white/15 pointer-events-auto z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] block">
              {currentTour.subtitle}
            </span>
            <h3 className="font-serif font-semibold text-base sm:text-lg text-white mt-0.5">
              {currentTour.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {currentTour.caption}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
