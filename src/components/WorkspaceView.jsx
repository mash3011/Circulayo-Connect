import React, { useState } from 'react';
import { 
  Undo2, Redo2, Eye, Lock, Unlock, Edit2, Palette, ChevronDown, ChevronUp, X, 
  Search, GripVertical, Trash2, Smartphone, HelpCircle, 
  Menu, QrCode, ArrowRight, Play, Check, ArrowLeft, FileText,
  LayoutGrid, Copyright, Gift, Type, Leaf, Image, Megaphone, Share2, TrendingUp, Lightbulb,
  Calendar, Focus, CreditCard, Tag, DollarSign, Layers, Plus, MousePointer, Settings,
  MapPin, Compass, Coffee, Tv, ChevronRight, ChevronLeft, Map,
  User, Home, Link, Upload
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

export default function WorkspaceView() {
  const [activeLeftTab, setActiveLeftTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulation states for editing panels
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeEditorTab, setActiveEditorTab] = useState('Content');
  const [showQuickColorPopover, setShowQuickColorPopover] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const [logoText, setLogoText] = useState('CIRCULAYO');
  const [cardContent, setCardContent] = useState({
    label: 'Card Heading',
    image: '/carling_banner.png',
    heading: 'Default card Heading',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    buttonText: 'DONATE HERE',
    buttonLink: 'https://circulayo.com/donate'
  });

  const [enabledModules, setEnabledModules] = useState({
    sidenav: true,
    header: true,
    card: true,
    doyouknow: true,
    events: true,
    footer: true,
    winner: true,
    heading: true,
    savings: true,
    pagebg: true,
    promotions: true,
    sociallinks: true,
    totalsavings: true
  });
  
  const isHeaderEnabled = enabledModules.header;
  const isSidenavEnabled = enabledModules.sidenav;
  
  const setIsHeaderEnabled = (val) => {
    setEnabledModules(prev => ({
      ...prev,
      header: typeof val === 'function' ? val(prev.header) : val
    }));
  };
  
  const setIsSidenavEnabled = (val) => {
    setEnabledModules(prev => ({
      ...prev,
      sidenav: typeof val === 'function' ? val(prev.sidenav) : val
    }));
  };

  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [moduleOrder, setModuleOrder] = useState(['sidenav', 'header']);

  const moduleConfig = {
    sidenav: { label: 'SIDENAV', icon: User, defaultSub: 'circulayo.appworld@yahoo.com' },
    header: { label: 'HEADER', icon: LayoutGrid, defaultSub: 'Header Navigation Control' },
    card: { label: 'CARD', icon: CreditCard, defaultSub: 'Card Layout Component' },
    doyouknow: { label: 'DO YOU KNOW', icon: Lightbulb, defaultSub: 'Fact Card Component' },
    events: { label: 'EVENTS', icon: Calendar, defaultSub: 'Events Grid Component' },
    footer: { label: 'FOOTER', icon: Layers, defaultSub: 'Footer Navigation Component' },
    winner: { label: 'GOLDEN WINNER', icon: Gift, defaultSub: 'Voucher Reward Component' },
    heading: { label: 'HEADING', icon: Type, defaultSub: 'Heading Text Element' },
    savings: { label: 'ITEM SAVINGS', icon: Leaf, defaultSub: 'Green Savings Tracker' },
    pagebg: { label: 'PAGE BACKGROUND', icon: Focus, defaultSub: 'Visual Mockup Background' },
    promotions: { label: 'PROMOTIONS', icon: Tag, defaultSub: 'Promotional Offers list' },
    sociallinks: { label: 'SOCIAL LINKS', icon: Share2, defaultSub: 'Social Sharing Links' },
    totalsavings: { label: 'TOTAL SAVINGS', icon: DollarSign, defaultSub: 'Savings Metrics Card' }
  };
  
  // Sidenav content settings
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [userName, setUserName] = useState('CIRCULAYO');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
  const [showHome, setShowHome] = useState(true);
  const [homeLink, setHomeLink] = useState('https://circulayo.com/home');
  const [homeLabel, setHomeLabel] = useState('Home');
  const [showAccountInfo, setShowAccountInfo] = useState(true);
  const [accountLink, setAccountLink] = useState('https://circulayo.com/account');
  const [accountLabel, setAccountLabel] = useState('Account Information');
  
  const baseElementStyles = {
    // Layout
    display: 'Block',
    direction: 'Column',
    justify: 'start',
    align: 'stretch',
    gap: 0,
    
    // Spacing
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLocked: true,
    paddingLocked: true,
    
    // Size
    width: 'Auto',
    height: 'Auto',
    minWidth: '0',
    minHeight: '0',
    maxWidth: 'None',
    maxHeight: 'None',
    
    // Typography
    fontFamily: 'Canva Sans',
    fontSize: 14,
    fontWeight: 'Normal',
    lineHeight: 20,
    letterSpacing: 0,
    textColor: '#334155',
    textAlign: 'left',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    textTransform: 'none',
    
    // Backgrounds
    bgColor: 'transparent',
    bgImage: '',
    
    // Borders
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#007bff',
    borderRadius: 0,
    borderRadiusLocked: true,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    
    // Effects
    opacity: 100,
    boxShadow: 'none'
  };

  const defaultElementStyles = {
    header: {
      ...baseElementStyles,
      display: 'Flex',
      direction: 'Row',
      justify: 'between',
      align: 'center',
      gap: 12,
      paddingTop: 32,
      paddingBottom: 14,
      paddingLeft: 16,
      paddingRight: 16,
      width: '105%',
      height: 'Auto',
      fontSize: 12,
      fontWeight: 'Bold',
      textColor: '#0f172a',
      bgColor: '#ffffff',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#f1f5f9'
    },
    subtitle: {
      ...baseElementStyles,
      display: 'Block',
      width: 'Auto',
      height: 'Auto',
      fontSize: 9,
      fontWeight: 'Bold',
      textColor: '#2563eb', // brand-blue
      marginBottom: 4
    },
    title: {
      ...baseElementStyles,
      display: 'Block',
      width: 'Auto',
      height: 'Auto',
      fontSize: 24,
      fontWeight: 'Extrabold',
      textColor: '#0f172a',
      marginTop: 4,
      lineHeight: 28
    },
    paragraph: {
      ...baseElementStyles,
      display: 'Block',
      width: 'Auto',
      height: 'Auto',
      fontSize: 10,
      textColor: '#64748b',
      lineHeight: 16
    },
    heroImage: {
      ...baseElementStyles,
      display: 'Block',
      width: '100%',
      height: '144',
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
    mapCard: {
      ...baseElementStyles,
      display: 'Flex',
      direction: 'Column',
      justify: 'start',
      align: 'stretch',
      gap: 6,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      width: '100%',
      height: 'Auto',
      fontSize: 9,
      fontWeight: 'Bold',
      textColor: '#1e293b',
      bgColor: '#f8fafc',
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0'
    },
    footer: {
      ...baseElementStyles,
      display: 'Flex',
      direction: 'Row',
      justify: 'around',
      align: 'center',
      gap: 8,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      width: '100%',
      height: 'Auto',
      fontSize: 9,
      fontWeight: 'Semibold',
      textColor: '#94a3b8',
      bgColor: '#f8fafc',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#f1f5f9'
    },
    sidenav: {
      ...baseElementStyles,
      display: 'Flex',
      direction: 'Column',
      justify: 'start',
      align: 'stretch',
      gap: 12,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      width: '220px',
      height: '100%',
      fontSize: 12,
      fontWeight: 'Normal',
      textColor: '#334155',
      bgColor: '#ffffff'
    }
  };

  const [elementStyles, setElementStyles] = useState(defaultElementStyles);
  const [openSections, setOpenSections] = useState({
    layout: true,
    spacing: false,
    size: false,
    typography: false,
    backgrounds: false,
    borders: false,
    effects: false
  });
  const updateSelectedElementStyle = (property, value) => {
    if (!selectedElement) return;
    setElementStyles(prev => ({
      ...prev,
      [selectedElement.id]: {
        ...prev[selectedElement.id],
        [property]: value
      }
    }));
  };

  const handleResetStyles = () => {
    if (!selectedElement) return;
    setElementStyles(prev => ({
      ...prev,
      [selectedElement.id]: defaultElementStyles[selectedElement.id]
    }));
    alert(`Styles reset to default for ${selectedElement.label}!`);
  };

  const handleApplyStyles = () => {
    if (!selectedElement) return;
    alert(`Styles applied successfully for ${selectedElement.label}!`);
  };

  const parseStyleVal = (val) => {
    if (val === undefined || val === null) return { num: '', unit: 'auto' };
    const str = String(val).trim();
    if (str === '' || str.toLowerCase() === 'auto') return { num: '', unit: 'auto' };
    if (str.toLowerCase() === 'none') return { num: '', unit: 'none' };
    const match = str.match(/^(\d+(?:\.\d+)?)(px|%|rem|vh|vw|em)?$/i);
    if (match) {
      return { num: match[1], unit: match[2] || 'px' };
    }
    return { num: str, unit: 'px' };
  };

  const handleSizeChange = (prop, num, unit) => {
    if (!selectedElement) return;
    if (unit === 'auto' || unit === 'none') {
      updateSelectedElementStyle(prop, unit);
    } else {
      updateSelectedElementStyle(prop, `${num}${unit}`);
    }
  };

  const getComputedElementStyles = (id) => {
    const s = elementStyles[id];
    if (!s) return {};
    
    // Parse height & width
    const parseUnit = (val) => {
      if (typeof val === 'number') return `${val}px`;
      if (!val) return 'auto';
      const clean = val.toLowerCase().trim();
      if (clean === 'auto' || clean === 'none') return clean;
      if (clean.endsWith('px') || clean.endsWith('%') || clean.endsWith('rem') || clean.endsWith('vh') || clean.endsWith('vw')) return clean;
      return `${val}px`;
    };

    const w = parseUnit(s.width);
    const h = parseUnit(s.height);
    const minW = parseUnit(s.minWidth);
    const minH = parseUnit(s.minHeight);
    const maxW = parseUnit(s.maxWidth);
    const maxH = parseUnit(s.maxHeight);

    // Map align & justify
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around'
    };
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline'
    };

    // Border radius corners
    const tl = s.borderRadiusLocked ? `${s.borderRadius}px` : `${s.borderTopLeftRadius}px`;
    const tr = s.borderRadiusLocked ? `${s.borderRadius}px` : `${s.borderTopRightRadius}px`;
    const bl = s.borderRadiusLocked ? `${s.borderRadius}px` : `${s.borderBottomLeftRadius}px`;
    const br = s.borderRadiusLocked ? `${s.borderRadius}px` : `${s.borderBottomRightRadius}px`;

    const styles = {
      display: s.display === 'Flex' ? 'flex' : s.display === 'Grid' ? 'grid' : 'block',
      flexDirection: s.direction === 'Row' ? 'row' : 'column',
      justifyContent: justifyMap[s.justify] || s.justify,
      alignItems: alignMap[s.align] || s.align,
      gap: `${s.gap}px`,
      
      // Spacing
      paddingTop: `${s.paddingTop}px`,
      paddingBottom: `${s.paddingBottom}px`,
      paddingLeft: `${s.paddingLeft}px`,
      paddingRight: `${s.paddingRight}px`,
      marginTop: `${s.marginTop}px`,
      marginBottom: `${s.marginBottom}px`,
      marginLeft: `${s.marginLeft}px`,
      marginRight: `${s.marginRight}px`,
      
      // Size
      width: w,
      height: h,
      minWidth: minW,
      minHeight: minH,
      maxWidth: maxW,
      maxHeight: maxH,
      
      // Typography
      fontFamily: s.fontFamily === 'Canva Sans' ? `'Canva Sans', 'Source Sans Pro', sans-serif` : s.fontFamily,
      fontSize: `${s.fontSize}px`,
      fontWeight: s.fontWeight === 'Extrabold' ? '800' : s.fontWeight === 'Bold' ? '700' : s.fontWeight === 'Semibold' ? '600' : '400',
      lineHeight: `${s.lineHeight}px`,
      letterSpacing: `${s.letterSpacing}px`,
      color: s.textColor,
      textAlign: s.textAlign,
      fontStyle: s.fontStyle || 'normal',
      textDecorationLine: s.textDecorationLine || 'none',
      textTransform: s.textTransform || 'none',
      
      // Backgrounds
      backgroundColor: s.bgColor,
      backgroundImage: s.bgImage ? `url(${s.bgImage})` : undefined,
      backgroundSize: s.bgImage ? 'cover' : undefined,
      backgroundPosition: s.bgImage ? 'center' : undefined,
      
      // Borders
      borderWidth: `${s.borderWidth}px`,
      borderStyle: s.borderStyle,
      borderColor: s.borderColor,
      borderTopLeftRadius: tl,
      borderTopRightRadius: tr,
      borderBottomLeftRadius: bl,
      borderBottomRightRadius: br,
      
      // Effects
      opacity: s.opacity / 100,
      boxShadow: s.boxShadow === 'none' ? undefined : s.boxShadow
    };

    return styles;
  };

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Default pages inside the 3D mobile stack carousel
  const [pages, setPages] = useState([
    {
      id: 'info',
      type: 'info',
      title: 'Home',
      titleText: 'Redefining Gathering.',
      label: 'Sustainability Info Page',
      active: true,
      subtitle: 'SUSTAINABLE STEWARDSHIP',
      paragraph: 'Join a movement where every event leaves a footprint of progress. We track the micro-impact of our community to build a macro-legacy of restoration.',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'map',
      type: 'map',
      title: 'Map',
      label: 'Sustainability Map Page',
      active: true,
      searchPlaceholder: 'Find a cup recycling point...',
      activeLocation: {
        name: 'Pride Park Stadium',
        subtitle: 'North Stand Refill Hub',
        recycledCount: '1,280 cups recycled',
        status: 'Active'
      }
    },
    {
      id: 'stats',
      type: 'stats',
      title: 'Impact',
      label: 'Impact Dashboard Page',
      active: true,
      subtitle: 'CARBON SAVINGS',
      metrics: [
        { label: 'Water Saved', value: '1,280 Liters', percentage: 72 },
        { label: 'CO2 Offset', value: '186 kg', percentage: 65 },
        { label: 'Cups Recycled', value: '5,400', percentage: 87 },
        { label: 'Green Energy', value: '420 kWh', percentage: 50 }
      ]
    },
    {
      id: 'events',
      type: 'events',
      title: 'Learn',
      label: 'Matchday Event Hub Page',
      active: true,
      eventName: 'Derby County vs Forest',
      eventDate: 'Saturday, June 20, 2026',
      location: 'Pride Park Stadium'
    }
  ]);

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSidebarView, setActiveSidebarView] = useState('grid'); // 'grid' or 'card-designs'
  const [selectedComponentForVariant, setSelectedComponentForVariant] = useState(null);
  const [showMapCardOnHome, setShowMapCardOnHome] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(true);
  const [copied, setCopied] = useState(false);

  // Brand Templates State
  const [brandTemplates, setBrandTemplates] = useState([
    {
      id: 'brand-temp-1',
      title: 'Home Lobby Template',
      desc: 'Standard DCFC layout with events list, Fact card (Do You Know), and green savings indicators.',
      modules: ['sidenav', 'header', 'card', 'doyouknow', 'savings', 'footer']
    },
    {
      id: 'brand-temp-2',
      title: 'Campaign Promo Layout',
      desc: 'Promo-heavy page containing Header, Hero banner card, promotions grid, and social links.',
      modules: ['sidenav', 'header', 'card', 'promotions', 'sociallinks', 'footer']
    },
    {
      id: 'brand-temp-3',
      title: 'Voucher Reward Layout',
      desc: 'Winner voucher rewards page combined with total savings counters.',
      modules: ['sidenav', 'header', 'winner', 'totalsavings', 'footer']
    }
  ]);

  const handleSaveAsBrandTemplate = () => {
    const name = prompt("Enter a name for your custom brand template:", `My Brand Template ${brandTemplates.length - 3 + 1}`);
    if (!name) return;
    const newTemp = {
      id: `custom-temp-${Date.now()}`,
      title: name,
      desc: 'Custom user layout saved from active workspace stack.',
      modules: [...moduleOrder]
    };
    setBrandTemplates(prev => [...prev, newTemp]);
    alert(`"${name}" has been saved as a brand template successfully!`);
  };

  const handleApplyTemplate = (temp) => {
    setModuleOrder(temp.modules);
    
    // update enabled modules state
    const newEnabled = {
      sidenav: temp.modules.includes('sidenav'),
      header: temp.modules.includes('header'),
      card: temp.modules.includes('card'),
      doyouknow: temp.modules.includes('doyouknow'),
      events: temp.modules.includes('events'),
      footer: temp.modules.includes('footer'),
      winner: temp.modules.includes('winner'),
      heading: temp.modules.includes('heading'),
      savings: temp.modules.includes('savings'),
      pagebg: temp.modules.includes('pagebg'),
      promotions: temp.modules.includes('promotions'),
      sociallinks: temp.modules.includes('sociallinks'),
      totalsavings: temp.modules.includes('totalsavings')
    };
    setEnabledModules(newEnabled);
    alert(`"${temp.title}" layout applied successfully to the phone editor canvas!`);
  };



  // Active elements in the phone editor (right side)
  const [editorModules, setEditorModules] = useState([
    { id: 'header', label: 'Header', active: true },
    { id: 'heading', label: 'Heading & Text', active: true },
    { id: 'heroImage', label: 'Hero Image banner', active: true },
    { id: 'footer', label: 'Footer navigation', active: true }
  ]);

  // Filter pill state
  const [selectedFilter, setSelectedFilter] = useState('All blocks');

  // Component elements in the left panel matching the new design details
  const leftComponents = [
    { id: 'card', label: 'Card', used: '0/6 used', designs: '13 designs', icon: LayoutGrid },
    { id: 'doyouknow', label: 'Do You Know', used: '0/1 used', designs: '4 designs', icon: Lightbulb },
    { id: 'events', label: 'Events', used: '0/2 used', designs: '3 designs', icon: Calendar },
    { id: 'footer', label: 'Footer', used: '0/1 used', designs: '1 design', icon: Copyright },
    { id: 'winner', label: 'Golden Winner', used: '0/1 used', designs: '1 design', icon: Gift },
    { id: 'header', label: 'Header', used: '0/1 used', designs: '2 designs', icon: LayoutGrid, highlight: true },
    { id: 'heading', label: 'Heading', used: '0/2 used', designs: '2 designs', icon: Type },
    { id: 'savings', label: 'Item Savings', used: '0/1 used', designs: '5 designs', icon: Leaf },
    { id: 'pagebg', label: 'Page Background', used: '0/1 used', designs: '1 design', icon: Focus },
    { id: 'promotions', label: 'Promotions', used: '0/2 used', designs: '2 designs', icon: Megaphone },
    { id: 'sociallinks', label: 'Social Links', used: '0/1 used', designs: '1 design', icon: Share2 },
    { id: 'totalsavings', label: 'Total Savings', used: '0/1 used', designs: '4 designs', icon: TrendingUp }
  ];

  const emptyStateComponents = [
    { id: 'header', label: 'Header', count: '1/3', icon: LayoutGrid },
    { id: 'sideNav', label: 'Side Navigation', count: '1/1', icon: Menu },
    { id: 'heading', label: 'Heading', count: '2/2', icon: 'H' },
    { id: 'savings', label: 'Item Savings', count: '1/1', icon: Leaf },
    { id: 'card', label: 'Card', count: '3/4', icon: CreditCard },
    { id: 'events', label: 'Events', count: '0/0', icon: Calendar },
    { id: 'promotions', label: 'Promotions', count: '0/0', icon: Tag },
    { id: 'doyouknow', label: 'Do you know', count: '0/0', icon: Lightbulb },
    { id: 'totalsavings', label: 'Total Savings', count: '0/0', icon: DollarSign },
    { id: 'sociallinks', label: 'Social Links', count: '0/0', icon: Share2 },
    { id: 'footer', label: 'Footer', count: '0/0', icon: Layers },
    { id: 'pagebg', label: 'Page Background', count: '0/0', icon: Palette }
  ];

  // Toggle active status of a page in the stack
  const handleTogglePage = (id) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, active: !page.active } : page
    ));
  };

  // Delete page from stack
  const handleDeletePage = (id) => {
    if (pages.length <= 1) {
      alert("You must keep at least one page in the canvas stack!");
      return;
    }
    setPages(prev => prev.filter(page => page.id !== id));
    setActivePageIndex(0);
  };

  const handleSelectVariant = (variantType) => {
    if (variantType === 'map') {
      setShowMapCardOnHome(true);
    }
    // Check if page already exists in the stack
    const existingIndex = pages.findIndex(p => p.type === variantType);
    
    if (existingIndex !== -1) {
      // If it exists, bring it to the foreground
      setActivePageIndex(existingIndex);
    } else {
      // Add a new page to the pages array
      let newPage = null;
      if (variantType === 'map') {
        newPage = {
          id: 'map-' + Date.now(),
          type: 'map',
          title: 'Sustainability Map',
          label: 'Sustainability Map Page',
          active: true,
          searchPlaceholder: 'Find a cup recycling point...',
          activeLocation: {
            name: 'Pride Park Stadium',
            subtitle: 'North Stand Refill Hub',
            recycledCount: '1,280 cups recycled',
            status: 'Active'
          }
        };
      } else if (variantType === 'stats') {
        newPage = {
          id: 'stats-' + Date.now(),
          type: 'stats',
          title: 'Impact Dashboard',
          label: 'Impact Dashboard Page',
          active: true,
          subtitle: 'CARBON SAVINGS',
          metrics: [
            { label: 'Water Saved', value: '1,280 Liters', percentage: 72 },
            { label: 'CO2 Offset', value: '186 kg', percentage: 65 },
            { label: 'Cups Recycled', value: '5,400', percentage: 87 },
            { label: 'Green Energy', value: '420 kWh', percentage: 50 }
          ]
        };
      } else if (variantType === 'winner') {
        newPage = {
          id: 'winner-' + Date.now(),
          type: 'winner',
          title: 'Golden Winner',
          label: 'Golden Winner Screen',
          active: true,
          subtitle: 'REWARD CLAIMED',
          voucherTitle: 'Free Coffee Voucher',
          voucherDetails: 'Circulayo Eco-Cup Reward'
        };
      } else if (variantType === 'events') {
        newPage = {
          id: 'events-' + Date.now(),
          type: 'events',
          title: 'Matchday Event Hub',
          label: 'Matchday Event Hub Page',
          active: true,
          eventName: 'Derby County vs Forest',
          eventDate: 'Saturday, June 20, 2026',
          location: 'Pride Park Stadium'
        };
      }
      
      if (newPage) {
        setPages(prev => [...prev, newPage]);
        // Set active page index to the newly created page
        setActivePageIndex(pages.length);
      }
    }
  };

  // Toggle active status in editor modules (for inner content toggle)
  const handleToggleModule = (id) => {
    setEditorModules(prev => prev.map(mod => 
      mod.id === id ? { ...mod, active: !mod.active } : mod
    ));
  };

  // Delete module from list
  const handleDeleteModule = (id) => {
    setEditorModules(prev => prev.filter(mod => mod.id !== id));
  };

  // Add a module
  const handleAddModule = (comp) => {
    if (editorModules.some(m => m.id === comp.id)) {
      setEditorModules(prev => prev.map(m => m.id === comp.id ? { ...m, active: true } : m));
    } else {
      setEditorModules(prev => [
        ...prev,
        { id: comp.id, label: comp.label, active: true }
      ]);
    }

    // Add to moduleOrder if not already present
    setModuleOrder(prev => {
      if (prev.includes(comp.id)) return prev;
      return [...prev, comp.id];
    });

    // Enable the module
    setEnabledModules(prev => ({
      ...prev,
      [comp.id]: true
    }));
  };

  // Helper check if module is visible
  const isVisible = (id) => {
    const mod = editorModules.find(m => m.id === id);
    return mod ? mod.active : false;
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#eff1f5] overflow-hidden">
      
      {/* Editor Body Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Column: Components Panel */}
        <AnimatePresence>
          {!isPreviewMode && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-r border-[#e2e8f0] flex flex-col shrink-0 select-none overflow-y-auto scrollbar-none"
            >
              <div className="flex flex-col h-full min-h-0">
                {activeSidebarView === 'card-designs' ? (
                  // ------------------ NESTED CARD DESIGNS SUB-VIEW ------------------
                  <div className="flex flex-col h-full min-h-0 bg-white">
                    {/* Header: Back button & Breadcrumbs */}
                    <div className="px-4 pt-4 pb-2 flex flex-col gap-3 shrink-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <button 
                          onClick={() => setActiveSidebarView('grid')}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 cursor-pointer shadow-xs transition-all active:scale-95"
                        >
                          <ChevronRight className="size-3.5 rotate-180" /> {/* points left */}
                          <span>Blocks</span>
                        </button>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-800 font-extrabold text-sm">Card</span>
                      </div>
                      
                      {/* Badges Row */}
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0">
                          0/6 used
                        </span>
                        <span className="bg-[#eff6ff] border border-[#dbeafe] text-[#2563eb] text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0">
                          13 designs
                        </span>
                        <div className="flex-1 h-px bg-slate-100 ml-1 animate-pulse" />
                      </div>
                    </div>

                    {/* Scrollable Designs List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-4.5 scrollbar-none">
                      
                      {/* Card Style 1 */}
                      <div 
                        onClick={() => handleSelectVariant('info')}
                        className="bg-white border border-slate-200 hover:border-brand-blue rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
                      >
                        {/* Image Preview Container */}
                        <div className="p-4 bg-white flex items-center justify-center border-b border-slate-100 h-40">
                          <div className="w-[160px] h-[120px] bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between p-1.5 shadow-xs scale-90 group-hover:scale-95 transition-transform duration-300">
                            <span className="text-[5px] font-black text-slate-800">Card Heading</span>
                            <div className="h-12 w-full rounded bg-slate-150 overflow-hidden mt-1 relative">
                              <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[4px] font-extrabold text-slate-850 mt-1 leading-none">Default card Heading</span>
                            <span className="text-[3px] text-slate-400 mt-0.5 leading-none line-clamp-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                            <div className="bg-[#007bff] text-white text-[4px] font-black text-center py-1 rounded mt-1.5">DONATE HERE</div>
                          </div>
                        </div>
                        {/* Style Title */}
                        <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-800">Card Style 1</span>
                        </div>
                      </div>

                      {/* Card Style 2 */}
                      <div 
                        onClick={() => handleSelectVariant('winner')}
                        className="bg-white border border-slate-200 hover:border-brand-blue rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
                      >
                        {/* Image Preview Container */}
                        <div className="p-4 bg-white flex items-center justify-center border-b border-slate-100 h-40">
                          <div className="w-[160px] h-[120px] bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center p-1.5 shadow-xs scale-90 group-hover:scale-95 transition-transform duration-300">
                            <span className="text-[4px] font-black text-slate-500 uppercase tracking-widest leading-none">Tools & Features</span>
                            <div className="size-8 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100 mt-1">
                              <Gift className="size-4" />
                            </div>
                            <span className="text-[5px] font-black text-amber-700 mt-1">GOLDEN CUP WINNER</span>
                            <span className="text-[3.5px] text-slate-400 mt-0.5 max-w-[100px] text-center leading-normal">Claim rewards and earn eco points instantly.</span>
                            <div className="bg-[#111827] text-white text-[4px] font-black text-center px-4 py-1 rounded-md mt-1.5">View More</div>
                          </div>
                        </div>
                        {/* Style Title */}
                        <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-800">Card Style 2</span>
                        </div>
                      </div>

                      {/* Card Style 3 */}
                      <div 
                        onClick={() => handleSelectVariant('map')}
                        className="bg-white border border-slate-200 hover:border-brand-blue rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
                      >
                        {/* Image Preview Container */}
                        <div className="p-4 bg-white flex items-center justify-center border-b border-slate-100 h-40">
                          <div className="w-[160px] h-[120px] bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between p-1.5 shadow-xs scale-90 group-hover:scale-95 transition-transform duration-300 relative">
                            <span className="text-[5px] font-black text-slate-850">MAP LOCATION</span>
                            {/* Simulated map graphic */}
                            <div className="flex-1 rounded border border-slate-100 overflow-hidden relative bg-[#e2e8f0] mt-1 flex items-center justify-center">
                              <svg className="absolute inset-0 size-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <rect x="10" y="10" width="30" height="20" fill="#d1e7dd" />
                                <rect x="60" y="60" width="30" height="25" fill="#d1e7dd" />
                                <line x1="0" y1="30" x2="100" y2="30" stroke="#ffffff" strokeWidth="3" />
                                <line x1="50" y1="0" x2="50" y2="100" stroke="#ffffff" strokeWidth="3" />
                              </svg>
                              <div className="size-3.5 rounded-full bg-blue-500 border border-white flex items-center justify-center z-10 shadow-xs">
                                <MapPin className="size-2 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Style Title */}
                        <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-800">Card Style 3</span>
                        </div>
                      </div>

                      {/* Card Style 4 (Upcoming Games) */}
                      <div 
                        onClick={() => handleSelectVariant('events')}
                        className="bg-white border border-slate-200 hover:border-brand-blue rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
                      >
                        {/* Image Preview Container */}
                        <div className="p-4 bg-white flex items-center justify-center border-b border-slate-100 h-40">
                          <div className="w-[160px] h-[120px] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between p-2 shadow-xs scale-90 group-hover:scale-95 transition-transform duration-300 text-white">
                            <div className="flex flex-col">
                              <span className="text-[4px] font-bold text-teal-400 uppercase tracking-widest leading-none">Upcoming Match</span>
                              <span className="text-[6px] font-black mt-1 leading-none">Derby County vs Forest</span>
                            </div>
                            <div className="flex flex-col gap-0.5 text-[3.5px] text-slate-400 mt-1.5">
                              <span>Sat, June 20, 2026</span>
                              <span>Pride Park Stadium</span>
                            </div>
                            <div className="bg-white text-slate-900 text-[4px] font-black text-center py-1 rounded mt-2">Claim Ticket</div>
                          </div>
                        </div>
                        {/* Style Title */}
                        <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-800">Upcoming Games</span>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  // ------------------ ORIGINAL BLOCKS GRID VIEW ------------------
                  <div className="flex flex-col h-full min-h-0">
                    {/* 1. Search Box at the very top */}
                    <div className="px-4 pt-4 pb-2 relative flex items-center shrink-0">
                      <Search className="absolute left-7 size-4 text-[#94a3b8]" />
                      <input 
                        type="text" 
                        placeholder="Search elements" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-slate-400 shadow-inner"
                      />
                    </div>

                    {/* 2. Filter Pills row (horizontal scrolling) */}
                    <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
                      {['All blocks', 'Card', 'Do You Know', 'Events', 'Footer', 'Templates'].map((pill) => {
                        const isActive = selectedFilter === pill;
                        return (
                          <button
                            key={pill}
                            onClick={() => setSelectedFilter(pill)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                              isActive 
                                ? 'bg-[#111827] border-[#111827] text-white shadow-sm font-extrabold' 
                                : 'bg-white border-[#e2e8f0] text-slate-550 hover:text-slate-800 hover:border-slate-350'
                            }`}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>

                    {/* Header separator line */}
                    <div className="h-px bg-[#e2e8f0] mt-2 shrink-0" />

                    {/* 3. Cards Section */}
                    <div className="flex-1 overflow-y-auto">
                      {selectedFilter === 'Templates' ? (
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-slate-800 tracking-tight">Brand Templates</h4>
                          </div>

                          {/* Save current canvas layout button card */}
                          <button
                            onClick={handleSaveAsBrandTemplate}
                            className="w-full border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 bg-white hover:bg-slate-550/5 transition-all cursor-pointer text-slate-500 hover:text-blue-600"
                          >
                            <Plus className="size-5" />
                            <span className="text-xs font-black">Save Current Design as Brand Template</span>
                          </button>

                          {/* Templates list */}
                          <div className="grid grid-cols-1 gap-3.5 mt-2">
                            {brandTemplates.map((temp) => (
                              <div
                                key={temp.id}
                                className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-2xs hover:shadow-xs transition-shadow text-left"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-slate-850">{temp.title}</span>
                                  <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-blue-100">
                                    {temp.modules.length} Modules
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                                  {temp.desc}
                                </p>
                                <button
                                  onClick={() => handleApplyTemplate(temp)}
                                  className="w-full bg-[#111827] hover:bg-[#1f2937] text-white text-[10px] font-black py-2 rounded-xl transition-all cursor-pointer"
                                >
                                  Load Template Layout
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-[17px] font-bold text-[#0f172a] px-4 mt-3 mb-2">Blocks</h4>
                          
                          <div className="grid grid-cols-2 gap-3 px-4 pb-6">
                            {leftComponents
                              .filter(c => {
                                // Filter by search query
                                const matchesSearch = c.label.toLowerCase().includes(searchQuery.toLowerCase());
                                if (!matchesSearch) return false;
                                
                                // Filter by category pill selection
                                if (selectedFilter !== 'All blocks') {
                                  return c.label === selectedFilter;
                                }
                                return true;
                              })
                              .map(comp => {
                                const Icon = comp.icon;
                                
                                // Parse the 'used' format e.g. "0/6 used" to calculate percentage
                                const match = comp.used.match(/(\d+)\/(\d+)/);
                                let percent = 0;
                                if (match) {
                                  const used = parseInt(match[1], 10);
                                  const total = parseInt(match[2], 10);
                                  percent = total > 0 ? (used / total) * 100 : 0;
                                }

                                return (
                                  <button 
                                    key={comp.id}
                                    onClick={() => {
                                      if (comp.id === 'card') {
                                        setSelectedComponentForVariant(comp);
                                        setActiveSidebarView('card-designs');
                                      } else {
                                        handleAddModule(comp);
                                      }
                                    }}
                                    className={`bg-white border p-3 rounded-2xl text-left flex flex-col gap-2.5 transition-all cursor-pointer relative ${
                                      comp.highlight 
                                        ? 'border-[#3b82f6] ring-1 ring-[#3b82f6]/20 shadow-md shadow-blue-50' 
                                        : 'border-[#e2e8f0] hover:border-slate-350 hover:shadow-xs'
                                    }`}
                                  >
                                    {/* Top row: Icon + Title */}
                                    <div className="flex items-center gap-2 min-w-0">
                                      <div className="size-8 bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe] rounded-lg flex items-center justify-center shrink-0">
                                        <Icon className="size-4 stroke-[2.5]" />
                                      </div>
                                      <span className="text-xs font-bold text-[#0f172a] leading-tight truncate">
                                        {comp.label}
                                      </span>
                                    </div>
                                    
                                    {/* Bottom row: Badges */}
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <span className="bg-[#f8fafc] border border-[#e2e8f0] text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                        {comp.used}
                                      </span>
                                      <span className="bg-[#eff6ff] border border-[#dbeafe] text-[#2563eb] text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                        {comp.designs}
                                      </span>
                                    </div>

                                    {/* Horizontal Progress Track */}
                                    <div className="w-full h-[4px] bg-[#f1f5f9] rounded-full overflow-hidden mt-1 shrink-0">
                                      <div 
                                        className="h-full bg-[#3b82f6] rounded-full transition-all duration-300"
                                        style={{ width: `${percent}%` }}
                                      />
                                    </div>
                                  </button>
                                );
                              })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Middle Column: Visual Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f3f4f6]">
          
          {/* Canvas Sub-Header containing all action controls */}
          <div className="bg-white border-b border-brand-border px-6 py-2.5 flex items-center justify-between shrink-0 select-none">
            {!isPreviewMode ? (
              <>
                {/* Left group: Undo, Redo, divider */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                      <Undo2 className="size-4 text-slate-500" />
                      <span>Undo</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                      <Redo2 className="size-4 text-slate-500" />
                      <span>Redo</span>
                    </button>
                  </div>
                </div>

                {/* Center group: Edit & Preview Toggle */}
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={() => {
                      setIsPreviewMode(true);
                      setIsEditingMode(false);
                      setSelectedElement(null);
                      setShowShareOptions(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 border border-brand-border hover:bg-slate-50 text-slate-855 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Eye className="size-4 text-slate-650" />
                    <span>Preview / QR Code</span>
                  </button>
                </div>

                {/* Right group: Save Draft & Publish */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => alert('Draft Saved Successfully!')}
                    className="flex items-center gap-1.5 px-4 py-2 border border-brand-border hover:bg-slate-50 text-slate-850 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <svg className="size-4 text-slate-650" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    <span>Save Draft</span>
                  </button>
                  
                  <button 
                    onClick={() => alert('App Published Successfully to App Store & Play Store!')}
                    className="bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-blue/15 flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Publish</span>
                  </button>
                </div>
              </>
            ) : (
              /* Center group Exit Preview button only (Undo, Redo, Save, Publish hidden) */
              <div className="w-full flex justify-center">
                <button 
                  onClick={() => setIsPreviewMode(false)}
                  className="flex items-center gap-1.5 px-5 py-2 border border-slate-250 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer select-none hover:border-slate-350"
                >
                  <X className="size-3.5 text-slate-650" />
                  <span>Exit Preview</span>
                </button>
              </div>
            )}
          </div>



          {/* Phone Mockup Canvas */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start pt-14 pb-12 px-6 relative select-none">
            
            {!isPreviewMode && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40">
                {selectedElement ? (
                  /* 1. Quick Edit Bar */
                  <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 rounded-lg p-1.5 shadow-2xl select-none">
                    
                    {/* Font Family Dropdown */}
                    <div className="relative flex items-center">
                      <select
                        value={elementStyles[selectedElement.id].fontFamily || 'Canva Sans'}
                        onChange={(e) => updateSelectedElementStyle('fontFamily', e.target.value)}
                        className="appearance-none bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 px-4 py-1.5 pr-8.5 hover:bg-slate-50 focus:outline-none cursor-pointer shadow-2xs transition-all"
                      >
                        <option value="Canva Sans">Font: Canva Sans</option>
                        <option value="Source Sans Pro">Font: Source Sans Pro</option>
                        <option value="Inter">Font: Inter</option>
                        <option value="Roboto">Font: Roboto</option>
                        <option value="Helvetica Neue">Font: Helvetica Neue</option>
                      </select>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-700">
                        <ChevronDown className="size-3.5 stroke-[2.5]" />
                      </span>
                    </div>

                    {/* Font Size decrease button */}
                    <button
                      onClick={() => {
                        const currentSize = elementStyles[selectedElement.id].fontSize || 14;
                        updateSelectedElementStyle('fontSize', Math.max(1, currentSize - 1));
                      }}
                      className="size-6 flex items-center justify-center bg-slate-550/5 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-650 font-black transition-all cursor-pointer select-none active:scale-95"
                      title="Decrease font size"
                    >
                      -
                    </button>

                    {/* Font Size Input */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-0.5 h-6">
                      <input
                        type="number"
                        value={elementStyles[selectedElement.id].fontSize || 0}
                        onChange={(e) => updateSelectedElementStyle('fontSize', parseInt(e.target.value) || 0)}
                        className="w-7 text-center text-xs font-black text-slate-800 bg-transparent focus:outline-none"
                      />
                      <span className="text-[9px] text-slate-400 font-extrabold ml-0.5">px</span>
                    </div>

                    {/* Font Size increase button */}
                    <button
                      onClick={() => {
                        const currentSize = elementStyles[selectedElement.id].fontSize || 14;
                        updateSelectedElementStyle('fontSize', currentSize + 1);
                      }}
                      className="size-6 flex items-center justify-center bg-slate-550/5 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-650 font-black transition-all cursor-pointer select-none active:scale-95"
                      title="Increase font size"
                    >
                      +
                    </button>

                    {/* Text Color Picker swatch */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowQuickColorPopover(!showQuickColorPopover)}
                        className="size-6 flex flex-col items-center justify-center hover:bg-slate-50 border border-slate-200 rounded-lg transition-all cursor-pointer relative active:scale-95"
                        title="Text Color"
                      >
                        <span className="text-[10px] font-black text-slate-855 leading-none">A</span>
                        <div 
                          className="w-3.5 h-0.5 rounded-full mt-0.5" 
                          style={{ backgroundColor: elementStyles[selectedElement.id].textColor || '#000000' }}
                        />
                      </button>
                      
                      {showQuickColorPopover && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowQuickColorPopover(false)} />
                          <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 flex flex-wrap gap-1 w-32">
                            {['#007bff', '#6f42c1', '#6610f2', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#000000', '#ffffff'].map((color) => (
                              <button
                                key={color}
                                onClick={() => {
                                  updateSelectedElementStyle('textColor', color);
                                  setShowQuickColorPopover(false);
                                }}
                                className="size-4.5 rounded-full border border-slate-300/60 cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xs"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200/80" />

                    {/* Bold button */}
                    <button
                      onClick={() => {
                        const isBold = elementStyles[selectedElement.id].fontWeight === 'Bold' || elementStyles[selectedElement.id].fontWeight === 'Extrabold';
                        updateSelectedElementStyle('fontWeight', isBold ? 'Normal' : 'Bold');
                      }}
                      className={`size-6 flex items-center justify-center border rounded-lg text-xs font-black transition-all cursor-pointer active:scale-95 ${
                        (elementStyles[selectedElement.id].fontWeight === 'Bold' || elementStyles[selectedElement.id].fontWeight === 'Extrabold')
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-extrabold shadow-sm'
                          : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                      }`}
                      title="Bold"
                    >
                      B
                    </button>

                    {/* Italic button */}
                    <button
                      onClick={() => {
                        const currentStyle = elementStyles[selectedElement.id].fontStyle || 'normal';
                        updateSelectedElementStyle('fontStyle', currentStyle === 'italic' ? 'normal' : 'italic');
                      }}
                      className={`size-6 flex items-center justify-center border rounded-lg text-xs italic font-black transition-all cursor-pointer active:scale-95 ${
                        elementStyles[selectedElement.id].fontStyle === 'italic'
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-extrabold shadow-sm'
                          : 'border-slate-200 text-slate-655 hover:bg-slate-50'
                      }`}
                      title="Italic"
                    >
                      I
                    </button>

                    {/* Underline button */}
                    <button
                      onClick={() => {
                        const currentDec = elementStyles[selectedElement.id].textDecorationLine || 'none';
                        updateSelectedElementStyle('textDecorationLine', currentDec === 'underline' ? 'none' : 'underline');
                      }}
                      className={`size-6 flex items-center justify-center border rounded-lg text-xs underline font-black transition-all cursor-pointer active:scale-95 ${
                        elementStyles[selectedElement.id].textDecorationLine === 'underline'
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-extrabold shadow-sm'
                          : 'border-slate-200 text-slate-655 hover:bg-slate-50'
                      }`}
                      title="Underline"
                    >
                      U
                    </button>

                    {/* Strikethrough button */}
                    <button
                      onClick={() => {
                        const currentDec = elementStyles[selectedElement.id].textDecorationLine || 'none';
                        updateSelectedElementStyle('textDecorationLine', currentDec === 'line-through' ? 'none' : 'line-through');
                      }}
                      className={`size-6 flex items-center justify-center border rounded-lg text-xs line-through font-black transition-all cursor-pointer active:scale-95 ${
                        elementStyles[selectedElement.id].textDecorationLine === 'line-through'
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-extrabold shadow-sm'
                          : 'border-slate-200 text-slate-655 hover:bg-slate-50'
                      }`}
                      title="Strikethrough"
                    >
                      S
                    </button>

                    {/* Case toggle button */}
                    <button
                      onClick={() => {
                        const currentCase = elementStyles[selectedElement.id].textTransform || 'none';
                        updateSelectedElementStyle('textTransform', currentCase === 'uppercase' ? 'none' : 'uppercase');
                      }}
                      className={`size-6 flex items-center justify-center border rounded-lg text-xs font-black transition-all cursor-pointer active:scale-95 ${
                        elementStyles[selectedElement.id].textTransform === 'uppercase'
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-extrabold shadow-sm'
                          : 'border-slate-200 text-slate-655 hover:bg-slate-50'
                      }`}
                      title="All Uppercase"
                    >
                      aA
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200/80" />

                    {/* Alignment segmented selector */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      {['left', 'center', 'right', 'justify'].map((align) => {
                        let icon = null;
                        if (align === 'left') {
                          icon = (
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="17" y1="10" x2="3" y2="10" />
                              <line x1="21" y1="6" x2="3" y2="6" />
                              <line x1="21" y1="14" x2="3" y2="14" />
                              <line x1="17" y1="18" x2="3" y2="18" />
                            </svg>
                          );
                        } else if (align === 'center') {
                          icon = (
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="10" x2="6" y2="10" />
                              <line x1="21" y1="6" x2="3" y2="6" />
                              <line x1="21" y1="14" x2="3" y2="14" />
                              <line x1="18" y1="18" x2="6" y2="18" />
                            </svg>
                          );
                        } else if (align === 'right') {
                          icon = (
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="21" y1="10" x2="7" y2="10" />
                              <line x1="21" y1="6" x2="3" y2="6" />
                              <line x1="21" y1="14" x2="3" y2="14" />
                              <line x1="21" y1="18" x2="7" y2="18" />
                            </svg>
                          );
                        } else {
                          icon = (
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="21" y1="10" x2="3" y2="10" />
                              <line x1="21" y1="6" x2="3" y2="6" />
                              <line x1="21" y1="14" x2="3" y2="14" />
                              <line x1="21" y1="18" x2="3" y2="18" />
                            </svg>
                          );
                        }
                        return (
                          <button
                            key={align}
                            onClick={() => updateSelectedElementStyle('textAlign', align)}
                            className={`size-5.5 flex items-center justify-center rounded-md transition-all cursor-pointer ${
                              elementStyles[selectedElement.id].textAlign === align
                                ? 'bg-white text-slate-800 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                            title={`Align ${align}`}
                          >
                            {icon}
                          </button>
                        );
                      })}
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200/80" />

                    {/* Close quick editor */}
                    <button
                      onClick={() => setSelectedElement(null)}
                      className="size-6 flex items-center justify-center bg-slate-50 hover:bg-slate-100 hover:text-red-500 border border-slate-200 rounded-lg text-slate-500 transition-all cursor-pointer active:scale-95"
                      title="Close Editing"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  /* 2. Start Editing Bar (Floating Pill) */
                  <div className="flex flex-row flex-nowrap items-center gap-3.5 bg-white border border-slate-200 rounded-lg px-2.5 py-0.5 shadow-lg select-none whitespace-nowrap">
                    {/* Start Editing pill button */}
                    <button
                      onClick={() => {
                        setIsEditingMode(!isEditingMode);
                        setSelectedElement(null);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer select-none active:scale-95 whitespace-nowrap ${
                        isEditingMode 
                          ? 'bg-[#0f172a] text-white shadow-md shadow-slate-900/10' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isEditingMode ? <Lock className="size-3.5" /> : <Edit2 className="size-3.5" />}
                      <span>Start Editing</span>
                    </button>

                    {/* Content button */}
                    <button 
                      onClick={() => {
                        setIsEditingMode(true);
                        setActiveEditorTab('Content');
                      }}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-black px-1.5 py-1 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Edit2 className="size-3.5 text-slate-400" />
                      <span>Content</span>
                    </button>

                    {/* Styles button */}
                    <button 
                      onClick={() => {
                        setIsEditingMode(true);
                        setActiveEditorTab('Styles');
                      }}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-black px-1.5 py-1 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Palette className="size-3.5 text-slate-400" />
                      <span>Styles</span>
                    </button>

                    {/* Pages dropdown selector */}
                    <div className="relative">
                      <button 
                        className="flex items-center gap-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 px-3.5 py-1.5 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap"
                        onClick={() => setShowPagesDropdown(!showPagesDropdown)}
                      >
                        <FileText className="size-3.5 text-slate-500" />
                        <span>Pages</span>
                        <ChevronDown className="size-3.5 text-slate-700 stroke-[2.5]" />
                      </button>

                      {showPagesDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowPagesDropdown(false)} />
                          <div className="absolute top-8 left-0 bg-white border border-slate-200/50 rounded-2xl shadow-xl p-2.5 z-50 w-40 flex flex-col gap-1">
                            {pages.map((p, idx) => (
                              <button
                                key={p.id}
                                onClick={() => {
                                  setActivePageIndex(idx);
                                  setShowPagesDropdown(false);
                                }}
                                className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 rounded-xl transition-all flex items-center cursor-pointer ${
                                  activePageIndex === idx ? 'bg-slate-50 text-slate-900 font-black' : 'text-slate-650 font-bold'
                                }`}
                              >
                                <span className="text-slate-350 text-[10px] w-4 mr-2.5 text-right select-none font-extrabold">
                                  {idx + 1}
                                </span>
                                <span>{p.title}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200" />

                    {/* Clear button */}
                    <button 
                      onClick={() => {
                        setSelectedElement(null);
                        setIsEditingMode(false);
                      }}
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-black px-1.5 py-1 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <X className="size-3.5 text-slate-400" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Share Options Card (Preview Mode only) */}
            <AnimatePresence>
              {isPreviewMode && showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 w-64 bg-white rounded-2xl border border-slate-100 shadow-2xl p-5 flex flex-col gap-4 select-none z-50"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-bold text-xs text-slate-800 uppercase tracking-wider">Share Options</span>
                    <button 
                      onClick={() => setShowShareOptions(false)}
                      className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {/* Share Link */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-extrabold text-slate-450 uppercase tracking-wider">Share Link</span>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-150 p-1 rounded-xl">
                      <div className="flex-1 text-[8.5px] font-bold text-slate-500 truncate pl-1.5 select-all">
                        https://preview.circulayo.com/d/welcome-default
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("https://preview.circulayo.com/d/welcome-default");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-1 transition-all cursor-pointer ${
                          copied 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-brand-blue text-white hover:bg-brand-blue/95'
                        }`}
                      >
                        {copied ? <Check className="size-2.5" /> : null}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-extrabold text-slate-450 uppercase tracking-wider">QR Code</span>
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center gap-2">
                      {/* High fidelity simulated QR Code */}
                      <div className="size-28 bg-white border border-slate-200/50 p-2 rounded-lg flex flex-col justify-between relative shadow-xs">
                        {/* Standard QR Code corner blocks */}
                        <div className="absolute top-2 left-2 size-7 border-4 border-slate-900 flex items-center justify-center">
                          <div className="size-2.5 bg-slate-900" />
                        </div>
                        <div className="absolute top-2 right-2 size-7 border-4 border-slate-900 flex items-center justify-center">
                          <div className="size-2.5 bg-slate-900" />
                        </div>
                        <div className="absolute bottom-2 left-2 size-7 border-4 border-slate-900 flex items-center justify-center">
                          <div className="size-2.5 bg-slate-900" />
                        </div>
                        
                        {/* Smaller positioning box */}
                        <div className="absolute bottom-4 right-4 size-4 border-2 border-slate-900 flex items-center justify-center">
                          <div className="size-1 bg-slate-900" />
                        </div>

                        {/* Pixel pattern grid fill */}
                        <div className="w-full h-full opacity-90 flex flex-wrap gap-[1px] p-0.5 justify-center items-center">
                          {[...Array(64)].map((_, idx) => {
                            const row = Math.floor(idx / 8);
                            const col = idx % 8;
                            const isCorner = (row < 3 && col < 3) || (row < 3 && col > 4) || (row > 4 && col < 3);
                            
                            return (
                              <div 
                                key={idx} 
                                className={`size-[9px] rounded-[1px] ${
                                  isCorner 
                                    ? 'bg-transparent' 
                                    : (idx % 2 === 0 || idx % 5 === 1 || idx % 7 === 3) 
                                      ? 'bg-slate-900' 
                                      : 'bg-transparent'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      
                      <span className="text-[7px] text-slate-400 text-center font-bold break-all leading-normal max-w-[185px] select-all">
                        https://preview.circulayo.com/d/welcome-default
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Center relative deck container */}
            <div className="relative w-[340px] h-[600px] flex items-center justify-start">
              {pages.map((page, i) => {
                // Calculate position relative to active index
                let diff = i - activePageIndex;
                let isActive = diff === 0;
                
                // 3D Stack Layout Style Parameters
                let x = 0;
                let y = 0;
                let scale = 1;
                let zIndex = 30 - Math.abs(diff) * 5;
                let opacity = 1;
                let pointerEvents = 'auto';
                
                if (isActive) {
                  x = 0;
                  y = 0;
                  scale = 1;
                  opacity = 1;
                } else if (diff > 0) {
                  // Stacked behind on the right
                  x = diff * 70; // Shift right by 70px per stack level
                  y = diff * -10; // Shift up slightly
                  scale = 1 - diff * 0.08; // Scale down by 8% per stack level
                  opacity = Math.max(0.4, 1 - diff * 0.22);
                } else {
                  // Passed screens slide left and fade
                  x = diff * 160;
                  y = 0;
                  scale = 0.85;
                  opacity = 0;
                }
                
                return (
                  <motion.div
                    key={page.id}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '300px',
                      height: '600px',
                      zIndex: zIndex,
                      pointerEvents: pointerEvents
                    }}
                    animate={{
                      x: x,
                      y: y,
                      scale: scale,
                      opacity: opacity
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 24
                    }}
                    onClick={() => {
                      if (!isActive) {
                        setActivePageIndex(i);
                      }
                    }}
                    className="cursor-pointer select-none origin-bottom-left"
                  >
                    {/* Page Number Indicator Above Right Corner */}
                    <div 
                      className={`absolute -top-6 right-2 font-sans font-bold text-[11px] tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-brand-blue font-extrabold' : 'text-slate-400 font-bold'
                      }`}
                    >
                      {i + 1}/{pages.length}
                    </div>

                    {/* Background Transparent click capture for background screens */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-transparent rounded-[32px] z-50 cursor-pointer" />
                    )}

                    {/* Simulated Phone Shell or Card Container */}
                    <div className={isActive 
                      ? "w-full h-full bg-black rounded-[40px] shadow-2xl p-1.5 border-2 border-slate-900 flex flex-col relative shrink-0 transition-all duration-300"
                      : "w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col justify-between relative shadow-lg border border-slate-200/60 opacity-90 shrink-0 transition-all duration-300"
                    }>
                      


                      {/* Screen Content Wrapper */}
                      <div className={isActive 
                        ? "flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col justify-between relative shadow-inner"
                        : "flex-1 flex flex-col justify-between relative h-full min-h-0"
                      }>
                        
                        {/* Interactive Sidenav Overlay */}
                        <AnimatePresence>
                          {isActive && isSidenavEnabled && isSidenavOpen && (
                            <div 
                              className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex"
                              onClick={() => setIsSidenavOpen(false)}
                            >
                              <motion.div 
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="w-[220px] h-full bg-white shadow-xl flex flex-col p-4 relative"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Close Button */}
                                <button 
                                  onClick={() => setIsSidenavOpen(false)}
                                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 cursor-pointer"
                                >
                                  <X className="size-4" />
                                </button>

                                {/* User Info Section */}
                                {showUserInfo && (
                                  <div className="mt-8 flex flex-col items-center border-b border-slate-100 pb-4 mb-4 select-none">
                                    <div className="size-12 rounded-full overflow-hidden bg-slate-105 border border-slate-200 mb-2 flex items-center justify-center">
                                      {userAvatar ? (
                                        <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                                      ) : (
                                        <User className="size-6 text-slate-400" />
                                      )}
                                    </div>
                                    <span className="font-sans font-black text-xs text-slate-800 text-center truncate w-full px-2">
                                      {userName}
                                    </span>
                                    <span className="font-sans text-[10px] text-slate-400 text-center truncate w-full">
                                      circulayo.appworld@yahoo.com
                                    </span>
                                  </div>
                                )}

                                {/* Menu Links */}
                                <div className="flex-1 flex flex-col gap-1.5 mt-2 select-none">
                                  {showHome && (
                                    <a 
                                      href={homeLink} 
                                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <Home className="size-4 text-slate-505" />
                                        <span className="font-sans text-xs font-bold text-slate-700">{homeLabel}</span>
                                      </div>
                                      <ChevronRight className="size-3.5 text-slate-400 group-hover:text-slate-650 transition-colors" />
                                    </a>
                                  )}
                                  {showAccountInfo && (
                                    <a 
                                      href={accountLink} 
                                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <User className="size-4 text-slate-550" />
                                        <span className="font-sans text-xs font-bold text-slate-700">{accountLabel}</span>
                                      </div>
                                      <ChevronRight className="size-3.5 text-slate-400 group-hover:text-slate-650 transition-colors" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            </div>
                          )}
                        </AnimatePresence>
                        
                        {/* Page Type Content Conditionals */}
                        
                        {/* 1. Sustainability Info Page Layout */}
                        {page.type === 'info' && (
                          <div className="flex-1 flex flex-col justify-between h-full min-h-0 bg-white">
                            {/* Header */}
                            {isHeaderEnabled && (
                              <header 
                                onClick={(e) => {
                                  if (isEditingMode) {
                                    e.stopPropagation();
                                    setSelectedElement({ id: 'header', label: 'Header Container' });
                                    setActiveEditorTab('Content');
                                  }
                                }}
                                style={getComputedElementStyles('header')}
                                className={`border-b border-slate-105 select-none z-20 shrink-0 transition-all duration-200 ${
                                  isEditingMode 
                                    ? `cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-1 ${
                                        selectedElement?.id === 'header' 
                                          ? 'outline outline-2 outline-blue-500 outline-offset-1 bg-blue-50/5' 
                                          : ''
                                      }`
                                    : 'px-4 pt-8 pb-3.5 bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  {isSidenavEnabled && (
                                    <Menu 
                                      className="size-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSidenavOpen(true);
                                      }}
                                    />
                                  )}
                                  <span className="font-montserrat font-bold tracking-widest text-xs text-teal-650">{logoText}</span>
                                </div>
                                <QrCode className="size-4 text-slate-700" />
                              </header>
                            )}
                            
                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scrollbar-none">
                              <div className="flex flex-col select-none">
                                <span 
                                  onClick={(e) => {
                                    if (isEditingMode) {
                                      e.stopPropagation();
                                      setSelectedElement({ id: 'subtitle', label: 'Subtitle Text' });
                                      setActiveEditorTab('Content');
                                    }
                                  }}
                                  style={getComputedElementStyles('subtitle')}
                                  className={`transition-all duration-200 ${
                                    isEditingMode 
                                      ? `cursor-pointer hover:outline hover:outline-1 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-2 ${
                                          selectedElement?.id === 'subtitle' 
                                            ? 'outline outline-2 outline-blue-500 outline-offset-2' 
                                            : ''
                                        }`
                                      : 'text-[9px] font-bold text-brand-blue uppercase tracking-widest'
                                  }`}
                                >
                                  {page.subtitle}
                                </span>
                                <h2 
                                  onClick={(e) => {
                                    if (isEditingMode) {
                                      e.stopPropagation();
                                      setSelectedElement({ id: 'title', label: 'Title Text' });
                                      setActiveEditorTab('Content');
                                    }
                                  }}
                                  style={getComputedElementStyles('title')}
                                  className={`font-montserrat tracking-tight mt-1 leading-none transition-all duration-200 ${
                                    isEditingMode 
                                      ? `cursor-pointer hover:outline hover:outline-1 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-2 ${
                                          selectedElement?.id === 'title' 
                                            ? 'outline outline-2 outline-blue-500 outline-offset-2' 
                                            : ''
                                        }`
                                      : 'text-2xl font-extrabold text-slate-900'
                                  }`}
                                >
                                  {page.titleText === 'Redefining Gathering.' ? (
                                    <>
                                      Redefining<br />
                                      <span className="text-brand-green">Gathering.</span>
                                    </>
                                  ) : (
                                    page.titleText || page.title
                                  )}
                                </h2>
                              </div>

                              <p 
                                onClick={(e) => {
                                  if (isEditingMode) {
                                    e.stopPropagation();
                                    setSelectedElement({ id: 'paragraph', label: 'Paragraph Text' });
                                    setActiveEditorTab('Content');
                                  }
                                }}
                                style={getComputedElementStyles('paragraph')}
                                className={`leading-relaxed transition-all duration-200 ${
                                  isEditingMode 
                                    ? `cursor-pointer hover:outline hover:outline-1 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-2 ${
                                        selectedElement?.id === 'paragraph' 
                                          ? 'outline outline-2 outline-blue-500 outline-offset-2' 
                                          : ''
                                      }`
                                    : 'text-[10px] text-slate-500'
                                }`}
                              >
                                {page.paragraph}
                              </p>

                              {page.image && (
                                <div 
                                  onClick={(e) => {
                                    if (isEditingMode) {
                                      e.stopPropagation();
                                      setSelectedElement({ id: 'heroImage', label: 'Hero Image' });
                                      setActiveEditorTab('Content');
                                    }
                                  }}
                                  style={getComputedElementStyles('heroImage')}
                                  className={`overflow-hidden shadow-sm border border-slate-100 relative group transition-all duration-200 ${
                                    isEditingMode 
                                      ? `cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-2 ${
                                          selectedElement?.id === 'heroImage' 
                                            ? 'outline outline-2 outline-blue-500 outline-offset-2' 
                                            : ''
                                        }`
                                      : 'w-full h-36 rounded-xl'
                                  }`}
                                >
                                  <img 
                                    src={page.image} 
                                    alt="Sustainable Gathering" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              {showMapCardOnHome && (
                                <div 
                                  onClick={(e) => {
                                    if (isEditingMode) {
                                      e.stopPropagation();
                                      setSelectedElement({ id: 'mapCard', label: 'Map Card' });
                                      setActiveEditorTab('Content');
                                    } else if (isPreviewMode) {
                                      e.stopPropagation();
                                      // Find map page index
                                      const mapIdx = pages.findIndex(p => p.type === 'map');
                                      if (mapIdx !== -1) {
                                        setActivePageIndex(mapIdx);
                                      }
                                    } else {
                                      alert("Click 'Preview' at the top to test interactive navigation!");
                                    }
                                  }}
                                  style={getComputedElementStyles('mapCard')}
                                  className={`border transition-all duration-200 select-none ${
                                    isEditingMode 
                                      ? `cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-2 border-slate-205 ${
                                          selectedElement?.id === 'mapCard' 
                                            ? 'outline outline-2 outline-blue-500 outline-offset-2' 
                                            : ''
                                        }`
                                      : isPreviewMode 
                                        ? 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 cursor-pointer hover:border-brand-blue hover:shadow-xs active:scale-[0.98] rounded-xl p-2.5 flex flex-col gap-1.5' 
                                        : 'border-dashed border-[#007bff] bg-blue-50/5 cursor-help rounded-xl p-2.5 flex flex-col gap-1.5'
                                  }`}
                                >
                                  <div className="flex flex-col gap-1.5 text-left w-full">
                                    {/* Card Label */}
                                    <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider leading-none">
                                      {cardContent.label}
                                    </span>
                                    
                                    {/* Card Image */}
                                    <div className="w-full h-24 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 shrink-0">
                                      <img 
                                        src={cardContent.image} 
                                        alt="Card Banner" 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    
                                    {/* Heading Text */}
                                    <h4 className="text-[10px] font-black text-slate-800 leading-tight">
                                      {cardContent.heading}
                                    </h4>
                                    
                                    {/* Body Text */}
                                    <p className="text-[8px] font-bold text-slate-500 leading-normal">
                                      {cardContent.body}
                                    </p>
                                    
                                    {/* Button */}
                                    <button className="w-full py-1.5 bg-[#2563eb] text-white text-[9px] font-black rounded-lg text-center shadow-xs transition-colors hover:bg-blue-600 select-none cursor-pointer">
                                      {cardContent.buttonText}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Footer */}
                            <footer 
                              onClick={(e) => {
                                if (isEditingMode) {
                                  e.stopPropagation();
                                  setSelectedElement({ id: 'footer', label: 'Footer Navigation' });
                                  setActiveEditorTab('Content');
                                }
                              }}
                              style={getComputedElementStyles('footer')}
                              className={`border-t border-slate-100 text-slate-400 text-[9px] font-semibold shrink-0 transition-all duration-200 ${
                                isEditingMode 
                                  ? `cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-500 hover:outline-offset-1 ${
                                      selectedElement?.id === 'footer' 
                                        ? 'outline outline-2 outline-blue-500 outline-offset-1 bg-blue-50/5' 
                                        : ''
                                    }`
                                  : 'bg-slate-50 p-3 flex justify-around'
                              }`}
                            >
                              <span className="text-teal-600 font-bold">Home</span>
                              <span>Activity</span>
                              <span>Rewards</span>
                            </footer>
                          </div>
                        )}

                        {/* 2. Sustainability Map Page Layout */}
                        {page.type === 'map' && (
                          <div className="flex-1 flex flex-col justify-between h-full min-h-0 bg-white">
                            {/* Header */}
                            {isHeaderEnabled && (
                              <header className="bg-white border-b border-slate-100 px-4 pt-8 pb-3.5 flex items-center justify-between select-none z-20 shrink-0">
                                <div className="flex items-center gap-1.5">
                                  {isSidenavEnabled && (
                                    <Menu 
                                      className="size-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSidenavOpen(true);
                                      }}
                                    />
                                  )}
                                  <span className="font-montserrat font-bold tracking-widest text-xs text-teal-605">{logoText}</span>
                                </div>
                                <QrCode className="size-4 text-slate-700" />
                              </header>
                            )}
                            
                            {/* Map Content Area */}
                            <div className="flex-1 flex flex-col min-h-0 relative bg-slate-550/10">
                              {/* Search Bar Input */}
                              <div className="px-3 pt-3 pb-2 z-10 shrink-0">
                                <div className="relative flex items-center">
                                  <Search className="absolute left-3 size-3.5 text-slate-450" />
                                  <input 
                                    type="text" 
                                    placeholder={page.searchPlaceholder || "Find a cup recycling point..."} 
                                    readOnly
                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-800 placeholder-slate-450 focus:outline-none shadow-xs"
                                  />
                                </div>
                              </div>

                              {/* Custom CSS/SVG Vector Map Graphic */}
                              <div className="flex-1 relative overflow-hidden bg-[#e5e9f0]">
                                <svg className="absolute inset-0 w-full h-full opacity-65" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  {/* Rivers / Lakes */}
                                  <path d="M 0,35 Q 25,45 55,30 T 100,40 L 100,60 L 0,60 Z" fill="#cbe0ff" />
                                  
                                  {/* Green Park Zones */}
                                  <rect x="5" y="8" width="35" height="22" rx="4" fill="#d2f4ea" />
                                  <rect x="68" y="58" width="28" height="28" rx="4" fill="#d2f4ea" />
                                  
                                  {/* Roads Grid */}
                                  <line x1="0" y1="28" x2="100" y2="28" stroke="#ffffff" strokeWidth="3" />
                                  <line x1="48" y1="0" x2="48" y2="100" stroke="#ffffff" strokeWidth="3" />
                                  <line x1="0" y1="72" x2="100" y2="72" stroke="#ffffff" strokeWidth="2" strokeDasharray="1.5 1.5" />
                                  
                                  {/* Secondary Streets */}
                                  <line x1="22" y1="0" x2="22" y2="100" stroke="#ffffff" strokeWidth="1" />
                                  <line x1="82" y1="0" x2="82" y2="100" stroke="#ffffff" strokeWidth="1" />
                                </svg>
                                
                                {/* Pulsing Cup Markers */}
                                <div className="absolute top-1/4 left-[30%] -translate-x-1/2 -translate-y-1/2">
                                  <div className="relative flex items-center justify-center">
                                    <span className="absolute inline-flex h-5 w-5 rounded-full bg-teal-400 opacity-75 animate-ping" />
                                    <div className="relative size-3 rounded-full bg-teal-600 flex items-center justify-center shadow border border-white">
                                      <div className="size-0.5 bg-white rounded-full" />
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="absolute top-3/4 left-[75%] -translate-x-1/2 -translate-y-1/2">
                                  <div className="relative flex items-center justify-center">
                                    <span className="absolute inline-flex h-5 w-5 rounded-full bg-teal-400 opacity-75 animate-ping" />
                                    <div className="relative size-3 rounded-full bg-teal-600 flex items-center justify-center shadow border border-white">
                                      <div className="size-0.5 bg-white rounded-full" />
                                    </div>
                                  </div>
                                </div>

                                {/* Main Active Location Pin Overlay */}
                                <div className="absolute top-[46%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10">
                                  <div className="relative flex flex-col items-center">
                                    <span className="absolute top-1 inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-50 animate-ping" />
                                    <div className="relative size-6.5 bg-[#007bff] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                      <MapPin className="size-3.5 fill-white/10" />
                                    </div>
                                    <div className="bg-[#0f172a] text-white font-extrabold text-[7px] px-1.5 py-0.5 rounded shadow-sm mt-1 whitespace-nowrap uppercase tracking-wider">
                                      {page.activeLocation.name}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Active Hub Details Slide-Up overlay */}
                              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs border border-slate-100 p-2.5 rounded-xl shadow-lg z-20 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">Active Station</span>
                                    <span className="text-[10px] font-black text-slate-800 leading-tight">{page.activeLocation.name}</span>
                                  </div>
                                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[6.5px] font-extrabold px-1.5 py-0.5 rounded-md">
                                    {page.activeLocation.status}
                                  </span>
                                </div>
                                
                                <div className="flex items-center justify-between border-t border-slate-100 pt-1.5 mt-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <div className="size-5 bg-teal-50 text-teal-650 rounded-md flex items-center justify-center">
                                      <Compass className="size-3" />
                                    </div>
                                    <span className="text-[9px] font-extrabold text-slate-700">{page.activeLocation.recycledCount}</span>
                                  </div>
                                  
                                  <button className="bg-brand-blue text-white font-bold text-[8.5px] px-2.5 py-1 rounded-lg flex items-center gap-0.5 cursor-pointer shadow-xs hover:bg-brand-blue/90">
                                    <span>Route</span>
                                    <ArrowRight className="size-2" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <footer className="bg-slate-50 border-t border-slate-100 p-3 flex justify-around text-slate-400 text-[9px] font-semibold shrink-0">
                              <span>Home</span>
                              <span className="text-teal-600 font-bold">Activity</span>
                              <span>Rewards</span>
                            </footer>
                          </div>
                        )}

                        {/* 3. Impact Metrics Dashboard Layout */}
                        {page.type === 'stats' && (
                          <div className="flex-1 flex flex-col justify-between h-full min-h-0 bg-white">
                            {/* Header */}
                            {isHeaderEnabled && (
                              <header className="bg-white border-b border-slate-100 px-4 pt-8 pb-3.5 flex items-center justify-between select-none z-20 shrink-0">
                                <div className="flex items-center gap-1.5">
                                  {isSidenavEnabled && (
                                    <Menu 
                                      className="size-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSidenavOpen(true);
                                      }}
                                    />
                                  )}
                                  <span className="font-montserrat font-bold tracking-widest text-xs text-teal-605">{logoText}</span>
                                </div>
                                <QrCode className="size-4 text-slate-700" />
                              </header>
                            )}
                            
                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5 scrollbar-none">
                              <div className="flex flex-col select-none">
                                <span className="text-[9px] font-bold text-[#2563eb] uppercase tracking-widest">{page.subtitle}</span>
                                <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-slate-900 mt-0.5">
                                  Stewardship Report
                                </h2>
                              </div>

                              {/* Metrics cards grid */}
                              <div className="grid grid-cols-2 gap-2">
                                {page.metrics.map((m, idx) => (
                                  <div key={idx} className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex flex-col gap-0.5">
                                    <span className="text-[7.5px] text-slate-450 font-bold uppercase">{m.label}</span>
                                    <span className="text-xs font-black text-slate-800">{m.value}</span>
                                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
                                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${m.percentage}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* SVG Goal Target Progress Ring */}
                              <div className="border border-slate-100 p-3 rounded-xl bg-gradient-to-br from-teal-50/50 to-emerald-50/20 flex items-center gap-3">
                                <div className="relative size-12 shrink-0">
                                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      className="text-slate-100"
                                      strokeWidth="3.5"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                      className="text-teal-600"
                                      strokeWidth="3.5"
                                      strokeDasharray="87, 100"
                                      strokeLinecap="round"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center font-montserrat font-bold text-[8.5px] text-slate-800">
                                    87%
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-[9.5px] font-extrabold text-slate-800 leading-tight">Monthly Offset Goal</span>
                                  <p className="text-[7.5px] text-slate-400 mt-0.5 leading-normal">
                                    You offset 186kg of carbon dioxide. Only 13% to reach your gold badge!
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <footer className="bg-slate-50 border-t border-slate-100 p-3 flex justify-around text-slate-400 text-[9px] font-semibold shrink-0">
                              <span>Home</span>
                              <span>Activity</span>
                              <span className="text-teal-600 font-bold">Rewards</span>
                            </footer>
                          </div>
                        )}

                        {/* 4. Golden Winner Reward Layout */}
                        {page.type === 'winner' && (
                          <div className="flex-1 flex flex-col justify-between h-full min-h-0 bg-white">
                            {/* Header */}
                            {isHeaderEnabled && (
                              <header className="bg-white border-b border-slate-100 px-4 pt-8 pb-3.5 flex items-center justify-between select-none z-20 shrink-0">
                                <div className="flex items-center gap-1.5">
                                  {isSidenavEnabled && (
                                    <Menu 
                                      className="size-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSidenavOpen(true);
                                      }}
                                    />
                                  )}
                                  <span className="font-montserrat font-bold tracking-widest text-xs text-teal-650">{logoText}</span>
                                </div>
                                <QrCode className="size-4 text-slate-700" />
                              </header>
                            )}
                            
                            {/* Body */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scrollbar-none items-center justify-center text-center">
                              <div className="size-11 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100 mb-0.5">
                                <Gift className="size-5" />
                              </div>
                              
                              <div className="flex flex-col select-none">
                                <span className="text-[9px] font-bold text-amber-605 uppercase tracking-widest">{page.subtitle}</span>
                                <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-slate-900 mt-0.5">
                                  {page.title}
                                </h2>
                              </div>

                              {/* Ticket Voucher Card */}
                              <div className="w-full bg-[#fdfaf2] border border-amber-100 rounded-2xl flex flex-col overflow-hidden relative shadow-xs max-w-[210px] select-none">
                                <div className="absolute left-0 top-[60%] -translate-x-1.5 size-3 bg-white rounded-full border-r border-amber-100" />
                                <div className="absolute right-0 top-[60%] translate-x-1.5 size-3 bg-white rounded-full border-l border-amber-100" />

                                <div className="p-3 flex flex-col items-center border-b border-dashed border-amber-200">
                                  <span className="text-xs font-black text-amber-900 leading-tight">{page.voucherTitle}</span>
                                  <span className="text-[8px] font-bold text-amber-700 mt-1">{page.voucherDetails}</span>
                                </div>

                                <div className="p-3 flex flex-col items-center bg-white/45">
                                  <div className="size-14 border border-slate-200 p-1.5 bg-white rounded-lg flex flex-wrap gap-[2px]">
                                    {[...Array(36)].map((_, i) => (
                                      <div 
                                        key={i} 
                                        className={`size-[5.5px] rounded-[1px] ${
                                          (i % 3 === 0 || i % 4 === 1 || i % 7 === 3) ? 'bg-[#0f172a]' : 'bg-transparent'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[6.5px] text-slate-400 font-bold mt-2">Scan at any recycling center to claim</span>
                                </div>
                              </div>

                              <button className="w-full max-w-[210px] bg-teal-600 text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer hover:bg-teal-700 shadow-md shadow-teal-500/10 transition-all mt-1">
                                Claim 150 Points
                              </button>
                            </div>

                            {/* Footer */}
                            <footer className="bg-slate-50 border-t border-slate-100 p-3 flex justify-around text-slate-400 text-[9px] font-semibold shrink-0">
                              <span>Home</span>
                              <span>Activity</span>
                              <span className="text-teal-600 font-bold font-bold">Rewards</span>
                            </footer>
                          </div>
                        )}

                        {/* 5. Matchday Event Hub Layout */}
                        {page.type === 'events' && (
                          <div className="flex-1 flex flex-col justify-between h-full min-h-0 bg-white">
                            {/* Header */}
                            {isHeaderEnabled && (
                              <header className="bg-white border-b border-slate-100 px-4 pt-8 pb-3.5 flex items-center justify-between select-none z-20 shrink-0">
                                <div className="flex items-center gap-1.5">
                                  {isSidenavEnabled && (
                                    <Menu 
                                      className="size-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSidenavOpen(true);
                                      }}
                                    />
                                  )}
                                  <span className="font-montserrat font-bold tracking-widest text-xs text-teal-650">{logoText}</span>
                                </div>
                                <QrCode className="size-4 text-slate-700" />
                              </header>
                            )}
                            
                            {/* Body */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scrollbar-none">
                              <div className="flex flex-col select-none">
                                <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">ECO EVENTS</span>
                                <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-slate-900 mt-0.5">
                                  Matchday Hub
                                </h2>
                              </div>

                              {/* Event info card */}
                              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-4 rounded-2xl flex flex-col gap-3.5 shadow-md">
                                <div className="flex flex-col">
                                  <span className="text-[8px] font-bold text-teal-400 uppercase tracking-wider">Upcoming Match</span>
                                  <span className="text-xs font-black mt-1 leading-tight">{page.eventName}</span>
                                </div>

                                <div className="flex flex-col gap-1 text-[8.5px] text-slate-300">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3 text-teal-400" />
                                    <span>{page.eventDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <MapPin className="size-3 text-teal-400" />
                                    <span>{page.location}</span>
                                  </div>
                                </div>

                                <div className="bg-white/10 p-2 rounded-xl flex items-center justify-between mt-1">
                                  <div className="flex flex-col">
                                    <span className="text-[6.5px] text-teal-300 font-bold uppercase">Sustainability Badge</span>
                                    <span className="text-[8.5px] font-bold mt-0.5">100% Carbon Offset</span>
                                  </div>
                                  <div className="size-5 bg-teal-500 rounded-full flex items-center justify-center">
                                    <Check className="size-3 text-white" />
                                  </div>
                                </div>
                              </div>

                              <button className="bg-white border border-slate-200 text-slate-800 font-extrabold text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-xs transition-all">
                                <QrCode className="size-3.5 text-slate-650" />
                                <span>Scan Ticket for Eco-Credits</span>
                              </button>
                            </div>

                            {/* Footer */}
                            <footer className="bg-slate-50 border-t border-slate-100 p-3 flex justify-around text-slate-400 text-[9px] font-semibold shrink-0">
                              <span className="text-teal-600 font-bold">Home</span>
                              <span>Activity</span>
                              <span>Rewards</span>
                            </footer>
                          </div>
                        )}

                      </div>
                      
                      {/* Bottom Home Indicator */}
                      {isActive && (
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Left arrow pagination button placed to the left of the phone stack */}
            {pages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePageIndex(prev => (prev - 1 + pages.length) % pages.length);
                }}
                className="absolute right-[calc(50%+160px)] top-[350px] -translate-y-1/2 size-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-40"
                title="Previous Screen"
              >
                <ChevronLeft className="size-4 stroke-[2.5]" />
              </button>
            )}

            {/* Next arrow pagination button placed perfectly next to the phone stack */}
            {pages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePageIndex(prev => (prev + 1) % pages.length);
                }}
                className="absolute left-[calc(50%+160px)] top-[350px] -translate-y-1/2 size-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-40"
                title="Next Screen"
              >
                <ChevronRight className="size-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Editor Panel */}
        <AnimatePresence>
          {!isPreviewMode && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-l border-brand-border flex flex-col shrink-0 select-none overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-200 flex flex-col gap-3 shrink-0 bg-white">
                {/* Top Row: Icon & Title */}
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                    <LayoutGrid className="size-3.5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-sm font-black text-slate-800 font-sans tracking-tight">Editor Panel</h3>
                </div>

                {/* Second Row: Back button & Segmented Control */}
                {selectedElement && (
                  <div className="flex items-center justify-between mt-1">
                    <button 
                      onClick={() => {
                        setSelectedElement(null);
                        setActiveEditorTab('Content');
                        setIsSidenavOpen(false);
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-655 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="size-4 stroke-[2.5]" />
                    </button>

                    {/* Segmented Control Tabs */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
                      <button
                        onClick={() => setActiveEditorTab('Content')}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                          activeEditorTab === 'Content'
                            ? 'bg-white text-slate-800 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Content
                      </button>
                      <button
                        onClick={() => setActiveEditorTab('Styles')}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                          activeEditorTab === 'Styles'
                            ? 'bg-white text-slate-800 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Styles
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs Content */}
              {activeEditorTab === 'Content' ? (
                /* Content tab */
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-6">
                  {!selectedElement ? (
                    /* Content layers fallback showing Active Modules SIDENAV & HEADER with drag-to-reorder functionality */
                    /* Content layers fallback showing Active Modules with drag-to-reorder functionality */
                    <Reorder.Group 
                      axis="y" 
                      values={moduleOrder} 
                      onReorder={setModuleOrder} 
                      className="px-4 py-4 flex flex-col gap-4"
                    >
                      {moduleOrder.map((modId) => {
                        const config = moduleConfig[modId];
                        if (!config) return null;
                        const IconComponent = config.icon;
                        
                        return (
                          <Reorder.Item 
                            key={modId} 
                            value={modId}
                            className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col gap-4 shadow-2xs hover:shadow-xs transition-shadow cursor-default select-none"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                {/* Drag Handle */}
                                <div className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-slate-355 hover:text-slate-500 transition-colors shrink-0">
                                  <GripVertical className="size-3.5" />
                                </div>
                                
                                <div className="size-9 bg-slate-50 border border-slate-105 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                                  <IconComponent className="size-4 stroke-[2]" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-black text-slate-800 tracking-wide">{config.label}</span>
                                  <span className="text-[9.5px] font-bold text-slate-400 truncate" title={modId === 'sidenav' ? userName : config.defaultSub}>
                                    {modId === 'sidenav' ? userName : config.defaultSub}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {/* Toggle Switch */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEnabledModules(prev => ({
                                      ...prev,
                                      [modId]: !prev[modId]
                                    }));
                                    if (modId === 'sidenav' && enabledModules.sidenav) {
                                      setIsSidenavOpen(false);
                                    }
                                  }}
                                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                                    enabledModules[modId] ? 'bg-blue-600' : 'bg-slate-200'
                                  }`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                                      enabledModules[modId] ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                                {/* Delete/Trash Icon */}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Are you sure you want to delete ${config.label}?`)) {
                                      setEnabledModules(prev => ({ ...prev, [modId]: false }));
                                      if (modId === 'sidenav') {
                                        setIsSidenavOpen(false);
                                      }
                                      setModuleOrder(prev => prev.filter(id => id !== modId));
                                    }
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Trash2 className="size-4 stroke-[2]" />
                                </button>
                              </div>
                            </div>

                            {/* Content & Settings Button */}
                            <button
                              onClick={() => {
                                if (modId === 'sidenav') {
                                  setSelectedElement({ id: 'sidenav', label: 'SIDENAV' });
                                  setIsSidenavOpen(true);
                                } else if (modId === 'header') {
                                  setSelectedElement({ id: 'header', label: 'Header Container' });
                                } else if (modId === 'card') {
                                  setSelectedElement({ id: 'mapCard', label: 'Card' });
                                } else {
                                  setSelectedElement({ id: modId, label: config.label });
                                }
                                setActiveEditorTab('Content');
                              }}
                              disabled={!enabledModules[modId]}
                              className={`w-full py-2.5 rounded-xl border font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                enabledModules[modId]
                                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-150 active:scale-98' 
                                  : 'bg-slate-50/50 border-slate-100 text-slate-350 cursor-not-allowed'
                              }`}
                            >
                              <Edit2 className="size-3.5" />
                              Content & Settings
                            </button>
                          </Reorder.Item>
                        );
                      })}
                    </Reorder.Group>
                  ) : (
                    /* Content editor */
                    <div className="flex flex-col pt-3">
                      {/* Target Block Info */}
                      {selectedElement.id !== 'sidenav' && (
                        <div className="mx-4 mb-4 p-3 bg-[#e9ecef] rounded-2xl flex flex-col gap-0.5 select-none">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">TARGET BLOCK</span>
                          <span className="text-sm font-black text-slate-800 mt-1">{selectedElement.id === 'mapCard' ? 'Card' : selectedElement.label}</span>
                        </div>
                      )}

                      {/* Card fields */}
                      {selectedElement.id === 'mapCard' && (
                        <div className="flex flex-col gap-4">
                          {/* Card Label */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Card Label</label>
                            <input 
                              type="text" 
                              value={cardContent.label}
                              onChange={(e) => setCardContent({ ...cardContent, label: e.target.value })}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>

                          {/* Card Image */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Card Image</label>
                            <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 relative group shadow-2xs">
                              <div className="w-full h-32 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                                <img 
                                  src={cardContent.image} 
                                  alt="Card Preview" 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="w-full flex items-center justify-between mt-1">
                                <span className="text-[10px] text-slate-400 font-bold truncate max-w-[140px]">
                                  {cardContent.image.startsWith('data:') ? 'uploaded_image.png' : cardContent.image.split('/').pop().split('?')[0]}
                                </span>
                                <label className="text-[10px] font-black text-blue-600 hover:text-blue-700 cursor-pointer select-none">
                                  Change Image
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          setCardContent({ ...cardContent, image: event.target.result });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Heading Text */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Heading Text</label>
                            <input 
                              type="text" 
                              value={cardContent.heading}
                              onChange={(e) => setCardContent({ ...cardContent, heading: e.target.value })}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>

                          {/* Body Text */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Body Text</label>
                            <textarea 
                              rows={4}
                              value={cardContent.body}
                              onChange={(e) => setCardContent({ ...cardContent, body: e.target.value })}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all resize-none leading-relaxed shadow-2xs"
                            />
                          </div>

                          {/* Button Text */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Button Text</label>
                            <input 
                              type="text" 
                              value={cardContent.buttonText}
                              onChange={(e) => setCardContent({ ...cardContent, buttonText: e.target.value })}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>

                          {/* Button Link */}
                          <div className="mx-4 flex flex-col">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Button Link</label>
                            <input 
                              type="text" 
                              value={cardContent.buttonLink}
                              onChange={(e) => setCardContent({ ...cardContent, buttonLink: e.target.value })}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* Header element content */}
                      {selectedElement.id === 'header' && (
                        <div className="mx-4 flex flex-col gap-1">
                          <label className="text-[11px] font-black text-slate-800 mb-1">Logo Text</label>
                          <input 
                            type="text" 
                            value={logoText}
                            onChange={(e) => setLogoText(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                          />
                        </div>
                      )}

                      {/* Subtitle element content */}
                      {selectedElement.id === 'subtitle' && (
                        <div className="mx-4 flex flex-col gap-1">
                          <label className="text-[11px] font-black text-slate-800 mb-1">Subtitle Text</label>
                          <input 
                            type="text" 
                            value={pages[activePageIndex].subtitle || ''}
                            onChange={(e) => {
                              const updated = [...pages];
                              updated[activePageIndex] = { ...updated[activePageIndex], subtitle: e.target.value };
                              setPages(updated);
                            }}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                          />
                        </div>
                      )}

                      {/* Title element content */}
                      {selectedElement.id === 'title' && (
                        <div className="mx-4 flex flex-col gap-1">
                          <label className="text-[11px] font-black text-slate-800 mb-1">Title Text</label>
                          <textarea 
                            rows={3}
                            value={pages[activePageIndex].titleText || pages[activePageIndex].title || ''}
                            onChange={(e) => {
                              const updated = [...pages];
                              updated[activePageIndex] = { ...updated[activePageIndex], titleText: e.target.value };
                              setPages(updated);
                            }}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all resize-none leading-normal shadow-2xs"
                          />
                        </div>
                      )}

                      {/* Paragraph element content */}
                      {selectedElement.id === 'paragraph' && (
                        <div className="mx-4 flex flex-col gap-1">
                          <label className="text-[11px] font-black text-slate-800 mb-1">Paragraph Text</label>
                          <textarea 
                            rows={5}
                            value={pages[activePageIndex].paragraph || ''}
                            onChange={(e) => {
                              const updated = [...pages];
                              updated[activePageIndex] = { ...updated[activePageIndex], paragraph: e.target.value };
                              setPages(updated);
                            }}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all resize-none leading-relaxed shadow-2xs"
                          />
                        </div>
                      )}

                      {/* Hero Image element content */}
                      {selectedElement.id === 'heroImage' && (
                        <div className="mx-4 flex flex-col gap-1">
                          <label className="text-[11px] font-black text-slate-800 mb-1">Hero Image</label>
                          <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 relative group shadow-2xs">
                            <div className="w-full h-32 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                              <img 
                                src={pages[activePageIndex].image || ''} 
                                alt="Hero Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-full flex items-center justify-between mt-1">
                              <span className="text-[10px] text-slate-400 font-bold truncate max-w-[140px]">
                                {pages[activePageIndex].image ? (pages[activePageIndex].image.startsWith('data:') ? 'uploaded_hero.png' : pages[activePageIndex].image.split('/').pop().split('?')[0]) : 'No image'}
                              </span>
                              <label className="text-[10px] font-black text-blue-600 hover:text-blue-700 cursor-pointer select-none">
                                Change Image
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        const updated = [...pages];
                                        updated[activePageIndex] = { ...updated[activePageIndex], image: event.target.result };
                                        setPages(updated);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer element content */}
                      {selectedElement.id === 'footer' && (
                        <div className="mx-4 flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Footer Tab 1 Text</label>
                            <input 
                              type="text" 
                              value={pages[0]?.title || 'Home'}
                              onChange={(e) => {
                                const updated = [...pages];
                                updated[0] = { ...updated[0], title: e.target.value };
                                setPages(updated);
                              }}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Footer Tab 2 Text</label>
                            <input 
                              type="text" 
                              value={pages[1]?.title || 'Activity'}
                              onChange={(e) => {
                                const updated = [...pages];
                                updated[1] = { ...updated[1], title: e.target.value };
                                setPages(updated);
                              }}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-black text-slate-800 mb-1">Footer Tab 3 Text</label>
                            <input 
                              type="text" 
                              value={pages[2]?.title || 'Rewards'}
                              onChange={(e) => {
                                const updated = [...pages];
                                updated[2] = { ...updated[2], title: e.target.value };
                                setPages(updated);
                              }}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-[#007bff] focus:bg-white transition-all shadow-2xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* Sidenav element content */}
                      {selectedElement.id === 'sidenav' && (
                        <div className="flex flex-col gap-5 px-4 pb-8">
                          
                          {/* SECTION 1: User Info */}
                          <div className="flex flex-col gap-3.5 border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-805 text-left flex-1">Show User Info</span>
                              <button
                                type="button"
                                onClick={() => setShowUserInfo(!showUserInfo)}
                                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                                  showUserInfo ? 'bg-blue-600' : 'bg-slate-200'
                                }`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                                    showUserInfo ? 'translate-x-4' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                            </div>

                            {showUserInfo && (
                              <div className="flex flex-col gap-3">
                                {/* User Name Input */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <div className="size-4.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                      <User className="size-3 stroke-[2.5]" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">User Avatar</span>
                                  </div>
                                  <input 
                                    type="text" 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="User Name"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                                  />
                                </div>

                                {/* User Avatar Upload */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <div className="size-4.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                      <User className="size-3 stroke-[2.5]" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">User Avatar</span>
                                  </div>
                                  
                                  <label className="w-full h-24 border border-dashed border-slate-350 hover:border-blue-500 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
                                    {userAvatar ? (
                                      <div className="relative size-14 rounded-full overflow-hidden border border-slate-250 shadow-xs">
                                        <img src={userAvatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Upload className="size-3.5 text-white" />
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <Upload className="size-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 transition-colors">Upload Image</span>
                                      </>
                                    )}
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onload = (event) => {
                                            setUserAvatar(event.target.result);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* SECTION 2: Home Menu Item */}
                          <div className="flex flex-col gap-3.5 border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-805 text-left flex-1">Show Home</span>
                              <button
                                type="button"
                                onClick={() => setShowHome(!showHome)}
                                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                                  showHome ? 'bg-blue-600' : 'bg-slate-200'
                                }`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                                    showHome ? 'translate-x-4' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                            </div>

                            {showHome && (
                              <div className="flex flex-col gap-3">
                                {/* Link to Home */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <Link className="size-3.5 text-slate-400 stroke-[2.5]" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Link to Home</span>
                                  </div>
                                  <input 
                                    type="text" 
                                    value={homeLink}
                                    onChange={(e) => setHomeLink(e.target.value)}
                                    placeholder="Enter Link"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-805 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                                  />
                                </div>

                                {/* Home Menu Label */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <Home className="size-3.5 text-slate-400 stroke-[2.5]" />
                                    <span className="text-[10px] font-black text-slate-505 uppercase tracking-wider">Home Menu Label</span>
                                  </div>
                                  <input 
                                    type="text" 
                                    value={homeLabel}
                                    onChange={(e) => setHomeLabel(e.target.value)}
                                    placeholder="Home"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-805 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* SECTION 3: Account Information Menu Item */}
                          <div className="flex flex-col gap-3.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-805 text-left flex-1">Show Account Information</span>
                              <button
                                type="button"
                                onClick={() => setShowAccountInfo(!showAccountInfo)}
                                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                                  showAccountInfo ? 'bg-blue-600' : 'bg-slate-200'
                                }`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                                    showAccountInfo ? 'translate-x-4' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                            </div>

                            {showAccountInfo && (
                              <div className="flex flex-col gap-3">
                                {/* Link to Account Information */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <Link className="size-3.5 text-slate-400 stroke-[2.5]" />
                                    <span className="text-[10px] font-black text-slate-505 uppercase tracking-wider">Link to Account Information</span>
                                  </div>
                                  <input 
                                    type="text" 
                                    value={accountLink}
                                    onChange={(e) => setAccountLink(e.target.value)}
                                    placeholder="Enter Link"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-805 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                                  />
                                </div>

                                {/* Account Menu Label */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <User className="size-3.5 text-slate-400 stroke-[2.5]" />
                                    <span className="text-[10px] font-black text-slate-505 uppercase tracking-wider">Account Menu Label</span>
                                  </div>
                                  <input 
                                    type="text" 
                                    value={accountLabel}
                                    onChange={(e) => setAccountLabel(e.target.value)}
                                    placeholder="Account Information"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-850 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      )}

                      {/* Fallback editing form for other modules */}
                      {!['mapCard', 'header', 'subtitle', 'title', 'paragraph', 'heroImage', 'footer', 'sidenav'].includes(selectedElement.id) && (
                        <div className="mx-4 flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-black text-slate-850 mb-1">Section Title</label>
                            <input 
                              type="text" 
                              value={selectedElement.label}
                              onChange={(e) => {
                                setSelectedElement({ ...selectedElement, label: e.target.value });
                              }}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-black text-slate-850 mb-1">Custom Description</label>
                            <textarea 
                              rows={4}
                              placeholder="Enter custom content settings..."
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none shadow-2xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Styles tab */
                <div className="flex-1 flex flex-col min-h-0">
                  {!selectedElement ? (
                    /* Styles empty state */
                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center gap-4">
                      <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <MousePointer className="size-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-slate-800">No Target Element Selected</span>
                        <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px] mx-auto mt-1 font-semibold">
                          Click "Start Editing" at the top and select any component inside the mobile screen mockup to start customizing.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Styles editor content */
                    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
                      {/* Target Element Indicator Card */}
                      <div className="mx-4 mb-2 p-3 bg-slate-50 rounded-xl border border-slate-200/50 flex flex-col gap-0.5 select-all">
                        <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Target Element</span>
                        <span className="text-xs font-black text-slate-800">{selectedElement.label}</span>
                      </div>

                      {/* Accordions */}
                      <div className="flex-1 flex flex-col divide-y divide-slate-100">
                        
                        {/* 1. Layout Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, layout: !prev.layout }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <LayoutGrid className="size-3.5 text-slate-500" />
                              <span className="text-xs font-black text-slate-800">Layout</span>
                            </div>
                            {openSections.layout ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          
                          {openSections.layout && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-4">
                              {/* Display */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Display</span>
                                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                  {['Block', 'Flex', 'Grid'].map((type) => (
                                    <button
                                      key={type}
                                      onClick={() => updateSelectedElementStyle('display', type)}
                                      className={`flex-1 text-center py-1 rounded-md text-[9px] font-extrabold transition-all cursor-pointer ${
                                        elementStyles[selectedElement.id].display === type
                                          ? 'bg-[#007bff] text-white shadow-xs'
                                          : 'text-slate-500 hover:text-slate-800'
                                      }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Direction */}
                              {elementStyles[selectedElement.id].display === 'Flex' && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Direction</span>
                                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                    {[
                                      { id: 'Row', label: 'Row' },
                                      { id: 'Column', label: 'Column' }
                                    ].map((dir) => (
                                      <button
                                        key={dir.id}
                                        onClick={() => updateSelectedElementStyle('direction', dir.id)}
                                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md text-[9px] font-extrabold transition-all cursor-pointer ${
                                          elementStyles[selectedElement.id].direction === dir.id
                                            ? 'bg-[#007bff] text-white shadow-xs'
                                            : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                      >
                                        {dir.id === 'Row' ? (
                                          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="7" height="18" rx="1" />
                                            <rect x="14" y="3" width="7" height="18" rx="1" />
                                          </svg>
                                        ) : (
                                          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="7" rx="1" />
                                            <rect x="3" y="14" width="18" height="7" rx="1" />
                                          </svg>
                                        )}
                                        <span>{dir.label}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Justify */}
                              {elementStyles[selectedElement.id].display === 'Flex' && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Justify</span>
                                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 justify-between">
                                    {[
                                      { id: 'start', title: 'Justify Start', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="2" y="1" width="1.5" height="14" rx="0.5" />
                                          <rect x="5" y="3" width="3" height="4" rx="0.5" />
                                          <rect x="5" y="9" width="5" height="4" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'center', title: 'Justify Center', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="7.25" y="1" width="1.5" height="14" rx="0.5" />
                                          <rect x="3.5" y="3" width="9" height="3" rx="0.5" />
                                          <rect x="4.5" y="10" width="7" height="3" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'end', title: 'Justify End', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="12.5" y="1" width="1.5" height="14" rx="0.5" />
                                          <rect x="8" y="3" width="3" height="4" rx="0.5" />
                                          <rect x="6" y="9" width="5" height="4" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'between', title: 'Justify Between', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1.5" y="1" width="1.5" height="14" rx="0.5" />
                                          <rect x="13" y="1" width="1.5" height="14" rx="0.5" />
                                          <rect x="4" y="4" width="3" height="8" rx="0.5" />
                                          <rect x="9" y="4" width="3" height="8" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'around', title: 'Justify Around', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1" y="1" width="1.5" height="14" rx="0.5" opacity="0.3" />
                                          <rect x="13.5" y="1" width="1.5" height="14" rx="0.5" opacity="0.3" />
                                          <rect x="3" y="4" width="3" height="8" rx="0.5" />
                                          <rect x="10" y="4" width="3" height="8" rx="0.5" />
                                        </svg>
                                      )}
                                    ].map((opt) => (
                                      <button
                                        key={opt.id}
                                        onClick={() => updateSelectedElementStyle('justify', opt.id)}
                                        title={opt.title}
                                        className={`p-1.5 rounded-md transition-all cursor-pointer ${
                                          elementStyles[selectedElement.id].justify === opt.id
                                            ? 'bg-[#007bff] text-white shadow-xs'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                                        }`}
                                      >
                                        {opt.icon}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Align */}
                              {elementStyles[selectedElement.id].display === 'Flex' && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Align</span>
                                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 justify-between">
                                    {[
                                      { id: 'start', title: 'Align Start', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1" y="2" width="14" height="1.5" rx="0.5" />
                                          <rect x="3" y="5" width="4" height="3" rx="0.5" />
                                          <rect x="9" y="5" width="4" height="5" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'center', title: 'Align Center', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1" y="7.25" width="14" height="1.5" rx="0.5" />
                                          <rect x="3" y="3" width="3" height="9" rx="0.5" />
                                          <rect x="10" y="4.5" width="3" height="6" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'end', title: 'Align End', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1" y="12.5" width="14" height="1.5" rx="0.5" />
                                          <rect x="3" y="8" width="4" height="3" rx="0.5" />
                                          <rect x="9" y="6" width="4" height="5" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'stretch', title: 'Align Stretch', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <rect x="1" y="2" width="14" height="1.5" rx="0.5" opacity="0.3" />
                                          <rect x="1" y="12.5" width="14" height="1.5" rx="0.5" opacity="0.3" />
                                          <rect x="3" y="4.5" width="3" height="7" rx="0.5" />
                                          <rect x="10" y="4.5" width="3" height="7" rx="0.5" />
                                        </svg>
                                      )},
                                      { id: 'baseline', title: 'Align Baseline', icon: (
                                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                          <line x1="1" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.5" />
                                          <rect x="3" y="6" width="3" height="5" rx="0.5" />
                                          <rect x="9" y="4" width="4" height="7" rx="0.5" />
                                        </svg>
                                      )}
                                    ].map((opt) => (
                                      <button
                                        key={opt.id}
                                        onClick={() => updateSelectedElementStyle('align', opt.id)}
                                        title={opt.title}
                                        className={`p-1.5 rounded-md transition-all cursor-pointer ${
                                          elementStyles[selectedElement.id].align === opt.id
                                            ? 'bg-[#007bff] text-white shadow-xs'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                                        }`}
                                      >
                                        {opt.icon}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Gap */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Gap</span>
                                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].gap || 0}
                                    onChange={(e) => updateSelectedElementStyle('gap', parseInt(e.target.value) || 0)}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                  />
                                  <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 2. Spacing Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, spacing: !prev.spacing }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="size-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                              </svg>
                              <span className="text-xs font-black text-slate-800">Spacing</span>
                            </div>
                            {openSections.spacing ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.spacing && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-3.5">
                              {/* Spacing Control Header with Locks */}
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Spacing Layout</span>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => updateSelectedElementStyle('marginLocked', !elementStyles[selectedElement.id].marginLocked)}
                                    className={`p-1 rounded text-[8px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                                      elementStyles[selectedElement.id].marginLocked 
                                        ? 'bg-amber-50 border-amber-300 text-amber-700 font-extrabold shadow-xs' 
                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                    title="Lock Margin Edges Together"
                                  >
                                    <Lock className="size-2.5" /> Margin
                                  </button>
                                  <button 
                                    onClick={() => updateSelectedElementStyle('paddingLocked', !elementStyles[selectedElement.id].paddingLocked)}
                                    className={`p-1 rounded text-[8px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                                      elementStyles[selectedElement.id].paddingLocked 
                                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-extrabold shadow-xs' 
                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                    title="Lock Padding Edges Together"
                                  >
                                    <Lock className="size-2.5" /> Padding
                                  </button>
                                </div>
                              </div>

                              {/* Spacing Box Model Diagram */}
                              <div className="relative bg-[#fffbeb] border border-[#fde68a] rounded-xl p-9 flex items-center justify-center select-none shadow-sm">
                                {/* Margin label */}
                                <span className="absolute top-1.5 left-2 text-[8px] font-extrabold text-amber-700/70 tracking-wider">MARGIN</span>
                                
                                {/* Margin Top */}
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].marginTop ?? 0}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      if (elementStyles[selectedElement.id].marginLocked) {
                                        updateSelectedElementStyle('marginTop', val);
                                        updateSelectedElementStyle('marginBottom', val);
                                        updateSelectedElementStyle('marginLeft', val);
                                        updateSelectedElementStyle('marginRight', val);
                                      } else {
                                        updateSelectedElementStyle('marginTop', val);
                                      }
                                    }}
                                    className="w-10 h-5 text-[10px] text-center bg-white border border-amber-200 rounded-md focus:outline-none focus:border-amber-400 font-extrabold text-amber-800 shadow-xs"
                                  />
                                </div>
                                
                                {/* Margin Left */}
                                <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].marginLeft ?? 0}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      if (elementStyles[selectedElement.id].marginLocked) {
                                        updateSelectedElementStyle('marginTop', val);
                                        updateSelectedElementStyle('marginBottom', val);
                                        updateSelectedElementStyle('marginLeft', val);
                                        updateSelectedElementStyle('marginRight', val);
                                      } else {
                                        updateSelectedElementStyle('marginLeft', val);
                                      }
                                    }}
                                    className="w-10 h-5 text-[10px] text-center bg-white border border-amber-200 rounded-md focus:outline-none focus:border-amber-400 font-extrabold text-amber-800 shadow-xs"
                                  />
                                </div>
                                
                                {/* Margin Right */}
                                <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].marginRight ?? 0}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      if (elementStyles[selectedElement.id].marginLocked) {
                                        updateSelectedElementStyle('marginTop', val);
                                        updateSelectedElementStyle('marginBottom', val);
                                        updateSelectedElementStyle('marginLeft', val);
                                        updateSelectedElementStyle('marginRight', val);
                                      } else {
                                        updateSelectedElementStyle('marginRight', val);
                                      }
                                    }}
                                    className="w-10 h-5 text-[10px] text-center bg-white border border-amber-200 rounded-md focus:outline-none focus:border-amber-400 font-extrabold text-amber-800 shadow-xs"
                                  />
                                </div>

                                {/* Margin Bottom */}
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].marginBottom ?? 0}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      if (elementStyles[selectedElement.id].marginLocked) {
                                        updateSelectedElementStyle('marginTop', val);
                                        updateSelectedElementStyle('marginBottom', val);
                                        updateSelectedElementStyle('marginLeft', val);
                                        updateSelectedElementStyle('marginRight', val);
                                      } else {
                                        updateSelectedElementStyle('marginBottom', val);
                                      }
                                    }}
                                    className="w-10 h-5 text-[10px] text-center bg-white border border-amber-200 rounded-md focus:outline-none focus:border-amber-400 font-extrabold text-amber-800 shadow-xs"
                                  />
                                </div>

                                {/* Inner Padding container */}
                                <div className="relative w-full bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-8 flex items-center justify-center shadow-xs">
                                  {/* Padding label */}
                                  <span className="absolute top-1.5 left-2 text-[8px] font-extrabold text-blue-700/70 tracking-wider">PADDING</span>

                                  {/* Padding Top */}
                                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].paddingTop ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        if (elementStyles[selectedElement.id].paddingLocked) {
                                          updateSelectedElementStyle('paddingTop', val);
                                          updateSelectedElementStyle('paddingBottom', val);
                                          updateSelectedElementStyle('paddingLeft', val);
                                          updateSelectedElementStyle('paddingRight', val);
                                        } else {
                                          updateSelectedElementStyle('paddingTop', val);
                                        }
                                      }}
                                      className="w-10 h-5 text-[10px] text-center bg-white border border-blue-200 rounded-md focus:outline-none focus:border-blue-400 font-extrabold text-blue-800 shadow-xs"
                                    />
                                  </div>
                                  
                                  {/* Padding Left */}
                                  <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].paddingLeft ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        if (elementStyles[selectedElement.id].paddingLocked) {
                                          updateSelectedElementStyle('paddingTop', val);
                                          updateSelectedElementStyle('paddingBottom', val);
                                          updateSelectedElementStyle('paddingLeft', val);
                                          updateSelectedElementStyle('paddingRight', val);
                                        } else {
                                          updateSelectedElementStyle('paddingLeft', val);
                                        }
                                      }}
                                      className="w-10 h-5 text-[10px] text-center bg-white border border-blue-200 rounded-md focus:outline-none focus:border-blue-400 font-extrabold text-blue-800 shadow-xs"
                                    />
                                  </div>
                                  
                                  {/* Padding Right */}
                                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].paddingRight ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        if (elementStyles[selectedElement.id].paddingLocked) {
                                          updateSelectedElementStyle('paddingTop', val);
                                          updateSelectedElementStyle('paddingBottom', val);
                                          updateSelectedElementStyle('paddingLeft', val);
                                          updateSelectedElementStyle('paddingRight', val);
                                        } else {
                                          updateSelectedElementStyle('paddingRight', val);
                                        }
                                      }}
                                      className="w-10 h-5 text-[10px] text-center bg-white border border-blue-200 rounded-md focus:outline-none focus:border-blue-400 font-extrabold text-blue-800 shadow-xs"
                                    />
                                  </div>

                                  {/* Padding Bottom */}
                                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].paddingBottom ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        if (elementStyles[selectedElement.id].paddingLocked) {
                                          updateSelectedElementStyle('paddingTop', val);
                                          updateSelectedElementStyle('paddingBottom', val);
                                          updateSelectedElementStyle('paddingLeft', val);
                                          updateSelectedElementStyle('paddingRight', val);
                                        } else {
                                          updateSelectedElementStyle('paddingBottom', val);
                                        }
                                      }}
                                      className="w-10 h-5 text-[10px] text-center bg-white border border-blue-200 rounded-md focus:outline-none focus:border-blue-400 font-extrabold text-blue-800 shadow-xs"
                                    />
                                  </div>

                                  {/* Center Content Box */}
                                  <div className="bg-white border border-slate-200 rounded-md px-3 py-1.5 flex items-center justify-center shadow-xs">
                                    <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">CONTENT 320 x 240</span>
                                  </div>
                                </div>
                              </div>

                              {/* Padding Presets */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Padding Presets</span>
                                <div className="grid grid-cols-6 gap-1.5">
                                  {['0', '4', '8', '16', '24', 'Auto'].map((preset) => (
                                    <button
                                      key={preset}
                                      onClick={() => {
                                        const val = preset === 'Auto' ? 0 : parseInt(preset);
                                        updateSelectedElementStyle('paddingTop', val);
                                        updateSelectedElementStyle('paddingBottom', val);
                                        updateSelectedElementStyle('paddingLeft', val);
                                        updateSelectedElementStyle('paddingRight', val);
                                      }}
                                      className="py-1 text-[10px] font-extrabold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-all cursor-pointer font-extrabold"
                                    >
                                      {preset}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 3. Size Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, size: !prev.size }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="size-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                              </svg>
                              <span className="text-xs font-black text-slate-800">Size</span>
                            </div>
                            {openSections.size ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.size && (
                            <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-x-3 gap-y-2.5">
                              {/* Width */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Width</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="Auto"
                                    value={parseStyleVal(elementStyles[selectedElement.id].width).num}
                                    disabled={['auto', 'none'].includes(parseStyleVal(elementStyles[selectedElement.id].width).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].width).unit;
                                      handleSizeChange('width', e.target.value, unit === 'auto' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].width).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].width).num || '100';
                                      handleSizeChange('width', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="auto">auto</option>
                                  </select>
                                </div>
                              </div>

                              {/* Height */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Height</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="Auto"
                                    value={parseStyleVal(elementStyles[selectedElement.id].height).num}
                                    disabled={['auto', 'none'].includes(parseStyleVal(elementStyles[selectedElement.id].height).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].height).unit;
                                      handleSizeChange('height', e.target.value, unit === 'auto' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].height).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].height).num || '100';
                                      handleSizeChange('height', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="auto">auto</option>
                                  </select>
                                </div>
                              </div>

                              {/* Min W */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Min W</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="0"
                                    value={parseStyleVal(elementStyles[selectedElement.id].minWidth).num}
                                    disabled={['none', 'auto'].includes(parseStyleVal(elementStyles[selectedElement.id].minWidth).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].minWidth).unit;
                                      handleSizeChange('minWidth', e.target.value, unit === 'none' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].minWidth).unit === 'none' ? 'none' : parseStyleVal(elementStyles[selectedElement.id].minWidth).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].minWidth).num || '0';
                                      handleSizeChange('minWidth', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="none">none</option>
                                  </select>
                                </div>
                              </div>

                              {/* Min H */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Min H</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="0"
                                    value={parseStyleVal(elementStyles[selectedElement.id].minHeight).num}
                                    disabled={['none', 'auto'].includes(parseStyleVal(elementStyles[selectedElement.id].minHeight).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].minHeight).unit;
                                      handleSizeChange('minHeight', e.target.value, unit === 'none' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].minHeight).unit === 'none' ? 'none' : parseStyleVal(elementStyles[selectedElement.id].minHeight).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].minHeight).num || '0';
                                      handleSizeChange('minHeight', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="none">none</option>
                                  </select>
                                </div>
                              </div>

                              {/* Max W */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Max W</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="None"
                                    value={parseStyleVal(elementStyles[selectedElement.id].maxWidth).num}
                                    disabled={['none', 'auto'].includes(parseStyleVal(elementStyles[selectedElement.id].maxWidth).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].maxWidth).unit;
                                      handleSizeChange('maxWidth', e.target.value, unit === 'none' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].maxWidth).unit === 'none' ? 'none' : parseStyleVal(elementStyles[selectedElement.id].maxWidth).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].maxWidth).num || '500';
                                      handleSizeChange('maxWidth', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="none">none</option>
                                  </select>
                                </div>
                              </div>

                              {/* Max H */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Max H</span>
                                <div className="flex items-center border border-slate-200 rounded-lg p-1.5 bg-slate-50">
                                  <input
                                    type="number"
                                    placeholder="None"
                                    value={parseStyleVal(elementStyles[selectedElement.id].maxHeight).num}
                                    disabled={['none', 'auto'].includes(parseStyleVal(elementStyles[selectedElement.id].maxHeight).unit)}
                                    onChange={(e) => {
                                      const unit = parseStyleVal(elementStyles[selectedElement.id].maxHeight).unit;
                                      handleSizeChange('maxHeight', e.target.value, unit === 'none' ? 'px' : unit);
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 disabled:opacity-50"
                                  />
                                  <select
                                    value={parseStyleVal(elementStyles[selectedElement.id].maxHeight).unit === 'none' ? 'none' : parseStyleVal(elementStyles[selectedElement.id].maxHeight).unit}
                                    onChange={(e) => {
                                      const num = parseStyleVal(elementStyles[selectedElement.id].maxHeight).num || '500';
                                      handleSizeChange('maxHeight', num, e.target.value);
                                    }}
                                    className="text-[10px] text-slate-500 font-extrabold bg-transparent border-none focus:outline-none cursor-pointer pr-1 shrink-0"
                                  >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="none">none</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 4. Typography Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, typography: !prev.typography }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Type className="size-3.5 text-slate-500" />
                              <span className="text-xs font-black text-slate-800">Typography</span>
                            </div>
                            {openSections.typography ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.typography && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-3.5">
                              {/* Font Family */}
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Font Family</span>
                                <div className="relative">
                                  <select
                                    value={elementStyles[selectedElement.id].fontFamily || 'Canva Sans'}
                                    onChange={(e) => updateSelectedElementStyle('fontFamily', e.target.value)}
                                    className="w-full appearance-none text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-full px-4 py-2 pr-8 shadow-2xs focus:outline-none focus:border-brand-blue cursor-pointer"
                                  >
                                    <option value="Canva Sans">Canva Sans</option>
                                    <option value="Source Sans Pro">Source Sans Pro</option>
                                    <option value="Inter">Inter</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Helvetica Neue">Helvetica Neue</option>
                                  </select>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-700">
                                    <ChevronDown className="size-3.5 stroke-[2.5]" />
                                  </span>
                                </div>
                              </div>

                              {/* Size & Weight */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Size</span>
                                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].fontSize || 0}
                                      onChange={(e) => updateSelectedElementStyle('fontSize', parseInt(e.target.value) || 0)}
                                      className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                    />
                                    <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Weight</span>
                                  <div className="relative">
                                    <select
                                      value={elementStyles[selectedElement.id].fontWeight || 'Normal'}
                                      onChange={(e) => updateSelectedElementStyle('fontWeight', e.target.value)}
                                      className="w-full appearance-none text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-full px-3 py-1.5 pr-7 shadow-2xs focus:outline-none cursor-pointer"
                                    >
                                      <option value="Normal">Normal</option>
                                      <option value="Semibold">Semibold</option>
                                      <option value="Bold">Bold</option>
                                      <option value="Extrabold">Extrabold</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-700">
                                      <ChevronDown className="size-3 stroke-[2.5]" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Line Height & Letter Space */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Line Height</span>
                                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].lineHeight || 0}
                                      onChange={(e) => updateSelectedElementStyle('lineHeight', parseInt(e.target.value) || 0)}
                                      className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                    />
                                    <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Letter Space</span>
                                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                    <input
                                      type="number"
                                      step="0.5"
                                      value={elementStyles[selectedElement.id].letterSpacing || 0}
                                      onChange={(e) => updateSelectedElementStyle('letterSpacing', parseFloat(e.target.value) || 0)}
                                      className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                    />
                                    <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                  </div>
                                </div>
                              </div>

                              {/* Text Color */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Text Color</span>
                                <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white shadow-xs">
                                  <div className="relative size-7 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center bg-slate-100">
                                    <input
                                      type="color"
                                      value={elementStyles[selectedElement.id].textColor || '#000000'}
                                      onChange={(e) => updateSelectedElementStyle('textColor', e.target.value)}
                                      className="absolute inset-0 size-full cursor-pointer p-0 opacity-0"
                                    />
                                    <div 
                                      className="size-5 rounded-sm border border-slate-200/50" 
                                      style={{ backgroundColor: elementStyles[selectedElement.id].textColor || '#000000' }}
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={elementStyles[selectedElement.id].textColor || ''}
                                    onChange={(e) => updateSelectedElementStyle('textColor', e.target.value)}
                                    className="flex-1 text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 uppercase"
                                    placeholder="#000000"
                                  />
                                </div>
                                
                                {/* Presets */}
                                <div className="flex flex-wrap gap-1.5 mt-1 bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                                  {['#007bff', '#6f42c1', '#6610f2', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#000000', '#ffffff'].map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => updateSelectedElementStyle('textColor', color)}
                                      className={`size-4.5 rounded-full border border-slate-300/60 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-xs ${
                                        elementStyles[selectedElement.id].textColor === color ? 'ring-2 ring-brand-blue ring-offset-1 scale-105' : ''
                                      }`}
                                      style={{ backgroundColor: color }}
                                      title={color}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Alignment */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Alignment</span>
                                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                  {['left', 'center', 'right', 'justify'].map((align) => (
                                    <button
                                      key={align}
                                      onClick={() => updateSelectedElementStyle('textAlign', align)}
                                      className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-black capitalize transition-all cursor-pointer ${
                                        elementStyles[selectedElement.id].textAlign === align
                                          ? 'bg-white text-slate-800 shadow-xs font-extrabold'
                                          : 'text-slate-500 hover:text-slate-850'
                                      }`}
                                    >
                                      {align}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 5. Backgrounds Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, backgrounds: !prev.backgrounds }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Palette className="size-3.5 text-slate-500" />
                              <span className="text-xs font-black text-slate-800">Backgrounds</span>
                            </div>
                            {openSections.backgrounds ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.backgrounds && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-3.5">
                              {/* Background Color */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Background Color</span>
                                <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white shadow-xs">
                                  <div className="relative size-7 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center bg-slate-100">
                                    <input
                                      type="color"
                                      value={elementStyles[selectedElement.id].bgColor === 'transparent' ? '#ffffff' : elementStyles[selectedElement.id].bgColor}
                                      onChange={(e) => updateSelectedElementStyle('bgColor', e.target.value)}
                                      className="absolute inset-0 size-full cursor-pointer p-0 opacity-0"
                                    />
                                    <div 
                                      className="size-5 rounded-sm border border-slate-200/50" 
                                      style={{ backgroundColor: elementStyles[selectedElement.id].bgColor === 'transparent' ? '#ffffff' : elementStyles[selectedElement.id].bgColor }}
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={elementStyles[selectedElement.id].bgColor || ''}
                                    onChange={(e) => updateSelectedElementStyle('bgColor', e.target.value)}
                                    className="flex-1 text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 uppercase"
                                    placeholder="transparent"
                                  />
                                  <button
                                    onClick={() => updateSelectedElementStyle('bgColor', 'transparent')}
                                    className={`px-2.5 py-1 text-[9px] font-black rounded-md border cursor-pointer select-none transition-all ${
                                      elementStyles[selectedElement.id].bgColor === 'transparent'
                                        ? 'bg-slate-200 border-slate-350 text-slate-700 font-extrabold'
                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                  >
                                    Clear
                                  </button>
                                </div>
                                
                                {/* Presets */}
                                <div className="flex flex-wrap gap-1.5 mt-1 bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                                  {['#007bff', '#6f42c1', '#6610f2', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#000000', '#ffffff', 'transparent'].map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => updateSelectedElementStyle('bgColor', color)}
                                      className={`size-4.5 rounded-full border border-slate-300/60 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-xs ${
                                        color === 'transparent' ? 'bg-gradient-to-tr from-red-500/20 via-transparent to-red-500/20 relative overflow-hidden' : ''
                                      } ${
                                        elementStyles[selectedElement.id].bgColor === color ? 'ring-2 ring-brand-blue ring-offset-1 scale-105' : ''
                                      }`}
                                      style={{ backgroundColor: color !== 'transparent' ? color : undefined }}
                                      title={color}
                                    >
                                      {color === 'transparent' && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-5 h-0.5 bg-red-500 rotate-45" />
                                        </div>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Background Image Upload Box */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Background Image</span>
                                {elementStyles[selectedElement.id].bgImage ? (
                                  <div className="relative border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center gap-2">
                                    <img 
                                      src={elementStyles[selectedElement.id].bgImage} 
                                      alt="Bg Preview" 
                                      className="size-10 object-cover rounded-md border border-slate-250"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[10px] font-extrabold text-slate-700 truncate">Image Loaded</p>
                                      <p className="text-[8px] font-semibold text-slate-400 truncate">{elementStyles[selectedElement.id].bgImage}</p>
                                    </div>
                                    <button
                                      onClick={() => updateSelectedElementStyle('bgImage', '')}
                                      className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                                      title="Remove Image"
                                    >
                                      <Trash2 className="size-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const mockImages = [
                                        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
                                        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600',
                                        'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600'
                                      ];
                                      const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
                                      updateSelectedElementStyle('bgImage', randomImg);
                                    }}
                                    className="w-full h-24 border-2 border-dashed border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50/50 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
                                  >
                                    <Image className="size-6 text-slate-400 group-hover:text-brand-blue transition-colors" />
                                    <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-slate-700 transition-colors">Upload Image</span>
                                    <span className="text-[8px] font-semibold text-slate-400">Click to apply image</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 6. Borders Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, borders: !prev.borders }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="size-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="4" />
                              </svg>
                              <span className="text-xs font-black text-slate-800">Borders</span>
                            </div>
                            {openSections.borders ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.borders && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-3.5">
                              {/* Border Width & Style */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Width</span>
                                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                    <input
                                      type="number"
                                      value={elementStyles[selectedElement.id].borderWidth ?? 0}
                                      onChange={(e) => updateSelectedElementStyle('borderWidth', parseInt(e.target.value) || 0)}
                                      className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                    />
                                    <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Style</span>
                                  <div className="relative">
                                    <select
                                      value={elementStyles[selectedElement.id].borderStyle || 'solid'}
                                      onChange={(e) => updateSelectedElementStyle('borderStyle', e.target.value)}
                                      className="w-full appearance-none text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-full px-3 py-1.5 pr-7 shadow-2xs focus:outline-none cursor-pointer"
                                    >
                                      <option value="solid">Solid</option>
                                      <option value="dashed">Dashed</option>
                                      <option value="dotted">Dotted</option>
                                      <option value="double">Double</option>
                                      <option value="none">None</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-700">
                                      <ChevronDown className="size-3 stroke-[2.5]" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Border Color */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Border Color</span>
                                <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white shadow-xs">
                                  <div className="relative size-7 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center bg-slate-100">
                                    <input
                                      type="color"
                                      value={elementStyles[selectedElement.id].borderColor || '#007bff'}
                                      onChange={(e) => updateSelectedElementStyle('borderColor', e.target.value)}
                                      className="absolute inset-0 size-full cursor-pointer p-0 opacity-0"
                                    />
                                    <div 
                                      className="size-5 rounded-sm border border-slate-200/50" 
                                      style={{ backgroundColor: elementStyles[selectedElement.id].borderColor || '#007bff' }}
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={elementStyles[selectedElement.id].borderColor || ''}
                                    onChange={(e) => updateSelectedElementStyle('borderColor', e.target.value)}
                                    className="flex-1 text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1 uppercase"
                                    placeholder="#007bff"
                                  />
                                </div>
                                
                                {/* Presets */}
                                <div className="flex flex-wrap gap-1.5 mt-1 bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                                  {['#007bff', '#6f42c1', '#6610f2', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#000000', '#ffffff', '#e2e8f0'].map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => updateSelectedElementStyle('borderColor', color)}
                                      className={`size-4.5 rounded-full border border-slate-300/60 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-xs ${
                                        elementStyles[selectedElement.id].borderColor === color ? 'ring-2 ring-brand-blue ring-offset-1 scale-105' : ''
                                      }`}
                                      style={{ backgroundColor: color }}
                                      title={color}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Border Radius */}
                              <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Border Radius</span>
                                  <button 
                                    onClick={() => {
                                      const locked = !elementStyles[selectedElement.id].borderRadiusLocked;
                                      updateSelectedElementStyle('borderRadiusLocked', locked);
                                      if (locked) {
                                        const rad = elementStyles[selectedElement.id].borderRadius;
                                        updateSelectedElementStyle('borderTopLeftRadius', rad);
                                        updateSelectedElementStyle('borderTopRightRadius', rad);
                                        updateSelectedElementStyle('borderBottomLeftRadius', rad);
                                        updateSelectedElementStyle('borderBottomRightRadius', rad);
                                      }
                                    }}
                                    className={`p-1 rounded text-[8px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                                      elementStyles[selectedElement.id].borderRadiusLocked 
                                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-extrabold shadow-xs' 
                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                    title="Toggle Radius Link"
                                  >
                                    <Lock className="size-2.5" />
                                    <span>Lock Corners</span>
                                  </button>
                                </div>

                                {/* General Radius Input */}
                                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                                  <input
                                    type="number"
                                    value={elementStyles[selectedElement.id].borderRadius ?? 0}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      updateSelectedElementStyle('borderRadius', val);
                                      if (elementStyles[selectedElement.id].borderRadiusLocked) {
                                        updateSelectedElementStyle('borderTopLeftRadius', val);
                                        updateSelectedElementStyle('borderTopRightRadius', val);
                                        updateSelectedElementStyle('borderBottomLeftRadius', val);
                                        updateSelectedElementStyle('borderBottomRightRadius', val);
                                      }
                                    }}
                                    className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                    placeholder="0"
                                  />
                                  <span className="text-[10px] text-slate-400 font-bold pr-1">px</span>
                                </div>

                                {/* Individual Radius Grid */}
                                {!elementStyles[selectedElement.id].borderRadiusLocked && (
                                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                                    {/* TOP CORNERS divider */}
                                    <div className="relative flex items-center justify-center">
                                      <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                      </div>
                                      <span className="relative px-2 text-[8px] font-extrabold text-slate-400 bg-white tracking-wider">TOP CORNERS</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-extrabold text-slate-400">Top Left</span>
                                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1">
                                          <input
                                            type="number"
                                            value={elementStyles[selectedElement.id].borderTopLeftRadius ?? 0}
                                            onChange={(e) => updateSelectedElementStyle('borderTopLeftRadius', parseInt(e.target.value) || 0)}
                                            className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                          />
                                          <span className="text-[9px] text-slate-400 font-bold pr-1">px</span>
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-extrabold text-slate-400">Top Right</span>
                                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1">
                                          <input
                                            type="number"
                                            value={elementStyles[selectedElement.id].borderTopRightRadius ?? 0}
                                            onChange={(e) => updateSelectedElementStyle('borderTopRightRadius', parseInt(e.target.value) || 0)}
                                            className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                          />
                                          <span className="text-[9px] text-slate-400 font-bold pr-1">px</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* BOTTOM CORNERS divider */}
                                    <div className="relative flex items-center justify-center mt-1">
                                      <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                      </div>
                                      <span className="relative px-2 text-[8px] font-extrabold text-slate-400 bg-white tracking-wider">BOTTOM CORNERS</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-extrabold text-slate-400">Bottom Left</span>
                                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1">
                                          <input
                                            type="number"
                                            value={elementStyles[selectedElement.id].borderBottomLeftRadius ?? 0}
                                            onChange={(e) => updateSelectedElementStyle('borderBottomLeftRadius', parseInt(e.target.value) || 0)}
                                            className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                          />
                                          <span className="text-[9px] text-slate-400 font-bold pr-1">px</span>
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-extrabold text-slate-400">Bottom Right</span>
                                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1">
                                          <input
                                            type="number"
                                            value={elementStyles[selectedElement.id].borderBottomRightRadius ?? 0}
                                            onChange={(e) => updateSelectedElementStyle('borderBottomRightRadius', parseInt(e.target.value) || 0)}
                                            className="w-full text-xs font-extrabold text-slate-800 bg-transparent focus:outline-none pl-1"
                                          />
                                          <span className="text-[9px] text-slate-400 font-bold pr-1">px</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 7. Effects Accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setOpenSections(prev => ({ ...prev, effects: !prev.effects }))}
                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="size-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                              </svg>
                              <span className="text-xs font-black text-slate-800">Effects</span>
                            </div>
                            {openSections.effects ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                          </button>
                          {openSections.effects && (
                            <div className="px-4 pb-4 pt-1 flex flex-col gap-3.5">
                              {/* Opacity */}
                              <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Opacity</span>
                                  <span className="text-xs font-extrabold text-slate-700">{elementStyles[selectedElement.id].opacity ?? 100}%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={elementStyles[selectedElement.id].opacity ?? 100}
                                    onChange={(e) => updateSelectedElementStyle('opacity', parseInt(e.target.value) || 0)}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={elementStyles[selectedElement.id].opacity ?? 100}
                                    onChange={(e) => updateSelectedElementStyle('opacity', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                    className="w-12 h-6 text-center text-xs font-extrabold text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Shadow */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Shadow</span>
                                <select
                                  value={elementStyles[selectedElement.id].boxShadow || 'none'}
                                  onChange={(e) => updateSelectedElementStyle('boxShadow', e.target.value)}
                                  className="w-full text-xs font-extrabold text-slate-800 bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-brand-blue cursor-pointer"
                                >
                                  <option value="none">None</option>
                                  <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">Small</option>
                                  <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">Medium</option>
                                  <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)">Large</option>
                                  <option value="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)">Extra Large</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Sticky Footer Apply/Reset Buttons */}
                      <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2.5 shrink-0 mt-auto">
                        <button
                          onClick={handleResetStyles}
                          className="flex-1 py-2 border border-slate-250 hover:bg-slate-100 text-slate-700 text-xs font-black rounded-xl cursor-pointer select-none transition-all"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handleApplyStyles}
                          className="flex-1 py-2 bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-black rounded-xl cursor-pointer select-none shadow-md shadow-brand-blue/15 transition-all"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
