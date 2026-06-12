import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Paintbrush, ShieldCheck, ChevronDown, ChevronUp, Plus, Minus, Check, Sparkles, Clock } from 'lucide-react';
import { PAINTING_SERVICES } from '../data/serviceData';
import { PaintingService, ServiceCategory, CartItem } from '../../types';

interface ServiceExplorerProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function ServiceExplorer({ onAddToCart }: ServiceExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  
  // Track custom square meter quantities per service card before adding to cart
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>(
    PAINTING_SERVICES.reduce((acc, service) => ({ ...acc, [service.id]: 20 }), {})
  );

  const categories: (ServiceCategory | 'All')[] = ['All', 'Preparation', 'Finishing', 'Specialty'];

  const filteredServices = selectedCategory === 'All'
    ? PAINTING_SERVICES
    : PAINTING_SERVICES.filter(s => s.category === selectedCategory);

  const handleQtyChange = (serviceId: string, increment: boolean) => {
    setCardQuantities(prev => {
      const current = prev[serviceId] || 20;
      const next = increment ? current + 5 : Math.max(5, current - 5);
      return { ...prev, [serviceId]: next };
    });
  };

  const handleAddService = (service: PaintingService) => {
    const qty = cardQuantities[service.id] || 20;
    const price = service.pricePerSqm * qty;
    
    onAddToCart({
      title: `${service.title} Package`,
      type: 'predefined_service',
      basePrice: service.pricePerSqm,
      totalPrice: price,
      areaSqm: qty,
      details: {
        options: [...service.materialsIncluded],
        roomInfo: {
          name: 'General Living Space',
          dimensions: `${qty} Square Meters`
        }
      }
    });

    // Provide a visual splash feedback via alert banner or simple state later
  };

  return (
    <section id="services" className="py-24 bg-zinc-900 text-white relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
            Technical Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight mt-4 text-white">
            E-Commerce Operations & Painting Services
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Certified Level 5 skimming, stain-blocking barrier undercoating, custom limestone plasters, and protective exterior coats. Click any card to examine our multi-stage craftsmanship.
          </p>
        </div>

        {/* Category Selector Tab Menu */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-zinc-950/80 border border-slate-500 p-1.5 rounded-2xl max-w-lg w-full sm:w-auto overflow-x-auto scroller-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all focus:outline-none select-none ${
                    isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const qty = cardQuantities[service.id] || 20;
              const unitPrice = service.pricePerSqm;
              const totalPrice = qty * unitPrice;
              const isExpanded = expandedServiceId === service.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={service.id}
                  className="group flex flex-col rounded-2xl border border-slate-500 bg-zinc-950 hover:border-zinc-700 transition-all shadow-xl overflow-hidden"
                >
                  
                  {/* Card Header Image */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Dark gradient cast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-zinc-950/80 border border-slate-500 text-[10px] uppercase tracking-wider text-teal-400 font-bold">
                      {service.category}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="font-sans font-bold text-lg text-white leading-tight">
                        {service.title}
                      </p>
                    </div>
                  </div>

                  {/* Card Core Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-zinc-400 font-normal leading-relaxed flex-1 mb-5">
                      {service.shortDescription}
                    </p>

                    {/* Dimensions dials */}
                    <div className="bg-zinc-900 border border-slate-500 rounded-xl p-3.5 mb-5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                          COVERAGE AREA
                        </span>
                        <span className="text-zinc-200 font-sans font-bold text-sm">
                          {qty} m²
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          id={`qty-dec-${service.id}`}
                          onClick={() => handleQtyChange(service.id, false)}
                          className="p-1.5 rounded-lg border border-slate-500 bg-zinc-950 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-all focus:outline-none"
                          aria-label="Decrease area"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`qty-inc-${service.id}`}
                          onClick={() => handleQtyChange(service.id, true)}
                          className="p-1.5 rounded-lg border border-slate-500 bg-zinc-950 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-all focus:outline-none"
                          aria-label="Increase area"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                          SQM RATE
                        </span>
                        <span className="text-zinc-300 font-semibold text-xs text-left">
                          Ksh {unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}/m²
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                          EST. TOTAL PRICE
                        </span>
                        <span className="text-emerald-400 font-sans font-extrabold text-lg">
                          Ksh {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Expand Detail Sheet Toggle */}
                    <button
                      id={`expand-details-${service.id}`}
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 border-b border-zinc-900 hover:bg-zinc-900/40 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-4 focus:outline-none"
                    >
                      <span>{isExpanded ? 'Hide Specs & Workflow' : 'Show Specs & Workflow'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Expandable Craft Sheet */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden border-t border-zinc-900 pt-4 mb-4 text-left"
                        >
                          {/* Core info bullet grids */}
                          <p className="text-xs text-zinc-300 font-medium mb-3.5 bg-zinc-900/30 p-2.5 rounded border border-zinc-900">
                            {service.longDescription}
                          </p>

                          {/* Est Hours */}
                          <div className="flex items-center gap-1.5 text-xs text-teal-400 font-mono font-semibold mb-4 bg-teal-950/20 border border-teal-900/40 px-2.5 py-1.5 rounded-lg w-fit">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Approx: {(service.estimatedHoursPerSqm * qty).toFixed(1)} Labor Hours</span>
                          </div>

                          {/* Included Supplies */}
                          <span className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                            PREMIUM SUPPLIES INCLUDED
                          </span>
                          <ul className="space-y-1.5 mb-4">
                            {service.materialsIncluded.map((mat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                                <span className="text-emerald-400 mt-1 font-bold">✓</span>
                                <span>{mat}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Workflow process stages */}
                          <span className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                            PRECISE OPERATIONAL STEPS
                          </span>
                          <ol className="space-y-3">
                            {service.steps.map((stp, idx) => (
                              <li key={idx} className="flex gap-2.5 items-start pl-1 border-l-2 border-slate-500 py-0.5 hover:border-teal-500 transition-colors">
                                <span className="font-mono text-xs font-bold text-teal-400">0{idx + 1}</span>
                                <div>
                                  <span className="block font-bold text-xs text-zinc-200">{stp.title}</span>
                                  <span className="block text-[11px] text-zinc-400 font-normal mt-0.5 leading-relaxed">{stp.desc}</span>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action buttons */}
                    <button
                      id={`add-to-cart-${service.id}`}
                      onClick={() => handleAddService(service)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-slate-500 hover:border-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/50 group"
                    >
                      <Plus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-teal-400 group-hover:rotate-90 transition-all duration-300" />
                      <span>Add {qty} m² Package To Cart    </span>
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
