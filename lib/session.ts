import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getInstitutionByCode } from '@/data/institution';
import type { User } from '@/types';

/**
 * Roles the app recognises. Mirrors `User['role']` so the mock session and the
 * eventual backend session agree on the same shape.
 */
export type AppRole = User['role']; // 'student' | 'staff'

const ROLE_COOKIE = 'cu_role';

/**
 * The active session's role.
 *
 * BACKEND SEAM: today this reads a mock `cu_role` cookie (defaulting to staff),
 * which lets us exercise the role guard by flipping one cookie. When real auth
 * lands, replace the cookie read with session/JWT verification — every caller
 * (`requireRole`, the dashboard layout) keeps working unchanged.
 */
export async function getSessionRole(): Promise<AppRole | null> {
  const store = await cookies();
  const value = store.get(ROLE_COOKIE)?.value;
  if (value === 'student' || value === 'staff') return value;
  // No/invalid session cookie yet — default to staff for the current prototype.
  // Return `null` here instead once real auth can distinguish "logged out".
  return 'staff';
}

/**
 * Resolve the full authenticated user for a given institution code.
 *
 * BACKEND SEAM: the identity below is simulated from the URL code + role cookie.
 * Swap the body for a real lookup keyed off the verified session; the return
 * contract (`User | null`) stays the same.
 */
export async function getCurrentUser(schoolCode: string): Promise<User | null> {
  const role = await getSessionRole();
  if (!role) return null;

  const code = schoolCode.toUpperCase();
  const institution = getInstitutionByCode(schoolCode);
  const department = institution?.departments[0] ?? 'General Studies';

  if (role === 'student') {
    return {
      id: `STUDENT/${code}/2045`,
      name: 'Ada Verified',
      email: `student@${institution?.allowedDomains.at(-1) ?? 'unilag.edu.ng'}`,
      role: 'student',
      schoolCode: code,
      matricNo: `${code}/CS/20/2045`,
      department,
    };
  }

  return {
    id: `STAFF/${code}/610`,
    name: 'Stud',
    email: `officer@${institution?.allowedDomains[0] ?? 'unilag.edu.ng'}`,
    role: 'staff',
    schoolCode: code,
    staffId: `${code}/STF/610`,
    department,
  };
}

/**
 * Server-side access guard. Resolves the session and enforces that its role
 * matches the route segment. Redirects instead of rendering on mismatch:
 *   - no session        -> the institution's auth page
 *   - wrong role         -> that user's own workspace (/staff/… or /student/…)
 *
 * Call this at the top of a role-scoped page; it returns the user only when
 * access is allowed.
 */
export async function requireRole(schoolCode: string, role: AppRole): Promise<User> {
  const user = await getCurrentUser(schoolCode);
  if (!user) redirect(`/auth/${schoolCode}`);
  if (user.role !== role) redirect(`/${user.role}/${schoolCode}`);
  return user;
}
