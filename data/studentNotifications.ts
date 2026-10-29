export interface NotificationItem {
  id: string;
  group: 'TODAY' | 'EARLIER THIS MONTH';
  time: string;
  title: string;
  body: string;
  isUnread: boolean;
  category: 'approvals' | 'receipts' | 'reminders';
  iconType: 'clock' | 'upload' | 'approved' | 'unlocked' | 'returned';
  action?: {
    label: string;
    clearanceTitle: string;
    stepTitle: string;
    docDescription?: string;
  };
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    group: 'TODAY',
    time: '09:12',
    title: 'Receipts needed: Bursary Clearance',
    body: 'Upload your faculty dues and convocation fee receipts before 30 Nov 2026 to avoid delays.',
    isUnread: true,
    category: 'receipts',
    iconType: 'clock',
    action: {
      label: 'Upload receipts',
      clearanceTitle: 'Bursary Clearance',
      stepTitle: 'Upload faculty dues receipt',
      docDescription: 'Payment receipt · PDF, JPG or PNG',
    },
  },
  {
    id: 'n2',
    group: 'TODAY',
    time: '08:30',
    title: 'Document needed: Course Completion Form',
    body: 'Student Affairs requires this form before your final sign-off.',
    isUnread: true,
    category: 'reminders',
    iconType: 'upload',
    action: {
      label: 'Upload file',
      clearanceTitle: 'Student Affairs Clearance',
      stepTitle: 'Course Completion Form',
      docDescription: 'Signed course completion sheet · PDF, JPG or PNG',
    },
  },
  {
    id: 'n3',
    group: 'EARLIER THIS MONTH',
    time: '14 Oct · 16:40',
    title: 'Department Clearance approved',
    body: 'Head of Department approved your handover form. Signature and stamp confirmed.',
    isUnread: false,
    category: 'approvals',
    iconType: 'approved',
  },
  {
    id: 'n4',
    group: 'EARLIER THIS MONTH',
    time: '14 Oct · 16:41',
    title: 'Bursary Clearance unlocked',
    body: 'Your Department Clearance is approved, so your Bursary Clearance is now open.',
    isUnread: false,
    category: 'reminders',
    iconType: 'unlocked',
  },
  {
    id: 'n5',
    group: 'EARLIER THIS MONTH',
    time: '10 Oct · 14:22',
    title: 'Resubmission requested',
    body: 'Signature missing on page 2. Please sign and upload the handover form again.',
    isUnread: false,
    category: 'reminders',
    iconType: 'returned',
  },
  {
    id: 'n6',
    group: 'EARLIER THIS MONTH',
    time: '8 Oct · 10:15',
    title: 'Library Clearance approved',
    body: 'Librarian Musa confirmed all library items are returned.',
    isUnread: false,
    category: 'approvals',
    iconType: 'approved',
  },
];

export async function fetchNotificationsSimulation(_userId: string): Promise<NotificationItem[]> {
  return Promise.resolve(INITIAL_NOTIFICATIONS);
}
