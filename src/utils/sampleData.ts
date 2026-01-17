import type { StaffMember, StaffRole, Team, Skill, TrainingRecord } from '../types';

const firstNames = [
  'James', 'Sarah', 'David', 'Emma', 'Michael', 'Rachel', 'Thomas', 'Jessica',
  'Robert', 'Emily', 'Daniel', 'Sophie', 'William', 'Hannah', 'Christopher', 'Lucy',
  'Andrew', 'Olivia', 'Matthew', 'Charlotte', 'Richard', 'Grace', 'Jonathan', 'Amelia'
];

const lastNames = [
  'Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson',
  'Thomas', 'Roberts', 'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson',
  'White', 'Hughes', 'Edwards', 'Green', 'Hall', 'Turner', 'Carter', 'Phillips'
];

const roles: StaffRole[] = ['Response Officer', 'RIT Investigator', 'Sergeant'];
const teams: Team[] = ['Team A', 'Team B', 'Team C', 'Team D', 'Response', 'Investigation', 'Supervision'];

const skillsList = [
  'First Aid', 'Public Order', 'Taser', 'Firearms', 'PSU', 'Dog Handler',
  'Interviewing', 'Crime Scene Investigation', 'Digital Forensics', 'ANPR',
  'Stop and Search', 'Statement Taking', 'Vulnerable Witness', 'Child Protection',
  'Domestic Abuse', 'Mental Health Crisis', 'Traffic Management', 'Breathalyser',
  'Restraint Techniques', 'Negotiation'
];

const trainingCourses = [
  'Officer Safety Training', 'First Aid Refresher', 'Taser Recertification',
  'Public Order Level 2', 'Interview Techniques', 'Safeguarding Children',
  'Mental Health Awareness', 'Domestic Abuse Response', 'Digital Evidence',
  'GDPR and Data Protection', 'Statement Writing', 'Court Procedures'
];

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(startDays: number, endDays: number): string {
  const now = new Date();
  const days = randomInt(startDays, endDays);
  const date = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

function generateSkills(): Skill[] {
  const count = randomInt(3, 8);
  const skills: Skill[] = [];
  const selectedSkills = new Set<string>();

  while (skills.length < count) {
    const skillName = randomFromArray(skillsList);
    if (!selectedSkills.has(skillName)) {
      selectedSkills.add(skillName);
      skills.push({
        id: crypto.randomUUID(),
        name: skillName,
        level: randomFromArray(['Basic', 'Intermediate', 'Advanced', 'Expert'] as const),
        certified: Math.random() > 0.3,
      });
    }
  }

  return skills;
}

function generateTraining(): TrainingRecord[] {
  const count = randomInt(4, 8);
  const training: TrainingRecord[] = [];

  for (let i = 0; i < count; i++) {
    const status = randomFromArray(['Complete', 'In Progress', 'Overdue', 'Not Started'] as const);
    const course = randomFromArray(trainingCourses);

    const record: TrainingRecord = {
      id: crypto.randomUUID(),
      name: course,
      status,
    };

    if (status === 'Complete') {
      record.completionDate = randomDate(-365, -30);
      record.expiryDate = randomDate(30, 365);
    } else if (status === 'In Progress') {
      record.dueDate = randomDate(7, 90);
    } else if (status === 'Overdue') {
      record.dueDate = randomDate(-90, -1);
    } else {
      record.dueDate = randomDate(30, 180);
    }

    training.push(record);
  }

  return training;
}

export function generateSampleData(): StaffMember[] {
  const staff: StaffMember[] = [];
  const count = 24;

  for (let i = 0; i < count; i++) {
    const firstName = randomFromArray(firstNames);
    const lastName = randomFromArray(lastNames);
    const role = randomFromArray(roles);
    const team = randomFromArray(teams);

    const member: StaffMember = {
      id: crypto.randomUUID(),
      name: `${firstName} ${lastName}`,
      role,
      team,
      collarNumber: `${randomInt(1000, 9999)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@police.uk`,
      phone: `07${randomInt(100000000, 999999999)}`,
      skills: generateSkills(),
      training: generateTraining(),
      welfare: randomFromArray(['Good', 'Monitor', 'Support Required', 'Unknown'] as const),
      riskFlag: randomFromArray(['None', 'Low', 'Medium', 'High'] as const),
      notes: [],
      status: Math.random() > 0.1 ? 'Active' : randomFromArray(['On Leave', 'Unavailable'] as const),
      joinDate: randomDate(-1825, -30),
      lastUpdated: new Date().toISOString(),
    };

    // Add some sample notes
    if (Math.random() > 0.5) {
      member.notes.push({
        id: crypto.randomUUID(),
        content: 'Excellent performance during recent incident response. Showed strong leadership.',
        createdAt: randomDate(-30, -1),
        updatedAt: randomDate(-30, -1),
        author: 'Sgt. Thompson',
        category: 'Performance',
      });
    }

    if (Math.random() > 0.7) {
      member.notes.push({
        id: crypto.randomUUID(),
        content: 'Requested reduced hours for next month due to family commitments.',
        createdAt: randomDate(-14, -1),
        updatedAt: randomDate(-14, -1),
        author: 'HR',
        category: 'Personal',
      });
    }

    staff.push(member);
  }

  return staff;
}
