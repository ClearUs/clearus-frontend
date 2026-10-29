export interface ClearanceDocumentRequirement {
  id: string;
  name: string;
  description: string;
  formatNotice?: string;
  maxSizeBytes?: number;
  uploadedDocName?: string;
  status: 'pending' | 'in_review' | 'approved' | 'returned';
}

export interface ClearanceItem {
  id: string;
  number: number;
  title: string;
  department: string;
  officer: string;
  status: 'approved' | 'action_required' | 'locked';
  stepsCompleted: number;
  stepsTotal: number;
  unlockMessage?: string;
  office?: string;
  reviewTime?: string;
  closesDate?: string;
  notice?: string;
  documents?: ClearanceDocumentRequirement[];
}

export const STUDENT_CLEARANCES: ClearanceItem[] = [
  {
    id: 'library',
    number: 1,
    title: 'Library Clearance',
    department: 'University Library Services',
    officer: 'Librarian Musa',
    office: 'University Library Services',
    reviewTime: '1-2 days',
    closesDate: '30 Nov 2026',
    status: 'approved',
    stepsCompleted: 2,
    stepsTotal: 2,
    documents: [
      {
        id: 'lib-slip',
        name: 'Upload Library Clearance Slip',
        description: 'Payment receipt & book return confirmation · PDF, JPG or PNG',
        status: 'approved',
        uploadedDocName: 'Library_Clearance_Slip.pdf',
      },
    ],
  },
  {
    id: 'department',
    number: 2,
    title: 'Department Clearance',
    department: 'Computer Science',
    officer: 'Head of Department',
    office: 'Department of Computer Science',
    reviewTime: '2-3 days',
    closesDate: '30 Nov 2026',
    status: 'approved',
    stepsCompleted: 2,
    stepsTotal: 2,
    documents: [
      {
        id: 'dept-handover',
        name: 'Upload Departmental Handover Form',
        description: 'Signed handover form by project supervisor · PDF, JPG or PNG',
        status: 'approved',
        uploadedDocName: 'Dept_Handover_Form_V2.pdf',
      },
    ],
  },
  {
    id: 'bursary',
    number: 3,
    title: 'Bursary Clearance',
    department: 'Bursary & Student Accounts',
    officer: 'Senior Bursar',
    office: 'Bursary & Student Accounts',
    reviewTime: 'Same day',
    closesDate: '30 Nov 2026',
    notice: 'Payments happen outside ClearUs. Pay through the Bursary\'s official channel, then upload each receipt below.',
    status: 'action_required',
    stepsCompleted: 0,
    stepsTotal: 2,
    documents: [
      {
        id: 'faculty-dues',
        name: 'Upload faculty dues receipt',
        description: 'Payment receipt · PDF, JPG or PNG · up to 5 MB',
        status: 'pending',
      },
      {
        id: 'convocation-fee',
        name: 'Upload convocation fee receipt',
        description: 'Payment receipt · PDF, JPG or PNG · up to 5 MB',
        status: 'pending',
      },
    ],
  },
  {
    id: 'student-affairs',
    number: 4,
    title: 'Student Affairs Clearance',
    department: 'Student Affairs Division',
    officer: 'Dean of Student Affairs',
    office: 'Student Affairs Division',
    reviewTime: '1-2 days',
    closesDate: '30 Nov 2026',
    status: 'locked',
    stepsCompleted: 0,
    stepsTotal: 2,
    unlockMessage: 'Unlocks after Bursary',
    documents: [
      {
        id: 'course-completion',
        name: 'Upload Course Completion Form',
        description: 'Signed course completion sheet · PDF, JPG or PNG',
        status: 'pending',
      },
    ],
  },
];

/**
 * Simulation helper for fetching student clearances.
 * Automatically falls back to local data if the API endpoint is pending or not yet implemented.
 */
export async function fetchStudentClearancesSimulation(_userId: string): Promise<ClearanceItem[]> {
  // In a real environment, this calls fetch('/api/proxy/v1/clearances')
  return Promise.resolve(STUDENT_CLEARANCES);
}
