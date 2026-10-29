export interface TimelineEvent {
  id: string;
  dateGroup: string; // e.g. 'TODAY · 20 OCT 2026'
  time: string;
  title: string;
  description: string;
  meta: string;
  category: 'approvals' | 'rejections' | 'uploads' | 'receipts' | 'system';
  badge?: {
    text: string;
    variant: 'action_required' | 'approved' | 'returned';
  };
  attachedDocName?: string;
}

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    dateGroup: 'TODAY · 20 OCT 2026',
    time: '09:12',
    title: 'Bursary receipts reminder',
    badge: { text: 'Action required', variant: 'action_required' },
    description:
      'Your faculty dues and convocation fee receipts are still missing. Upload them before 30 Nov 2026 to keep your clearance on track.',
    meta: 'Automated reminder · Bursary & Student Accounts',
    category: 'receipts',
  },
  {
    id: '2',
    dateGroup: '14 OCT 2026',
    time: '16:40',
    title: 'Department Clearance approved',
    badge: { text: 'Approved', variant: 'approved' },
    description: 'Form approved. Signature and stamp confirmed.',
    meta: 'Head of Department · Computer Science',
    category: 'approvals',
  },
  {
    id: '3',
    dateGroup: '13 OCT 2026',
    time: '11:05',
    title: 'Form re-uploaded',
    description: 'You submitted the corrected handover form for review.',
    meta: 'Submitted by you',
    attachedDocName: 'Dept_Handover_Form_V2.pdf',
    category: 'uploads',
  },
  {
    id: '4',
    dateGroup: '10 OCT 2026',
    time: '14:22',
    title: 'Resubmission requested',
    badge: { text: 'Returned', variant: 'returned' },
    description: 'Signature missing on page 2. Please sign and upload the form again.',
    meta: 'Head of Department · Computer Science',
    category: 'rejections',
  },
  {
    id: '5',
    dateGroup: '8 OCT 2026',
    time: '10:15',
    title: 'Library Clearance approved',
    badge: { text: 'Approved', variant: 'approved' },
    description: 'All library items returned. No outstanding fines.',
    meta: 'Librarian Musa · University Library Services',
    category: 'approvals',
  },
  {
    id: '6',
    dateGroup: '7 OCT 2026',
    time: '09:30',
    title: 'Library clearance slip uploaded',
    description: 'You submitted your library clearance slip for review.',
    meta: 'Submitted by you',
    attachedDocName: 'Library_Clearance_Slip.pdf',
    category: 'uploads',
  },
  {
    id: '7',
    dateGroup: '5 OCT 2026',
    time: '08:00',
    title: 'Clearance started',
    description: 'Your final-year clearance for the 2025/2026 session was opened.',
    meta: 'ClearUs · Federal University of Technology, Owerri',
    category: 'system',
  },
];

export async function fetchTimelineEventsSimulation(_userId: string): Promise<TimelineEvent[]> {
  return Promise.resolve(INITIAL_TIMELINE_EVENTS);
}
