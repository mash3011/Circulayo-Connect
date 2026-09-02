import React from 'react';
import { LayoutGrid, List, Clock, Focus, Calendar, Users, Globe, XCircle, Search } from 'lucide-react';

export default function FilterBar({ 
  currentLayout, 
  onChangeLayout, 
  activeFilters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}) {
  return (
    <div className="w-full bg-white border-b border-brand-border py-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none z-10 relative">
      {/* Search Input & Left side */}
      <div className="flex-1 max-w-md relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="size-4" />
        </span>
        <input 
          type="text" 
          placeholder="Search published pages or sites..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-brand-border rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
        />
      </div>

      {/* Toggles & Filters Container */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Layout Toggle */}
        <div className="bg-slate-100 p-0.5 rounded-xl flex items-center border border-brand-border">
          <button 
            onClick={() => onChangeLayout('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentLayout === 'grid' 
                ? 'bg-white border border-brand-border text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="size-3.5" />
            <span>Grid</span>
          </button>
          
          <button 
            onClick={() => onChangeLayout('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentLayout === 'list' 
                ? 'bg-white border border-brand-border text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="size-3.5" />
            <span>List</span>
          </button>

          <button 
            onClick={() => onChangeLayout('recents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentLayout === 'recents' 
                ? 'bg-white border border-brand-border text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="size-3.5" />
            <span>Recents</span>
          </button>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Today Filter */}
          <button 
            onClick={() => onFilterChange('today', !activeFilters.today)}
            className={`border flex gap-1.5 items-center px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-sm ${
              activeFilters.today 
                ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue' 
                : 'bg-white border-brand-border text-slate-700 hover:bg-slate-50'
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
              className="appearance-none bg-white border border-brand-border rounded-xl text-xs font-medium text-slate-700 px-3 py-1.5 pr-8 hover:bg-slate-50 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="all">All clients</option>
              <option value="Derby County">Derby County</option>
              <option value="Organisation Default">Organisation Default</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
              <Users className="size-3" />
            </span>
          </div>

          {/* Site Filter Dropdown */}
          <div className="relative">
            <select 
              value={activeFilters.site}
              onChange={(e) => onFilterChange('site', e.target.value)}
              className="appearance-none bg-white border border-brand-border rounded-xl text-xs font-medium text-slate-700 px-3 py-1.5 pr-8 hover:bg-slate-50 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="all">All sites</option>
              <option value="North Stand">North Stand</option>
              <option value="West">West Stand</option>
              <option value="South Stand">South Stand</option>
              <option value="Payal Seth">Payal Seth</option>
              <option value="Organisation Default Site Test">Default Site Test</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
              <Globe className="size-3" />
            </span>
          </div>

          {/* Clear Button */}
          {(activeFilters.today || activeFilters.client !== 'all' || activeFilters.site !== 'all' || searchQuery !== '') && (
            <button 
              onClick={() => {
                onFilterChange('clear', null);
              }}
              className="flex gap-1.5 items-center px-3 py-1.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
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
