import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Sparkles, ShieldAlert, MessageSquarePlus } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'residential',
    estimatedArea: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    
    // Simulate API storage / server response delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Cleanup/reset form options
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        projectType: 'residential',
        estimatedArea: '',
        message: ''
      });

      // Clear success notification banner after 6s
      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white relative">
      {/* Visual background gradient blur blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
            Inquiries & Bookings
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight mt-4 text-white">
            Get in touch for bespoke finishes
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Have a structural skimming project, complex level-5 commercial undercoating, or boutique Venetian plaster layout? Let our certified crew evaluate your space.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Informative column (5 columns) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="bg-zinc-950/80 border border-slate-500  p-6 sm:p-8 rounded-xl space-y-6">
              <h3 className="font-sans font-bold text-lg text-white">
                Contact Coordinates
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect directly with our master operations division. Based in Nairobi, servicing premium high-end residential estates, commercial facilities, and architectural builds across the country.
              </p>

              <div className="h-px bg-zinc-850/80 my-4" />

              <div className="space-y-4">
                
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-teal-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">OFFICE HQ</span>
                    <span className="block text-zinc-200 text-sm font-semibold mt-0.5">Luxe Coats Design Studio</span>
                    <span className="block text-zinc-400 text-xs mt-0.5 leading-relaxed">Westlands Commercial Boulevard, Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-teal-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CALL CENTER</span>
                    <a href="tel:+254700555COAT" className="block text-zinc-200 text-sm font-bold mt-0.5 hover:text-teal-400 transition-colors">
                      +254 700 555 COAT
                    </a>
                    <span className="block text-zinc-400 text-[10px] mt-0.5 font-mono">Toll-free across Kenya</span>
                  </div>
                </div>

                {/* Email Coordinates */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-teal-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">PROJECT LEAD INTAKE</span>
                    <a href="mailto:projects@luxecoats.co.ke" className="block text-zinc-200 text-sm font-semibold mt-0.5 hover:text-teal-400 transition-colors">
                      projects@luxecoats.co.ke
                    </a>
                    <span className="block text-zinc-400 text-xs mt-0.5 font-sans">Guaranteed reply under 4 hours</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quality Commitment details */}
            <div className="bg-zinc-950/40 border border-slate-500 p-6 rounded-2xl flex gap-4 items-start">
              <span className="p-2 bg-teal-950/20 border border-teal-900/40 rounded-xl text-teal-400">
                <Clock className="w-5 h-5" />
              </span>
              <div>
                <span className="block text-xs font-bold text-zinc-200">Express Response Commitment</span>
                <span className="block text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Our professional surveying painters process estimator requests within the same day. All bookings are locked to guarantee timely arrivals.
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-slate-500 p-6 rounded-2xl flex gap-4 items-start">
              <span className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="block text-xs font-bold text-zinc-200">Certified Level-5 Finish Guarantee</span>
                <span className="block text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Every contract or invoice on this web-ledger guarantees that plaster skimming and fine coat layers pass international flatness regulations.
                </span>
              </div>
            </div>

          </div>

          {/* Contact Form column (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-slate-500 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-900 pb-4">
              <MessageSquarePlus className="w-5 h-5 text-teal-400" />
              <h3 className="font-sans font-bold text-base text-white">Project Inquiry Form</h3>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-full text-emerald-400 shadow-lg shadow-emerald-500/10 scale-110">
                      <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                    </span>
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full tracking-wider uppercase">
                      MESSAGE TRANSMITTED
                    </span>
                    <h4 className="font-sans font-extrabold text-2xl text-white">
                      Thank You!
                    </h4>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                      We have received your custom painting project details. A certified Luxe Coats advisor is assigning an estimator and will call you in a few minutes.
                    </p>
                  </div>

                  <div className="h-px bg-zinc-900 max-w-sm mx-auto" />

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        FULL NAME *
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g., Joseph Kamau"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        EMAIL COORDINATES *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., joseph@domain.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Expected Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        TELEPHONE (LINE)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., +254 712 345 678"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        ESTIMATED WALL AREA (SQM)
                      </label>
                      <input
                        type="number"
                        name="estimatedArea"
                        value={formData.estimatedArea}
                        onChange={handleInputChange}
                        placeholder="e.g., 150"
                        min="1"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      PRIMARY PROJECT TYPE
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                    >
                      <option value="residential">High-End Residential Estate Painting</option>
                      <option value="skimming_only">Wall Plaster Skimming (Level 5)</option>
                      <option value="undercoat_only">Moisture-Blocker Priming & Undercoating</option>
                      <option value="venetian_specialty">Exquisite Venetian Plaster Accent Panel</option>
                      <option value="commercial">Commercial / Institutional Facade Coating</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      PROJECT DESCRIPTION / INSTRUCTIONS
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Detail any requirements such as water damage correction, moisture sealer coats, drywall repairs, preferred color themes, or structural heights..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-zinc-600 leading-relaxed resize-none"
                    />
                  </div>

                  {/* Privacy safety note */}
                  <div className="flex items-start gap-2 text-[10px] text-zinc-500 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
                    <ShieldAlert className="w-3.5 h-3.5 text-zinc-650 flex-shrink-0 mt-0.5" />
                    <span>
                      We strictly respect your information security coordinates. By clicking dispatch, your details are only used to contact you regarding Luxe Coats design estimates.
                    </span>
                  </div>

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 font-bold hover:opacity-95 transition-all shadow-lg shadow-teal-500/10 focus:outline-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="border-2 border-zinc-950 border-t-transparent rounded-full w-4 h-4"
                        />
                        <span>Dispatching coordinates...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Project Inquiry Details</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
