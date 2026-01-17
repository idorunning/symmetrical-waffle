# Staff Management Dashboard

A professional, desktop-first staff management dashboard designed for UK policing environments. Built for supervising officers to manage, visualise, and analyse staff information with clarity and efficiency.

## Features

### Core Functionality

- **Staff Management**: Add, view, update, and manage staff member records
- **Advanced Filtering**: Filter staff by role, team, welfare status, risk flags, and training status
- **Real-time Search**: Instant search across names, collar numbers, roles, teams, and skills
- **Visual Analytics**: Interactive charts and graphs for data-driven insights
- **Notes System**: Add and manage notes for individual staff members
- **Dark/Light Mode**: Theme toggle with persistent preference storage
- **Local Storage**: All data persists locally for single-machine use

### Dashboard Components

#### Left Sidebar (Collapsible)
- Complete staff list with key information
- Advanced search functionality
- Multi-criteria filtering system
- Smooth collapse/expand animation
- No layout jitter when toggling

#### Main Dashboard Area
- Key metrics cards (total staff, active, on leave, welfare support)
- Role breakdown statistics
- Interactive data visualizations:
  - Staff by Role (bar chart)
  - Staff by Team (bar chart)
  - Welfare Distribution (pie chart)
  - Training Completion (bar chart with completion rate)
- Alerts and notifications for welfare and risk flags
- All panels are collapsible without disrupting layout

#### Right Detail Panel
- Full staff member details
- Contact information
- Status and welfare indicators
- Skills and certifications
- Training records with status tracking
- Notes management with timestamps
- Quick actions for updates

### Design Principles

- **Clarity through Visualisation**: Data presented visually for rapid comprehension
- **Low Cognitive Load**: Clean, uncluttered interface
- **Operational Feel**: Professional dashboard aesthetic
- **No Visual Fatigue**: Calm colour palette optimised for long sessions
- **Stable Layout**: No layout jitter or unexpected refreshes
- **Touch-Friendly**: Works well with touchscreens despite being desktop-first

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 3.6
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Browser LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd symmetrical-waffle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Managing Staff

1. **Viewing Staff**: Click any staff member in the left sidebar to view full details
2. **Filtering**: Click the "Filters" button in the sidebar and select criteria
3. **Searching**: Type in the search bar to filter by name, role, team, or skills
4. **Adding Notes**: Select a staff member and click "Add Note" in the detail panel

### Understanding Indicators

#### Welfare Status
- **Good**: No welfare concerns
- **Monitor**: Under routine welfare monitoring
- **Support Required**: Active welfare support needed
- **Unknown**: Status not yet assessed

#### Risk Flags
- **None**: No identified risks
- **Low**: Minor concerns, routine monitoring
- **Medium**: Moderate concerns, enhanced monitoring
- **High**: Significant concerns, active intervention

#### Training Status
- **Complete**: Training successfully completed
- **In Progress**: Currently undertaking training
- **Overdue**: Training deadline has passed
- **Not Started**: Training not yet commenced

### Sample Data

The application comes with pre-populated sample data including:
- 24 staff members across different roles and teams
- Variety of skills and certifications
- Training records with different statuses
- Realistic UK policing roles and teams

This sample data is stored in LocalStorage and can be modified directly in the application.

## Data Persistence

All data is stored locally in your browser's LocalStorage:
- Staff records
- General notes
- Theme preference (light/dark mode)

**Note**: Data is specific to the browser and device. Clearing browser data will reset the application.

## Accessibility

- Keyboard navigation supported
- Clear focus indicators
- Semantic HTML structure
- ARIA labels where appropriate
- High contrast ratios for readability

## Browser Support

- Chrome/Edge (recommended): 90+
- Firefox: 88+
- Safari: 14+

## Project Structure

```
src/
├── components/           # React components
│   ├── charts/          # Chart components
│   ├── CollapsiblePanel.tsx
│   ├── Dashboard.tsx
│   ├── DetailPanel.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── contexts/            # React contexts
│   ├── DataContext.tsx  # Data management
│   └── ThemeContext.tsx # Theme management
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── sampleData.ts   # Sample data generator
│   └── storage.ts      # LocalStorage helpers
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Future Enhancements

Potential features for future development:
- Export data to CSV/PDF
- Multi-user support with authentication
- Server-side data persistence
- Advanced reporting capabilities
- Scheduling and roster management
- Email notifications for welfare alerts
- Mobile-responsive layout
- Print-friendly views

## Contributing

This is a demonstration project. For production use, please conduct thorough testing and security reviews.

## Licence

This project is for demonstration purposes. Consult with your organisation's IT and data protection teams before deploying in a production environment.

## Support

For issues, questions, or suggestions, please contact your system administrator or the development team.

---

**Built with attention to operational clarity and user experience for UK policing environments.**
