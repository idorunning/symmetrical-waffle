export type StaffRole = 'Response Officer' | 'RIT Investigator' | 'Sergeant';

export type Team = 'Team A' | 'Team B' | 'Team C' | 'Team D' | 'Response' | 'Investigation' | 'Supervision';

export type TrainingStatus = 'Complete' | 'In Progress' | 'Overdue' | 'Not Started';

export type WelfareIndicator = 'Good' | 'Monitor' | 'Support Required' | 'Unknown';

export type RiskFlag = 'None' | 'Low' | 'Medium' | 'High';

export interface Skill {
  id: string;
  name: string;
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  certified: boolean;
}

export interface TrainingRecord {
  id: string;
  name: string;
  status: TrainingStatus;
  completionDate?: string;
  expiryDate?: string;
  dueDate?: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  category?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  recurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  staffId?: string;
}

export interface StaffMember {
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

export interface FilterState {
  roles: StaffRole[];
  teams: Team[];
  welfare: WelfareIndicator[];
  riskFlags: RiskFlag[];
  trainingStatus: TrainingStatus[];
  status: ('Active' | 'On Leave' | 'Unavailable')[];
}

export interface DashboardStats {
  totalStaff: number;
  byRole: Record<StaffRole, number>;
  byTeam: Record<Team, number>;
  byWelfare: Record<WelfareIndicator, number>;
  trainingCompletion: number;
  activeStaff: number;
}

export interface CollapsiblePanelState {
  [key: string]: boolean;
}
