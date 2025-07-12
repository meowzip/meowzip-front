'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OnboardProfileModal from '@/components/onboard/OnboardProfileModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfile } from '@/services/profile';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';
import {
  getPushNotification,
  togglePushNotificationOnServer
} from '@/services/push-notification';
import { usePushAlarmPermission } from '@/hooks/common/usePushAlarmPermission';

const OnBoardPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    data: myProfile,
    isError: isMyProfileError,
    error: myProfileError
  } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    enabled: !showProfileModal
  });

  const {
    data: pushPermission,
    isSuccess,
    isError: isPushNotiError,
    error: pushNotiError
  } = useQuery({
    queryKey: ['getPushNoti'],
    queryFn: () => getPushNotification(),
    staleTime: 0
  });

  const { permission } = usePushAlarmPermission();
  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['getPushNoti'] });
      }
    }
  });
  useEffect(() => {
    if (
      isSuccess &&
      permission !== null &&
      pushPermission.receivePushNotification !== undefined &&
      pushPermission.receivePushNotification !== permission
    ) {
      console.log('🍋 [서버 상태]: ', pushPermission.receivePushNotification);
      console.log('🍋 [앱 상태]: ', permission);

      togglePushNotification.mutate();
    }
  }, [permission]);

  if (isMyProfileError) throw myProfileError;
  if (isPushNotiError) throw pushNotiError;

  return (
    <section className="mx-auto h-screen max-w-[640px] bg-gr-white px-4 pt-[60px]">
      <article className="flex items-center justify-center">
        <Image
          src={myProfile?.profileImageUrl || DEFAULT_PROFILE_IMAGE_SRC}
          alt="profile"
          width={120}
          height={120}
          className="h-[120px] w-[120px] rounded-[48px]"
        />
      </article>
      <article className="text-bg-black flex flex-col items-center justify-center gap-2 py-8 text-heading-1">
        <h1>
          <span className="text-pr-500">{myProfile?.nickname}</span>님,
        </h1>
        <h1>환영합니다.</h1>
      </article>
      <article className="flex flex-col gap-1">
        <Button
          onClick={() => router.push('/diary')}
          className="w-full rounded-16 bg-pr-500 px-4 py-2"
          disabled={false}
        >
          <Button.Text text="시작하기" className="text-btn-1 text-gr-white" />
        </Button>
        <Button
          onClick={() => setShowProfileModal(true)}
          className="w-full rounded-16 bg-gr-white px-4 py-2"
          disabled={false}
        >
          <Button.Text
            text="프로필 설정하기"
            className="text-btn-1 text-gr-300"
          />
        </Button>
      </article>
      {showProfileModal && (
        <OnboardProfileModal
          onClose={() => setShowProfileModal(false)}
          myProfile={myProfile}
        />
      )}
    </section>
  );
};

export default OnBoardPage;
