import React, { createContext, useContext, useEffect, useState } from 'react';
import type { StaffMember, FilterState, Reminder } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { generateSampleData } from '../utils/sampleData';

interface DataContextType {
  staff: StaffMember[];
  filteredStaff: StaffMember[];
  selectedStaff: StaffMember | null;
  reminders: Reminder[];
  generalNotes: { id: string; content: string; createdAt: string; author: string }[];
  filters: FilterState;
  searchQuery: string;
  addStaff: (staff: Omit<StaffMember, 'id' | 'lastUpdated'>) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  selectStaff: (id: string | null) => void;
  setFilters: (filters: FilterState) => void;
  setSearchQuery: (query: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  addGeneralNote: (content: string, author: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const stored = loadFromStorage<StaffMember[]>('staff');
    return stored && stored.length > 0 ? stored : generateSampleData();
  });

  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>(() =>
    loadFromStorage<Reminder[]>('reminders') || []
  );
  const [generalNotes, setGeneralNotes] = useState(() =>
    loadFromStorage<{ id: string; content: string; createdAt: string; author: string }[]>('generalNotes') || []
  );
  const [filters, setFilters] = useState<FilterState>({
    roles: [],
    teams: [],
    welfare: [],
    riskFlags: [],
    trainingStatus: [],
    status: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveToStorage('staff', staff);
  }, [staff]);

  useEffect(() => {
    saveToStorage('reminders', reminders);
  }, [reminders]);

  useEffect(() => {
    saveToStorage('generalNotes', generalNotes);
  }, [generalNotes]);

  const filteredStaff = staff.filter(member => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.collarNumber.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.team.toLowerCase().includes(query) ||
        member.skills.some(s => s.name.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // Role filter
    if (filters.roles.length > 0 && !filters.roles.includes(member.role)) {
      return false;
    }

    // Team filter
    if (filters.teams.length > 0 && !filters.teams.includes(member.team)) {
      return false;
    }

    // Welfare filter
    if (filters.welfare.length > 0 && !filters.welfare.includes(member.welfare)) {
      return false;
    }

    // Risk flag filter
    if (filters.riskFlags.length > 0 && !filters.riskFlags.includes(member.riskFlag)) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(member.status)) {
      return false;
    }

    // Training status filter
    if (filters.trainingStatus.length > 0) {
      const hasMatchingTraining = member.training.some(t =>
        filters.trainingStatus.includes(t.status)
      );
      if (!hasMatchingTraining) return false;
    }

    return true;
  });

  const addStaff = (newStaff: Omit<StaffMember, 'id' | 'lastUpdated'>) => {
    const staff: StaffMember = {
      ...newStaff,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
    };
    setStaff(prev => [...prev, staff]);
  };

  const updateStaff = (id: string, updates: Partial<StaffMember>) => {
    setStaff(prev => prev.map(member =>
      member.id === id
        ? { ...member, ...updates, lastUpdated: new Date().toISOString() }
        : member
    ));

    if (selectedStaff?.id === id) {
      setSelectedStaff(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
    if (selectedStaff?.id === id) {
      setSelectedStaff(null);
    }
  };

  const selectStaff = (id: string | null) => {
    if (id === null) {
      setSelectedStaff(null);
    } else {
      const member = staff.find(s => s.id === id);
      setSelectedStaff(member || null);
    }
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    setReminders(prev => [...prev, { ...reminder, id: crypto.randomUUID() }]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const addGeneralNote = (content: string, author: string) => {
    const note = {
      id: crypto.randomUUID(),
      content,
      author,
      createdAt: new Date().toISOString(),
    };
    setGeneralNotes(prev => [note, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      staff,
      filteredStaff,
      selectedStaff,
      reminders,
      generalNotes,
      filters,
      searchQuery,
      addStaff,
      updateStaff,
      deleteStaff,
      selectStaff,
      setFilters,
      setSearchQuery,
      addReminder,
      updateReminder,
      deleteReminder,
      addGeneralNote,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
