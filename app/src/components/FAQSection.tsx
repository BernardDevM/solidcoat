import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-react';
import { FAQS } from '../data/serviceData';


export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'process' | 'pricing' | 'care'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'process', label: 'Technical Process' },
    { id: 'pricing', label: 'Pricing & Guarantee' },
    { id: 'care', label: 'Wall Care & Cure' },
    { id: 'booking', label: 'Ordering & Scheduling' },
  ];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-zinc-950 text-white relative">
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
            Expert Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight mt-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Learn more about plastering curing states, zero-VOC formulation selections, stain blocking capabilities, and online ordering processes.
          </p>
        </div>

        {/* Dynamic Controls: Category Tags & Search Box */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 w-full">
          <div className="flex bg-zinc-900 border border-slate-500 p-1 rounded-xl overflow-x-auto w-full md:w-auto scroller-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setOpenFaqId(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap select-none transition-all focus:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-300 font-medium focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>

        {/* Accordion FAQ Board */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq: any) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <motion.div
                    layout
                    key={faq.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-slate-500 hover:border-zinc-700 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 transition-all overflow-hidden"
                  >
                    {/* Header trigger button */}
                    <button
                      id={`faq-trigger-${faq.id}`}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:text-teal-400 transition-colors"
                    >
                      <div className="flex gap-3.5 items-start">
                        <HelpCircle id={`faq-q-icon-${faq.id}`} className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="font-sans font-bold text-sm sm:text-base text-zinc-200">
                          {faq.question}
                        </span>
                      </div>
                      
                      <span className="ml-4 flex-shrink-0 text-zinc-500">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* Expandable answer panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-zinc-900 bg-zinc-950/40"
                        >
                          <p className="p-5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 border border-dashed border-zinc-850 rounded-xl">
                <span className="block text-zinc-500 font-mono text-xs">NO RESULTS MATCHING "{searchQuery}"</span>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
