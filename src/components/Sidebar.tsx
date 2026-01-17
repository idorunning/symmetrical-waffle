import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Filter, Users, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import type { StaffRole, Team, WelfareIndicator, RiskFlag, TrainingStatus } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { filteredStaff, selectedStaff, selectStaff, searchQuery, setSearchQuery, filters, setFilters } = useData();
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const roles: StaffRole[] = ['Response Officer', 'RIT Investigator', 'Sergeant'];
  const teams: Team[] = ['Team A', 'Team B', 'Team C', 'Team D', 'Response', 'Investigation', 'Supervision'];
  const welfareIndicators: WelfareIndicator[] = ['Good', 'Monitor', 'Support Required', 'Unknown'];
  const riskFlags: RiskFlag[] = ['None', 'Low', 'Medium', 'High'];
  const trainingStatuses: TrainingStatus[] = ['Complete', 'In Progress', 'Overdue', 'Not Started'];
  const statuses = ['Active', 'On Leave', 'Unavailable'] as const;

  const toggleFilter = <K extends keyof typeof filters>(
    category: K,
    value: (typeof filters)[K][number]
  ) => {
    const current = filters[category];
    const updated = (current as unknown[]).includes(value)
      ? (current as unknown[]).filter((v) => v !== value)
      : [...current, value];

    setFilters({ ...filters, [category]: updated as typeof filters[K] });
  };

  const clearAllFilters = () => {
    setFilters({
      roles: [],
      teams: [],
      welfare: [],
      riskFlags: [],
      trainingStatus: [],
      status: [],
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0) || searchQuery.length > 0;

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 sidebar-transition">
        <button
          onClick={onToggle}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Expand sidebar"
        >
          <PanelLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="p-2 bg-police-blue-100 dark:bg-police-blue-900 rounded-lg">
            <Users className="w-5 h-5 text-police-blue-600 dark:text-police-blue-300" />
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {filteredStaff.length}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col sidebar-transition">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-police-blue-600 dark:text-police-blue-400" />
          Staff ({filteredStaff.length})
        </h2>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Collapse sidebar"
        >
          <PanelLeftClose className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-police-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="px-2 py-0.5 bg-police-blue-100 dark:bg-police-blue-900 text-police-blue-700 dark:text-police-blue-300 text-xs rounded-full">
                Active
              </span>
            )}
          </span>
          {filtersExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {filtersExpanded && (
          <div className="px-4 pb-4 space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-police-blue-600 dark:text-police-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            )}

            {/* Role Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Role</h4>
              <div className="space-y-1">
                {roles.map(role => (
                  <label key={role} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.roles.includes(role)}
                      onChange={() => toggleFilter('roles', role)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Team Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Team</h4>
              <div className="space-y-1">
                {teams.map(team => (
                  <label key={team} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.teams.includes(team)}
                      onChange={() => toggleFilter('teams', team)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{team}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Status</h4>
              <div className="space-y-1">
                {statuses.map(status => (
                  <label key={status} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => toggleFilter('status', status)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Welfare Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Welfare</h4>
              <div className="space-y-1">
                {welfareIndicators.map(welfare => (
                  <label key={welfare} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.welfare.includes(welfare)}
                      onChange={() => toggleFilter('welfare', welfare)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{welfare}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Flag Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Risk Flag</h4>
              <div className="space-y-1">
                {riskFlags.map(flag => (
                  <label key={flag} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.riskFlags.includes(flag)}
                      onChange={() => toggleFilter('riskFlags', flag)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{flag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Training Status Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Training Status</h4>
              <div className="space-y-1">
                {trainingStatuses.map(status => (
                  <label key={status} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.trainingStatus.includes(status)}
                      onChange={() => toggleFilter('trainingStatus', status)}
                      className="rounded border-gray-300 dark:border-gray-600 text-police-blue-600 focus:ring-police-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Staff List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-2">
          {filteredStaff.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No staff members match the current filters
            </div>
          ) : (
            filteredStaff.map(member => (
              <button
                key={member.id}
                onClick={() => selectStaff(member.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  selectedStaff?.id === member.id
                    ? 'bg-police-blue-100 dark:bg-police-blue-900 border border-police-blue-300 dark:border-police-blue-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-750 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                      {member.team} • {member.collarNumber}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {member.status !== 'Active' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                        {member.status}
                      </span>
                    )}
                    {member.riskFlag !== 'None' && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        member.riskFlag === 'High' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                        member.riskFlag === 'Medium' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {member.riskFlag}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
