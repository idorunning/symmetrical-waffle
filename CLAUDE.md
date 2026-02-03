# CLAUDE.md - AI Assistant Guidelines

This document provides context and guidelines for AI assistants working with this codebase.

## Project Overview

**Staff Management Dashboard** - A professional, desktop-first staff management dashboard designed for UK policing environments. Built for supervising officers to manage, visualise, and analyse staff information.

### Key Features
- Staff CRUD operations with detailed profiles
- Advanced filtering and real-time search
- Interactive charts and analytics (Recharts)
- Welfare and risk flag tracking
- Training records management
- Notes system for staff members
- Dark/light theme support
- LocalStorage-based persistence

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.2.4 | Build tool & dev server |
| Tailwind CSS | 3.4.17 | Styling |
| Recharts | 3.6.0 | Data visualization |
| Lucide React | 0.562.0 | Icons |
| date-fns | 4.1.0 | Date utilities |
| ESLint | 9.39.1 | Code linting |

## Project Structure

```
symmetrical-waffle/
├── src/
│   ├── components/           # React components
│   │   ├── charts/          # Chart components (Recharts)
│   │   │   ├── StaffByRoleChart.tsx
│   │   │   ├── StaffByTeamChart.tsx
│   │   │   ├── TrainingCompletionChart.tsx
│   │   │   └── WelfareDistributionChart.tsx
│   │   ├── CollapsiblePanel.tsx  # Reusable collapsible container
│   │   ├── Dashboard.tsx         # Main dashboard with stats/charts
│   │   ├── DetailPanel.tsx       # Staff detail view (right panel)
│   │   ├── Header.tsx            # App header with theme toggle
│   │   └── Sidebar.tsx           # Staff list with search/filters
│   ├── contexts/             # React Context providers
│   │   ├── DataContext.tsx   # Staff data, filters, CRUD operations
│   │   └── ThemeContext.tsx  # Dark/light theme management
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── utils/
│   │   ├── sampleData.ts     # Sample data generator
│   │   └── storage.ts        # LocalStorage helpers
│   ├── App.tsx               # Root component with providers
│   ├── App.css               # Component-specific styles
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles & Tailwind directives
├── public/                   # Static assets
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config (references)
├── tsconfig.app.json         # App TypeScript config
├── tsconfig.node.json        # Node TypeScript config
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
└── eslint.config.js          # ESLint flat config
```

## Architecture & Design Patterns

### Component Architecture
- **Layout**: Three-column layout (Sidebar | Dashboard | DetailPanel)
- **State Management**: React Context API (no Redux)
- **Data Flow**: Unidirectional via context providers

### Context Providers (wrap order in App.tsx)
1. `ThemeProvider` - Theme state and toggle
2. `DataProvider` - Staff data, filtering, CRUD operations

### Key Patterns
- **Functional Components**: All components use function syntax with hooks
- **Custom Hooks**: `useData()` and `useTheme()` for context access
- **Collapsible Panels**: Reusable `CollapsiblePanel` component for consistent UI
- **Type-safe Props**: All components have typed props interfaces

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Code Conventions

### TypeScript
- Strict mode enabled
- Use `type` imports: `import type { StaffMember } from '../types'`
- Define interfaces in `src/types/index.ts`
- Use union types for enumerated values (e.g., `StaffRole`, `WelfareIndicator`)

### React Components
- Use `React.FC<Props>` for component typing
- Destructure props in function parameters
- Co-locate component-specific types with the component
- Use meaningful component names matching file names

### Styling
- **Primary**: Tailwind CSS utility classes
- **Custom Colors**: `police-blue-*` (50-900) defined in tailwind.config.js
- **Dark Mode**: Use `dark:` variant classes (e.g., `bg-gray-50 dark:bg-gray-900`)
- **Custom Shadows**: `shadow-soft`, `shadow-soft-lg`

### File Naming
- Components: PascalCase (e.g., `DetailPanel.tsx`)
- Utilities: camelCase (e.g., `sampleData.ts`)
- Types: PascalCase for types/interfaces

## Key Types (src/types/index.ts)

```typescript
// Staff roles
type StaffRole = 'Response Officer' | 'RIT Investigator' | 'Sergeant';

// Teams
type Team = 'Team A' | 'Team B' | 'Team C' | 'Team D' | 'Response' | 'Investigation' | 'Supervision';

// Status indicators
type WelfareIndicator = 'Good' | 'Monitor' | 'Support Required' | 'Unknown';
type RiskFlag = 'None' | 'Low' | 'Medium' | 'High';
type TrainingStatus = 'Complete' | 'In Progress' | 'Overdue' | 'Not Started';

// Main entity
interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  team: Team;
  collarNumber: string;
  email: string;
  phone: string;
  skills: Skill[];
  training: TrainingRecord[];
  welfare: WelfareIndicator;
  riskFlag: RiskFlag;
  notes: Note[];
  status: 'Active' | 'On Leave' | 'Unavailable';
  joinDate: string;
  lastUpdated: string;
}
```

## Data Context API (useData hook)

```typescript
// Available from useData()
{
  staff: StaffMember[];              // All staff
  filteredStaff: StaffMember[];      // After search/filters applied
  selectedStaff: StaffMember | null; // Currently selected
  filters: FilterState;              // Active filters
  searchQuery: string;               // Current search term

  // CRUD operations
  addStaff: (staff: Omit<StaffMember, 'id' | 'lastUpdated'>) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  selectStaff: (id: string | null) => void;

  // Filter/search
  setFilters: (filters: FilterState) => void;
  setSearchQuery: (query: string) => void;

  // Notes & reminders
  addGeneralNote: (content: string, author: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
}
```

## LocalStorage Keys

| Key | Data Type | Purpose |
|-----|-----------|---------|
| `staff` | `StaffMember[]` | All staff records |
| `reminders` | `Reminder[]` | Scheduled reminders |
| `generalNotes` | `Note[]` | General notes |
| `theme` | `'light' \| 'dark'` | User theme preference |

## Common Tasks

### Adding a New Component
1. Create file in `src/components/` (or `src/components/charts/` for charts)
2. Import types from `src/types/index.ts`
3. Use `useData()` or `useTheme()` hooks as needed
4. Apply Tailwind classes with dark mode variants

### Adding a New Type
1. Add to `src/types/index.ts`
2. Export from the file
3. Import with `import type { TypeName } from '../types'`

### Adding a New Chart
1. Create in `src/components/charts/`
2. Use Recharts components (`BarChart`, `PieChart`, etc.)
3. Get data from `useData().filteredStaff`
4. Wrap with `CollapsiblePanel` in Dashboard.tsx

### Modifying Filters
1. Update `FilterState` interface in `src/types/index.ts`
2. Add filter logic in `DataContext.tsx` (filteredStaff computation)
3. Add UI controls in `Sidebar.tsx`

## Testing Guidelines

Currently no test framework is configured. When adding tests:
- Consider Vitest (Vite-native) for unit tests
- Consider React Testing Library for component tests
- Consider Playwright or Cypress for E2E tests

## Performance Considerations

- **Filtering**: Done client-side in `DataContext.tsx`
- **Charts**: Re-render on filteredStaff changes
- **LocalStorage**: Auto-saves on state changes via useEffect

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Important Notes

1. **No Backend**: This is a client-only application using LocalStorage
2. **Sample Data**: Auto-generated on first load if no data exists
3. **UK Policing Context**: Terminology uses UK police terms (collar numbers, etc.)
4. **Desktop-First**: Optimised for desktop; mobile support is limited
5. **Build Order**: TypeScript compilation runs before Vite build (`tsc -b && vite build`)
