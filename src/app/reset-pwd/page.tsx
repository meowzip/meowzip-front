'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ResetPwdContent = dynamic(
  () => import('@/components/signin/ResetPwdContent'),
  { ssr: false }
);

export default function ResetPwdPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResetPwdContent />
    </Suspense>
  );
}
