import React from 'react';
import { LayoutGrid, List, Clock, Focus, Calendar, Users, Globe, XCircle, Search, ChevronDown } from 'lucide-react';

export default function FilterBar({ 
  currentLayout, 
  onChangeLayout, 
  activeFilters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}) {
  return (
    <div className="w-full bg-white border-b border-brand-border py-4 px-4 md:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none z-10 relative">
      {/* Search Input & Left side */}
      <div className="flex-1 max-w-md relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="size-4" />
        </span>
        <input 
          type="text" 
          placeholder="Search published pages or sites..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200 shadow-2xs"
        />
      </div>

      {/* Toggles & Filters Container */}
      <div className="flex flex-wrap items-center gap-3">
        {/* View Mode Toggle: Grid, List, Recents */}
        <div className="bg-slate-100 p-1 rounded-full flex items-center border border-slate-200/60 shadow-2xs">
          <button 
            onClick={() => onChangeLayout('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentLayout === 'grid' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid className="size-3.5" />
            <span>Grid</span>
          </button>
          <button 
            onClick={() => onChangeLayout('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentLayout === 'list' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="size-3.5" />
            <span>List</span>
          </button>
          <button 
            onClick={() => onChangeLayout('recents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentLayout === 'recents' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="size-3.5" />
            <span>Recents</span>
          </button>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Today Filter */}
          <button 
            onClick={() => onFilterChange('today', !activeFilters.today)}
            className={`border flex gap-1.5 items-center px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-2xs cursor-pointer ${
              activeFilters.today 
                ? 'bg-brand-blue text-white border-brand-blue' 
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Calendar className="size-3.5" />
            <span>Today</span>
          </button>

          {/* Client Filter Dropdown */}
          <div className="relative">
            <select 
              value={activeFilters.client}
              onChange={(e) => onFilterChange('client', e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 px-4 py-2 pr-9 hover:bg-slate-50 focus:outline-none cursor-pointer shadow-2xs transition-all"
            >
              <option value="all">Client: All clients</option>
              <option value="Derby County">Client: Derby County</option>
              <option value="Organisation Default">Client: Organisation Default</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-700">
              <ChevronDown className="size-3.5 stroke-[2.5]" />
            </span>
          </div>

          {/* Site Filter Dropdown */}
          <div className="relative">
            <select 
              value={activeFilters.site}
              onChange={(e) => onFilterChange('site', e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 px-4 py-2 pr-9 hover:bg-slate-50 focus:outline-none cursor-pointer shadow-2xs transition-all"
            >
              <option value="all">Site: All sites</option>
              <option value="North Stand">Site: North Stand</option>
              <option value="West">Site: West Stand</option>
              <option value="South Stand">Site: South Stand</option>
              <option value="Payal Seth">Site: Payal Seth</option>
              <option value="Organisation Default Site Test">Site: Default Site Test</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-700">
              <ChevronDown className="size-3.5 stroke-[2.5]" />
            </span>
          </div>

          {/* Clear Button */}
          {(activeFilters.today || activeFilters.client !== 'all' || activeFilters.site !== 'all' || searchQuery !== '') && (
            <button 
              onClick={() => {
                onFilterChange('clear', null);
              }}
              className="flex gap-1.5 items-center px-3.5 py-2 rounded-full text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
            >
              <XCircle className="size-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
