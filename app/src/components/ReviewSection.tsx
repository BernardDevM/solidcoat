import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { BEFORE_AFTER_GALLERY, TESTIMONIALS } from '../data/serviceData';

export default function ReviewSection() {
  const [sliderPosition, setSliderPosition] = useState<Record<string, number>>(
    BEFORE_AFTER_GALLERY.reduce((acc, current) => ({ ...acc, [current.id]: 50 }), {})
  );

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleSliderChange = (galleryId: string, value: number) => {
    setSliderPosition(prev => ({
      ...prev,
      [galleryId]: value
    }));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="gallery" className="py-24 bg-zinc-900 text-white relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight mt-4 text-white">
            Level-5 Wall Transformations
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Witness the craftsmanship. Grab and drag the slider on any of the projects below to visualize how our skimming, repairing undercoats, and premium finishes compare against old, textured walls.
          </p>
        </div>

        {/* Before / After Interactive Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {BEFORE_AFTER_GALLERY.map((project) => {
            const val = sliderPosition[project.id] ?? 50;

            return (
              <div 
                key={project.id}
                className="flex flex-col bg-zinc-950 border border-slate-500 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all"
              >
                {/* Visual Interactor Slider Frame */}
                <div className="relative w-full aspect-[4/3] user-select-none overflow-hidden bg-zinc-900 group">
                  
                  {/* Before Image (underneath, static) */}
                  <img
                    src={project.beforeImage}
                    alt="Wall Before Finish"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                  
                  <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[9px] font-mono tracking-wider font-extrabold text-red-400">
                    BEFORE PREP
                  </div>

                  {/* After Image (cropped on top, based on slider position) */}
                  <div 
                    className="absolute inset-y-0 left-0 right-0 overflow-hidden z-10 pointer-events-none"
                    style={{ width: `${val}%` }}
                  >
                    <img
                      src={project.afterImage}
                      alt="Wall After Prep & Paint"
                      referrerPolicy="no-referrer"
                      className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none select-none"
                      // Make sure image width exactly covers container width regardless of crop clip
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    <div className="absolute top-3 left-3 z-30 px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[9px] font-mono tracking-wider font-extrabold text-teal-400">
                      AFTER LEVEL-5
                    </div>
                  </div>

                  {/* Drag Slider Overlap Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleSliderChange(project.id, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize pointer-events-auto"
                  />

                  {/* Visual sliding dividing line rule */}
                  <div 
                    className="absolute inset-y-0 z-20 w-0.5 bg-gradient-to-b from-teal-400 to-emerald-400 pointer-events-none shadow-lg shadow-teal-500/30"
                    style={{ left: `${val}%` }}
                  >
                    {/* Floating slide handle notch */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-zinc-900 border-2 border-teal-400 flex items-center justify-center shadow-lg">
                      <div className="flex gap-0.5 text-teal-400">
                        <span className="text-[8px]">❮</span>
                        <span className="text-[8px]">❯</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Info and Tags */}
                <div className="p-5 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-base text-zinc-200 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-5">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                    {project.tags.map((tg, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-semibold tracking-wider uppercase text-zinc-400 bg-zinc-900 px-2 py-1 rounded"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Testimonials Deck */}
        <div className="max-w-4xl mx-auto text-center relative bg-gradient-to-b from-zinc-950/80 to-zinc-950 border border-slate-500 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 blur-2xl pointer-events-none" />
          
          <span className="inline-flex items-center justify-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-teal-400 mb-6">
            <MessageSquare className="w-6 h-6" />
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-0.5 text-amber-400">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-0" />
                ))}
              </div>

              {/* Text */}
              <p className="font-sans font-medium text-lg sm:text-xl text-zinc-200 max-w-2xl mx-auto italic leading-relaxed">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border-2 border-zinc-800 object-cover"
                />
                <div className="text-center sm:text-left">
                  <span className="block font-bold text-sm text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </span>
                  <span className="block text-xs font-semibold text-zinc-500 font-mono mt-0.5">
                    {TESTIMONIALS[activeTestimonial].role}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Controls dials */}
          <div className="flex justify-center gap-3 mt-10">
            <button
              id="testimonial-prev-btn"
              onClick={prevTestimonial}
              className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-all focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={nextTestimonial}
              className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-all focus:outline-none"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
