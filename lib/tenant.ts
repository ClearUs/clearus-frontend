const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN;

export function getTenantFromHost(host: string | null): string | undefined {
  if (!APP_DOMAIN || !host) return undefined;

  const bareHost = host.split(':')[0].toLowerCase();

  if (
    bareHost === APP_DOMAIN ||
    bareHost === `www.${APP_DOMAIN}` ||
    !bareHost.endsWith(`.${APP_DOMAIN}`)
  ) {
    return undefined;
  }

  return bareHost.replace(`.${APP_DOMAIN}`, '');
}
