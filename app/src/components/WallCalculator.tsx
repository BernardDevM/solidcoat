import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, Plus, Minus, ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { CustomQuoteConfig, CartItem } from '../../types';

interface WallCalculatorProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function WallCalculator({ onAddToCart }: WallCalculatorProps) {
  const [roomName, setRoomName] = useState('Master Bedroom');
  const [width, setWidth] = useState(4.0); // meters
  const [length, setLength] = useState(5.0); // meters
  const [height, setHeight] = useState(2.8); // meters
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [numDoors, setNumDoors] = useState(1);
  const [numWindows, setNumWindows] = useState(2);
  
  const [includeUndercoat, setIncludeUndercoat] = useState(true);
  const [includeSkimming, setIncludeSkimming] = useState(false);
  
  const [paintGrade, setPaintGrade] = useState<'standard' | 'premium' | 'eco_luxe'>('premium');

  // Math Calculations
  const [areaReport, setAreaReport] = useState({
    grossWalls: 0,
    ceiling: 0,
    deductions: 0,
    netArea: 0,
    totalPrice: 0,
    laborHours: 0
  });

  const [checkoutNotice, setCheckoutNotice] = useState(false);

  useEffect(() => {
    // 1. Gross Wall Area = Perimeter * Height
    const perimeter = (width * 2) + (length * 2);
    const grossWalls = perimeter * height;

    // 2. Ceiling Area
    const ceiling = includeCeiling ? (width * length) : 0;

    // 3. Deductions (Doors = 2 sqm, Windows = 1.5 sqm)
    const deductions = (numDoors * 2.0) + (numWindows * 1.5);

    // 4. Net Paintable Area
    const netArea = Math.max(5.0, (grossWalls + ceiling) - deductions);

    // 5. Rates building (Localized in Kenyan Shillings - Ksh)
    let baseRate = 1200; // standard painting base per sqm
    if (paintGrade === 'premium') baseRate += 250;
    if (paintGrade === 'eco_luxe') baseRate += 500;

    if (includeUndercoat) baseRate += 850; // undercoating rate
    if (includeSkimming) baseRate += 1400; // skimming rate

    const totalPrice = netArea * baseRate;

    // 6. Labor Hours
    let hoursPerSqm = 0.4; // base painting
    if (includeUndercoat) hoursPerSqm += 0.25;
    if (includeSkimming) hoursPerSqm += 0.6;
    const laborHours = netArea * hoursPerSqm;

    setAreaReport({
      grossWalls,
      ceiling,
      deductions,
      netArea,
      totalPrice,
      laborHours
    });
  }, [width, length, height, includeCeiling, numDoors, numWindows, includeUndercoat, includeSkimming, paintGrade]);

  const handleAddCalculatedQuote = () => {
    const options: string[] = [];
    if (includeUndercoat) options.push('Certified Seal-Lock Undercoating');
    if (includeSkimming) options.push('Level 5 Plaster Skim Finish');
    if (includeCeiling) options.push('Ceiling Coat Integration');
    
    let gradeLabel = 'Eco-Friendly Low-VOC Satin';
    if (paintGrade === 'premium') gradeLabel = 'Premium Stain-Resistant Washable';
    if (paintGrade === 'eco_luxe') gradeLabel = 'Eco-Luxe Pure Air Allergen-Free Matte';
    
    onAddToCart({
      title: `Custom Quote: ${roomName}`,
      type: 'custom_quote',
      basePrice: areaReport.totalPrice / areaReport.netArea,
      totalPrice: areaReport.totalPrice,
      areaSqm: Math.round(areaReport.netArea),
      details: {
        roomInfo: {
          name: roomName,
          dimensions: `${length}m x ${width}m x ${height}m (${Math.round(areaReport.netArea)} m² Net Paintable Area)`
        },
        options: options,
        paintGrade: gradeLabel
      }
    });

    setCheckoutNotice(true);
    setTimeout(() => {
      setCheckoutNotice(false);
    }, 4500);
  };

  const resetCalculator = () => {
    setRoomName('Office Room');
    setWidth(4.0);
    setLength(3.5);
    setHeight(2.7);
    setIncludeCeiling(false);
    setNumDoors(1);
    setNumWindows(1);
    setIncludeUndercoat(true);
    setIncludeSkimming(false);
    setPaintGrade('premium');
  };

  return (
    <section id="calculator" className="py-24 bg-zinc-950 text-white relative">
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            E-Commerce Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight mt-4 text-white">
            Digital Room Project Estimator
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            No blind flat-rate quotes. Dial in length, height, windows, and doors to calculate laser-exact material and operational labor costs. Transparent pricing, always.
          </p>
        </div>

        {/* Core Estimator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-slate-500 rounded-2xl p-6 sm:p-8 space-y-8">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3 className="font-sans font-bold text-lg text-white">Configure Your Spaces</h3>
              </div>
              <button 
                onClick={resetCalculator}
                className="flex items-center gap-1 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-950 px-2.5 py-1 rounded-lg border border-slate-500"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset parameters</span>
              </button>
            </div>

            {/* Room Identifier Label */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                ROOM LABEL / IDENTIFIER
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g., Master Bedroom"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 text-sm font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Dimensional Dials */}
            <div>
              <span className="block font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5">
                ROOM GEOMETRY (METERS)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Length */}
                <div className="flex flex-col gap-2.5 bg-zinc-950/50 p-4 border border-slate-500 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-bold">LENGTH</span>
                    <span className="text-zinc-200 font-mono font-extrabold">{length.toFixed(1)}m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer h-1.5 rounded-lg bg-zinc-800"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>2m</span>
                    <span>15m</span>
                  </div>
                </div>

                {/* Width */}
                <div className="flex flex-col gap-2.5 bg-zinc-950/50 p-4 border border-slate-500 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-bold">WIDTH</span>
                    <span className="text-zinc-200 font-mono font-extrabold">{width.toFixed(1)}m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer h-1.5 rounded-lg bg-zinc-800"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>2m</span>
                    <span>15m</span>
                  </div>
                </div>

                {/* Height */}
                <div className="flex flex-col gap-2.5 bg-zinc-950/50 p-4 border border-slate-500 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-bold">WALL HEIGHT</span>
                    <span className="text-zinc-200 font-mono font-extrabold">{height.toFixed(1)}m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="4.5"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer h-1.5 rounded-lg bg-zinc-800"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>2m</span>
                    <span>4.5m</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Subtracting Structures */}
            <div>
              <span className="block font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                DEDUCT HOLES & OPENINGS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Doors (-2.0 sqm) */}
                <div className="flex items-center justify-between bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-300">Doors</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Subtracts 2.0 m² each</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumDoors(Math.max(0, numDoors - 1))}
                      className="p-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-sm text-zinc-100 min-w-4 text-center">{numDoors}</span>
                    <button
                      onClick={() => setNumDoors(Math.min(10, numDoors + 1))}
                      className="p-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Windows (-1.5 sqm) */}
                <div className="flex items-center justify-between bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-300">Windows</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Subtracts 1.5 m² each</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumWindows(Math.max(0, numWindows - 1))}
                      className="p-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-sm text-zinc-100 min-w-4 text-center">{numWindows}</span>
                    <button
                      onClick={() => setNumWindows(Math.min(15, numWindows + 1))}
                      className="p-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Preparation Modules */}
            <div>
              <span className="block font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                OPERATIONAL BASE OPERATIONS
              </span>

              <div className="space-y-3.5">
                
                {/* Undercoat Service Option */}
                <label className="flex items-start gap-3.5 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-950 cursor-pointer select-none transition-all">
                  <input
                    type="checkbox"
                    checked={includeUndercoat}
                    onChange={(e) => setIncludeUndercoat(e.target.checked)}
                    className="mt-1 accent-teal-400 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-zinc-200">Seal-Lock Adhesion Undercoat</span>
                      <span className="text-xs font-mono font-bold text-teal-400">+Ksh 850/m²</span>
                    </div>
                    <span className="block text-[11px] text-zinc-400 font-normal mt-1">
                      Critical stain-blocking barrier sealer recommended for drywall paper, repairing zones, or dramatic color shifts.
                    </span>
                  </div>
                </label>

                {/* Skimming Option */}
                <label className="flex items-start gap-3.5 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-950 cursor-pointer select-none transition-all">
                  <input
                    type="checkbox"
                    checked={includeSkimming}
                    onChange={(e) => setIncludeSkimming(e.target.checked)}
                    className="mt-1 accent-teal-400 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-zinc-200">Level-5 Drywall Plaster Skimming</span>
                      <span className="text-xs font-mono font-bold text-teal-400">+Ksh 1,400/m²</span>
                    </div>
                    <span className="block text-[11px] text-zinc-400 font-normal mt-1">
                      Dual trowel application to mechanically level out bumps, physical drywall shadows, and guarantee absolute flat planes.
                    </span>
                  </div>
                </label>

                {/* Ceiling Coverage Option */}
                <label className="flex items-start gap-3.5 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-950 cursor-pointer select-none transition-all">
                  <input
                    type="checkbox"
                    checked={includeCeiling}
                    onChange={(e) => setIncludeCeiling(e.target.checked)}
                    className="mt-1 accent-teal-400 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-zinc-200">Coat Ceiling Space Too</span>
                      <span className="text-xs font-mono font-semibold text-zinc-400">Adds ceiling area sqm</span>
                    </div>
                    <span className="block text-[11px] text-zinc-400 font-normal mt-1">
                      Adds `length * width` area ({width * length} m²) to the project and coats ceiling with high-shading dead flats.
                    </span>
                  </div>
                </label>

              </div>
            </div>

            {/* Material/Paint Grades */}
            <div>
              <span className="block font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                CHOOSE FINISHING PAINT GRADE FORMULATION
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Standard Grade */}
                <button
                  id="grade-std"
                  onClick={() => setPaintGrade('standard')}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                    paintGrade === 'standard'
                      ? 'bg-zinc-950 border-teal-500/80'
                      : 'bg-zinc-950/40 border-slate-500 hover:bg-zinc-950'
                  }`}
                >
                  <span className="text-xs font-bold text-zinc-200">Standard Base</span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1">Satin Acrylic Finish</span>
                  <span className="text-xs font-bold text-zinc-400 mt-3 font-mono">Included</span>
                </button>

                {/* Premium Grade */}
                <button
                  id="grade-prem"
                  onClick={() => setPaintGrade('premium')}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                    paintGrade === 'premium'
                      ? 'bg-zinc-950 border-teal-500/80 shadow-lg shadow-teal-500/5'
                      : 'bg-zinc-950/40 border-slate-500 hover:bg-zinc-950'
                  }`}
                >
                  <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
                    <span>Premium Wash</span>
                    <Sparkles className="w-3 h-3 text-teal-400" />
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1">Stain-blocking Velvety Matte</span>
                  <span className="text-xs font-bold text-teal-400 mt-3 font-mono">+Ksh 250 / m²</span>
                </button>

                {/* Eco Luxe Grade */}
                <button
                  id="grade-eco"
                  onClick={() => setPaintGrade('eco_luxe')}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                    paintGrade === 'eco_luxe'
                      ? 'bg-zinc-950 border-emerald-500/80 shadow-lg shadow-emerald-500/5'
                      : 'bg-zinc-950/40 border-slate-500 hover:bg-zinc-950'
                  }`}
                >
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span>Eco-Luxe Pure</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1">Allergen-Free Micro Guard</span>
                  <span className="text-xs font-bold text-emerald-400 mt-3 font-mono">+Ksh 500 / m²</span>
                </button>

              </div>
            </div>

          </div>

          {/* Report Summary Dashboard (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Calculation Card */}
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">
                  PROJECT SPECIFICATION REPORT
                </span>
                <h4 className="font-sans font-bold text-lg text-white mt-1">
                  {roomName || 'Unnamed Custom Room'}
                </h4>
              </div>

              {/* Area breakdown parameters */}
              <div className="space-y-3 font-mono text-xs">
                
                <div className="flex justify-between items-center text-zinc-500">
                  <span>Gross Wall Area:</span>
                  <span className="text-zinc-300 font-semibold">{areaReport.grossWalls.toFixed(1)} m²</span>
                </div>

                {includeCeiling && (
                  <div className="flex justify-between items-center text-zinc-500">
                    <span>Ceiling (Flat):</span>
                    <span className="text-zinc-300 font-semibold">{areaReport.ceiling.toFixed(1)} m²</span>
                  </div>
                )}

                {areaReport.deductions > 0 && (
                  <div className="flex justify-between items-center text-red-400/80">
                    <span>Deductions (doors/windows):</span>
                    <span className="font-semibold">-{areaReport.deductions.toFixed(1)} m²</span>
                  </div>
                )}

                <div className="h-px bg-zinc-850 my-2" />

                <div className="flex justify-between items-center text-zinc-300">
                  <span className="font-bold text-sm">Net Paintable Area:</span>
                  <span className="text-teal-400 font-extrabold text-sm">{Math.round(areaReport.netArea)} m²</span>
                </div>

                <div className="flex justify-between items-center text-zinc-500">
                  <span>Estimated labor hours:</span>
                  <span className="text-zinc-300 font-semibold">{areaReport.laborHours.toFixed(1)} hrs</span>
                </div>
              </div>

              {/* Laser Estimate Price Display */}
              <div className="bg-zinc-950/60 rounded-xl p-5 border border-dashed border-slate-500 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-mono font-extrabold uppercase text-zinc-500 tracking-wider">
                    CALCULATED QUOTE
                  </span>
                  <span className="block text-3xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 mt-1">
                    Ksh {areaReport.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                  Ksh {(areaReport.totalPrice / areaReport.netArea).toFixed(2)}/m² avg
                </span>
              </div>

              {/* Formulas Display math box */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-lg border border-zinc-900 bg-zinc-950/20 text-[10px] text-zinc-500">
                <AlertCircle className="w-4 h-4 text-zinc-650 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-mono">
                  Formula: Wall Area (Height: {height}m × Perimeter: {((width * 2) + (length * 2)).toFixed(1)}m) {includeCeiling ? `+ Ceiling: ${(width * length).toFixed(1)}m²` : ''} - Openings Deduction: {areaReport.deductions}m² = {areaReport.netArea.toFixed(1)}m² net.
                </p>
              </div>

              {/* Checkout Notification Bar */}
              {checkoutNotice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-emerald-950/40 border border-emerald-800/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300"
                >
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3.5] flex-shrink-0" />
                  <p>Added custom {Math.round(areaReport.netArea)} m² {roomName} quote to cart successfully!</p>
                </motion.div>
              )}

              {/* Primary action */}
              <button
                id="add-custom-quote-btn"
                onClick={handleAddCalculatedQuote}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 hover:opacity-95 transition-all shadow-lg shadow-teal-500/10 focus:outline-none focus:ring-2 focus:ring-teal-400 group"
              >
                <span>Add Customized Room Project to Cart</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Certifications Card */}
            <div className="bg-zinc-900 border border-slate-500 rounded-xl p-5 flex items-center gap-4 text-left">
              <span className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400">
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
              </span>
              <div>
                <span className="block font-sans font-bold text-sm text-zinc-200">Luxe Coats Integrity Guarantee</span>
                <span className="block text-xs text-zinc-400 mt-1 leading-relaxed">
                  Every calculated quote includes a free physical digital 3D-laser scan check to guarantee ultimate dimensions alignment on-site.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
