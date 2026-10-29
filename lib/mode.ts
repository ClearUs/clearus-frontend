/**
 * ClearUs Environment & Simulation Mode Configuration
 *
 * - In Production (pushed to prod / NODE_ENV === 'production'):
 *   Returns false unless NEXT_PUBLIC_DEV_MODE is explicitly 'true'.
 *   Ensures real live API calls are enforced, dev simulation fallbacks are disabled,
 *   and unauthenticated sessions are strictly redirected to login.
 *
 * - In Development (NODE_ENV === 'development'):
 *   Returns true (unless NEXT_PUBLIC_DEV_MODE is set to 'false'),
 *   enabling graceful padded simulations when backend is unseeded/offline.
 */
export function isDevMode(): boolean {
  if (process.env.NEXT_PUBLIC_DEV_MODE === 'false') return false;
  if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') return true;
  return process.env.NODE_ENV === 'development';
}
