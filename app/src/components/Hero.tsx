import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Plus, Image as ImageIcon, Video, ArrowDown, ChevronRight, Calculator, Check } from 'lucide-react';

interface HeroProps {
  onEstimateClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onEstimateClick, onExploreClick }: HeroProps) {
  const [activeMedia, setActiveMedia] = useState<'video' | 'picture'>('video');

  const specialties = [
    'Zero-Dust Plaster Skimming',
    'High-Adhesion Stain-Blocking Undercoats',
    'Premium Acrylic Topcoat Pigmenting',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-zinc-950 overflow-hidden"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[30%] right-[20%] w-[35%] h-[35%] rounded-full bg-teal-500/5 blur-[100px] mix-blend-screen" />
        
        {/* Subtle grid lines matching our premium style */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left: Information and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-xs text-teal-400 font-semibold uppercase tracking-wider mb-6 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Surface Finishing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              The Science of <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                Flawless Surfaces
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed mb-8"
            >
              From certified structural skim-coating prep to luxurious, pigment-rich topcoats, pre-calculate, customize, and order high-end painting operations with transparent square-meter pricing.
            </motion.p>

            {/* Specialties Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-3.5 mb-10"
            >
              {specialties.map((spec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-400">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="text-sm font-medium text-zinc-200">{spec}</span>
                </div>
              ))}
            </motion.div>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                id="hero-estimator-btn"
                onClick={onEstimateClick}
                className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 hover:opacity-95 transition-all shadow-lg shadow-teal-500/10 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <Calculator className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform" />
                <span>Estimate Your Walls</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-services-btn"
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/55 transition-all focus:outline-none"
              >
                <span>Explore Painting Operations</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Right: Modern Media Deck */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full aspect-[4/3] sm:aspect-[16:12] max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden group"
            >
              {/* Media Container */}
              <div className="absolute inset-0 w-full h-full z-10 bg-black">
                <AnimatePresence mode="wait">
                  {activeMedia === 'video' ? (
                    <motion.div
                      key="hero-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <video
                        src="https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-with-a-roller-41398-large.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/10" />
                      
                      {/* Video source overlay badge */}
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur border border-zinc-800 text-[10px] font-mono font-medium text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        LIVE WALKTHROUGH
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hero-picture"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src="/src/assets/images/hero_painting_banner_1780668160976.png"
                        alt="Luxurious Sage Green Wall Finish"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/10" />
                      
                      {/* Picture description badge */}
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur border border-zinc-800 text-[10px] font-mono font-medium text-zinc-400">
                        MATTE SAGE GREEN FINISH
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Media Selection Hub Overlay */}
              <div className="absolute top-4 right-4 z-20 flex bg-zinc-950/70 backdrop-blur border border-zinc-800/80 rounded-xl p-1 shadow-lg">
                <button
                  id="media-toggle-video"
                  onClick={() => setActiveMedia('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-all ${
                    activeMedia === 'video'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video</span>
                </button>
                <button
                  id="media-toggle-picture"
                  onClick={() => setActiveMedia('picture')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-all ${
                    activeMedia === 'picture'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Render</span>
                </button>
              </div>
            </motion.div>

            {/* Absolute Decorative Floating Elements */}
            <div className="absolute -bottom-6 -left-6 z-20 w-36 p-4 rounded-xl border border-slate-500 bg-zinc-900/90 backdrop-blur shadow-xl hidden sm:block">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                  PREPARATION LEVEL
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                  </div>
                  <span className="font-mono font-bold text-xs text-white">L5</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-medium">Glass-Smooth Slate</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bounce scroll design element */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <a href="#services" className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
