# Figma Design System Integration Rules (`FIGMA_DESIGN_SYSTEM.md`)

This document outlines the architectural guidelines, design tokens, component organization, and styling conventions for integrating Figma designs into the **Circulayo Content Management System (CMS)** codebase using the Model Context Protocol (MCP).

---

## 1. Token Definitions

Design tokens are defined centrally in CSS variables using Tailwind v4 `@theme` directive in [`src/index.css`](file:///Users/mayankshah/Downloads/CMS/src/index.css#L4-L24).

### **Token Structure & Naming**
Tokens use semantic CSS custom properties mapped through Tailwind `@theme`:

```css
/* src/index.css */
@theme {
  /* Brand Palette */
  --color-brand-blue: #007bff;          /* Active primary CTAs & headers */
  --color-brand-green: #16a34a;         /* Live campaign status badge */
  --color-brand-green-light: #dcfce7;   /* Live badge background tint */
  --color-brand-header: #2d2d2d;        /* Dark top navbar background */
  --color-brand-dark: #0f172a;          /* Primary text color */
  --color-brand-slate: #64748b;         /* Secondary text & labels */
  --color-brand-border: #e2e8f0;        /* Container borders & dividers */
  --color-brand-bg: #f8fafc;            /* App backdrop color */

  /* Tutorial Overlay Palette */
  --color-tutorial-bg: #18303d;
  --color-tutorial-overlay: rgba(12, 25, 33, 0.72);
  --color-tutorial-teal: #00d5be;
  --color-tutorial-teal-dark: #0b4f4a;
  --color-tutorial-card: rgba(20, 184, 166, 0.12);
  --color-tutorial-border: rgba(0, 187, 167, 0.3);

  /* Typography Families */
  --font-sans: 'Source Sans Pro', 'Source Sans 3', sans-serif;
  --font-montserrat: 'Source Sans Pro', 'Source Sans 3', sans-serif;

  /* Keyframe Animations */
  --animate-spin-slow: spin 15s linear infinite;
}
```

### **Token Transformation & Mapping to Figma Variables**
When translating Figma variables (via `get_variable_defs` or `get_design_context`), map tokens as follows:

| Figma Token / Variable | Code Token | Tailwind Utility |
| :--- | :--- | :--- |
| `Primary / Brand Accent` | `--color-brand-blue` (`#007bff` / `#0066FF`) | `bg-brand-blue`, `text-brand-blue` |
| `Success / Live Badge` | `--color-brand-green` (`#16a34a`) | `bg-green-600`, `text-green-600` |
| `Warning / Draft Badge` | `#f59e0b` (Amber 500) | `bg-amber-500`, `text-amber-500` |
| `Border Neutral` | `--color-brand-border` (`#e2e8f0`) | `border-brand-border` or `border-slate-200` |
| `Dark Navbar Surface` | `--color-brand-header` (`#2d2d2d` / `#18181C`) | `bg-zinc-900` or `bg-[#18181C]` |

---

## 2. Component Library

The application follows a modular, feature-oriented component architecture located in [`src/components/`](file:///Users/mayankshah/Downloads/CMS/src/components).

### **Component Architecture & Roles**

```
src/components/
├── Header.jsx           # Global Top Navbar (Navigation, Search, User profile)
├── FilterBar.jsx        # Search, View toggles (Grid/List/Recents), Status tabs
├── GridCard.jsx         # Campaign card renderers (Grid, List, and Recents views)
├── DetailDrawer.jsx     # Side drawer for campaign metadata & quick edits
├── WorkspaceView.jsx    # Interactive Drag-and-Drop block canvas editor
├── ConnectDashboard.jsx # Analytics KPIs, scan tables, and smartphone preview
├── CampaignDisplay.jsx  # Fullscreen campaign preview mode
└── TutorialModal.jsx    # Interactive onboarding walkthrough modal
```

### **Component Conventions**
- **Functional Components with Hooks**: React 19 JSX standard functional components.
- **State Management**: Lifted state in [`App.jsx`](file:///Users/mayankshah/Downloads/CMS/src/App.jsx) for `activeTab`, `searchQuery`, `viewMode`, and `campaigns`.
- **Props Contracts**: Standard props pattern with default parameter fallbacks.

```jsx
// Example: src/components/GridCard.jsx snippet pattern
export default function GridCard({ campaign, viewMode, onOpenAnalytics, onRename, onDelete }) {
  const isDraft = campaign.status === 'Draft';
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isDraft ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
        {campaign.status}
      </span>
      {/* ... */}
    </div>
  );
}
```

---

## 3. Frameworks & Libraries

- **Core Framework**: React 19 (`react: ^19.2.6`, `react-dom: ^19.2.6`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite: ^4.3.1`, `tailwindcss: ^4.3.1`, `postcss`)
- **Animations**: Framer Motion (`framer-motion: ^12.40.0`)
- **Iconography**: Lucide React (`lucide-react: ^1.18.0`)
- **Build System / Dev Server**: Vite 8 (`vite: ^8.0.12`, `@vitejs/plugin-react: ^6.0.1`)

---

## 4. Asset Management

- **Local Static Assets**: Stored in [`src/assets/`](file:///Users/mayankshah/Downloads/CMS/src/assets) or referenced via public URLs.
- **Generated Demonstrations**: Images generated via AI image tools stored in local artifacts and served via absolute or relative asset imports.
- **Mockup Embeds**: Smartphone previews rendered using pure CSS frames and flexbox constraints within [`ConnectDashboard.jsx`](file:///Users/mayankshah/Downloads/CMS/src/components/ConnectDashboard.jsx) and [`WorkspaceView.jsx`](file:///Users/mayankshah/Downloads/CMS/src/components/WorkspaceView.jsx).

---

## 5. Icon System

The codebase uses **Lucide React** as its unified vector icon system (`lucide-react`).

### **Import Pattern**
```jsx
import { 
  Home, 
  Clock, 
  FileText, 
  LayoutTemplate, 
  Layers, 
  Search, 
  Plus, 
  MoreVertical, 
  BarChart2, 
  HelpCircle,
  Eye,
  Trash2,
  Edit2
} from 'lucide-react';
```

### **Icon Standards**
- **Size**: Default `size={16}` for inline actions/labels, `size={20}` for headers and KPI cards, `size={24}` for floating triggers.
- **Color**: Pass class names directly (e.g., `className="w-4 h-4 text-slate-500 hover:text-blue-600"`).

---

## 6. Styling Approach

### **CSS Methodology**
- **Utility-First Tailwind CSS v4**: Primary layout, flex/grid alignment, spacing, colors, and responsive modifiers.
- **Vanilla Custom CSS**: Preserved in [`src/index.css`](file:///Users/mayankshah/Downloads/CMS/src/index.css) for custom scrollbar utilities (`.scrollbar-none`) and global font declarations.

### **Responsive Breakpoints**
- `sm:` (`640px`) - Tablet portrait layout shifts.
- `md:` (`768px`) - Sidebar collapsing and grid 2-column transitions.
- `lg:` (`1024px`) - 3-column campaign card grids and split-layout analytics.
- `xl:` (`1280px`) - Workspace 3-panel layout (Palette + Phone Canvas + Inspector Panel).

### **Figma-to-Code Styling Rules**
1. **Corner Radius**: Map Figma `ROUND_FOUR` → `rounded-md` (6px), `ROUND_EIGHT` → `rounded-lg` (8px), `ROUND_TWELVE` → `rounded-xl` (12px), `ROUND_FULL` → `rounded-full` (100px status pills).
2. **Borders**: Always pair background colors with subtle borders for corporate precision (`border border-slate-200`).
3. **Shadows**: Use low-contrast shadows (`shadow-sm`, `hover:shadow-md`).

---

## 7. Project Structure

```
CMS/
├── package.json              # Project dependencies & npm scripts
├── vite.config.js            # Vite build configuration
├── FIGMA_DESIGN_SYSTEM.md    # Design system rules for Figma MCP integration
├── src/
│   ├── main.jsx              # React app mounting point
│   ├── App.jsx               # Main state controller & layout switcher
│   ├── App.css               # Component level override styles
│   ├── index.css             # Tailwind imports & theme design tokens
│   ├── assets/               # Images and static media
│   └── components/           # Feature components
│       ├── Header.jsx
│       ├── FilterBar.jsx
│       ├── GridCard.jsx
│       ├── WorkspaceView.jsx
│       ├── ConnectDashboard.jsx
│       ├── DetailDrawer.jsx
│       ├── CampaignDisplay.jsx
│       └── TutorialModal.jsx
```

---

## 🚀 MCP Integration Workflow Guidelines

When converting designs inspected via **Figma MCP** (`get_design_context`, `get_metadata`, `get_variable_defs`) into codebase changes:

1. **Verify Token Existence**: Check [`src/index.css`](file:///Users/mayankshah/Downloads/CMS/src/index.css) before declaring new color variables. Reuse `--color-brand-*` tokens where possible.
2. **Icons**: Use existing `lucide-react` icons rather than inline SVGs unless custom branding is required.
3. **Layout Alignment**: Ensure all cards use standard flexbox or grid layouts with Tailwind gap utilities (`gap-4`, `gap-6`).
4. **Verification**: Run `npm run dev` to verify that UI modifications render cleanly across Home, Analytics, Templates, and Workspace views.
