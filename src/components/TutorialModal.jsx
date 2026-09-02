import React, { useState } from 'react';
import { X, Play, Globe, Palette, Edit, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TutorialModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    {
      id: 1,
      step: '1/3',
      title: 'Publish live content',
      desc: 'Add pages, blocks, and media — then publish with a single click.',
      icon: Globe,
      // Tab-specific video content preview simulation
      videoPreview: (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-teal-900/60 to-slate-900/80">
          <div className="flex justify-between items-center">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Feature: Live Publisher
            </span>
            <span className="text-xs text-slate-400">0:45 min</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-white">One-click deployment system</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Learn how to package layouts and assets directly into production-grade HTML and CSS within seconds.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      step: '2/3',
      title: 'Use the block palette',
      desc: 'Drag text, image, and layout blocks directly onto your canvas.',
      icon: Palette,
      videoPreview: (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-900/60 to-slate-900/80">
          <div className="flex justify-between items-center">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Feature: Block Drag & Drop
            </span>
            <span className="text-xs text-slate-400">1:02 min</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-white">Interactive element canvas</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Explore the pre-styled design tokens, container cards, and responsive spacer blocks.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      step: '3/3',
      title: 'Edit in real-time',
      desc: "Click 'Start Editing' to unlock and modify any page in your app.",
      icon: Edit,
      videoPreview: (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-purple-900/60 to-slate-900/80">
          <div className="flex justify-between items-center">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Feature: Real-Time Sync
            </span>
            <span className="text-xs text-slate-400">0:49 min</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-white">WYSIWYG layout synchronization</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Collaborate and preview pixel-perfect revisions without reloading the browser tab.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px] cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-slate-900/95 border border-white/10 w-full max-w-4xl h-[680px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between z-10 relative select-none"
      >
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-40 -left-40 size-96 rounded-full bg-teal-500/20 blur-[100px]" />
          <div className="absolute top-40 -right-40 size-96 rounded-full bg-indigo-500/20 blur-[100px]" />
          <div className="absolute -bottom-40 left-80 size-96 rounded-full bg-purple-500/20 blur-[100px]" />
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/10 border border-teal-500/25 size-9 rounded-xl flex items-center justify-center text-teal-400">
              <Play className="size-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-bold font-montserrat tracking-tight text-base leading-none">CMS Tutorial</h2>
              <span className="text-xs text-teal-400 font-medium mt-1 leading-none">2 min 36 sec · 3 key features</span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="size-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Simulated Video Player */}
        <div className="px-6 flex-1 flex flex-col justify-center z-10 relative mt-2">
          <div className="h-64 md:h-72 w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950/60 relative group shadow-inner">
            {/* Tab specific video layout simulator */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {currentTab.videoPreview}
              </motion.div>
            </AnimatePresence>

            {/* Video Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className={`size-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-teal-500 text-white border-teal-400/40 shadow-teal-500/25' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isPlaying ? (
                  <div className="flex gap-1 items-center justify-center">
                    <span className="w-1 h-4 bg-white rounded animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1 h-4 bg-white rounded animate-bounce [animation-delay:0.3s]" />
                    <span className="w-1 h-4 bg-white rounded animate-bounce [animation-delay:0.5s]" />
                  </div>
                ) : (
                  <Play className="size-6 fill-current translate-x-0.5" />
                )}
              </motion.button>
            </div>

            {/* Video Player Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
              <motion.div 
                animate={{ width: isPlaying ? '100%' : '20%' }}
                transition={{ duration: isPlaying ? 10 : 0.5, ease: 'linear' }}
                className="h-full bg-teal-500 shadow-md shadow-teal-400/40"
              />
            </div>
          </div>
        </div>

        {/* Feature Tabs Selector */}
        <div className="px-6 z-10 relative">
          <div className="text-[10px] font-bold text-teal-400/80 tracking-widest uppercase mb-2">What you'll learn</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsPlaying(false);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-28 relative ${
                    isActive 
                      ? 'bg-teal-500/10 border-teal-500/30 shadow-lg shadow-teal-950/20' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {/* Step indicators */}
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="size-4" />
                    </div>
                    <span className={`text-[10px] font-semibold ${isActive ? 'text-teal-400' : 'text-slate-500'}`}>
                      {tab.step}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className={`text-xs font-bold leading-none ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-[10px] leading-tight mt-1 truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Watch this short tutorial to get started effectively.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors duration-200 text-center"
            >
              Skip for now
            </button>

            <button 
              onClick={() => {
                if (activeTab < 3) {
                  setActiveTab(activeTab + 1);
                  setIsPlaying(false);
                } else {
                  onClose();
                }
              }}
              className="flex-1 sm:flex-none bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 border border-teal-500/10 hover:border-teal-400/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-teal-550/20 transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <span>{activeTab === 3 ? 'Got it, let\'s go' : 'Next Lesson'}</span>
              {activeTab === 3 ? <Check className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
