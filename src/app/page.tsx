'use client';

import { deleteAccountOnServer } from '@/services/signup';
import { getCookie } from '@/utils/common';
import returnFetchJson from '@/utils/returnFetchJson';
export default function Home() {
  const fetchExtended = returnFetchJson({
    baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
    headers: { Accept: 'application/json' }
  });

  const refreshAccessToken = async () => {
    const accessToken = getCookie('Authorization');
    // const refreshToken = cookies().get('Authorization-Refresh')?.value;
    const reqOptions = {
      headers: {
        credentials: 'include' as RequestCredentials,
        Authorization: `Bearer ${accessToken}`
      }
    };
    const response = await fetchExtended('/tokens/refresh', {
      method: 'POST',
      ...reqOptions
    });

    console.log('response:', response);
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const token = response.headers.get('Authorization');

    if (token) {
      document.cookie = `Authorization=${token}; path=/; max-age=3600; secure;`;
    } else {
      throw new Error('Authorization token not found in the response');
    }
  };

  refreshAccessToken();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h5>Meow</h5>
      <button
        onClick={deleteAccountOnServer}
        className="rounded border border-gr-100 p-2"
      >
        회원 탈퇴
      </button>
    </main>
  );
}
