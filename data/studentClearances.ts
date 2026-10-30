export interface SampleDocumentInfo {
  name: string;
  type: string;
  size: string;
  pages?: string;
  description: string;
  downloadUrl?: string;
}

export interface ReturnedStepInfo {
  officer: string;
  date: string;
  reason: string;
  previousFileName: string;
  previousFileMeta: string;
}

export interface StepInstructionWorkflow {
  step: number;
  heading: string;
  detail: string;
}

export interface ClearanceDocumentRequirement {
  id: string;
  stepNumber?: number;
  name: string;
  shortTitle?: string;
  description: string;
  aboutText?: string;
  formatNotice?: string;
  checklist?: string[];
  workflowSteps?: StepInstructionWorkflow[];
  sampleDocument?: SampleDocumentInfo;
  returnedInfo?: ReturnedStepInfo;
  maxSizeBytes?: number;
  uploadedDocName?: string;
  uploadedDocMeta?: string;
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
    stepsCompleted: 1,
    stepsTotal: 1,
    documents: [
      {
        id: 'lib-slip',
        stepNumber: 1,
        name: 'Upload Library Clearance Slip',
        shortTitle: 'Library slip',
        description: 'Payment receipt & book return confirmation · PDF, JPG or PNG',
        aboutText: 'Evidence of zero outstanding library books and payment of the annual library development levy.',
        status: 'approved',
        uploadedDocName: 'Library_Clearance_Slip.pdf',
        uploadedDocMeta: 'PDF · 340 KB · Approved 5 Oct',
        checklist: [
          'Must be stamped by the circulation librarian desk',
          'Zero overdue books or damaged inventory fees',
          'Payment receipt attached for the current academic session',
          'Clear PDF or photo showing full registration details',
        ],
        sampleDocument: {
          name: 'Library_Clearance_Slip_Template.pdf',
          type: 'PDF',
          size: '145 KB',
          description: 'Official university library clearance endorsement slip format.',
        },
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
    status: 'action_required',
    stepsCompleted: 1,
    stepsTotal: 2,
    documents: [
      {
        id: 'dept-handover',
        stepNumber: 1,
        name: 'Upload departmental handover form',
        shortTitle: 'Handover form',
        description: 'Signed handover form by project supervisor · PDF, JPG or PNG',
        aboutText: 'This form confirms you have handed over all departmental property. Download the blank form, complete it, get it signed, then upload the signed copy.',
        status: 'returned',
        workflowSteps: [
          {
            step: 1,
            heading: 'Download the form',
            detail: 'Use the sample below. It is a blank PDF.',
          },
          {
            step: 2,
            heading: 'Fill in and sign it',
            detail: 'Complete every section. Print and sign, or sign digitally.',
          },
          {
            step: 3,
            heading: 'Upload the signed copy',
            detail: 'PDF, JPG or PNG up to 5 MB.',
          },
        ],
        sampleDocument: {
          name: 'Dept_Handover_Form_Template.pdf',
          type: 'PDF',
          size: '210 KB',
          pages: '2 pages',
          description: 'Blank form to download, fill in and sign. Do not change the layout.',
        },
        returnedInfo: {
          officer: 'Head of Department',
          date: '10 Oct',
          reason: 'Signature missing on page 2. Sign the form and upload it again.',
          previousFileName: 'Dept_Handover_Form.pdf',
          previousFileMeta: 'PDF · 810 KB · Returned 10 Oct',
        },
      },
      {
        id: 'project-approval',
        stepNumber: 2,
        name: 'Upload project approval page',
        shortTitle: 'Project approval',
        description: 'Signed final year project defense approval sheet · PDF, JPG or PNG',
        aboutText: 'Upload the final project defense endorsement page signed by your project supervisor, internal examiner, and Head of Department.',
        status: 'approved',
        uploadedDocName: 'Project_Defense_Approval_Signed.pdf',
        uploadedDocMeta: 'PDF · 520 KB · Approved 8 Oct',
        checklist: [
          'Must show project title matching departmental records',
          'Contains signatures of Supervisor and Internal Examiner',
          'Clear scanned copy without blur or cut-off margins',
        ],
        sampleDocument: {
          name: 'Project_Approval_Page_Sample.pdf',
          type: 'PDF',
          size: '95 KB',
          description: 'Sample approved final year project defense sheet.',
        },
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
        stepNumber: 1,
        name: 'Upload faculty dues receipt',
        shortTitle: 'Faculty dues receipt',
        description: 'Payment receipt · PDF, JPG or PNG · up to 5 MB',
        aboutText: 'Pay your faculty dues through the Bursary’s official channel, then upload the receipt here. The Bursary officer checks it before moving you to the next step.',
        status: 'pending',
        checklist: [
          'Be a clear photo or PDF of the full receipt',
          'Show the amount, date and receipt number',
          'Show your name or matric number',
          'Be a PDF, JPG or PNG up to 5 MB',
        ],
        sampleDocument: {
          name: 'Sample_Faculty_Dues_Receipt.pdf',
          type: 'PDF',
          size: '120 KB',
          description: 'Use this as a guide. Your receipt should look similar and show the same details.',
        },
      },
      {
        id: 'convocation-fee',
        stepNumber: 2,
        name: 'Upload convocation fee receipt',
        shortTitle: 'Convocation fee receipt',
        description: 'Payment receipt · PDF, JPG or PNG · up to 5 MB',
        aboutText: 'Pay the mandatory graduation and convocation gown fee through the student portal, then upload your official receipt.',
        status: 'pending',
        checklist: [
          'Official Remita or bank payment receipt',
          'Must clearly show RRR number and payment timestamp',
          'Student full name and matric number must match profile',
          'Be a PDF, JPG or PNG up to 5 MB',
        ],
        sampleDocument: {
          name: 'Sample_Convocation_Receipt.pdf',
          type: 'PDF',
          size: '180 KB',
          description: 'Sample convocation payment confirmation slip from Bursary.',
        },
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
        stepNumber: 1,
        name: 'Upload Course Completion Form',
        shortTitle: 'Course completion form',
        description: 'Signed course completion sheet · PDF, JPG or PNG',
        aboutText: 'Verify that all academic credit load requirements have been met and certified by your faculty advisor.',
        status: 'pending',
        checklist: [
          'Signed by Faculty Officer and Academic Adviser',
          'Zero missing grades across all academic sessions',
          'Official university stamp affixed',
        ],
        sampleDocument: {
          name: 'Course_Completion_Form_Sample.pdf',
          type: 'PDF',
          size: '110 KB',
          description: 'Blank course completion certification sheet.',
        },
      },
    ],
  },
];

/**
 * Simulation helper for fetching student clearances.
 * Automatically falls back to local data if the API endpoint is pending or not yet implemented.
 */
export async function fetchStudentClearancesSimulation(_userId: string): Promise<ClearanceItem[]> {
  return Promise.resolve(STUDENT_CLEARANCES);
}
