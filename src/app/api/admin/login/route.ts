import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminPassword } from '@petbackend/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== 'string' || password !== getAdminPassword()) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ success: true });
}
