import React, { useState } from 'react';
import { 
  QrCode, TrendingUp, Smartphone, Apple, RefreshCw, Maximize2, 
  Search, Calendar, MoreVertical, MapPin, ChevronDown, ChevronRight, Info,
  Menu, Compass, Gift, Home, Activity, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConnectDashboard({ onChangeTab }) {
  const [selectedClient, setSelectedClient] = useState('Circulayo Admin');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedClicksSite, setSelectedClicksSite] = useState('All Sites');
  const [showClicksSiteDropdown, setShowClicksSiteDropdown] = useState(false);

  // Tables data
  const topCitiesData = [
    { name: 'Derby', scans: '3,241' },
    { name: 'London', scans: '1,209' },
    { name: 'Nottingham', scans: '1,080' },
    { name: 'Manchester', scans: '676' },
    { name: 'Leeds', scans: '500' }
  ];

  const siteScansData = [
    { name: 'North Stand', scans: '2,140' },
    { name: 'West Stand', scans: '3,890' },
    { name: 'South Stand', scans: '2,120' },
    { name: 'East Stand', scans: '980' },
    { name: 'The Yard', scans: '1,230' }
  ];

  const contentClicksData = selectedClicksSite === 'North Stand' ? [
    { title: 'Season Tickets Promotion', clicks: '42' },
    { title: 'DCFC Megastore Voucher', clicks: '12' },
    { title: 'The RAMS Fans Survey', clicks: '450' },
    { title: 'Upcoming Games Schedule', clicks: '2' },
    { title: 'Matchday Hospitality Offer', clicks: '150' }
  ] : selectedClicksSite === 'West Stand' ? [
    { title: 'Season Tickets Promotion', clicks: '70' },
    { title: 'DCFC Megastore Voucher', clicks: '20' },
    { title: 'The RAMS Fans Survey', clicks: '874' },
    { title: 'Upcoming Games Schedule', clicks: '4' },
    { title: 'Matchday Hospitality Offer', clicks: '322' }
  ] : [
    { title: 'Season Tickets Promotion', clicks: '112' },
    { title: 'DCFC Megastore Voucher', clicks: '32' },
    { title: 'The RAMS Fans Survey', clicks: '1,324' },
    { title: 'Upcoming Games Schedule', clicks: '6' },
    { title: 'Matchday Hospitality Offer', clicks: '472' }
  ];

  return (
    <div className="flex flex-col gap-5 w-full font-sans text-slate-800 pb-12 select-none">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <button 
          onClick={() => onChangeTab && onChangeTab('home')} 
          className="flex items-center gap-1.5 hover:text-slate-650 transition-colors cursor-pointer text-slate-400"
        >
          <Home className="size-3.5 text-slate-400" />
          <span>Home</span>
        </button>
        <ChevronRight className="size-3 text-slate-400" />
        <span className="text-brand-blue font-bold">Circulayo Connect Dashboard</span>
      </div>
      
      {/* Dashboard Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-sans tracking-tight">AppNostic Dashboard</h2>
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Client Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
              <span>Client: {selectedClient}</span>
              <ChevronDown className="size-3.5 text-slate-405" />
            </button>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
              <span>Location: {selectedLocation}</span>
              <ChevronDown className="size-3.5 text-slate-405" />
            </button>
          </div>

          {/* Date Picker Range Mock */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
            <Calendar className="size-3.5 text-slate-400" />
            <span>Select date range</span>
          </div>

          {/* More actions button */}
          <button className="size-9 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 shadow-2xs cursor-pointer">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Scans */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-350 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">6,706</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total scans</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <QrCode className="size-4.5 stroke-[2]" />
          </div>
        </div>

        {/* Card 2: Click-through */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-355 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">2,244</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Click-through</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <TrendingUp className="size-4.5 stroke-[2]" />
          </div>
        </div>

        {/* Card 3: Card Engagement Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-355 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">33.4%</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Engagement Rate</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <Activity className="size-4.5 stroke-[2]" />
          </div>
        </div>

        {/* Card 4: Android Scans */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-355 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">3,232</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Android</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <Smartphone className="size-4.5 stroke-[2]" />
          </div>
        </div>

        {/* Card 5: Apple Scans */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-355 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">3,474</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Apple</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <Apple className="size-4.5 stroke-[2]" />
          </div>
        </div>

        {/* Card 6: Avg. Session Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 relative shadow-2xs flex justify-between items-center group hover:shadow-xs transition-shadow">
          <div className="absolute top-3.5 right-3.5 text-slate-355 hover:text-slate-500 cursor-help">
            <Info className="size-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-slate-900 tracking-tight">1m 45s</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Avg. Time Spent</span>
          </div>
          <div className="size-8.5 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100/50">
            <Clock className="size-4.5 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Middle Row (Device Simulator with Live QR Code) */}
      <div className="w-full">
        {/* Smartphone Simulator Preview & QR Code Card */}
        <div className="w-full bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs flex flex-col gap-5">
          {/* Card header controls */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live View Simulator</span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" title="Refresh Feed">
                <RefreshCw className="size-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" title="Expand View">
                <Maximize2 className="size-4" />
              </button>
            </div>
          </div>

          {/* 3-Part Layout inside the simulator card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-2">
            
            {/* Column 1: Simulator Details */}
            <div className="flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Template</span>
                <span className="text-base font-black text-slate-900 leading-tight">Celebrate!</span>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Location</span>
                <span className="text-xs font-bold text-slate-700 leading-tight">Vaillant / North Stand</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connection Hub</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-600">Online & Synchronized</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 my-0.5" />

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-800">Real-time Device Mirroring</span>
                <span className="text-[11px] font-medium text-slate-450 leading-relaxed">
                  Changes made in the workspace stream instantly to end-user mobile devices across all stand hubs.
                </span>
              </div>
            </div>

            {/* Column 2: Phone Shell Mockup (Middle) */}
            <div className="flex items-center justify-center shrink-0">
              <div className="w-[195px] h-[360px] bg-black rounded-[34px] p-1 shadow-xl border-2 border-slate-900 flex flex-col relative shrink-0">
                {/* Inner screen content wrapper */}
                <div className="flex-1 bg-white rounded-[28px] overflow-hidden flex flex-col justify-between relative shadow-inner">
                  {/* Header */}
                  <header className="bg-white border-b border-slate-105 px-3 pt-5 pb-1.5 flex items-center justify-between select-none z-10 shrink-0">
                    <div className="flex items-center gap-1">
                      <Menu className="size-3 text-slate-700" />
                      <span className="font-montserrat font-bold tracking-widest text-[8px] text-teal-650">CIRCULAYO</span>
                    </div>
                    <span className="text-[7px] font-black text-slate-400">Vaillant</span>
                  </header>

                  {/* Scrollable Body */}
                  <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2 scrollbar-none bg-slate-50/50">
                    <div className="flex flex-col select-none">
                      <h2 className="text-[10px] font-black font-montserrat tracking-tight text-slate-900">Celebrate!</h2>
                      <p className="text-[7px] text-slate-405 mt-0.5 leading-normal">North Stand Refill hub is active. Scan your cup QR code to join in.</p>
                    </div>

                    {/* Large Counter Box */}
                    <div className="bg-white border border-slate-150 p-2 rounded-xl flex flex-col items-center justify-center gap-0.5 shadow-2xs">
                      <span className="text-lg font-black text-emerald-600 leading-none">12</span>
                      <span className="text-[6px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">cups recycled</span>
                    </div>

                    {/* Dual statistic cards */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white border border-slate-150 p-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-800">253</span>
                        <span className="text-[5.5px] text-slate-400 font-bold uppercase">Points</span>
                      </div>
                      <div className="bg-white border border-slate-150 p-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-800">151</span>
                        <span className="text-[5.5px] text-slate-400 font-bold uppercase">Offset</span>
                      </div>
                    </div>

                    {/* Wicked Sing-Along event card */}
                    <div className="border border-slate-150 rounded-lg overflow-hidden bg-white shadow-2xs flex flex-col shrink-0">
                      <div className="h-14 w-full relative bg-slate-900 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 to-amber-950/85 z-10" />
                        <div className="absolute inset-0 flex items-center justify-between px-3 z-20">
                          <span className="text-[5.5px] text-emerald-400 font-black uppercase">Elphaba</span>
                          <span className="text-[5.5px] text-pink-400 font-black uppercase">Glinda</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover opacity-20 absolute" />
                      </div>
                      <div className="p-1.5 flex flex-col select-none">
                        <span className="text-[7.5px] font-black text-slate-800 tracking-tight leading-tight">Wicked: Sing-Along</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer button */}
                  <div className="p-2 border-t border-slate-100 bg-white shrink-0">
                    <button className="w-full bg-emerald-600 text-white font-extrabold text-[8px] py-2 rounded-lg hover:bg-emerald-700 shadow-sm transition-all cursor-pointer text-center">
                      Buy Tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Live QR Code Badge & Scanner (Right Side) */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center gap-3.5 text-center shadow-2xs hover:border-slate-300 transition-colors">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Preview QR</span>
                <span className="text-xs font-black text-slate-900">Scan to Test Live Campaign</span>
              </div>

              {/* QR Code Container with Corner Markers */}
              <div className="relative p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-center group">
                {/* Visual SVG QR Pattern */}
                <svg className="size-32 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer Frame Squares */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="12" y="12" width="12" height="12" rx="2"/>
                  
                  <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="76" y="12" width="12" height="12" rx="2"/>
                  
                  <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="12" y="76" width="12" height="12" rx="2"/>
                  
                  {/* Data Pattern Dots */}
                  <rect x="38" y="8" width="6" height="6" rx="1"/>
                  <rect x="48" y="8" width="6" height="6" rx="1"/>
                  <rect x="58" y="8" width="6" height="6" rx="1"/>
                  
                  <rect x="38" y="18" width="6" height="6" rx="1"/>
                  <rect x="58" y="18" width="6" height="6" rx="1"/>
                  
                  <rect x="8" y="38" width="6" height="6" rx="1"/>
                  <rect x="18" y="38" width="6" height="6" rx="1"/>
                  <rect x="28" y="38" width="6" height="6" rx="1"/>
                  <rect x="38" y="38" width="6" height="6" rx="1"/>
                  <rect x="48" y="38" width="6" height="6" rx="1"/>
                  <rect x="68" y="38" width="6" height="6" rx="1"/>
                  <rect x="78" y="38" width="6" height="6" rx="1"/>
                  <rect x="88" y="38" width="6" height="6" rx="1"/>
                  
                  <rect x="38" y="48" width="6" height="6" rx="1"/>
                  <rect x="58" y="48" width="6" height="6" rx="1"/>
                  <rect x="78" y="48" width="6" height="6" rx="1"/>
                  <rect x="88" y="48" width="6" height="6" rx="1"/>
                  
                  <rect x="8" y="58" width="6" height="6" rx="1"/>
                  <rect x="28" y="58" width="6" height="6" rx="1"/>
                  <rect x="38" y="58" width="6" height="6" rx="1"/>
                  <rect x="48" y="58" width="6" height="6" rx="1"/>
                  <rect x="68" y="58" width="6" height="6" rx="1"/>
                  
                  <rect x="38" y="69" width="6" height="6" rx="1"/>
                  <rect x="58" y="69" width="6" height="6" rx="1"/>
                  <rect x="78" y="69" width="6" height="6" rx="1"/>
                  
                  <rect x="38" y="79" width="6" height="6" rx="1"/>
                  <rect x="48" y="79" width="6" height="6" rx="1"/>
                  <rect x="68" y="79" width="6" height="6" rx="1"/>
                  <rect x="88" y="79" width="6" height="6" rx="1"/>
                  
                  <rect x="38" y="89" width="6" height="6" rx="1"/>
                  <rect x="58" y="89" width="6" height="6" rx="1"/>
                  <rect x="78" y="89" width="6" height="6" rx="1"/>
                </svg>

                {/* Central Circulayo Logo Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-7 bg-blue-600 rounded-lg border-2 border-white shadow-xs flex items-center justify-center text-white">
                    <QrCode className="size-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-slate-400 font-semibold max-w-[180px]">
                Point your mobile camera to launch the live preview on your phone
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Row (Tables - 4 columns each) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Table 1: Top 5 Scan Cities (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-2xs flex flex-col gap-4">
          <h4 className="text-sm font-black text-slate-900 tracking-tight">Top Scan Cities</h4>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="pb-2 font-bold">City</th>
                  <th className="pb-2 text-right font-bold">Scans</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topCitiesData.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-700 truncate max-w-[120px]">{row.name}</td>
                    <td className="py-2.5 text-right font-black text-slate-800">{row.scans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Scans by Site Location (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-2xs flex flex-col gap-4">
          <h4 className="text-sm font-black text-slate-900 tracking-tight">Scans by Site Location</h4>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="pb-2 font-bold">Site Location</th>
                  <th className="pb-2 text-right font-bold">Scans</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {siteScansData.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-700 truncate max-w-[150px]">{row.name}</td>
                    <td className="py-2.5 text-right font-black text-slate-800">{row.scans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Content Card Clicks (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-2xs flex flex-col gap-4 relative">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 tracking-tight">Content Card Clicks</h4>
            
            {/* Site location selector */}
            <div className="relative">
              <button
                onClick={() => setShowClicksSiteDropdown(!showClicksSiteDropdown)}
                className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-[#5c6e84] hover:bg-slate-100 cursor-pointer"
              >
                <span>Site: {selectedClicksSite}</span>
                <ChevronDown className="size-3" />
              </button>

              {showClicksSiteDropdown && (
                <div className="absolute right-0 top-7 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30">
                  {['All Sites', 'North Stand', 'West Stand'].map(site => (
                    <button
                      key={site}
                      onClick={() => {
                        setSelectedClicksSite(site);
                        setShowClicksSiteDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      {site}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="pb-2 font-bold">Card Title</th>
                  <th className="pb-2 text-right font-bold">Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {contentClicksData.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-700 truncate max-w-[200px]">{row.title}</td>
                    <td className="py-2.5 text-right font-black text-slate-800">{row.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Row 2: Trend Chart and Engagement Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Chart Card: Activity Trend (col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[24px] p-5 shadow-2xs flex flex-col gap-4 justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 tracking-tight">Activity Trend</h4>
            
            {/* Chart Legend */}
            <div className="flex items-center gap-3 text-[10px] font-black">
              <div className="flex items-center gap-1.5">
                <span className="size-2 bg-blue-600 rounded-xs" />
                <span className="text-slate-600">Scans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 bg-amber-500 rounded-xs" />
                <span className="text-slate-600">Clicks</span>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="flex-1 w-full min-h-[160px] mt-2 relative">
            <svg viewBox="0 0 500 160" className="w-full h-full select-none" fill="none">
              {/* Horizontal Grid lines */}
              <line x1="30" y1="10" x2="480" y2="10" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="42.5" x2="480" y2="42.5" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="75" x2="480" y2="75" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="107.5" x2="480" y2="107.5" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="#cbd5e1" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="15" y="13" className="fill-slate-400 font-bold text-[9px]">100</text>
              <text x="20" y="45.5" className="fill-slate-400 font-bold text-[9px]">75</text>
              <text x="20" y="78" className="fill-slate-400 font-bold text-[9px]">50</text>
              <text x="20" y="110.5" className="fill-slate-400 font-bold text-[9px]">25</text>
              <text x="25" y="143" className="fill-slate-400 font-bold text-[9px]">0</text>

              {/* X Axis Labels */}
              <text x="30" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">01:00</text>
              <text x="86.25" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">03:00</text>
              <text x="142.5" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">05:00</text>
              <text x="311.25" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">15:00</text>
              <text x="367.5" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">17:00</text>
              <text x="423.75" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">19:00</text>
              <text x="480" y="156" className="fill-slate-400 font-bold text-[9px]" textAnchor="middle">23:00</text>

              {/* Blue Line: Scans */}
              <path 
                d="M 30 50 L 86.25 25 L 142.5 90 L 198.75 110 L 255 75 L 311.25 20 L 367.5 30 L 423.75 90 L 480 120" 
                stroke="#2563eb" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Points for Blue Line */}
              <circle cx="30" cy="50" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="86.25" cy="25" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="142.5" cy="90" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="198.75" cy="110" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="255" cy="75" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="311.25" cy="20" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="367.5" cy="30" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="423.75" cy="90" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <circle cx="480" cy="120" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />

              {/* Amber Line: Clicks */}
              <path 
                d="M 30 65 L 86.25 115 L 142.5 68 L 198.75 72 L 255 125 L 311.25 90 L 367.5 112 L 423.75 92 L 480 115" 
                stroke="#d97706" 
                strokeWidth="2.5" 
                strokeDasharray="4 3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Points for Amber Line */}
              <circle cx="30" cy="65" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="86.25" cy="115" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="142.5" cy="68" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="198.75" cy="72" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="255" cy="125" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="311.25" cy="90" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="367.5" cy="112" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="423.75" cy="92" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
              <circle cx="480" cy="115" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* New Widget: Engagement Highlights (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-2xs flex flex-col gap-6 justify-between">
          <div>
            <h4 className="text-sm font-black text-slate-900 tracking-tight">Engagement Highlights</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Key scanner demographics and content preference details.</p>
          </div>

          {/* Unique vs Repeat Scanners Progress Track */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[11px] font-black">
              <span className="text-slate-700">Scanner Ratio</span>
              <span className="text-blue-600">62% Unique / 38% Repeat</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: '62%' }} />
              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: '38%' }} />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold">
              <span>New Scanners (4,157 scans)</span>
              <span>Returning (2,549 scans)</span>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Popular Categories Progress Tracks */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Top Content Categories</span>
            
            {/* Category 1: Events */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-black text-slate-750">
                <span>Events & Ticket Purchases</span>
                <span>1,540 Clicks (45%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Category 2: Surveys */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-black text-slate-750">
                <span>Fan Surveys & Feedback</span>
                <span>1,324 Clicks (35%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: '35%' }} />
              </div>
            </div>

            {/* Category 3: Promotions */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-black text-slate-750">
                <span>Vouchers & Merchant Promo</span>
                <span>412 Clicks (20%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
