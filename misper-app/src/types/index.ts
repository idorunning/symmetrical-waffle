// ─── Enums ────────────────────────────────────────────────────────────────────

export enum BehaviouralCategory {
  Dementia        = 'Dementia',
  Despondent      = 'Despondent',
  SubstanceMisuse = 'Substance Misuse',
  MentalHealth    = 'Mental Health',
  Juvenile        = 'Juvenile',
  Autism          = 'Autism',
  LostBenign      = 'Lost/Benign',
}

export type UserRole = 'Commander' | 'PolSA' | 'Searcher'

export type SearcherStatus = 'Deployed' | 'Standby' | 'StoodDown'

export type SectorStatus = 'Unallocated' | 'Allocated' | 'Searching' | 'Cleared'

export type LogEntryType =
  | 'EVENT_CREATED'
  | 'SEARCHER_JOINED'
  | 'SEARCHER_STOOD_DOWN'
  | 'IPP_SET'
  | 'RV_PLACED'
  | 'RV_REMOVED'
  | 'SECTOR_DRAWN'
  | 'RADIUS_DRAWN'
  | 'SECTOR_STATUS_CHANGED'
  | 'ANALYTICS_QUERIED'
  | 'MANUAL_LOG'
  | 'OFFLINE_BUFFER_FLUSHED'

// ─── Geo Primitives ───────────────────────────────────────────────────────────

export interface LatLng {
  lat: number
  lng: number
}

// ─── MisPer Profile ───────────────────────────────────────────────────────────

export interface MisPerProfile {
  firstName: string
  lastName: string
  age: number
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'
  behaviouralCategory: BehaviouralCategory
  additionalNotes: string
}

// ─── Search Event ─────────────────────────────────────────────────────────────

export interface SearchEvent {
  id: string
  cadReference: string
  misper: MisPerProfile
  ipp: LatLng
  createdAt: string
  createdBy: string
  isActive: boolean
}

// ─── Searcher ────────────────────────────────────────────────────────────────

export interface Searcher {
  id: string
  cadReference: string
  callsign: string
  displayColour: string
  status: SearcherStatus
  joinedAt: string
  stoodDownAt?: string
  lastKnownPosition?: LatLng
  lastPositionAt?: string
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export interface Breadcrumb {
  id: string
  searcherId: string
  position: LatLng
  deviceTimestamp: string
  accuracy?: number
  speed?: number
  bearing?: number
}

// ─── Map Features ─────────────────────────────────────────────────────────────

export interface SearchSector {
  id: string
  name: string
  polygon: LatLng[]
  status: SectorStatus
  assignedCallsign?: string
  drawnAt: string
  drawnBy: string
}

export interface SearchRadius {
  id: string
  label: string
  centre: LatLng
  radiusMetres: number
  colour: string
  drawnAt: string
  drawnBy: string
}

export interface RVPoint {
  id: string
  label: string
  position: LatLng
  notes: string
  placedAt: string
  placedBy: string
}

// ─── Event Log ────────────────────────────────────────────────────────────────

export interface EventLogEntry {
  id: string
  sequenceNumber: number
  entryType: LogEntryType
  deviceTimestamp: string
  actor: string
  details: string
  prevHash: string
  hash: string
}

// ─── Predictive Analytics ─────────────────────────────────────────────────────

export interface KoesterStatRow {
  category: BehaviouralCategory
  p50RadiusKm: number
  p95RadiusKm: number
  meanDistanceKm: number
  typicalEnvironments: string[]
  mobilityNotes: string
  foundDeceased: number
  selfResolution: number
  source: string
}

export interface PredictiveSuggestion {
  profile: MisPerProfile
  statistics: KoesterStatRow
  p50RadiusMetres: number
  p95RadiusMetres: number
  confidence: 'High' | 'Medium' | 'Low'
  generatedAt: string
}

// ─── Auth / RBAC ──────────────────────────────────────────────────────────────

export interface CurrentUser {
  id: string
  callsign: string
  role: UserRole
  name: string
}
