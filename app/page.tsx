"use client"

import React, { useState, useEffect } from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import ServiceExplorer from './src/components/ServiceExplorer';
import WallCalculator from './src/components/WallCalculator';
import ReviewSection from './src/components/ReviewSection';
import FAQSection from './src/components/FAQSection';
import ContactSection from './src/components/ContactSection';
import CartDrawer from './src/components/CartDrawer';
import Footer from './src/components/Footer';
import { CartItem } from './types';

export default function page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Load cart from localStorage on init for premium offline persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem('luxecoats_quote_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not load cart cache', e);
    }
  }, []);

  // Sync cart into localStorage
  const syncCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('luxecoats_quote_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.warn('Could not sync cart cache', e);
    }
  };

  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    // Generate a unique ID
    const itemWithId: CartItem = {
      ...newItem,
      id: `ITEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    const nextCart = [...cart, itemWithId];
    syncCart(nextCart);
    setCartOpen(true); // Open cart drawer to give direct feedback to user
  };

  const handleUpdateQty = (itemId: string, newArea: number) => {
    const nextCart = cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          areaSqm: newArea,
          totalPrice: item.basePrice * newArea
        };
      }
      return item;
    });
    syncCart(nextCart);
  };

  const handleRemoveItem = (itemId: string) => {
    const nextCart = cart.filter((item) => item.id !== itemId);
    syncCart(nextCart);
  };

  const handleClearCart = () => {
    syncCart([]);
  };

  // Scroll spy to update navbar visual highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'calculator', 'gallery', 'faqs', 'contact'];
      // Offset slightly to trigger active states early
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility to scroll to section
  const handleScrollToId = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const topOffset = 96;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="pagelet-container" className="min-h-screen bg-zinc-950 text-white selection:bg-teal-400 selection:text-zinc-950 font-sans antialiased">
      
      {/* 20px dynamic color border accent line at very top */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-500 w-full fixed top-0 z-50 pointer-events-none" />

      {/* Floating Header Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Pages stack */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onEstimateClick={() => handleScrollToId('#calculator')}
          onExploreClick={() => handleScrollToId('#services')}
        />

        {/* Services / Operations Catalog Grid */}
        <ServiceExplorer onAddToCart={handleAddToCart} />

        {/* Dynamic Interactive Estimate Calculator */}
        <WallCalculator onAddToCart={handleAddToCart} />

        {/* Before/After Transformation slider and reviews */}
        <ReviewSection />

        {/* Structured Searchable Accordion FAQs */}
        <FAQSection />

        {/* Dynamic Project Inquiry Forms */}
        <ContactSection />
      </main>

      {/* Modern responsive slide-over Cart drawer with checkout flows */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer detailing coordinates and environment bounds */}
      <Footer />

    </div>
  );
}
