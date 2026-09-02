import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Layers, MoreHorizontal, ArrowUpRight, CheckCircle, Eye, Settings, Trash2, Edit2, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GridCard({ card, layout, onSelect, onViewAnalytics }) {
  const { title, subtitle, client, date, visitors, status, gradientStart, gradientEnd } = card;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close context menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = (e) => {
    e.stopPropagation(); // Prevent card selection click trigger
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuAction = (e, action) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    if (action === 'drawer') {
      onSelect(card);
    } else if (action === 'analytics') {
      onViewAnalytics && onViewAnalytics(card);
    } else {
      alert(`${action} clicked for: ${title}`);
    }
  };

  // Render Grid Layout
  if (layout === 'grid') {
    return (
      <motion.div 
        layout
        whileHover={{ y: -6, scale: 1.01 }}
        onClick={() => onSelect(card)}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl overflow-hidden border border-brand-border flex flex-col h-full shadow-sm hover:shadow-xl hover:border-slate-300 transition-all select-none cursor-pointer relative"
      >
        {/* Cover Preview Image Container */}
        <div 
          style={{ backgroundImage: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
          className="h-60 relative flex flex-col justify-between p-4 text-white group overflow-hidden"
        >
          {/* Ambient Mesh Glow Effect */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Top Row: Badges */}
          <div className="flex justify-between items-center z-10">
            {/* Status Pill */}
            <span className="bg-brand-green-light/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-brand-green/20">
              <span className="size-1.5 rounded-full bg-brand-green bg-gradient-to-r" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-green">{status}</span>
            </span>

            {/* Quick Action Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); onSelect(card); }}
              className="size-7 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
            >
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>

          {/* Bottom Row: Text overlay */}
          <div className="z-10 mt-auto">
            {visitors && (
              <span className="text-[10px] font-bold text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-md">
                {visitors} views
              </span>
            )}
            <h3 className="text-lg font-bold tracking-tight text-white mt-1 drop-shadow-sm truncate">
              {title}
            </h3>
          </div>
        </div>

        {/* Info Container */}
        <div className="p-4 flex flex-col justify-between flex-1 gap-3">
          <div className="flex flex-col gap-1.5">
            <h4 className="text-sm font-bold text-slate-800 tracking-tight truncate">
              {subtitle}
            </h4>

            {/* App / Module context */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="bg-slate-100 p-1 rounded-md text-brand-blue">
                <Layers className="size-3" />
              </span>
              <span className="text-[11px] font-medium leading-none">{client}</span>
            </div>
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between border-t border-brand-border pt-3 relative">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="size-3.5" />
              <span className="text-[11px] font-medium">{date}</span>
            </div>
            
            {/* Quick Actions Dropdown Selector */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={handleMenuToggle}
                className="size-7 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center border border-transparent hover:border-slate-200 transition-all"
              >
                <MoreHorizontal className="size-4" />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 bottom-8 bg-white border border-brand-border rounded-xl shadow-lg py-1.5 w-40 z-20"
                  >
                    <button 
                      onClick={(e) => handleMenuAction(e, 'drawer')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="size-3.5 text-slate-400" />
                      <span>View details</span>
                    </button>
                    <button 
                      onClick={(e) => handleMenuAction(e, 'Quick Edit')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 className="size-3.5 text-slate-400" />
                      <span>Edit metadata</span>
                    </button>
                    <button 
                      onClick={(e) => handleMenuAction(e, 'analytics')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Activity className="size-3.5 text-slate-400" />
                      <span>View Analytics</span>
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    <button 
                      onClick={(e) => handleMenuAction(e, 'Unpublish')}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="size-3.5 text-red-400" />
                      <span>Unpublish page</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Render List Layout
  if (layout === 'list') {
    return (
      <motion.div 
        layout
        whileHover={{ x: 4 }}
        onClick={() => onSelect(card)}
        className="bg-white rounded-xl p-3 border border-brand-border hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all select-none cursor-pointer"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div 
            style={{ backgroundImage: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
            className="size-12 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-inner"
          >
            {title[0]}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 truncate">{subtitle}</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-medium text-slate-500 border border-slate-200/50">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="size-3" />
                {date}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Layers className="size-3" />
                {client}
              </span>
            </div>
          </div>
        </div>

        {/* Right side stats & status */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
          <div className="flex flex-col items-start sm:items-end">
            <span className="bg-brand-green-light/80 px-2 py-0.5 rounded-full text-[9px] font-bold text-brand-green uppercase tracking-wide flex items-center gap-1">
              <span className="size-1 rounded-full bg-brand-green animate-pulse" />
              {status}
            </span>
            {visitors && <span className="text-[10px] font-medium text-slate-400 mt-1">{visitors} views</span>}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(card); }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center border border-brand-border transition-all"
          >
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Render Recents Layout
  return (
    <motion.div 
      layout
      className="bg-white rounded-3xl p-6 md:p-8 border border-brand-border flex flex-col lg:flex-row gap-6 md:gap-8 shadow-lg select-none relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div 
        style={{ background: `radial-gradient(circle at 10% 10%, ${gradientStart}15, transparent 50%)` }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Visual cover element */}
      <div 
        style={{ backgroundImage: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
        className="flex-1 h-64 md:h-80 lg:h-auto min-h-[260px] rounded-2xl relative p-6 text-white flex flex-col justify-between shadow-md"
      >
        <span className="bg-brand-green-light/95 backdrop-blur-sm self-start px-3 py-1 rounded-full flex items-center gap-2 border border-brand-green/20">
          <span className="size-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-green">{status}</span>
        </span>

        <div>
          {visitors && (
            <span className="text-xs font-bold text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg">
              {visitors} total views
            </span>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight mt-2 drop-shadow">
            {title}
          </h2>
        </div>
      </div>

      {/* Content description & action specs */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{client}</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">{subtitle}</h3>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            This live page is running on the Circulayo Content Management network. It is fully responsive, optimized, and receives active traffic metrics.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-brand-border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Publish Date</span>
              <span className="block text-sm font-bold text-slate-700 mt-1">{date}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-brand-border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Layout Template</span>
              <span className="block text-sm font-bold text-slate-700 mt-1">Standard Grid Layout</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 border-t border-brand-border pt-4">
          <button 
            onClick={() => onSelect(card)}
            className="flex-1 bg-brand-blue hover:bg-brand-blue/95 text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20"
          >
            <Settings className="size-4" />
            <span>Manage Content</span>
          </button>
          
          <button 
            onClick={() => onSelect(card)}
            className="px-4 py-2.5 border border-brand-border hover:border-slate-300 rounded-xl font-semibold text-sm text-slate-600 hover:text-slate-800 transition-all duration-200"
          >
            Preview Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
