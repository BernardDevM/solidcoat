import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Paintbrush, ShoppingBag, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { CartItem } from '../../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
}

export default function Navbar({ cart, onOpenCart, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Room Estimator', href: '#calculator' },
    { name: 'Transformations', href: '#gallery' },
    { name: 'Expert FAQs', href: '#faqs' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + (item.type === 'custom_quote' ? 1 : item.areaSqm), 0);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 96; // height of fixed tall navbar (h-24)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/80 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group focus:outline-none" onClick={(e) => handleScroll(e, '#hero')}>
            <span className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-500 text-zinc-950 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-teal-500/10">
              <Paintbrush id="logo-icon" className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-teal-400 bg-clip-text text-transparent">
                http://localhost:3000/#features
              </span>
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                Level-5 Finishing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="relative px-4 py-2 font-sans font-medium text-sm text-zinc-300 hover:text-white transition-colors duration-150 focus:outline-none"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-emerald-400 fill-current">
              <ShieldCheck id="cert-icon" className="w-4 h-4 text-emerald-400" />
              <span>Certified Insured Craft</span>
            </div>

            <a
              href="tel:+254700555COAT"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-800/40 transition-all focus:outline-none"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>+254 700 555 COAT</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              id="cart-trigger"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 group"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-200 group-hover:text-teal-400 transition-colors" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-mono font-bold text-[10px] rounded-full shadow-md border border-zinc-900"
                  >
                    {totalCartItems < 100 ? totalCartItems : '99+'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-zinc-800/80 bg-zinc-950"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`block px-4 py-3 rounded-xl font-sans text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-400 border-l-4 border-teal-400 pl-3'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
                <a
                  href="tel:+254700555COAT"
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call +254 700 555 COAT</span>
                </a>
                <div className="flex items-center justify-center gap-2 py-2.5 text-zinc-400 text-xs text-center border border-dashed border-zinc-800/50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Fully Bonded, Insured & Eco-Certified</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
