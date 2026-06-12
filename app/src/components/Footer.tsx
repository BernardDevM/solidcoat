import React, { useState } from 'react';
import { Paintbrush, Send, ShieldCheck, Mail, MapPin, Phone, HelpCircle, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');  
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 85;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 font-sans relative">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] pointer-events-none" />

      {/* Newsletter signup container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Email dispatch (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <h4 className="font-sans font-bold text-lg text-white mb-2">
              Stay Informed on Wall Specifications
            </h4>
            <p className="text-xs text-zinc-400 mb-6 max-w-sm font-normal leading-relaxed">
              Subscribe to receive curated newsletters detailing plaster curing properties, new wall finishes, and periodic seasonal coupon codes.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-zinc-900 border border-slate-500 rounded-sm pl-4 pr-12 py-3.5 text-xs text-zinc-200 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <button
                type="submit"
                id="newsletter-submit-btn"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 hover:opacity-90 transition-opacity focus:outline-none"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Subscription successful! Coupon dispatching.</span>
              </p>
            )}
          </div>

          {/* Directory map layout (7 cols grid list) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            
            {/* Column 1: Core Operations */}
            <div className="flex flex-col gap-3">
              <h5 className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Our operations
              </h5>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#services" onClick={(e) => handleScrollToSegment(e, '#services')} className="hover:text-white transition-colors">
                    Undercoating Sealer
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleScrollToSegment(e, '#services')} className="hover:text-white transition-colors">
                    Drywall Skimming
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleScrollToSegment(e, '#services')} className="hover:text-white transition-colors">
                    Interior Satin topcoat
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleScrollToSegment(e, '#services')} className="hover:text-white transition-colors">
                    Elastomeric Coating
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Interactive estimators */}
            <div className="flex flex-col gap-3">
              <h5 className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                E-Commerce
              </h5>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#calculator" onClick={(e) => handleScrollToSegment(e, '#calculator')} className="hover:text-white transition-colors">
                    Room Estimator
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => handleScrollToSegment(e, '#gallery')} className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#faqs" onClick={(e) => handleScrollToSegment(e, '#faqs')} className="hover:text-white transition-colors">
                    Process and Care FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Logistics contact */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h5 className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Corporate Hub
              </h5>
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 mt-0.5" />
                  <span className="leading-relaxed">Westlands Commercial Boulevard, Nairobi, Kenya</span>
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>+254 700 555 COAT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>projects@luxecoats.co.ke</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Credentials and regulatory specs block */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Paintbrush className="w-4 h-4" />
            </span>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-sm tracking-wide text-white">Luxe Coats Finishing</span>
              <span className="text-[10px] text-zinc-600 font-mono">KE registered contractor NCS-3024 • NCA Certified Level-5</span>
            </div>
          </div>

          {/* Environmental certification logos */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-mono font-semibold text-zinc-500">
            <div className="flex items-center gap-1 bg-zinc-900/40 border border-zinc-900 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>EPA Lead-Safe Certified</span>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/40 border border-zinc-900 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Low-VOC Eco Guard</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="text-center pt-12 border-t border-zinc-900 mt-12 text-[10px] font-mono text-zinc-600">
          <p>© {new Date().getFullYear()} Luxe Painting Services E-Commerce Group. All Rights Reserved. Engineered with Level-5 Premium Standards.</p>
        </div>

      </div>
    </footer>
  );
}
