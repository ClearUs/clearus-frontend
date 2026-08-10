'use client';

import React, { useState, useEffect } from 'react';
import { Shield, UserPlus } from 'lucide-react';
import { Institution, User, IamStaffMember, CapabilityMeta } from '@/types';
import IamFilterBar from './IamFilterBar';
import IamStaffTable from './IamStaffTable';
import InvitationDrawer from './InvitationDrawer';
import InvitationEmailModal from './InvitationEmailModal';

interface IamControlMatrixProps {
  institution: Institution;
  user?: User;
}

const CAPABILITIES_METADATA: CapabilityMeta[] = [
  { key: 'create_template', label: 'Create Workflow', module: 'WORKFLOW', description: 'Design and deploy new clearance processes' },
  { key: 'manage_requirements', label: 'Manage Requirements', module: 'WORKFLOW', description: 'Configure student document upload criteria' },
  { key: 'manage_sessions', label: 'Manage Active Sessions', module: 'WORKFLOW', description: 'Track active student cohorts' },
  { key: 'approve_clearance', label: 'Approve Student Clearance', module: 'VAULT_CLEARANCE', description: 'Sign off on student department files' },
  { key: 'flag_fraudulent_asset', label: 'Flag Deficient Documents', module: 'VAULT_CLEARANCE', description: 'Mark suspicious or incorrect uploads' },
  { key: 'download_bulk_assets', label: 'Download Bulk Dossiers', module: 'VAULT_CLEARANCE', description: 'Export student documents in bulk' },
  { key: 'update_unit', label: 'Update Department', module: 'UNIT_CELL_ADMIN', description: 'Edit department profile or metadata' },
  { key: 'manage_roles', label: 'Manage Officer Roles', module: 'UNIT_CELL_ADMIN', description: 'Assign functional privileges to staff' }
];

const getInitialIamData = (institutionCode: string): IamStaffMember[] => {
  const code = institutionCode.toUpperCase();
  const domain = institutionCode.toLowerCase();
  return [
    { id: 'staff_musa', staffId: `STAFF/${code}/992`, name: 'Professor Ibrahim Musa', email: `i.musa@${domain}.edu.ng`, assignedCell: 'Academic Registry', permissions: ['create_template', 'manage_requirements', 'approve_clearance', 'download_bulk_assets', 'update_unit'], status: 'Active' },
    { id: 'staff_1', staffId: `STAFF/${code}/101`, name: 'Aliyu Musa', email: `aliyu.musa@${domain}.edu.ng`, assignedCell: 'Computer Science', permissions: ['create_template', 'manage_sessions', 'approve_clearance', 'flag_fraudulent_asset'], status: 'Active' },
    { id: 'staff_2', staffId: `STAFF/${code}/234`, name: 'Ngozi Okafor', email: `n.okafor@${domain}.edu.ng`, assignedCell: 'Bursary Division', permissions: ['approve_clearance'], status: 'Pending' },
    { id: 'staff_3', staffId: `STAFF/${code}/079`, name: 'Dr. Evelyn Peters', email: `evelyn.peters@${domain}.edu.ng`, assignedCell: 'Student Affairs Division', permissions: ['create_template', 'manage_requirements', 'manage_sessions', 'approve_clearance', 'update_unit', 'manage_roles'], status: 'Active' }
  ];
};

export default function IamControlMatrix({ institution, user }: IamControlMatrixProps) {
  const storageKey = `clearus_${institution.code}_iam_matrix`;
  const [staffList, setStaffList] = useState<IamStaffMember[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCell, setSelectedCell] = useState('all');
  const [selectedCapability, setSelectedCapability] = useState('all');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [newStaffId, setNewStaffId] = useState('');
  const [newCell, setNewCell] = useState(institution.departments[0] || 'Computer Science');
  const [newPermissions, setNewPermissions] = useState<string[]>([]);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['academic', 'admin']);
  const [formError, setFormError] = useState('');

  interface EmailInviteData {
    name: string;
    email: string;
    staffId: string;
    assignedCell: string;
    permissions: string[];
  }
  const [sentEmailInvite, setSentEmailInvite] = useState<EmailInviteData | null>(null);

  const adminStaff = staffList.find(s => s.email.toLowerCase() === user?.email?.toLowerCase());
  const adminPermissions = adminStaff ? adminStaff.permissions : CAPABILITIES_METADATA.map(c => c.key);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration from localStorage; must run in an effect to avoid an SSR hydration mismatch
    if (stored) { setStaffList(JSON.parse(stored)); }
    else { const initial = getInitialIamData(institution.code); setStaffList(initial); localStorage.setItem(storageKey, JSON.stringify(initial)); }
  }, [institution, storageKey]);

  const persistStaffList = (list: IamStaffMember[]) => {
    setStaffList(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  const cellOptions = Array.from(new Set([...institution.departments, 'Bursary Division', 'Student Affairs Division', 'Library Services', 'Sports & Recreation', ...staffList.map(s => s.assignedCell)])).sort();

  const handleCreateStaff = (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormError('');

    if (!firstName.trim() || !lastName.trim() || !emailPrefix.trim() || !newStaffId.trim()) {
      setFormError('All authentication parameter identities are strictly mandatory.');
      return;
    }

    const code = institution.code.toUpperCase();
    if (!newStaffId.toUpperCase().startsWith('EMP/') && !newStaffId.toUpperCase().startsWith('STAFF/')) {
      setFormError(`Employee ID must structure standard formats: STAFF/${code}/[ID]`);
      return;
    }

    const combinedName = `${firstName.trim()} ${lastName.trim()}`;
    const combinedEmail = `${emailPrefix.trim()}@${institution.code.toLowerCase()}.edu.ng`;

    const newMember: IamStaffMember = {
      id: `staff_${Date.now()}`,
      staffId: newStaffId.toUpperCase(),
      name: combinedName,
      email: combinedEmail,
      assignedCell: newCell,
      permissions: newPermissions,
      status: 'Pending'
    };

    persistStaffList([newMember, ...staffList]);
    setSentEmailInvite({ name: combinedName, email: combinedEmail, staffId: newStaffId.toUpperCase(), assignedCell: newCell, permissions: newPermissions });
    
    setFirstName(''); setLastName(''); setEmailPrefix(''); setNewStaffId(''); setNewPermissions([]); setShowCreateForm(false);
  };

  const filteredStaff = staffList.filter(s => {
    const mSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const mCell = selectedCell === 'all' || s.assignedCell === selectedCell;
    const mCap = selectedCapability === 'all' || s.permissions.includes(selectedCapability);
    return mSearch && mCell && mCap;
  });

  return (
    <div className="space-y-6 w-full relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface-inset border border-edge p-5 rounded-2xl shrink-0">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20"><Shield className="w-4 h-4 text-amber-400" /></div>
            <h3 className="font-serif italic text-lg text-heading">Identity & Access Management</h3>
          </div>
          <p className="text-[11px] text-muted mt-1">Specify fine-grained operational privileges, department bindings, and active clearance authority tokens.</p>
        </div>
        <button type="button" onClick={() => { setFormError(''); setShowCreateForm(true); }} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors shrink-0 self-start sm:self-auto"><UserPlus className="w-4 h-4 text-slate-950 stroke-[2.5]" /><span>Create Staff Member</span></button>
      </div>

      <IamFilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCell={selectedCell} setSelectedCell={setSelectedCell} selectedCapability={selectedCapability} setSelectedCapability={setSelectedCapability} cellOptions={cellOptions} capabilitiesMetadata={CAPABILITIES_METADATA} onReset={() => { setStaffList(getInitialIamData(institution.code)); setSearchTerm(''); setSelectedCell('all'); setSelectedCapability('all'); }} />
      <IamStaffTable staffList={filteredStaff} institutionCode={institution.code} capabilitiesMetadata={CAPABILITIES_METADATA} onToggleStatus={id => persistStaffList(staffList.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : s.status === 'Inactive' ? 'Pending' : 'Active' } : s))} onDeleteStaff={id => persistStaffList(staffList.filter(s => s.id !== id))} />

      <InvitationDrawer 
        isOpen={showCreateForm} onClose={() => setShowCreateForm(false)} institution={institution} formError={formError}
        firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} newStaffId={newStaffId} setNewStaffId={setNewStaffId}
        emailPrefix={emailPrefix} setEmailPrefix={setEmailPrefix} newCell={newCell} setNewCell={setNewCell} isTreeOpen={isTreeOpen} setIsTreeOpen={setIsTreeOpen}
        expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} newPermissions={newPermissions} adminPermissions={adminPermissions} capabilitiesMetadata={CAPABILITIES_METADATA}
        onPermissionToggle={p => setNewPermissions(newPermissions.includes(p) ? newPermissions.filter(k => k !== p) : [...newPermissions, p])} onSelectAllInheritable={() => setNewPermissions(adminPermissions)} onSubmit={handleCreateStaff}
      />

      <InvitationEmailModal inviteData={sentEmailInvite} onClose={() => setSentEmailInvite(null)} institution={institution} capabilitiesMetadata={CAPABILITIES_METADATA} onCompleteActivation={() => { if (sentEmailInvite) persistStaffList(staffList.map(s => s.email === sentEmailInvite.email ? { ...s, status: 'Active' } : s)); setSentEmailInvite(null); }} />
    </div>
  );
}