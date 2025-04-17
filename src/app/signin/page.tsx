'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePushPermission } from '@/hooks/common/usePushPermission';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePushNotificationOnServer } from '@/services/push-notification';

const SignInContent = dynamic(
  () => import('@/components/signin/SignInContent'),
  {
    ssr: false
  }
);

const SignInPage = () => {
  const queryClient = useQueryClient();

  const { pushPermissionEnabled } = usePushPermission();
  console.log('pushPermissionEnabled: ', pushPermissionEnabled);
  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getPushNoti'
        });
      }
    }
  });

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
