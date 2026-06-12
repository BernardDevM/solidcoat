import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Loader2, Sparkles, Receipt, Calendar } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (itemId: string, newArea: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'processing' | 'success'>('review');
  const [orderId, setOrderId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const vatRate = 0.15; // 15% estimated VAT/tax
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + vatAmount;

  // Total estimate square meters in cart
  const totalSqm = cart.reduce((acc, item) => acc + item.areaSqm, 0);

  const startCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('processing');

    // Simulate scheduling block and validation
    setTimeout(() => {
      const generatedId = `COAT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Calculate a booking date (e.g. 3 days from now)
      const dateOption = new Date();
      dateOption.setDate(dateOption.getDate() + 3);
      const formattedDate = dateOption.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      setOrderId(generatedId);
      setScheduledDate(formattedDate);
      setCheckoutStep('success');
    }, 2500); // 2.5s loading animation
  };

  const handleClose = () => {
    onClose();
    // Reset state after closure
    setTimeout(() => {
      setCheckoutStep('review');
    }, 300);
  };

  const handleClearSuccess = () => {
    onClearCart();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-zinc-950 border-l border-zinc-900 text-white shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-900 bg-zinc-950/80 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-teal-400" />
                <h2 className="font-sans font-bold text-base text-zinc-100">Your Quote Box</h2>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">
                  {cart.length} items
                </span>
              </div>
              <button
                id="cart-close-btn"
                onClick={handleClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Workspace Switcher */}
            <div className="flex-1 overflow-y-auto p-6 scroller-none">
              {checkoutStep === 'review' && (
                <>
                  {cart.length > 0 ? (
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30 flex flex-col gap-3text-left"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-left">
                              <h3 className="font-sans font-bold text-sm text-zinc-200">
                                {item.title}
                              </h3>
                              {item.details.roomInfo && (
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wide">
                                  {item.details.roomInfo.dimensions}
                                </p>
                              )}
                            </div>
                            <button
                              id={`remove-cart-item-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1.5 rounded bg-zinc-900 text-zinc-500 hover:text-red-400 border border-zinc-850 hover:border-red-900/30 transition-all focus:outline-none"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Dynamic specifications details block */}
                          <div className="flex flex-wrap gap-1">
                            {item.details.options.map((opt, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] font-semibold text-teal-400 bg-teal-950/20 px-2 py-0.5 rounded border border-teal-950"
                              >
                                {opt}
                              </span>
                            ))}
                            {item.details.paintGrade && (
                              <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950">
                                {item.details.paintGrade}
                              </span>
                            )}
                          </div>

                          {/* Editable coverage bounds (Only for predefined templates) */}
                          <div className="flex items-center justify-between border-t border-zinc-900/80 pt-3 mt-1.5">
                            {item.type === 'predefined_service' ? (
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-500 font-mono font-bold">AREA:</span>
                                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                                  <button
                                    id={`cart-qty-dec-${item.id}`}
                                    onClick={() => onUpdateQty(item.id, Math.max(5, item.areaSqm - 5))}
                                    className="px-1.5 py-0.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-xs font-bold px-2 text-zinc-200">
                                    {item.areaSqm}m²
                                  </span>
                                  <button
                                    id={`cart-qty-inc-${item.id}`}
                                    onClick={() => onUpdateQty(item.id, item.areaSqm + 5)}
                                    className="px-1.5 py-0.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-zinc-500 font-mono font-bold">
                                AREA: {item.areaSqm}m² (FIXED SIZE)
                              </span>
                            )}

                            <span className="font-mono text-sm font-extrabold text-white">
                              Ksh {item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-zinc-850 rounded-2xl p-6">
                      <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-sans font-bold text-sm text-zinc-200">Your Quote Box is Empty</h3>
                        <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed mx-auto">
                          Add a custom room layout or standard operations above to build your booking invoice.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Processing Loader Animation */}
              {checkoutStep === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6 gap-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="text-teal-400"
                  >
                    <Loader2 className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-sm text-zinc-200">Processing Allocation Ledger</h3>
                    
                    <div className="space-y-1.5">
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-zinc-500 font-mono"
                      >
                        Securing high-caliber painters...
                      </motion.p>
                      <p className="text-[10px] text-zinc-650 font-mono leading-relaxed">
                        Compiling specifications: {totalSqm} sqm, Level-5 plaster verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Celebration Frame */}
              {checkoutStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6 text-left"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/5">
                      <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                    </span>
                    <span className="font-mono text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      RESERVATION BOOKED
                    </span>
                    <h3 className="font-sans font-extrabold text-lg text-white">
                      Painting Crew Allocated!
                    </h3>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-5 text-left space-y-4">
                    
                    <div className="flex items-center gap-3 text-xs text-zinc-300">
                      <Receipt className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <div>
                        <span className="block text-zinc-500 text-[10px] font-bold font-mono uppercase">ORDER ID</span>
                        <span className="block font-mono font-bold text-zinc-200">{orderId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-300">
                      <Calendar className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <div>
                        <span className="block text-zinc-500 text-[10px] font-bold font-mono uppercase">LASER SURVEY VERIFICATION</span>
                        <span className="block font-sans font-semibold text-emerald-400">{scheduledDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <span className="block font-sans font-bold text-xs text-zinc-200">Guaranteed Quote Locks</span>
                        <span className="block text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                          Your quote totals are fully locked under our Level-5 Finish guarantees. A logistics coordinator will contact you shortly to confirm timing details.
                        </span>
                      </div>
                    </div>

                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed text-center">
                    A copy of contract ledger #<b>{orderId}</b> and instructions has been dispatched to <b>zukushread@gmail.com</b>.
                  </p>

                  <button
                    id="success-dismiss-btn"
                    onClick={handleClearSuccess}
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 font-bold block transition-all"
                  >
                    Return to Landing Page
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer Summary math specs (only displayed during active review states) */}
            {checkoutStep === 'review' && cart.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-zinc-950 max-w-full space-y-4">
                
                <div className="space-y-2.5 text-xs text-zinc-400">
                  <div className="flex justify-between font-mono">
                    <span>Subtotal:</span>
                    <span className="text-zinc-200">Ksh {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between font-mono">
                    <span>Materials & Logistics:</span>
                    <span className="text-zinc-200">Ksh {(subtotal * 0.4).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (40%)</span>
                  </div>

                  <div className="flex justify-between font-mono">
                    <span>Estimated Tax (15% VAT):</span>
                    <span className="text-zinc-200">Ksh {vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="h-px bg-zinc-900 my-1" />

                  <div className="flex justify-between text-zinc-200 font-sans font-bold text-sm">
                    <span>Total Price:</span>
                    <span className="text-teal-400 font-mono font-extrabold text-base">
                      Ksh {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 rounded-lg text-[10px] font-semibold">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Fully locked price under Level-5 certification</span>
                </div>

                <button
                  id="checkout-btn"
                  onClick={startCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 hover:opacity-95 transition-all shadow-lg focus:outline-none"
                >
                  <span>Reserve Certified Construction Crew</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
