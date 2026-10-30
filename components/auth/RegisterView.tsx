'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  UserX,
  MailX,
} from 'lucide-react';
import OtpInput from './OtpInput';
import { getInstitutionByCode } from '@/data/institution';
import CustomSelect, { OptionGroup, SelectOption } from '@/components/shared/CustomSelect';

interface PortalRecord {
  id?: string | number;
  code?: string;
  code_name?: string;
  schema_name?: string;
  subdomain?: string;
  slug?: string;
  name?: string;
  allowed_email_domains?: string[];
  allowed_domains?: string[];
  allowedDomains?: string[];
  email_domains?: string[];
  domains?: (string | { id?: number; domain?: string; is_primary?: boolean })[];
}

interface UnitRecord {
  id?: string | number;
  pk?: string | number;
  name?: string;
  code_name?: string;
  unit_type?: string;
  depth?: number;
  parent_id?: string | number | null;
  children?: UnitRecord[];
  levels?: (string | number)[];
}

interface RegistrationDataPayload {
  units?: UnitRecord[];
  academic_units?: UnitRecord[];
  results?: UnitRecord[];
  levels?: (string | number | { name?: string; label?: string; value?: string | number })[];
}

interface RegisterViewProps {
  institutionCode: string;
  institutionName: string;
  onBack: () => void;
  onComplete: () => void;
}

type Method = 'school-email' | 'matric';
type Step = 'enter-id' | 'verify-email' | 'verify-student' | 'details' | 'password' | 'complete'
  | 'error-matric-not-found' | 'error-already-registered' | 'error-not-school-email' | 'error-email-exists';

const STEPS_EMAIL: Step[] = ['enter-id', 'details', 'password', 'verify-email', 'complete'];
const STEPS_MATRIC: Step[] = ['enter-id', 'verify-student', 'details', 'password', 'verify-email', 'complete'];

function StepIndicator({ steps, current, method }: { steps: Step[]; current: Step; method: Method }) {
  const labels = method === 'school-email'
    ? ['Email', 'Details', 'Password', 'Verify']
    : ['Matric', 'Details', 'Password', 'Verify'];
  const stepsWithoutComplete = steps.filter(s => s !== 'complete' && s !== 'verify-student');
  const normalizedCurrent = current === 'verify-student' ? 'enter-id' : current;
  const currentIdx = (stepsWithoutComplete as Step[]).indexOf(normalizedCurrent);

  return (
    <div className="flex items-center gap-2 mb-8">
      {stepsWithoutComplete.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <React.Fragment key={s}>
            {i > 0 && <div className={`flex-1 h-0.5 ${done ? 'bg-green-600' : 'bg-gray-200'}`} />}
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                done ? 'bg-green-600 text-white' : active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${active ? 'text-green-700' : 'text-gray-400'}`}>
                {labels[i]}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function RegisterView({
  institutionCode,
  institutionName,
  onBack,
  onComplete,
}: RegisterViewProps) {
  const [method, setMethod] = useState<Method>('school-email');
  const [step, setStep] = useState<Step>('enter-id');

  const [email, setEmail] = useState('');
  const [matric, setMatric] = useState('');
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');

  // Fallbacks from local institution data
  const localInst = getInstitutionByCode(institutionCode);
  const defaultAllowed = localInst?.allowedDomains || ['futo.edu.ng', 'gmail.com'];
  const [allowedDomains, setAllowedDomains] = useState<string[]>(defaultAllowed);

  const defaultGroups: OptionGroup[] = [
    {
      groupName: 'School of Electrical Systems and Engineering Technology (SESET)',
      options: [
        { value: 'fbf61b10-1ff4-4ca5-8be8-6e05d19a7699', label: 'Computer Engineering' },
      ],
    },
    {
      groupName: 'School of Engineering and Engineering Technology (SEET)',
      options: [
        { value: '31c6a084-542d-46f0-a740-1d04a9bd5474', label: 'Civil Engineering' },
      ],
    },
  ];

  const defaultUnits = defaultGroups.flatMap((g) =>
    g.options.map((opt) => ({ id: opt.value, name: opt.label }))
  );

  const defaultLevels = [
    '100 Level',
    '200 Level',
    '300 Level',
    '400 Level',
    '500 Level',
    '600 Level',
  ];

  const [availableUnits, setAvailableUnits] = useState<{ id: string; name: string }[]>(defaultUnits);
  const [departmentGroups, setDepartmentGroups] = useState<OptionGroup[]>(defaultGroups);
  const [availableLevels, setAvailableLevels] = useState<string[]>(defaultLevels);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(defaultUnits[0]?.id || '');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCountdown, setVerifyCountdown] = useState(120);

  const steps = method === 'school-email' ? STEPS_EMAIL : STEPS_MATRIC;

  useEffect(() => {
    // 1. Fetch Client Portals (Navigation) to get authorized email domains
    fetch('/api/proxy/api/v1/customers/portals/')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        const list: PortalRecord[] = Array.isArray(data)
          ? (data as PortalRecord[])
          : Array.isArray((data as { results?: PortalRecord[] }).results)
          ? ((data as { results: PortalRecord[] }).results)
          : Array.isArray((data as { portals?: PortalRecord[] }).portals)
          ? ((data as { portals: PortalRecord[] }).portals)
          : [];

        const matched = list.find((p: PortalRecord) => {
          const codeName = String(p.code_name || '').toLowerCase();
          const schemaName = String(p.schema_name || '').replace(/_schema$/, '').toLowerCase();
          const code = String(p.code || p.subdomain || p.slug || '').toLowerCase();
          const idStr = String(p.id ?? '').toLowerCase();
          const name = String(p.name || '').toLowerCase();
          const targetCode = institutionCode.toLowerCase();
          const targetName = institutionName.toLowerCase();

          return (
            codeName === targetCode ||
            schemaName === targetCode ||
            code === targetCode ||
            idStr === targetCode ||
            name === targetName ||
            name.includes(targetName) ||
            targetName.includes(name) ||
            (Array.isArray(p.domains) &&
              p.domains.some((d) => {
                const domainStr = typeof d === 'string' ? d : d?.domain || '';
                return domainStr.toLowerCase().includes(targetCode);
              }))
          );
        });

        if (matched) {
          const rawDomains =
            matched.allowed_email_domains ||
            matched.allowed_domains ||
            matched.allowedDomains ||
            matched.email_domains;

          if (Array.isArray(rawDomains) && rawDomains.length > 0) {
            const cleaned = rawDomains
              .map((d: unknown) => String(d || '').toLowerCase().trim().replace(/^@/, ''))
              .filter(Boolean);
            if (cleaned.length > 0) {
              setAllowedDomains(cleaned);
            }
          }
        }
      })
      .catch((err) => {
        console.warn('[RegisterView] Failed to fetch portal allowed domains, using defaults:', err);
      });

    // 2. Fetch Registration Units & Levels
    fetch('/api/proxy/api/v1/iam/students/registration/units/', {
      headers: {
        'x-tenant': institutionCode.toLowerCase(),
        Accept: 'application/json',
      },
    })
      .then((res) => (res.ok ? (res.json() as Promise<RegistrationDataPayload | UnitRecord[]>) : null))
      .then((data) => {
        if (!data) return;

        // Extract units
        let unitsList: UnitRecord[] = [];
        if (Array.isArray(data)) {
          unitsList = data;
        } else if (Array.isArray(data.academic_units)) {
          unitsList = data.academic_units;
        } else if (Array.isArray(data.units)) {
          unitsList = data.units;
        } else if (Array.isArray(data.results)) {
          unitsList = data.results;
        }

        if (unitsList.length > 0) {
          const parsedGroups: OptionGroup[] = [];
          const allSelectableUnits: { id: string; name: string }[] = [];

          // Case 1: Hierarchical tree (Faculties have children array containing Departments)
          const hasTreeChildren = unitsList.some(
            (u) => Array.isArray(u.children) && u.children.length > 0
          );

          if (hasTreeChildren) {
            for (const parent of unitsList) {
              if (Array.isArray(parent.children) && parent.children.length > 0) {
                const groupTitle = String(parent.name || parent.code_name || 'Faculty');
                const groupOptions: SelectOption[] = [];

                for (const child of parent.children) {
                  const childId = String(child.id || child.pk || child.code_name || child.name);
                  const childName = String(child.name || child.code_name || 'Department');
                  allSelectableUnits.push({ id: childId, name: childName });
                  groupOptions.push({ value: childId, label: childName });
                }

                if (groupOptions.length > 0) {
                  parsedGroups.push({
                    groupName: groupTitle,
                    options: groupOptions,
                  });
                }
              } else if (!parent.parent_id && (parent.depth === 2 || parent.depth === undefined)) {
                // Individual department node without subchildren
                const unitId = String(parent.id || parent.pk || parent.code_name || parent.name);
                const unitName = String(parent.name || parent.code_name || 'Department');
                allSelectableUnits.push({ id: unitId, name: unitName });

                let defGroup = parsedGroups.find((g) => g.groupName === 'Departments');
                if (!defGroup) {
                  defGroup = { groupName: 'Departments', options: [] };
                  parsedGroups.push(defGroup);
                }
                defGroup.options.push({ value: unitId, label: unitName });
              }
            }
          } else if (unitsList.some((u) => u.parent_id)) {
            // Case 2: Relational flat list linked by parent_id
            const parentMap = new Map<string, { name: string; options: SelectOption[] }>();
            unitsList.forEach((u) => {
              if (!u.parent_id) {
                const pId = String(u.id || u.pk);
                parentMap.set(pId, { name: String(u.name || u.code_name || 'Faculty'), options: [] });
              }
            });

            unitsList.forEach((u) => {
              if (u.parent_id) {
                const pId = String(u.parent_id);
                const childId = String(u.id || u.pk);
                const childName = String(u.name || u.code_name || 'Department');
                allSelectableUnits.push({ id: childId, name: childName });

                const parent = parentMap.get(pId);
                if (parent) {
                  parent.options.push({ value: childId, label: childName });
                } else {
                  let defGroup = parsedGroups.find((g) => g.groupName === 'Departments');
                  if (!defGroup) {
                    defGroup = { groupName: 'Departments', options: [] };
                    parsedGroups.push(defGroup);
                  }
                  defGroup.options.push({ value: childId, label: childName });
                }
              }
            });

            parentMap.forEach((val) => {
              if (val.options.length > 0) {
                parsedGroups.push({ groupName: val.name, options: val.options });
              }
            });
          } else {
            // Case 3: Flat list of departments
            const flatOptions: SelectOption[] = unitsList.map((u) => {
              const uId = String(u.id || u.pk || u.code_name || u.name);
              const uName = String(u.name || u.code_name || 'Department');
              allSelectableUnits.push({ id: uId, name: uName });
              return { value: uId, label: uName };
            });

            parsedGroups.push({
              groupName: 'Departments',
              options: flatOptions,
            });
          }

          if (allSelectableUnits.length > 0) {
            setAvailableUnits(allSelectableUnits);
            setDepartmentGroups(parsedGroups);

            setSelectedUnitId((prev) => {
              const exists = allSelectableUnits.some((u) => u.id === prev);
              const newId = exists ? prev : allSelectableUnits[0].id;
              const unit = allSelectableUnits.find((u) => u.id === newId);
              if (unit) setDepartment(unit.name);
              return newId;
            });
          }
        }

        // Extract levels
        let levelsList: (string | number | { name?: string; label?: string; value?: string | number })[] = [];
        if (!Array.isArray(data) && Array.isArray(data.levels)) {
          levelsList = data.levels;
        } else if (unitsList.length > 0) {
          const extracted = new Set<string>();
          unitsList.forEach((u: UnitRecord) => {
            if (Array.isArray(u.levels)) {
              u.levels.forEach((l) => extracted.add(typeof l === 'number' ? `${l} Level` : String(l)));
            }
          });
          if (extracted.size > 0) levelsList = Array.from(extracted);
        }

        if (levelsList.length > 0) {
          const formatted = levelsList.map((l) => {
            if (typeof l === 'object' && l !== null) {
              return String(l.name || l.label || l.value);
            }
            const str = String(l);
            return str.toLowerCase().includes('level') ? str : `${str} Level`;
          });
          formatted.sort((a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0));
          setAvailableLevels(formatted);
        }
      })
      .catch((err) => {
        console.warn('[RegisterView] Failed to load registration units, using defaults:', err);
      });
  }, [institutionCode, institutionName]);

  useEffect(() => {
    if (step !== 'verify-email' || verifyCountdown <= 0) return;
    const t = setInterval(() => setVerifyCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [step, verifyCountdown]);

  const handleDigitsChange = useCallback((next: string[]) => {
    setDigits(next);
  }, []);

  const _goNext = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const goPrev = () => {
    setErrorMsg('');
    if (step === 'details') {
      setStep(method === 'school-email' ? 'enter-id' : 'verify-student');
    } else if (step === 'verify-student') {
      setStep('enter-id');
    } else if (step === 'password') {
      setStep('details');
    } else if (step === 'verify-email') {
      setStep('password');
    } else {
      onBack();
    }
  };

  /**
   * Client-side email validation against portal-allowed domains.
   * Runs before contacting the server to prevent unnecessary server requests.
   */
  const validateEmailDomain = (inputEmail: string): { valid: boolean; error?: string } => {
    const trimmed = inputEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, error: 'Please enter a valid email address.' };
    }

    const domain = trimmed.split('@')[1];
    const isAllowed = allowedDomains.some((d) => {
      const norm = d.toLowerCase().trim().replace(/^@/, '');
      return domain === norm || domain.endsWith('.' + norm);
    });

    if (!isAllowed) {
      const allowedFormatted = allowedDomains.map((d) => `@${d.replace(/^@/, '')}`).join(', ');
      return {
        valid: false,
        error: `Only authorized email addresses (${allowedFormatted}) are allowed for ${institutionName}. "@${domain}" is not permitted.`,
      };
    }

    return { valid: true };
  };

  const handleEnterIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation: reject invalid email domains before contacting server
    if (method === 'school-email') {
      const check = validateEmailDomain(email);
      if (!check.valid) {
        setErrorMsg(check.error || 'Please enter an authorized school email address.');
        return;
      }
    } else {
      if (!matric.trim()) {
        setErrorMsg('Please enter your matric number.');
        return;
      }
    }

    setIsLoading(true);
    try {
      const identifier = method === 'school-email' ? email.trim() : matric.trim();
      const res = await fetch('/api/auth/register/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, method, institution: institutionCode }),
      });
      if (!res.ok) {
        const data = await res.json();
        const code = data.code || '';
        if (code === 'matric_not_found') { setStep('error-matric-not-found'); return; }
        if (code === 'already_registered') { setStep('error-already-registered'); return; }
        if (code === 'not_school_email') { setStep('error-not-school-email'); return; }
        if (code === 'email_exists') { setStep('error-email-exists'); return; }
        setErrorMsg(data.detail || 'Unable to proceed. Please check your input.');
        return;
      }
      if (method === 'school-email') {
        setStep('details');
      } else {
        setStep('verify-student');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) return;
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code, tenant: institutionCode }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.detail || 'Invalid code. Please try again.');
        return;
      }
      setStep('complete');
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim()) {
      setErrorMsg('Please enter your first name.');
      return;
    }

    if (!lastName.trim()) {
      setErrorMsg('Please enter your last name.');
      return;
    }

    // If registered via matric number, validate the provided contact email
    if (method === 'matric') {
      const check = validateEmailDomain(email);
      if (!check.valid) {
        setErrorMsg(check.error || 'Please enter an authorized school email address.');
        return;
      }
    }

    if (!selectedUnitId) {
      setErrorMsg('Please select your department.');
      return;
    }

    if (!level) {
      setErrorMsg('Please select your level.');
      return;
    }

    setStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          matric: matric.trim() || undefined,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          department: department || availableUnits.find(u => u.id === selectedUnitId)?.name || 'General',
          academic_unit_id: selectedUnitId || availableUnits[0]?.id || undefined,
          level: String(level).replace(/\D/g, '') || '100',
          password,
          institution: institutionCode,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.detail || 'Registration failed. Please try again.');
        return;
      }
      setVerifyCountdown(120);
      setStep('verify-email');
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const errorScreens: Record<string, { icon: React.ReactNode; title: string; desc: string; action: string; onAction: () => void }> = {
    'error-matric-not-found': {
      icon: <UserX className="w-7 h-7 text-red-500" />,
      title: 'Matric number not found',
      desc: 'We couldn\'t find this matric number in your institution\'s records. Double-check the number or try registering with your school email instead.',
      action: 'Try again',
      onAction: () => setStep('enter-id'),
    },
    'error-already-registered': {
      icon: <AlertCircle className="w-7 h-7 text-amber-500" />,
      title: 'Already registered',
      desc: 'An account with this credential already exists. Sign in instead, or use a different email or matric number.',
      action: 'Go to sign in',
      onAction: onBack,
    },
    'error-not-school-email': {
      icon: <MailX className="w-7 h-7 text-red-500" />,
      title: 'Not a school email',
      desc: `This doesn't look like a valid ${institutionCode} email address. Please use your official school email (e.g. you@${institutionCode.toLowerCase()}.edu.ng).`,
      action: 'Try again',
      onAction: () => setStep('enter-id'),
    },
    'error-email-exists': {
      icon: <Mail className="w-7 h-7 text-amber-500" />,
      title: 'Email already registered',
      desc: 'An account with this email already exists. Sign in instead, or use forgot password if you\'ve lost access.',
      action: 'Go to sign in',
      onAction: onBack,
    },
  };

  const errScreen = errorScreens[step];
  if (errScreen) {
    return (
      <div className="w-full max-w-156.25">
        <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            {errScreen.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{errScreen.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{errScreen.desc}</p>
          <button
            type="button"
            onClick={errScreen.onAction}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
          >
            {errScreen.action}
          </button>
          <button type="button" onClick={onBack} className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Contact support
          </button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="w-full max-w-156.25">
        <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Your account is ready
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Welcome to ClearUs, {firstName || 'Student'}. You can now start your clearance journey.
          </p>
          <p className="text-xs text-gray-400 mb-8 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            Each step has clear instructions, follow them to stay on track.
          </p>
          <button
            type="button"
            onClick={onComplete}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Go to dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-156.25">
      <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100">
        <button
          type="button"
          onClick={goPrev}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <StepIndicator steps={steps} current={step} method={method} />

        {step === 'enter-id' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Use your school email or matric number to verify you are a {institutionCode} student.
            </p>

            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setMethod('school-email')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  method === 'school-email'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                School email
              </button>
              <button
                type="button"
                onClick={() => setMethod('matric')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  method === 'matric'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                Matric number
              </button>
            </div>

            <form onSubmit={handleEnterIdSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  {method === 'school-email' ? 'School email' : 'Matric number'}
                </label>
                <div className="relative">
                  {method === 'school-email' ? (
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  ) : (
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  )}
                  <input
                    type={method === 'school-email' ? 'email' : 'text'}
                    value={method === 'school-email' ? email : matric}
                    onChange={(e) => {
                      if (method === 'school-email') {
                        setEmail(e.target.value);
                      } else {
                        setMatric(e.target.value);
                      }
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder={
                      method === 'school-email'
                        ? `you@${allowedDomains[0]?.replace(/^@/, '') || 'futo.edu.ng'}`
                        : 'e.g. 2021/104928'
                    }
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                </div>
                {method === 'school-email' && allowedDomains.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-gray-400">Authorized domains:</span>{' '}
                    <span className="font-medium text-green-700 font-mono text-[11px]">
                      {allowedDomains.map((d) => `@${d.replace(/^@/, '')}`).join(', ')}
                    </span>
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-400 flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                {method === 'school-email'
                  ? 'We will send a verification code to your school email.'
                  : 'We will verify your matric number against your institution\'s records.'}
              </p>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? 'Checking...' : (
                  <>Continue with {method === 'school-email' ? 'school email' : 'matric number'} <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <button type="button" onClick={onBack} className="text-green-700 hover:underline font-medium cursor-pointer">
                Sign in
              </button>
            </p>
          </>
        )}

        {step === 'verify-student' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Verify your identity
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              We found matric number <span className="font-medium text-gray-700">{matric}</span> in the records. Confirm this is you to continue.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Matric Number</span>
                <span className="text-gray-900 font-medium">{matric}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Institution</span>
                <span className="text-gray-900 font-medium">{institutionName}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('details')}
              className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Yes, that&apos;s me <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setStep('enter-id')}
              className="w-full mt-3 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm cursor-pointer hover:bg-gray-50"
            >
              That&apos;s not me
            </button>
          </>
        )}

        {step === 'details' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Tell us about you
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              This information will appear on your student dashboard.
            </p>

            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">First name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Chikaobi"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Last name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Emmanuel"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <CustomSelect
                  groups={departmentGroups}
                  options={availableUnits.map((u) => ({ value: u.id, label: u.name }))}
                  value={selectedUnitId}
                  onChange={(val) => {
                    setSelectedUnitId(val);
                    const unit = availableUnits.find((u) => u.id === val);
                    if (unit) setDepartment(unit.name);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Select your department"
                />
              </div>

              {method === 'matric' && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder={`you@${allowedDomains[0]?.replace(/^@/, '') || 'futo.edu.ng'}`}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Your verification OTP code will be sent to this email.
                    {allowedDomains.length > 0 && (
                      <span className="block mt-0.5 text-green-700 font-mono text-[11px]">
                        Accepted: {allowedDomains.map((d) => `@${d.replace(/^@/, '')}`).join(', ')}
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <CustomSelect
                  options={availableLevels.map((lvl) => ({ value: lvl, label: lvl }))}
                  value={level}
                  onChange={(val) => {
                    setLevel(val);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Select your level"
                  searchable={false}
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'password' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Create a password
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Set up a secure password for your ClearUs account.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-600/20 cursor-pointer accent-green-700 mt-0.5"
                  required
                />
                <span className="text-xs text-gray-500">
                  I agree to ClearUs{' '}
                  <a href="/terms" className="text-green-700 hover:underline">Terms of Use</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-green-700 hover:underline">Privacy Policy</a>
                </span>
              </label>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !agreeTerms}
                  className="flex-1 py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
                >
                  {isLoading ? 'Creating...' : 'Create account'}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'verify-email' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Verify your email
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Enter the 6-digit verification code we sent to <span className="font-medium text-gray-700">{email}</span> to activate your account.
            </p>

            <form onSubmit={handleVerifySubmit} className="space-y-5">
              <div className="flex justify-center mb-2">
                <OtpInput value={digits} onChange={handleDigitsChange} disabled={isLoading} />
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || digits.join('').length < 6}
                  className="flex-1 py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Complete'}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-400 mt-4">
              {verifyCountdown > 0 ? (
                <>Resend code in {Math.floor(verifyCountdown / 60).toString().padStart(2, '0')}:{(verifyCountdown % 60).toString().padStart(2, '0')}</>
              ) : (
                <button type="button" onClick={async () => {
                  setVerifyCountdown(120);
                  try {
                    await fetch('/api/auth/request-code', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: email.trim(), purpose: 'registration' }),
                    });
                  } catch { /* silent */ }
                }} className="text-green-700 hover:underline font-medium cursor-pointer">
                  Resend code
                </button>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
