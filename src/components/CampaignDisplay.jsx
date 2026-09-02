import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Settings, Info, Leaf, X, Sliders,
  Trash2, QrCode, CreditCard, ChevronRight,
  Sparkles, ShieldCheck, RefreshCw, Cpu
} from 'lucide-react';

export default function CampaignDisplay() {
  // Navigation/Display configuration
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing scanner hardware...');
  const [showControls, setShowControls] = useState(true); // default to true on initial view
  const [displayMode, setDisplayMode] = useState('fullscreen'); // 'fullscreen' or 'frame'

  // Screen rotation states
  const [activeScreen, setActiveScreen] = useState(0); // 0, 1, 2
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(6); // seconds per screen
  
  // Real-time counter states
  const [cupsSaved, setCupsSaved] = useState(15482);
  const [recentReturns, setRecentReturns] = useState([
    { id: 1, location: 'North Stand Hub', count: 3, time: '2s ago', refund: '£3.00' },
    { id: 2, location: 'East Gate Bin', count: 1, time: '12s ago', refund: '£1.00' },
    { id: 3, location: 'West Concourse Refill', count: 2, time: '24s ago', refund: '£2.00' },
    { id: 4, location: 'VIP Lounge Gate', count: 4, time: '1m ago', refund: '£4.00' }
  ]);
  
  // Particle effects state for simulator burst
  const [particles, setParticles] = useState([]);
  
  // Customizable settings
  const [campaignTitle, setCampaignTitle] = useState('Making reuse safe, simple, and rewarding');
  const [campaignBody, setCampaignBody] = useState('Return your cup to quickly redeem your deposit back on your card, powered by Mastercard Move and Circulayo.');
  const [depositValue, setDepositValue] = useState(1.00); // £ per cup
  const [goalTarget, setGoalTarget] = useState(25000);
  
  // Custom loader timer
  useEffect(() => {
    const textIntervals = [
      { time: 800, text: 'Calibrating optical laser sensors...' },
      { time: 1600, text: 'Connecting to Circulayo secure ledger...' },
      { time: 2400, text: 'Establishing secure Mastercard Move gateway...' },
      { time: 3200, text: 'Kiosk synchronization complete. Ready!' }
    ];

    textIntervals.forEach(item => {
      setTimeout(() => {
        setLoadingText(item.text);
      }, item.time);
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds total presentation time for the loader

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Local timer for screen rotation
  useEffect(() => {
    if (isLoading || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % 3);
    }, rotationSpeed * 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, rotationSpeed, isLoading]);

  // Slowly auto-increment cups count to simulate active matchday returns
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      const increment = Math.random() > 0.6 ? (Math.random() > 0.8 ? 2 : 1) : 0;
      if (increment > 0) {
        triggerSimulatedReturn(increment, getRandomLocation());
      }
    }, 4500);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const getRandomLocation = () => {
    const locations = ['South Stand Refill', 'North Gate Bin', 'East Concourse', 'West Gate Hub', 'VIP Suite 12'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const triggerSimulatedReturn = (count = 1, location = 'Main Gate Kiosk') => {
    // Increment total saved
    setCupsSaved(prev => prev + count);
    
    // Add to recent returns
    const newReturn = {
      id: Date.now(),
      location,
      count,
      time: 'Just now',
      refund: `£${(count * depositValue).toFixed(2)}`
    };
    
    setRecentReturns(prev => [newReturn, ...prev.slice(0, 4)]);
    
    // Trigger particle explosion effect
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      x: Math.random() * 100 - 50, // relative offsets
      y: Math.random() * -100 - 50,
      scale: Math.random() * 0.8 + 0.4,
      color: i % 2 === 0 ? '#4ade80' : '#38bdf8'
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Clean up particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  };

  // Environmental calculations
  const co2Offset = (cupsSaved * 0.084).toFixed(1); // 84g CO2 per plastic cup prevented
  const landfillSaved = (cupsSaved * 0.025).toFixed(1); // 25g waste per cup
  const waterSaved = (cupsSaved * 0.32).toFixed(0); // 320ml water saved per cup cycle

  // Inner Screen Content rendering
  const renderScreenContent = (isFullscreenMode = false) => {
    return (
      <div className="flex-1 flex flex-col justify-between overflow-hidden relative select-none h-full w-full">
        {/* Screen Header */}
        <div className={`bg-slate-950/80 backdrop-blur-md px-5 flex items-center justify-between border-b border-white/5 shrink-0 z-30 ${
          isFullscreenMode ? 'py-5' : 'pt-7 pb-3'
        }`}>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Circulayo" className="size-6 object-contain" />
            <span className="font-sans font-black tracking-widest text-[13px] text-teal-400">CIRCULAYO</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-450 animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase text-slate-450">Kiosk #08</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 relative overflow-hidden bg-[#090d16] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: HOW TO RETURN */}
            {activeScreen === 0 && (
              <motion.div
                key="screen-1"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute inset-0 p-6 flex flex-col justify-between h-full text-white"
              >
                {/* Background wave decoration */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="#10b981" />
                  </svg>
                </div>

                {/* Top title */}
                <div className="flex flex-col gap-1 mt-2 text-center">
                  <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-widest font-mono">Simple Steps</span>
                  <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight">Return Your Cup</h3>
                </div>

                {/* Steps visual walk-through */}
                <div className="flex-1 flex flex-col justify-center gap-6 my-2 max-w-sm mx-auto w-full">
                  {/* Step 1: Scan */}
                  <div className="flex items-center gap-4 bg-slate-905/60 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="size-12 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20 shrink-0 relative">
                      <QrCode className="size-6 text-teal-450 z-10" />
                      <motion.div 
                        animate={{ y: [-14, 14, -14] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute left-1.5 right-1.5 h-0.5 bg-teal-400 shadow-[0_0_8px_#2dd4bf] z-20"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-teal-400 uppercase font-mono">Step 1</span>
                      <span className="text-[13px] font-black text-slate-100">Scan Cup QR Code</span>
                      <span className="text-[10px] text-slate-400 leading-tight">Hold cup QR code under the scanner.</span>
                    </div>
                  </div>

                  {/* Step 2: Drop */}
                  <div className="flex items-center gap-4 bg-slate-905/60 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="size-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shrink-0 relative overflow-hidden">
                      <Trash2 className="size-6 text-blue-450 z-10" />
                      <motion.div
                        animate={{ y: [-18, 18], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="absolute size-4 bg-white/20 border border-white/30 rounded-xs top-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-blue-400 uppercase font-mono">Step 2</span>
                      <span className="text-[13px] font-black text-slate-100">Place Cup in Bin</span>
                      <span className="text-[10px] text-slate-400 leading-tight">Deposit cup through the shutter.</span>
                    </div>
                  </div>

                  {/* Step 3: Refund */}
                  <div className="flex items-center gap-4 bg-slate-905/60 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="size-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 shrink-0 relative">
                      <CreditCard className="size-6 text-amber-450 z-10" />
                      <motion.div
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-amber-400/5 rounded-xl border border-amber-450/10 scale-90"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-amber-400 uppercase font-mono">Step 3</span>
                      <span className="text-[13px] font-black text-slate-100">Instant Refund</span>
                      <span className="text-[10px] text-slate-400 leading-tight">Deposit returned instantly to your card!</span>
                    </div>
                  </div>
                </div>

                {/* Footer call to action */}
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3.5 flex items-center justify-center gap-2 mb-2 max-w-sm mx-auto w-full">
                  <span className="text-[10.5px] font-black text-teal-350 tracking-wider">£{depositValue.toFixed(2)} REFUND PER CUP</span>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: REAL-TIME IMPACT & SAVINGS */}
            {activeScreen === 1 && (
              <motion.div
                key="screen-2"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute inset-0 p-6 flex flex-col justify-between h-full text-white"
              >
                {/* Wave background paths */}
                <div className="absolute inset-x-0 bottom-0 h-44 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path 
                      animate={{ d: [
                        "M0,80 Q25,70 50,80 T100,80 L100,100 L0,100 Z",
                        "M0,75 Q25,85 50,75 T100,75 L100,100 L0,100 Z",
                        "M0,80 Q25,70 50,80 T100,80 L100,100 L0,100 Z"
                      ]}}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      fill="#059669" 
                    />
                  </svg>
                </div>

                {/* Simulation particle overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute size-2.5 rounded-full"
                      style={{ 
                        left: '50%', 
                        top: '40%',
                        backgroundColor: p.color
                      }}
                      animate={{ 
                        x: p.x, 
                        y: p.y, 
                        scale: [0, p.scale, 0],
                        opacity: [1, 1, 0]
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  ))}
                </div>

                {/* Top title */}
                <div className="flex flex-col gap-1 mt-2 text-center">
                  <span className="text-[10px] font-extrabold text-emerald-400 tracking-widest font-mono uppercase">Live Impact</span>
                  <h3 className="text-xl font-black font-sans tracking-tight">Real-Time Savings</h3>
                </div>

                {/* Massive Counter Block */}
                <div className="flex flex-col items-center justify-center py-4 relative">
                  <div className="bg-slate-900/60 border border-white/5 p-6 rounded-[28px] w-full max-w-[260px] text-center flex flex-col gap-2 shadow-lg relative overflow-hidden backdrop-blur-xs">
                    <div className="absolute -top-10 -right-10 size-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cups Saved To Date</span>
                    
                    <div className="flex items-center justify-center font-black tracking-tight text-white font-mono text-3xl sm:text-4xl select-all select-none">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={cupsSaved}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]"
                        >
                          {cupsSaved.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    
                    {/* Target Progress Bar */}
                    <div className="flex flex-col gap-1.5 mt-2.5">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${Math.min(100, (cupsSaved / goalTarget) * 100)}%` }}
                          animate={{ width: `${Math.min(100, (cupsSaved / goalTarget) * 100)}%` }}
                          transition={{ type: 'spring', stiffness: 100 }}
                        />
                      </div>
                      <div className="flex justify-between text-[8.5px] font-bold text-slate-500">
                        <span>Progress</span>
                        <span>{Math.round((cupsSaved / goalTarget) * 100)}% of {goalTarget.toLocaleString()} goal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto w-full">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center flex flex-col justify-between">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Carbon Saved</span>
                    <span className="text-[12.5px] font-black text-slate-100 mt-2 leading-none">{co2Offset} kg</span>
                    <span className="text-[7.5px] text-emerald-450 mt-1 font-semibold leading-none">CO₂ equivalent</span>
                  </div>
                  
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center flex flex-col justify-between">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Water Saved</span>
                    <span className="text-[12.5px] font-black text-slate-100 mt-2 leading-none">{waterSaved}L</span>
                    <span className="text-[7.5px] text-emerald-450 mt-1 font-semibold leading-none">Resource offset</span>
                  </div>

                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-center flex flex-col justify-between">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Landfill Saved</span>
                    <span className="text-[12.5px] font-black text-slate-100 mt-2 leading-none">{landfillSaved} kg</span>
                    <span className="text-[7.5px] text-emerald-450 mt-1 font-semibold leading-none">Plastic waste</span>
                  </div>
                </div>

                {/* Bottom Ticker Feed */}
                <div className="flex flex-col gap-1 mb-2 bg-slate-950/40 border border-white/5 p-3 rounded-xl h-[62px] overflow-hidden select-none max-w-sm mx-auto w-full">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest font-mono">Live Activity Ticker</span>
                  <div className="flex-1 flex flex-col gap-1 relative overflow-hidden">
                    <AnimatePresence initial={false}>
                      {recentReturns.slice(0, 2).map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between text-[9.5px] text-slate-350"
                        >
                          <span className="truncate font-bold max-w-[155px] text-slate-200">➔ {item.location}</span>
                          <span className="font-extrabold text-emerald-400">+{item.count} returned ({item.refund})</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: CUSTOM BRANDING & CAMPAIGN */}
            {activeScreen === 2 && (
              <motion.div
                key="screen-3"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute inset-0 p-6 flex flex-col justify-between h-full text-white"
              >
                {/* Glowing mesh ambient light */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-48 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top subtitle */}
                <div className="flex flex-col gap-1 mt-2 text-center shrink-0">
                  <span className="text-[10px] font-extrabold text-amber-500 tracking-widest font-mono uppercase">Reusable Initiative</span>
                </div>

                {/* Body Campaign Text */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-4 select-text max-w-sm mx-auto w-full">
                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[16px] sm:text-[18px] font-extrabold tracking-tight text-white font-sans leading-tight"
                  >
                    {campaignTitle}
                  </motion.h4>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-[11px] text-slate-350 leading-relaxed mt-4 max-w-[280px] font-medium"
                  >
                    {campaignBody}
                  </motion.p>

                  {/* Card Hologram Graphic */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 border border-white/10 rounded-xl px-4.5 py-3 bg-white/5 backdrop-blur-xs flex items-center gap-3.5 relative overflow-hidden"
                  >
                    <ShieldCheck className="size-6 text-emerald-450 shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-black text-slate-100 uppercase tracking-wide leading-none">CONTACTLESS</span>
                      <span className="text-[8px] text-slate-400 mt-1.5 leading-none font-semibold">Instant Mastercard Move Refund</span>
                    </div>
                    <div className="absolute right-0 bottom-0 w-8 h-8 bg-amber-500/5 rounded-tl-full" />
                  </motion.div>
                </div>

                {/* Brand Logo Lockup */}
                <div className="flex flex-col items-center gap-2 mb-2 shrink-0 select-none">
                  <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex items-center gap-4 bg-slate-900/60 border border-white/5 px-5 py-2.5 rounded-full shadow-md">
                    {/* Mastercard Symbol */}
                    <img 
                      src="/mastercard/Mastercard Symbol - PNG/Artwork/Mastercard Symbol 73px PNG/ma_symbol_opt_73_2x.png" 
                      alt="Mastercard" 
                      className="h-4.5 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center -space-x-1.5 shrink-0">
                      <div className="size-4.5 rounded-full bg-red-500" />
                      <div className="size-4.5 rounded-full bg-amber-500 opacity-80" />
                    </div>
                    
                    {/* Divider */}
                    <span className="h-4.5 w-[1px] bg-slate-700" />
                    
                    {/* Circulayo Logo */}
                    <div className="flex items-center gap-1.5">
                      <img src="/logo.png" alt="Circulayo" className="h-4.5 object-contain" />
                      <span className="text-[10px] font-black tracking-widest font-sans text-white">CIRCULAYO</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Indicators */}
        <div className="bg-slate-950 px-5 py-4.5 flex items-center justify-center gap-2 border-t border-white/5 shrink-0 z-30">
          {[0, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => {
                setIsPlaying(false);
                setActiveScreen(s);
              }}
              className={`size-2.5 rounded-full transition-all border-0 cursor-pointer ${
                activeScreen === s ? 'w-5 bg-teal-400' : 'bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to screen ${s + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#0b0f19]">
      
      {/* BACKGROUND GRAPHIC */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/circulayo_wave_upscaled.png" 
          alt="Circulayo Wave" 
          className="w-full h-full object-cover mix-blend-screen"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="absolute top-1/4 left-1/4 size-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* FLOATING ACTION TRIGGER BUTTONS (When controls and loading are finished) */}
      {!isLoading && !showControls && (
        <div className="fixed bottom-4 left-4 z-55 flex items-center gap-2">
          {/* Controls toggle button */}
          <button 
            onClick={() => setShowControls(true)}
            className="bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white p-3 rounded-full border border-slate-800 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-30 hover:opacity-100 flex items-center justify-center border-0"
            title="Open customization controls"
          >
            <Settings className="size-5 animate-spin-slow" />
          </button>
          
          {/* Simulator shortcut button */}
          <button
            onClick={() => triggerSimulatedReturn(1, 'Floating Shortcut')}
            className="bg-slate-900/80 hover:bg-slate-800 text-emerald-450 hover:text-emerald-400 px-4.5 py-3 rounded-full border border-slate-800 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs font-black flex items-center gap-2 opacity-30 hover:opacity-100 border-0"
          >
            <Leaf className="size-4" />
            <span>Simulate Return (+1)</span>
          </button>
        </div>
      )}

      {/* SLIDE-OUT CUSTOMIZER CONTROLS DRAWER */}
      <AnimatePresence>
        {!isLoading && showControls && (
          <>
            {/* Overlay background dim to close when clicking outside */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControls(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 cursor-pointer"
            />
            
            {/* Controls Drawer Body */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-80 sm:w-96 bg-slate-900 border-r border-slate-800 z-50 flex flex-col shadow-2xl p-6 overflow-y-auto scrollbar-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5 shrink-0">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Sliders className="size-4" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">Live Display Console</span>
                  </div>
                  <h2 className="text-lg font-black text-white tracking-tight">Kiosk Customizer</h2>
                </div>
                <button 
                  onClick={() => setShowControls(false)}
                  className="size-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Body elements container */}
              <div className="flex flex-col gap-6">
                
                {/* 1. Display Configuration Mode */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Display Settings</span>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-450">Layout Representation</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setDisplayMode('fullscreen')}
                          className={`py-2 rounded text-xs font-bold cursor-pointer border-0 ${
                            displayMode === 'fullscreen' 
                              ? 'bg-teal-500/10 text-teal-350 font-black' 
                              : 'bg-transparent text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          Full Screen
                        </button>
                        <button
                          onClick={() => setDisplayMode('frame')}
                          className={`py-2 rounded text-xs font-bold cursor-pointer border-0 ${
                            displayMode === 'frame' 
                              ? 'bg-teal-500/10 text-teal-350 font-black' 
                              : 'bg-transparent text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          Kiosk Frame
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Return Simulator */}
                <div className="bg-slate-950 border border-teal-500/20 p-5 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-wider">Return Simulator</span>
                    <span className="flex size-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => triggerSimulatedReturn(1, 'Console Panel')}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-950/20 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1.5 border-0"
                    >
                      <Leaf className="size-3.5" />
                      <span>Return 1 Cup</span>
                    </button>
                    <button 
                      onClick={() => triggerSimulatedReturn(4, 'Guest Return (x4)')}
                      className="bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 font-extrabold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-95 text-center border-0"
                    >
                      +4 Cups
                    </button>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 leading-normal flex items-start gap-1.5">
                    <Info className="size-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>Watch the total cups counter and resource metrics update live on Screen 2 with a particle explosion!</span>
                  </div>
                </div>

                {/* 3. Screen Rotation Speed Controls */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Rotation Controls</span>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    {/* Play/Pause */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Auto-Rotate Cycle</span>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border-0 ${
                          isPlaying ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                      </button>
                    </div>

                    {/* Duration slider */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-[11px] font-bold text-slate-400">
                        <span>Hold Duration</span>
                        <span>{rotationSpeed}s</span>
                      </div>
                      <input 
                        type="range" 
                        min="3" 
                        max="15" 
                        value={rotationSpeed} 
                        onChange={(e) => setRotationSpeed(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                    </div>

                    {/* Manual Override Screen Selection */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {[0, 1, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setIsPlaying(false);
                            setActiveScreen(s);
                          }}
                          className={`py-2 rounded-lg text-[10px] font-black tracking-wider transition-all border cursor-pointer ${
                            activeScreen === s 
                              ? 'bg-teal-500/15 text-teal-350 border-teal-500/40 shadow-xs' 
                              : 'bg-transparent text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          Screen {s + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Live Custom Text Editor */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Campaign Text Settings</span>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-450">Screen 3 Title</label>
                      <textarea 
                        value={campaignTitle} 
                        onChange={(e) => setCampaignTitle(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none resize-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-450">Screen 3 Description</label>
                      <textarea 
                        value={campaignBody} 
                        onChange={(e) => setCampaignBody(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2 text-xs text-slate-350 placeholder-slate-650 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-450">Deposit Value (£)</label>
                        <input 
                          type="number" 
                          step="0.05"
                          value={depositValue} 
                          onChange={(e) => setDepositValue(parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-450">Goal Target</label>
                        <input 
                          type="number" 
                          value={goalTarget} 
                          onChange={(e) => setGoalTarget(parseInt(e.target.value) || 1000)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CORE CANVAS (Renders Loader OR Signage Screen) */}
      <div className="w-full h-full flex items-center justify-center z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* LOAD SCREEN (Theme: Interactive Cup Scanning Calibration) */}
          {isLoading ? (
            <motion.div
              key="loader-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0f19] z-50 text-white p-6"
            >
              <div className="relative flex flex-col items-center justify-center max-w-sm w-full text-center gap-8">
                
                {/* Ambient glow behind loader */}
                <div className="absolute size-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Bezel frame with scanner light */}
                <div className="relative size-44 rounded-full border-2 border-dashed border-teal-500/30 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md shadow-2xl">
                  {/* Outer spinning radar line */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-transparent border-t-teal-400/50"
                  />
                  
                  {/* Expanding scanner pulse rings */}
                  <motion.div
                    animate={{ scale: [0.9, 1.4], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                    className="absolute inset-2 rounded-full border-2 border-teal-500/30"
                  />
                  <motion.div
                    animate={{ scale: [0.9, 1.4], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 1.0 }}
                    className="absolute inset-2 rounded-full border-2 border-emerald-500/20"
                  />

                  {/* Reusable cup graphic container with scanning animation */}
                  <div className="relative size-24 flex items-center justify-center overflow-hidden rounded-xl">
                    <motion.img 
                      src="/cup_center.png" 
                      alt="Scanning Cup" 
                      className="size-16 object-contain z-10 filter drop-shadow-[0_0_8px_rgba(45,212,191,0.2)]"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                    
                    {/* Sweeping laser scanning beam */}
                    <motion.div
                      animate={{ top: ['10%', '85%', '10%'] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      className="absolute inset-x-2 h-0.5 bg-teal-450 shadow-[0_0_10px_#2dd4bf] z-20"
                    />
                  </div>
                </div>

                {/* Status loading info */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    >
                      <RefreshCw className="size-4 text-teal-400" />
                    </motion.div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-teal-400">
                      Syncing System
                    </span>
                  </div>
                  
                  <div className="h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingText}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs font-semibold text-slate-300 tracking-wide"
                      >
                        {loadingText}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Mastercard x Circulayo text lockup mockup */}
                <div className="flex items-center gap-1.5 opacity-40 text-[9px] font-bold tracking-widest uppercase font-sans mt-4">
                  <span>Powered by</span>
                  <span className="text-white">Circulayo</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ACTIVE KIOLK DISPLAY */
            <motion.div
              key="signage-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              {displayMode === 'fullscreen' ? (
                /* 1. TRUE FULL VIEWPORT DISPLAY */
                <div className="w-full h-full max-w-[500px] max-h-[880px] bg-slate-950 shadow-2xl flex flex-col justify-between overflow-hidden relative sm:rounded-[36px] sm:border-8 sm:border-slate-900">
                  {renderScreenContent(true)}
                </div>
              ) : (
                /* 2. KIOSK STAND MOCKUP FRAME VIEW */
                <div className="relative flex flex-col items-center select-none scale-90 sm:scale-100">
                  {/* Top Signage Cap */}
                  <div className="w-[380px] h-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 rounded-t-xl border-t border-slate-600/50" />
                  <div className="w-[340px] h-2 bg-slate-900" />
                  
                  {/* Frame Body */}
                  <div className="relative w-[360px] h-[640px] bg-slate-950 border-[8px] border-slate-900 rounded-[36px] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(20,184,166,0.15)] flex flex-col overflow-hidden">
                    {renderScreenContent(false)}
                  </div>

                  {/* Stand Column & Floor Plate */}
                  <div className="w-[80px] h-[30px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-x border-slate-700" />
                  <div className="w-[180px] h-[8px] bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 rounded-lg border-t border-slate-700/50 shadow-md" />
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
