export interface VaultDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  sizeBytes: number;
  uploadedDate: string;
  clearanceCategory: string;
  status: 'approved' | 'in_review';
  verifiedBy?: string;
  verifiedAt?: string;
  checksum?: string;
}

export const INITIAL_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: '1',
    name: 'Library_Clearance_Slip.pdf',
    type: 'PDF',
    size: '1.2 MB',
    sizeBytes: 1258291,
    uploadedDate: '7 Oct 2026',
    clearanceCategory: 'Library Clearance',
    status: 'approved',
    verifiedBy: 'Librarian Musa',
    verifiedAt: '8 Oct 2026, 10:15 AM',
    checksum: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
  },
  {
    id: '2',
    name: 'Dept_Handover_Form_V2.pdf',
    type: 'PDF',
    size: '866 KB',
    sizeBytes: 886784,
    uploadedDate: '13 Oct 2026',
    clearanceCategory: 'Department Clearance',
    status: 'approved',
    verifiedBy: 'Head of Department',
    verifiedAt: '14 Oct 2026, 04:40 PM',
    checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    id: '3',
    name: 'Passport_Photograph.jpg',
    type: 'JPG',
    size: '340 KB',
    sizeBytes: 348160,
    uploadedDate: '19 Oct 2026',
    clearanceCategory: 'Student record',
    status: 'in_review',
    checksum: 'sha256:ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
  },
];

export async function fetchVaultDocumentsSimulation(_userId: string): Promise<VaultDocument[]> {
  return Promise.resolve(INITIAL_VAULT_DOCUMENTS);
}
