import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { 
  Beaker, 
  Paintbrush, 
  Droplet, 
  Sparkles, 
  RotateCcw, 
  ShoppingBag,
  Info
} from 'lucide-react';

interface PaintMixerWidgetProps {
  navigateTo: (tab: string, productId?: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
}

export default function PaintMixerWidget({ navigateTo, addToCart }: PaintMixerWidgetProps) {
  // Sliders range from 0 to 10
  const [crimsonVal, setCrimsonVal] = useState<number>(4);
  const [phthaloVal, setPhthaloVal] = useState<number>(0);
  const [cadmiumVal, setCadmiumVal] = useState<number>(4);
  const [whiteVal, setWhiteVal] = useState<number>(2);
  const [blackVal, setBlackVal] = useState<number>(0);

  const [customName, setCustomName] = useState<string>('Sunset Orange');
  const [showFormulaToast, setShowFormulaToast] = useState<boolean>(false);

  // Base Pigment RGBs
  const pCrimson = [225, 24, 46];    // Red
  const pPhthalo = [8, 55, 160];     // Blue
  const pCadmium = [255, 204, 0];    // Yellow
  const pWhite = [255, 255, 255];    // White
  const pBlack = [18, 18, 18];       // Black

  // Computed Mixed Color
  const [mixHex, setMixHex] = useState<string>('#FF7F00');
  const [mixRgb, setMixRgb] = useState<string>('rgb(255, 127, 0)');

  // Dynamic automatic names
  const getColorName = (r: number, b: number, y: number, w: number, k: number): string => {
    if (r === 0 && b === 0 && y === 0 && w === 0 && k === 0) return "Titanium Clear";
    if (w > 0 && r === 0 && b === 0 && y === 0 && k === 0) return "Chalk Alabaster Opaque";
    if (k > 0 && r === 0 && b === 0 && y === 0 && w === 0) return "Lamp Obsidian Black";
    
    const sum = r + b + y + w + k;
    const pr = r / sum;
    const pb = b / sum;
    const py = y / sum;
    const pw = w / sum;
    const pk = k / sum;

    // High White blends
    if (pw > 0.5) {
      if (pr > 0.1 && py > 0.1) return "Soft Peach Pastura";
      if (pb > 0.1 && py > 0.1) return "Misty Seafoam Green";
      if (pr > 0.1) return "Pastel Blossom Rose";
      if (pb > 0.1) return "Atmospheric Slate Blue";
      if (py > 0.1) return "Creamy Alabaster Custard";
      return "Premium Gesso Matte White";
    }

    // High Black blends
    if (pk > 0.5) {
      if (pr > 0.1) return "Volcanic Crimson Charcoal";
      if (pb > 0.1) return "Abyssal Midnight Navy";
      if (py > 0.1) return "Burnt Umber Bronze";
      return "Lamp Obsidian Gray Tint";
    }

    const totalColor = r + b + y;
    if (totalColor > 0) {
      const cr = r / totalColor;
      const cb = b / totalColor;
      const cy = y / totalColor;

      // Pure red dominant
      if (cr > 0.6) {
        if (cy > 0.25) return "Vibrant Cadmium Saffron";
        if (cb > 0.25) return "Deep Burgundy Mulberry";
        return "Spectrum Alizarin Scarlet";
      }
      // Pure blue dominant
      if (cb > 0.6) {
        if (cy > 0.25) return "Lush Celtic Cerulean";
        if (cr > 0.25) return "Imperial Royal Amethyst";
        return "Phthalo Marine Cobalt";
      }
      // Pure yellow dominant
      if (cy > 0.6) {
        if (cr > 0.25) return "Indian Sunset Apricot";
        if (cb > 0.25) return "Light Chartreuse Olive";
        return "Empire Cadmium Gold";
      }

      // Middle blends
      // Red + Yellow equal
      if (Math.abs(cr - cb) < 0.25 && Math.abs(cr - cy) < 0.25) {
        return "Studio Earth Ochre";
      }
      if (Math.abs(cr - cy) < 0.25 && cr > 0.3) {
        return "Solar Sunset Terracotta";
      }
      if (Math.abs(cb - cy) < 0.25 && cb > 0.3) {
        return "Deep Forest Pine Jade";
      }
      if (Math.abs(cr - cb) < 0.25 && cr > 0.3) {
        return "Noble Plum Indigo";
      }
    }

    return "Artisan Palette Clay";
  };

  // Perform mixing calculations
  useEffect(() => {
    const totalColorParts = crimsonVal + phthaloVal + cadmiumVal;
    let mr = 245, mg = 245, mb = 245;

    if (totalColorParts > 0) {
      // 1. Direct weighted average of primary colors
      mr = (crimsonVal * pCrimson[0] + phthaloVal * pPhthalo[0] + cadmiumVal * pCadmium[0]) / totalColorParts;
      mg = (crimsonVal * pCrimson[1] + phthaloVal * pPhthalo[1] + cadmiumVal * pCadmium[1]) / totalColorParts;
      mb = (crimsonVal * pCrimson[2] + phthaloVal * pPhthalo[2] + cadmiumVal * pCadmium[2]) / totalColorParts;

      // 2. Real paint subtractive blend emulation
      // Yellow + Blue -> vibrancy green boost
      if (cadmiumVal > 0 && phthaloVal > 0) {
        const ratioY = cadmiumVal / (cadmiumVal + phthaloVal);
        const greenFactor = 1 - Math.abs(ratioY - 0.5) * 2; // peaks at equal mix
        mg = mg + greenFactor * 42; 
        mr = mr - greenFactor * 25;
      }
      // Red + Yellow -> vibrancy orange boost
      if (crimsonVal > 0 && cadmiumVal > 0) {
        const ratioR = crimsonVal / (crimsonVal + cadmiumVal);
        const orangeFactor = 1 - Math.abs(ratioR - 0.5) * 2;
        mg = mg + orangeFactor * 18;
      }
    }

    const totalParts = crimsonVal + phthaloVal + cadmiumVal + whiteVal + blackVal;
    if (totalParts > 0) {
      if (totalColorParts === 0) {
        // Just mixing White and Black
        const sumWK = whiteVal + blackVal;
        mr = (whiteVal * pWhite[0] + blackVal * pBlack[0]) / sumWK;
        mg = (whiteVal * pWhite[1] + blackVal * pBlack[1]) / sumWK;
        mb = (whiteVal * pWhite[2] + blackVal * pBlack[2]) / sumWK;
      } else {
        // Blending white/black values into color
        const wFrac = whiteVal / totalParts;
        const kFrac = blackVal / totalParts;
        const cFrac = 1 - wFrac - kFrac;

        mr = mr * cFrac + pWhite[0] * wFrac + pBlack[0] * kFrac;
        mg = mg * cFrac + pWhite[1] * wFrac + pBlack[1] * kFrac;
        mb = mb * cFrac + pWhite[2] * wFrac + pBlack[2] * kFrac;
      }

      // Bound and round
      mr = Math.min(255, Math.max(0, Math.round(mr)));
      mg = Math.min(255, Math.max(0, Math.round(mg)));
      mb = Math.min(255, Math.max(0, Math.round(mb)));
    }

    const hex = "#" + ((1 << 24) + (mr << 16) + (mg << 8) + mb).toString(16).slice(1).toUpperCase();
    setMixHex(hex);
    setMixRgb(`rgb(${mr}, ${mg}, ${mb})`);

    // Only update custom name dynamically if user hasn't typed their own wild label
    const autoName = getColorName(crimsonVal, phthaloVal, cadmiumVal, whiteVal, blackVal);
    setCustomName(autoName);
  }, [crimsonVal, phthaloVal, cadmiumVal, whiteVal, blackVal]);

  const handleReset = () => {
    setCrimsonVal(4);
    setPhthaloVal(0);
    setCadmiumVal(4);
    setWhiteVal(2);
    setBlackVal(0);
  };

  const handleAddToCart = () => {
    // Generate a beautiful custom paint jar product
    const customId = `custom-pigment-${Date.now()}`;
    const descFormula = `Crimson: ${crimsonVal} parts, Phthalo Blue: ${phthaloVal} parts, Cadmium Yellow: ${cadmiumVal} parts, Titanium White: ${whiteVal} parts, Carbon Black: ${blackVal} parts`;
    
    const customProduct: Product = {
      id: customId,
      name: `Studio Jar: ${customName}`,
      category: 'customized',
      categoryLabel: 'Customized Paint Jars',
      description: `A unique artist paint formulated live by you in our Paint Mixology Lab. Blended manually by our fine chemistry lab team. Formula ratio: [${descFormula}]. Wet-sealed in a 50ml premium glass jar with a hand-labeled gloss cover.`,
      price: 45.00,
      rating: 5.0,
      reviewsCount: 1,
      images: [
        'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
      ],
      sku: `ART-MIX-${customId.slice(-6).toUpperCase()}`,
      availability: 'in-stock',
      stockCount: 1,
      specs: {
        materials: `Custom hand-poured gum arabic or acrylic polymer carrier, pure organic mineral pigments`,
        dimensions: `Glass studio jar: 6.2cm height, 4.5cm diameter. Capacity: 50ml`,
        usage: `Compatible for heavy brushwork or washing detailing. Perfect on stretched canvas, clay, wood, or premium heavy post-presses.`
      },
      artistLevel: 'all',
      tags: ['custom', 'customised', 'pigment', 'mixology', 'unique', 'paint', 'jelly', 'jar']
    };

    addToCart(customProduct, 1);
    setShowFormulaToast(true);
    setTimeout(() => {
      setShowFormulaToast(false);
    }, 4000);
  };

  return (
    <div id="mixer-lab-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch mt-8 bg-slate-950 p-6 sm:p-8 rounded-[2.5rem] border border-slate-800">
      
      {/* 1. LEFT FORMULATIONS ADJUSTMENT RAIL (Col Span 7) */}
      <div id="mixer-lab-sliders" className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest font-mono select-none">
            Adjust Pigment Tube Ratios
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mt-1">
            Squeeze Paint Ratios
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg font-sans">
            Shift the tubes below to adjust the ratio parts of our raw historical and organic pigments. Your canvas preview on the right will update instantaneously.
          </p>
        </div>

        {/* Sliders Stacks */}
        <div className="space-y-4 pt-1">
          {/* TUBE A: Alizarin Crimson */}
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col space-y-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1.5 h-full bg-[#E3122E] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-200 uppercase font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3122E] shrink-0" />
                Alizarin Crimson (Primary Red)
              </span>
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-0.5 rounded font-bold">
                {crimsonVal} parts
              </span>
            </div>
            <input 
              id="slider-crimson"
              type="range" 
              min="0" 
              max="10" 
              value={crimsonVal}
              onChange={(e) => setCrimsonVal(parseInt(e.target.value))}
              className="w-full accent-[#E3122E] cursor-pointer h-1.5 bg-slate-800 rounded-full"
            />
          </div>

          {/* TUBE B: Phthalo Cobalt Blue */}
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col space-y-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1.5 h-full bg-[#0837A0] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-200 uppercase font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0837A0] shrink-0" />
                Phthalo Blue (Primary Cobalt)
              </span>
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-0.5 rounded font-bold">
                {phthaloVal} parts
              </span>
            </div>
            <input 
              id="slider-phthalo"
              type="range" 
              min="0" 
              max="10" 
              value={phthaloVal}
              onChange={(e) => setPhthaloVal(parseInt(e.target.value))}
              className="w-full accent-[#0837A0] cursor-pointer h-1.5 bg-slate-800 rounded-full"
            />
          </div>

          {/* TUBE C: Cadmium Yellow */}
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col space-y-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1.5 h-full bg-[#FFCC00] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-200 uppercase font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] shrink-0" />
                Cadmium Yellow (Brilliant Raw)
              </span>
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-0.5 rounded font-bold">
                {cadmiumVal} parts
              </span>
            </div>
            <input 
              id="slider-cadmium"
              type="range" 
              min="0" 
              max="10" 
              value={cadmiumVal}
              onChange={(e) => setCadmiumVal(parseInt(e.target.value))}
              className="w-full accent-[#FFCC00] cursor-pointer h-1.5 bg-slate-800 rounded-full"
            />
          </div>

          {/* TUBE D: Titanium White */}
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col space-y-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1.5 h-full bg-white opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-200 uppercase font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-700 shrink-0" />
                Titanium White (Opaque Body)
              </span>
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-0.5 rounded font-bold">
                {whiteVal} parts
              </span>
            </div>
            <input 
              id="slider-white"
              type="range" 
              min="0" 
              max="10" 
              value={whiteVal}
              onChange={(e) => setWhiteVal(parseInt(e.target.value))}
              className="w-full accent-white cursor-pointer h-1.5 bg-slate-800 rounded-full"
            />
          </div>

          {/* TUBE E: Carbon Shadow Black */}
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col space-y-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1.5 h-full bg-[#1A1A1A] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-200 uppercase font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] shrink-0" />
                Carbon Black (Shadow Density)
              </span>
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-0.5 rounded font-bold">
                {blackVal} parts
              </span>
            </div>
            <input 
              id="slider-black"
              type="range" 
              min="0" 
              max="10" 
              value={blackVal}
              onChange={(e) => setBlackVal(parseInt(e.target.value))}
              className="w-full accent-slate-300 cursor-pointer h-1.5 bg-slate-800 rounded-full"
            />
          </div>
        </div>

        {/* Action button bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] sm:text-xs">
            <Info className="w-4 h-4 text-violet-500 shrink-0" />
            <span className="font-sans leading-relaxed">
              Formulated as heavy body acrylic chemistry.
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors py-2 px-3.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Ratios
          </button>
        </div>
      </div>

      {/* 2. RIGHT LIVE PREVIEW CANVAS COLUMN (Col Span 5) */}
      <div id="mixer-lab-canvas" className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-slate-100 relative">
        
        {/* Dynamic Canvas Splash */}
        <div className="text-center">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono">
            Direct Wet Canvas Preview
          </span>
          
          <div className="aspect-[1.3/1] relative flex items-center justify-center rounded-2xl bg-slate-950/80 border border-slate-800 mt-3 overflow-hidden shadow-inner group">
            {/* Swirling pattern behind the splash */}
            <div className="absolute inset-0 bg-slate-900 opacity-20 pointer-events-none" />
            
            {/* The major fluid paint swatch */}
            <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] relative z-10 transition-all duration-300 transform group-hover:scale-105 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
              {/* Dynamic paint splash path with custom fill */}
              <path 
                d="M 50,20 
                   C 65,15 80,30 85,45 
                   C 90,60 70,75 55,82 
                   C 40,89 25,80 18,65 
                   C 10,50 35,25 50,20 Z" 
                fill={mixHex} 
                className="transition-all duration-500" 
              />
              <path 
                d="M 30,35
                   C 25,30 15,40 18,50
                   C 20,55 35,40 30,35 Z" 
                fill={mixHex} 
                opacity="0.8"
                className="transition-all duration-500"
              />
              <circle cx="75" cy="25" r="4" fill={mixHex} className="transition-all duration-500" />
              <circle cx="82" cy="62" r="3" fill={mixHex} className="transition-all duration-500" />
              <circle cx="28" cy="74" r="5" fill={mixHex} className="transition-all duration-500" />
              
              {/* Overlay sheen highlight inside the wet splash */}
              <path 
                d="M 45,26 
                   C 53,23 62,28 65,34" 
                stroke="rgba(255, 255, 255, 0.25)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none" 
              />
            </svg>

            {/* Custom Formula Overlaid Tag */}
            <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-[10px] font-mono px-2.5 py-1.5 rounded-lg text-slate-300">
              {crimsonVal}:{phthaloVal}:{cadmiumVal}:{whiteVal}:{blackVal} Blend ratio
            </div>
          </div>
        </div>

        {/* Dynamic labels outputs */}
        <div className="space-y-3.5 pt-2">
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">
              Color Name Designation
            </label>
            <input 
              id="mixer-color-name"
              type="text" 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Amber Moss Aura"
              className="bg-slate-900 focus:bg-slate-950 border border-slate-800 focus:border-violet-500 text-white font-bold text-lg px-3 py-1.5 mt-1 rounded-xl outline-none w-full transition-all"
            />
          </div>

          {/* Code data tags */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-900/50 border border-slate-800/80 p-2.5 rounded-xl">
              <span className="text-[9px] text-slate-500 block font-mono font-bold uppercase tracking-wider">HEX VALUE</span>
              <strong className="text-xs font-mono text-slate-200 block mt-0.5">{mixHex}</strong>
            </div>
            <div className="bg-slate-900/50 border border-slate-800/80 p-2.5 rounded-xl">
              <span className="text-[9px] text-slate-500 block font-mono font-bold uppercase tracking-wider">RGB BLEND</span>
              <strong className="text-xs font-mono text-slate-200 block mt-0.5 truncate">{mixRgb}</strong>
            </div>
          </div>

          {/* Scientific qualities specifications overlay */}
          <div className="bg-slate-900/30 p-3 rounded-2xl border border-slate-800/50 space-y-1">
            <div className="flex justify-between text-[11px] font-sans">
              <span className="text-slate-500">Lightfastness:</span>
              <span className="text-emerald-400 font-bold">Museum ASTM-1 (I)</span>
            </div>
            <div className="flex justify-between text-[11px] font-sans">
              <span className="text-slate-500">Pigment Opacity:</span>
              <span className="text-slate-300 font-semibold">
                {whiteVal > 4 ? 'Extremely Opaque' : 'Semi-Transparent Glazing'}
              </span>
            </div>
            <div className="flex justify-between text-[11px] font-sans">
              <span className="text-slate-500">Estimated Viscosity:</span>
              <span className="text-slate-300 font-semibold">Buttery Heavy Body</span>
            </div>
          </div>
        </div>

        {/* Order Call to Action button */}
        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 hover:from-violet-500 hover:to-orange-400 text-slate-950 font-bold px-5 py-4 rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-sans group text-white"
          >
            <ShoppingBag className="w-4 h-4 text-white group-hover:animate-bounce" />
            Pour Live & Add Custom Jar (₹45.00)
          </button>
        </div>

        {/* Floating SUCCESS notification bubble inside canvas element */}
        {showFormulaToast && (
          <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white p-3 py-3.5 rounded-xl shadow-2xl flex items-start gap-2.5 border border-white/20 animate-fade-in z-50">
            <span className="text-base bg-white/20 p-1.5 rounded-lg shrink-0">🎨</span>
            <div className="flex-1 text-left text-xs">
              <strong className="block font-bold">Pigment Dispatched to Chemistry Lab!</strong>
              <span className="text-slate-200 mt-0.5 block leading-tight">
                Formulation <strong>"Studio Jar: {customName}"</strong> added as product with bespoke ratio labels. Keep checkout going.
              </span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
