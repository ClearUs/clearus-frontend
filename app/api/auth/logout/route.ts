import { cookies } from 'next/headers';

export async function POST() {
  const store = await cookies();
  store.delete('cu_access');
  store.delete('cu_refresh');
  store.delete('cu_role');
  store.delete('cu_email');
  store.delete('cu_user_id');
  store.delete('cu_tenant');

  return Response.json({ logged_out: true });
}
