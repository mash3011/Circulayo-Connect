import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import GridCard from './components/GridCard';
import TutorialModal from './components/TutorialModal';
import DetailDrawer from './components/DetailDrawer';
import WorkspaceView from './components/WorkspaceView';
import ConnectDashboard from './components/ConnectDashboard';
import CampaignDisplay from './components/CampaignDisplay';
import { ChevronDown, ChevronRight, Play, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TEMPLATES_DATA = [
  { id: 1, title: 'Home Template 1', date: '2025-07-02', category: 'Home', bgColor: '#f1f5f9', tag: 'POPULAR' },
  { id: 2, title: 'Home Template 2', date: '2025-07-02', category: 'Home', bgColor: '#111827', darkTheme: true },
  { id: 3, title: 'Home Template 3', date: '2025-07-02', category: 'Home', bgColor: '#eff6ff' },
  { id: 4, title: 'Home Template 5', date: '2025-07-02', category: 'Home', bgColor: '#f0f9ff' },
  { id: 5, title: 'Home Template 6', date: '2025-07-02', category: 'Home', bgColor: '#fdf4ff' },
  { id: 6, title: 'Dashboard 1', date: '2025-07-02', category: 'Dashboard', bgColor: '#1e293b', darkTheme: true },
  { id: 7, title: 'Welcome Screen', date: '2025-07-02', category: 'Welcome', bgColor: '#f0fdf4' },
  { id: 8, title: 'Promo Banner', date: '2025-07-02', category: 'Promo', bgColor: '#fffbeb' },
  { id: 9, title: 'Promo Banner', date: '2025-07-02', category: 'Promo', bgColor: '#fffdf5' },
  { id: 10, title: 'Promo Banner', date: '2025-07-02', category: 'Promo', bgColor: '#f8fafc' }
];

export default function App() {
  const isKioskMode = typeof window !== 'undefined' && (
    window.location.search.includes('view=kiosk') || 
    window.location.search.includes('kiosk=true')
  );

  if (isKioskMode) {
    return <CampaignDisplay />;
  }

  const [activeTab, setActiveTab] = useState('home'); // Home page is the first page active by default!
  const [layout, setLayout] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    today: false,
    client: 'all',
    site: 'all'
  });
  
  const [templateFilter, setTemplateFilter] = useState('All');
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');

  
  // Modal & Drawer States
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Collapse states for accordion
  const [collapsedSections, setCollapsedSections] = useState({
    derby: false,
    defaultClient: false,
    drafts: false
  });

  // Card dataset (Main Live Pages)
  const [liveCards, setLiveCards] = useState([
    {
      id: 1,
      title: "Welcome to Default!",
      subtitle: "North Stand",
      client: "Circulayo Admin App",
      date: "2 Jun 2026",
      status: "Live",
      visitors: "420",
      gradientStart: "#f97316", // Orange
      gradientEnd: "#ea580c",
      group: "derby",
      groupName: "Derby County Football Club"
    },
    {
      id: 2,
      title: "Welcome!",
      subtitle: "West",
      client: "Circulayo Admin App",
      date: "19 Jan 2026",
      status: "Live",
      visitors: "3,890",
      gradientStart: "#1e3a5f", // Navy Slate
      gradientEnd: "#112240",
      group: "derby",
      groupName: "Derby County Football Club"
    },
    {
      id: 3,
      title: "Celebrate!",
      subtitle: "South Stand",
      client: "Circulayo Admin App",
      date: "19 Jan 2026",
      status: "Live",
      visitors: "2,140",
      gradientStart: "#16a34a", // Green
      gradientEnd: "#15803d",
      group: "derby",
      groupName: "Derby County Football Club"
    },
    {
      id: 4,
      title: "Goal!",
      subtitle: "Payal Seth",
      client: "Payal Seth",
      date: "19 Jan 2026",
      status: "Live",
      visitors: "6,780",
      gradientStart: "#4f46e5", // Indigo
      gradientEnd: "#3730a3",
      group: "derby",
      groupName: "Derby County Football Club"
    },
    {
      id: 5,
      title: "Hello!",
      subtitle: "Organisation Default Site Test",
      client: "Circulayo Admin",
      date: "15 Jan 2026",
      status: "Live",
      visitors: "912",
      gradientStart: "#475569", // Slate
      gradientEnd: "#334155",
      group: "defaultClient",
      groupName: "Organisation Default Client Test"
    }
  ]);

  // Draft pages dataset
  const [draftCards, setDraftCards] = useState([
    {
      id: 6,
      title: "Site Launch Plan",
      subtitle: "East Stand",
      client: "Circulayo Admin App",
      date: "12 Jun 2026",
      status: "Draft",
      gradientStart: "#3b82f6", // Blue
      gradientEnd: "#1d4ed8",
      group: "drafts",
      groupName: "Pending Draft Revisions"
    },
    {
      id: 7,
      title: "Marketing Feedback Form",
      subtitle: "Corporate Suite",
      client: "Circulayo Admin",
      date: "10 Jun 2026",
      status: "Draft",
      gradientStart: "#ec4899", // Pink
      gradientEnd: "#be185d",
      group: "drafts",
      groupName: "Pending Draft Revisions"
    }
  ]);

  // Toggle Collapse
  const toggleSection = (sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Drawer select helper
  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setIsDrawerOpen(true);
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'clear') {
      setActiveFilters({ today: false, client: 'all', site: 'all' });
      setSearchQuery('');
    } else {
      setActiveFilters(prev => ({ ...prev, [filterName]: value }));
    }
  };

  // Card filter logic
  const applyFilters = (cardList) => {
    return cardList.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            card.client.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilters.today && !card.date.includes('2 Jun 2026')) return false;

      if (activeFilters.client !== 'all') {
        if (activeFilters.client === 'Derby County' && card.group !== 'derby') return false;
        if (activeFilters.client === 'Organisation Default' && card.group !== 'defaultClient') return false;
      }

      if (activeFilters.site !== 'all' && card.subtitle !== activeFilters.site) return false;

      return true;
    });
  };

  const filteredTemplates = TEMPLATES_DATA.filter(tmpl => {
    const matchesSearch = tmpl.title.toLowerCase().includes(templateSearchQuery.toLowerCase());
    const matchesCategory = templateFilter === 'All' || tmpl.category === templateFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredLiveCards = applyFilters(liveCards);
  const filteredDraftCards = applyFilters(draftCards);

  // Grouped cards for main view
  const derbyCards = filteredLiveCards.filter(c => c.group === 'derby');
  const defaultClientCards = filteredLiveCards.filter(c => c.group === 'defaultClient');

  return (
    <div className="h-screen flex flex-col bg-[#eff1f5] font-sans overflow-hidden">
      {/* Header with nav state and tutorial toggle */}
      <Header 
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Filter Bar */}
      {activeTab !== 'workspace' && activeTab !== 'dashboard' && (
        <FilterBar 
          currentLayout={layout}
          onChangeLayout={setLayout}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Main Page Layout Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'workspace' ? (
            <motion.div
              key="workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <WorkspaceView />
            </motion.div>
          ) : activeTab === 'campaign' ? (
            <motion.div
              key="campaign"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <CampaignDisplay />
            </motion.div>
          ) : activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto bg-[#eff1f5] p-6 md:p-8"
            >
              <div className="max-w-7xl w-full mx-auto">
                <ConnectDashboard onChangeTab={setActiveTab} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="others"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto"
            >
              <main className="p-6 md:p-8 w-full max-w-[1440px] mr-auto flex flex-col gap-8 text-left">
                
                {/* Home View */}
                {activeTab === 'home' && (
                  <div className="flex flex-col gap-8">

                    {/* Group 1: Derby County */}
                    {(derbyCards.length > 0 || searchQuery === '') && (
                      <div className="flex flex-col gap-4">
                        <button onClick={() => toggleSection('derby')} className="w-full flex items-center justify-between text-left group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="h-4 w-1 bg-brand-blue rounded-full" />
                            <h2 className="text-base font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                              Derby County Football Club
                            </h2>
                            <span className="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full text-[10px] font-bold">
                              {derbyCards.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 flex-1">
                            <div className="h-px bg-slate-200 flex-1 ml-4" />
                            <span className="text-slate-400 group-hover:text-slate-600">
                              {collapsedSections.derby ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
                            </span>
                          </div>
                        </button>

                        {!collapsedSections.derby && (
                          <div className={`grid gap-6 ${
                            layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'
                          }`}>
                            {derbyCards.map(card => (
                              <GridCard key={card.id} card={card} layout={layout} onSelect={handleSelectCard} onViewAnalytics={() => setActiveTab('dashboard')} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Group 2: Default Client */}
                    {(defaultClientCards.length > 0 || searchQuery === '') && (
                      <div className="flex flex-col gap-4">
                        <button onClick={() => toggleSection('defaultClient')} className="w-full flex items-center justify-between text-left group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="h-4 w-1 bg-brand-blue rounded-full" />
                            <h2 className="text-base font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                              Organisation Default Client Test
                            </h2>
                            <span className="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full text-[10px] font-bold">
                              {defaultClientCards.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 flex-1">
                            <div className="h-px bg-slate-200 flex-1 ml-4" />
                            <span className="text-slate-400 group-hover:text-slate-600">
                              {collapsedSections.defaultClient ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
                            </span>
                          </div>
                        </button>

                        {!collapsedSections.defaultClient && (
                          <div className={`grid gap-6 ${
                            layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'
                          }`}>
                            {defaultClientCards.map(card => (
                              <GridCard key={card.id} card={card} layout={layout} onSelect={handleSelectCard} onViewAnalytics={() => setActiveTab('dashboard')} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}



                {/* Drafts View */}
                {activeTab === 'drafts' && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Pending Draft Revisions</h2>
                      <p className="text-xs text-slate-500 mt-1">Pages currently locked in edit-mode that have unpublished changes.</p>
                    </div>

                    {filteredDraftCards.length === 0 ? (
                      <div className="bg-white border border-brand-border p-10 rounded-2xl text-center text-slate-400">
                        No draft pages found.
                      </div>
                    ) : (
                      <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                        {filteredDraftCards.map(card => (
                          <GridCard key={card.id} card={card} layout={layout} onSelect={handleSelectCard} onViewAnalytics={() => setActiveTab('dashboard')} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Templates View */}
                {activeTab === 'templates' && (
                  <div className="flex flex-col gap-8">
                    
                    {/* Featured Template Banner */}
                    <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-xs flex flex-col md:flex-row gap-8 items-start md:items-center text-left relative overflow-hidden">
                      {/* Left: Mobile mockup frame */}
                      <div className="w-[140px] h-[230px] border-[6px] border-[#0f172a] rounded-[32px] bg-white relative shadow-lg flex items-center justify-center shrink-0">
                        {/* Notch */}
                        <div className="absolute top-1.5 w-12 h-2.5 bg-[#0f172a] rounded-full z-10" />
                        {/* Inner screen content */}
                        <div className="w-full h-full bg-[#f8fafc] rounded-[22px] p-2 flex flex-col justify-between overflow-hidden">
                          <div className="h-5 w-full bg-slate-200/60 rounded-md mt-4" />
                          <div className="flex-1 flex flex-col gap-2 justify-center">
                            <div className="h-2 w-3/4 bg-slate-200/60 rounded-md" />
                            <div className="h-2 w-1/2 bg-slate-200/60 rounded-md" />
                          </div>
                          <div className="h-5 w-full bg-slate-200/60 rounded-md" />
                        </div>
                      </div>

                      {/* Right: Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs text-brand-green font-bold uppercase tracking-wide">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Featured Template</span>
                        </div>

                        <h2 className="text-2xl font-bold text-[#0f172a] mt-3 tracking-tight font-montserrat">
                          Home Template 1
                        </h2>

                        <p className="text-slate-500 text-[13px] mt-2.5 leading-relaxed max-w-xl">
                          A professionally designed template optimised for high engagement.<br />
                          Perfect for showcasing your brand with a modern, clean layout that adapts beautifully across all devices.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-5 text-[11px] font-semibold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>Created 2025-07-02</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                            <span>Mobile optimised</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                          <button className="bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-blue/15 cursor-pointer">
                            Use Template
                          </button>
                          <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter and Search Bar Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                      {/* Filter pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                        {['All', 'Home', 'Dashboard', 'Welcome', 'Promo', 'Social'].map((tab) => {
                          const isTabActive = templateFilter === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => setTemplateFilter(tab)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                isTabActive
                                  ? 'bg-[#111827] text-white'
                                  : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100/40'
                              }`}
                            >
                              {tab}
                            </button>
                          );
                        })}
                      </div>

                      {/* Search box */}
                      <div className="relative w-full sm:w-64 flex items-center">
                        <svg className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                          type="text"
                          placeholder="Search templates..."
                          value={templateSearchQuery}
                          onChange={(e) => setTemplateSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-slate-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Templates List Grid */}
                    <div className="flex flex-col gap-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Showing {filteredTemplates.length} templates
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {filteredTemplates.map((tmpl) => {
                          return (
                            <div 
                              key={tmpl.id}
                              className="bg-white border border-[#e2e8f0] rounded-[20px] p-0.5 flex flex-col justify-between overflow-hidden shadow-xs hover:border-slate-355 hover:shadow-xs transition-all text-left"
                            >
                              {/* Top Preview Area with styled background */}
                              <div 
                                className="h-40 rounded-[18px] m-1 flex items-center justify-center relative overflow-hidden"
                                style={{ backgroundColor: tmpl.bgColor }}
                              >
                                {/* Popular tag */}
                                {tmpl.tag && (
                                  <span className="absolute top-3 left-3 bg-[#fef08a] text-[#854d0e] text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">
                                    {tmpl.tag}
                                  </span>
                                )}

                                {/* Small Mock Phone inside the card preview */}
                                <div className={`w-14 h-24 border-[3px] rounded-[18px] bg-white flex flex-col items-center justify-between p-1 shadow-sm relative shrink-0 ${
                                  tmpl.darkTheme ? 'border-[#3b82f6]/40 bg-[#1e293b]/50' : 'border-[#0f172a]'
                                }`}>
                                  {/* Notch */}
                                  <div className={`w-5 h-0.5 rounded-full absolute top-1 ${
                                    tmpl.darkTheme ? 'bg-[#3b82f6]/40' : 'bg-[#0f172a]'
                                  }`} />
                                  {/* Screen inner mock */}
                                  <div className={`w-full h-full rounded-[13px] ${
                                    tmpl.darkTheme ? 'bg-[#0f172a]/80' : 'bg-[#f8fafc]'
                                  }`} />
                                </div>
                              </div>

                              {/* Bottom Details Info */}
                              <div className="p-3.5 pb-4 flex flex-col text-left">
                                <h3 className="text-xs font-extrabold text-[#0f172a] truncate">
                                  {tmpl.title}
                                </h3>
                                <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                                  Created on {tmpl.date}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {isTutorialOpen && (
          <TutorialModal 
            isOpen={isTutorialOpen} 
            onClose={() => setIsTutorialOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Selected Card Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <DetailDrawer 
            card={selectedCard}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
