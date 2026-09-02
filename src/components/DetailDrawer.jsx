import React from 'react';
import { X, Globe, Eye, ArrowUpRight, BarChart2, Shield, Settings, Trash2, Calendar, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DetailDrawer({ card, isOpen, onClose }) {
  if (!isOpen || !card) return null;

  const { title, subtitle, client, date, visitors, status, gradientStart, gradientEnd } = card;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
      />

      {/* Drawer Container */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-brand-border flex flex-col justify-between z-10 relative select-none"
      >
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="size-4.5 text-brand-blue" />
            <h2 className="font-bold text-slate-800 text-sm">Page Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="size-8 rounded-full bg-slate-50 border border-brand-border hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          {/* Card Preview Banner */}
          <div 
            style={{ backgroundImage: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
            className="h-44 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-md"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
            
            <span className="self-start bg-brand-green-light/90 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase text-brand-green tracking-wider flex items-center gap-1 shadow-sm">
              <span className="size-1 rounded-full bg-brand-green animate-pulse" />
              {status}
            </span>

            <div>
              <span className="text-[10px] text-white/80 font-bold bg-black/20 px-2 py-0.5 rounded">
                {visitors || '0'} views
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-1">{title}</h3>
            </div>
          </div>

          {/* Section details */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">{client}</span>
              <h4 className="text-lg font-bold text-slate-800 tracking-tight mt-0.5">{subtitle}</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-brand-border flex items-center gap-2.5">
                <Calendar className="size-4 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Published</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1 leading-none">{date}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-brand-border flex items-center gap-2.5">
                <Layers className="size-4 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Client Code</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1 leading-none">{subtitle.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* Simulated Performance Metrics */}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Metrics & Performance</h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Server Response Rate</span>
                  <span className="font-semibold text-brand-green">99.8%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-green rounded-full w-[99.8%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Bandwidth Utilization</span>
                  <span className="font-semibold text-slate-700">42.5 GB / 100 GB</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full w-[42.5%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* Active Canvas Layout Blocks */}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Active Layout Blocks</h5>
            <div className="space-y-2">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-brand-border flex justify-between items-center text-xs">
                <span className="text-slate-700 font-semibold">Hero Media Element</span>
                <span className="text-[10px] text-slate-400">1 Image block</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-brand-border flex justify-between items-center text-xs">
                <span className="text-slate-700 font-semibold">Live Feed Grid</span>
                <span className="text-[10px] text-slate-400">4 Column cards</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-brand-border flex justify-between items-center text-xs">
                <span className="text-slate-700 font-semibold">Feedback Action form</span>
                <span className="text-[10px] text-slate-400">Interactive inputs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Actions Footer */}
        <div className="p-5 border-t border-brand-border bg-slate-50 flex flex-col gap-2.5">
          <button className="w-full bg-brand-blue hover:bg-brand-blue/95 text-white py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-blue/15">
            <ArrowUpRight className="size-4" />
            <span>Open Live Website</span>
          </button>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-white border border-brand-border hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
              <Settings className="size-4 text-slate-400" />
              <span>Configure</span>
            </button>
            <button className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
              <Trash2 className="size-4 text-red-400" />
              <span>Unpublish</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
