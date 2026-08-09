import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getInstitutionByCode } from '@/data/institution';
import type { User } from '@/types';

export type AppRole = User['role'];

const ROLE_COOKIE = 'cu_role';

export async function getSessionRole(): Promise<AppRole | null> {
  const store = await cookies();
  const value = store.get(ROLE_COOKIE)?.value;
  if (value === 'student' || value === 'staff') return value;
  return null;
}

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get('cu_access')?.value ?? null;
}

export async function getCurrentUser(schoolCode: string): Promise<User | null> {
  const role = await getSessionRole();
  if (!role) return null;

  const store = await cookies();
  const username = store.get('cu_username')?.value;
  const userId = store.get('cu_user_id')?.value;

  const code = schoolCode.toUpperCase();
  const institution = getInstitutionByCode(schoolCode);
  const fallbackDomain = institution?.allowedDomains[0] ?? 'university.edu.ng';
  const fallbackDept = institution?.departments[0] ?? 'General Studies';

  if (role === 'student') {
    return {
      id: userId || `STUDENT/${code}/0000`,
      name: username ?? 'Student',
      email: username ? `${username}@${fallbackDomain}` : `student@${fallbackDomain}`,
      role: 'student',
      schoolCode: code,
      matricNo: `${code}/CS/20/0000`,
      department: fallbackDept,
    };
  }

  return {
    id: userId ? `STAFF/${code}/${userId.slice(0, 8)}` : `STAFF/${code}/0000`,
    name: username ?? 'Staff',
    email: username ? `${username}@${fallbackDomain}` : `officer@${fallbackDomain}`,
    role: 'staff',
    schoolCode: code,
    staffId: userId ? `STAFF/${code}/${userId.slice(0, 8)}` : `STAFF/${code}/0000`,
    department: fallbackDept,
  };
}

export async function requireRole(schoolCode: string, role: AppRole): Promise<User> {
  const user = await getCurrentUser(schoolCode);
  if (!user) redirect(`/auth/${schoolCode}`);
  if (user.role !== role) redirect(`/${user.role}/${schoolCode}`);
  return user;
}
