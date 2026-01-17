import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-police-blue-700 dark:bg-police-blue-900 text-white shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Staff Management System</h1>
          <p className="text-sm text-police-blue-200 dark:text-police-blue-300">
            UK Policing Operations Dashboard
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-police-blue-600 dark:hover:bg-police-blue-800 rounded-lg transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
