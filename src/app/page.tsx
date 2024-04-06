'use client';

import { deleteAccountOnServer } from '@/services/signup';
export default function Home() {
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
