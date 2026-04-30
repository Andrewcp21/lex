'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const VALID_CODE = 'Testing2026';

export async function verifyAccessCode(code: string) {
  if (code === VALID_CODE) {
    const cookieStore = await cookies();
    cookieStore.set('access-granted', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect('/');
  }

  return { error: 'Invalid access code' };
}
