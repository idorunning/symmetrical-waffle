import { useState } from 'react'
import { X, MapPin } from 'lucide-react'
import { useMisPerStore } from '../../store'
import { BehaviouralCategory } from '../../types'
import type { MisPerProfile, LatLng } from '../../types'

const CATEGORIES = Object.values(BehaviouralCategory)
const GENDERS: MisPerProfile['gender'][] = ['Male', 'Female', 'Other', 'Unknown']

// Default IPP: central London, but user should reposition
const DEFAULT_IPP: LatLng = { lat: 51.5074, lng: -0.1278 }

interface SearchEventFormProps {
  onClose: () => void
}

export function SearchEventForm({ onClose }: SearchEventFormProps) {
  const { createEvent, setMapMode } = useMisPerStore()

  const [cadReference, setCadReference] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [age, setAge]             = useState('')
  const [gender, setGender]       = useState<MisPerProfile['gender']>('Unknown')
  const [category, setCategory]   = useState<BehaviouralCategory>(BehaviouralCategory.LostBenign)
  const [notes, setNotes]         = useState('')
  const [ipp, setIpp]             = useState<LatLng>(DEFAULT_IPP)
  const [ippSet]                  = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!cadReference.trim()) e.cad = 'CAD reference is required.'
    if (!firstName.trim())    e.firstName = 'First name is required.'
    if (!lastName.trim())     e.lastName = 'Last name is required.'
    const ageNum = parseInt(age, 10)
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) e.age = 'Valid age required (0–120).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handlePickIpp() {
    setMapMode('ipp-pick')
    onClose()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const profile: MisPerProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: parseInt(age, 10),
      gender,
      behaviouralCategory: category,
      additionalNotes: notes.trim(),
    }
    createEvent(cadReference.trim().toUpperCase(), profile, ipp)
    setIpp(DEFAULT_IPP)
    onClose()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-bold text-police-blue-800 dark:text-police-blue-200">
          Create Search Event
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
        {/* CAD Reference */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            CAD Reference *
          </label>
          <input
            className="input-field font-mono uppercase"
            placeholder="e.g. CAD-2026-04-17-001"
            value={cadReference}
            onChange={(e) => setCadReference(e.target.value)}
          />
          {errors.cad && <p className="text-red-500 text-xs mt-1">{errors.cad}</p>}
        </div>

        {/* MisPer details */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              First Name *
            </label>
            <input className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Last Name *
            </label>
            <input className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Age *
            </label>
            <input
              type="number"
              min={0}
              max={120}
              className="input-field"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Gender
            </label>
            <select
              className="input-field"
              value={gender}
              onChange={(e) => setGender(e.target.value as MisPerProfile['gender'])}
            >
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Behavioural Category
          </label>
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value as BehaviouralCategory)}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Additional Notes
          </label>
          <textarea
            className="input-field resize-none"
            rows={2}
            placeholder="Clothing description, medical conditions, last seen details…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* IPP */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Initial Planning Point (IPP)
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-gray-600 dark:text-gray-300">
              {ippSet
                ? `${ipp.lat.toFixed(6)}, ${ipp.lng.toFixed(6)}`
                : 'Default: central London — click to reposition after creating'}
            </div>
            <button
              type="button"
              onClick={handlePickIpp}
              className="btn-secondary flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              Pick on Map
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            You can drag the IPP star marker after creating the event.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Create Event</button>
        </div>
      </form>
    </div>
  )
}
