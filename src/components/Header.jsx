import React, { useState, useRef, useEffect } from 'react';
import { Home, Clock, FolderOpen, ClipboardList, Compass, HelpCircle, ChevronDown, ChevronUp, User, Settings, LogOut, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ activeTab, onChangeTab, onOpenTutorial }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Analytics', icon: Activity },
    { id: 'drafts', label: 'Drafts', icon: FolderOpen },
    { id: 'templates', label: 'Templates', icon: ClipboardList },
    { id: 'workspace', label: 'Workspace', icon: Compass }
  ];

  return (
    <header className="bg-brand-header border-b border-white/10 h-16 w-full flex items-center px-4 md:px-6 justify-between select-none shadow-md z-40 relative">
      
      {/* Left container: Logo + Navigation Links */}
      <div className="flex items-center gap-8">
        {/* Logo Container */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CMS Logo" className="size-10 object-contain animate-spin-slow" />
          <div className="flex flex-col font-montserrat leading-tight text-white">
            <span className="text-xs uppercase tracking-wider text-slate-300">Content</span>
            <span className="text-sm font-bold tracking-tight">Management</span>
          </div>
        </div>

        {/* Navigation Links with Active States */}
        <nav className="hidden md:flex items-center bg-black/15 rounded-full px-2 py-1 gap-1.5 border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-sm shadow-brand-blue/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Help Circle - triggers tutorial modal */}
        <button 
          onClick={onOpenTutorial}
          className="size-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 relative group cursor-pointer"
          title="Open CMS Tutorial"
        >
          <HelpCircle className="size-5" />
          <span className="absolute -bottom-8 scale-0 transition-all rounded bg-slate-800 p-1 text-[10px] text-white group-hover:scale-100 whitespace-nowrap shadow-md z-30">
            CMS Tutorial
          </span>
        </button>

        {/* User Profile Dropdown Menu */}
        <div className="relative pl-3 border-l border-white/10 h-10 flex items-center" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 text-left hover:bg-white/5 p-1 rounded-xl transition-all cursor-pointer"
          >
            <div className="size-9 bg-[#007bff] rounded-full flex items-center justify-center text-white shadow-md shadow-[#007bff]/20 shrink-0">
              <User className="size-5 fill-white text-white" />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-bold text-white leading-none">
                Test Admin
              </span>
              <span className="text-[9px] text-slate-400 mt-1.5 leading-none font-medium">circulayo.appnostic@yahoo.com</span>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 top-12 bg-white border border-brand-border rounded-2xl shadow-xl py-1.5 w-48 z-40"
              >
                <div className="px-3 py-2 border-b border-brand-border">
                  <p className="text-xs font-bold text-slate-800">Test Admin</p>
                  <p className="text-[10px] text-slate-400 truncate">circulayo.appnostic@yahoo.com</p>
                </div>
                
                <button 
                  onClick={() => { setIsProfileOpen(false); alert('Profile settings clicked'); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 mt-1"
                >
                  <User className="size-4 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button 
                  onClick={() => { setIsProfileOpen(false); alert('Workspace settings clicked'); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings className="size-4 text-slate-400" />
                  <span>Workspace Settings</span>
                </button>
                <button 
                  onClick={() => { setIsProfileOpen(false); alert('Analytics dashboard clicked'); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Activity className="size-4 text-slate-400" />
                  <span>Analytics</span>
                </button>
                
                <div className="h-px bg-slate-100 my-1" />
                
                <button 
                  onClick={() => { setIsProfileOpen(false); alert('Signing out'); }}
                  className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="size-4 text-red-400" />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
