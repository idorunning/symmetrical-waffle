import React, { useState } from 'react';
import {
  X, Mail, Phone, Calendar, Shield, Activity, GraduationCap,
  Award, FileText, Plus, Trash2, Check, XCircle
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { format } from 'date-fns';
import CollapsiblePanel from './CollapsiblePanel';

const DetailPanel: React.FC = () => {
  const { selectedStaff, selectStaff, updateStaff } = useData();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteAuthor, setNewNoteAuthor] = useState('');

  if (!selectedStaff) {
    return (
      <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a staff member to view details</p>
        </div>
      </div>
    );
  }

  const getWelfareColor = (welfare: string) => {
    switch (welfare) {
      case 'Good': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
      case 'Monitor': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
      case 'Support Required': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
      case 'Medium': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900';
      case 'Low': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
      case 'In Progress': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
      case 'Overdue': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim() || !newNoteAuthor.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      content: newNoteContent,
      author: newNoteAuthor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    updateStaff(selectedStaff.id, {
      notes: [...selectedStaff.notes, newNote],
    });

    setNewNoteContent('');
    setNewNoteAuthor('');
    setIsAddingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    updateStaff(selectedStaff.id, {
      notes: selectedStaff.notes.filter(n => n.id !== noteId),
    });
  };

  return (
    <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {selectedStaff.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedStaff.role}</p>
        </div>
        <button
          onClick={() => selectStaff(null)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Contact Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Collar:</span>
              <span>{selectedStaff.collarNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="truncate">{selectedStaff.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{selectedStaff.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Joined:</span>
              <span>{format(new Date(selectedStaff.joinDate), 'dd/MM/yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Status & Welfare
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
              <span className="text-sm font-medium px-2 py-1 bg-police-blue-100 dark:bg-police-blue-900 text-police-blue-700 dark:text-police-blue-300 rounded">
                {selectedStaff.team}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                {selectedStaff.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Welfare:</span>
              <span className={`text-sm font-medium px-2 py-1 rounded ${getWelfareColor(selectedStaff.welfare)}`}>
                {selectedStaff.welfare}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Risk Flag:</span>
              <span className={`text-sm font-medium px-2 py-1 rounded ${getRiskColor(selectedStaff.riskFlag)}`}>
                {selectedStaff.riskFlag}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <CollapsiblePanel title="Skills & Certifications" icon={<Award className="w-4 h-4" />}>
          <div className="space-y-2">
            {selectedStaff.skills.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No skills recorded</p>
            ) : (
              selectedStaff.skills.map(skill => (
                <div
                  key={skill.id}
                  className="p-2 bg-gray-50 dark:bg-gray-750 rounded flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {skill.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {skill.level}
                      {skill.certified && ' • Certified'}
                    </p>
                  </div>
                  {skill.certified && (
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
              ))
            )}
          </div>
        </CollapsiblePanel>

        {/* Training */}
        <CollapsiblePanel title="Training Records" icon={<GraduationCap className="w-4 h-4" />}>
          <div className="space-y-2">
            {selectedStaff.training.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No training records</p>
            ) : (
              selectedStaff.training.map(training => (
                <div
                  key={training.id}
                  className="p-2 bg-gray-50 dark:bg-gray-750 rounded"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {training.name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded ${getTrainingStatusColor(training.status)}`}>
                      {training.status}
                    </span>
                  </div>
                  {training.completionDate && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Completed: {format(new Date(training.completionDate), 'dd/MM/yyyy')}
                    </p>
                  )}
                  {training.expiryDate && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Expires: {format(new Date(training.expiryDate), 'dd/MM/yyyy')}
                    </p>
                  )}
                  {training.dueDate && !training.completionDate && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Due: {format(new Date(training.dueDate), 'dd/MM/yyyy')}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </CollapsiblePanel>

        {/* Notes */}
        <CollapsiblePanel title="Notes" icon={<FileText className="w-4 h-4" />}>
          <div className="space-y-3">
            {selectedStaff.notes.length === 0 && !isAddingNote ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No notes</p>
            ) : (
              selectedStaff.notes.map(note => (
                <div
                  key={note.id}
                  className="p-3 bg-gray-50 dark:bg-gray-750 rounded border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(note.createdAt), 'dd/MM/yyyy HH:mm')} • {note.author}
                      </p>
                      {note.category && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-police-blue-100 dark:bg-police-blue-900 text-police-blue-700 dark:text-police-blue-300 rounded">
                          {note.category}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                      <Trash2 className="w-3 h-3 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{note.content}</p>
                </div>
              ))
            )}

            {isAddingNote ? (
              <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                <input
                  type="text"
                  placeholder="Your name"
                  value={newNoteAuthor}
                  onChange={(e) => setNewNoteAuthor(e.target.value)}
                  className="input-field text-sm"
                />
                <textarea
                  placeholder="Add a note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="input-field text-sm min-h-[80px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNote}
                    className="flex-1 px-3 py-1.5 bg-police-blue-600 text-white rounded text-sm hover:bg-police-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNoteContent('');
                      setNewNoteAuthor('');
                    }}
                    className="flex-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingNote(true)}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-400 hover:border-police-blue-400 hover:text-police-blue-600 dark:hover:text-police-blue-400 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Note
              </button>
            )}
          </div>
        </CollapsiblePanel>
      </div>
    </div>
  );
};

export default DetailPanel;
