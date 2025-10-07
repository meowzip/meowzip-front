'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import SettingCard from './SettingCard';
import { Switch } from '@/components/ui/Switch';
import { deleteAccountOnServer } from '@/services/signup';
import { useToast } from '@/components/ui/hooks/useToast';
import { TermsType } from '@/constants/general';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPushNotification,
  togglePushNotificationOnServer
} from '@/services/push-notification';
import { getCurrentDateInYYYYMMDD } from '@/utils/common';
import TermsModal from './TermsModal';
import LogoutModal from './LogoutModal';
import WithdrawModal from './WithdrawModal';
import { useWebView } from '@/hooks/useWebView';
import { usePushAlarmPermission } from '@/hooks/common/usePushAlarmPermission';
import Topbar from '@/components/ui/Topbar';

interface SettingPageClientProps {
  initialPushPermission: {
    receivePushNotification: boolean;
  };
}

const SettingPageClient = ({
  initialPushPermission
}: SettingPageClientProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { safePostMessage } = useWebView();

  const [logOutModal, setLogOutModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [termsModal, setTermsModal] = useState<string>('');

  useEffect(() => {
    queryClient.setQueryData(['getPushNoti'], initialPushPermission);
  }, [initialPushPermission, queryClient]);

  const {
    data: pushPermission,
    isSuccess,
    isError,
    error
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

  const toggleSwitch = useCallback(() => {
    togglePushNotification.mutate();
    toast({
      description: `${getCurrentDateInYYYYMMDD()} 앱 푸시 수신 동의를 ${permission ? '동의' : '철회'} 했어요`,
      duration: 2000
    });
  }, [togglePushNotification, toast, permission]);

  useEffect(() => {
    if (
      isSuccess &&
      permission !== null &&
      pushPermission.receivePushNotification !== undefined &&
      pushPermission.receivePushNotification !== permission
    ) {
      toggleSwitch();
    }
  }, [permission, isSuccess, pushPermission, toggleSwitch]);

  const sendMessageToRN = useCallback(() => {
    if ((window as any).ReactNativeWebView) {
      safePostMessage({
        type: 'OPEN_SETTINGS',
        timestamp: new Date().toISOString()
      });
    } else {
      alert('앱 설정에서 푸시 알림을 직접 변경해주세요.');
    }
  }, [safePostMessage]);

  const logOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/signin';
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      window.location.href = '/signin';
    }
  }, []);

  if (isError) throw error;

  return (
    <>
      <div className="fixed left-1/2 top-0 z-50 h-full w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white">
        <Topbar type="three">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title="설정" />
          <Topbar.Empty />
        </Topbar>
        <div className="mx-auto max-w-[640px]">
          <section className="flex items-center justify-between pb-4 pl-5 pr-4 pt-16">
            <div>
              <h1 className="text-btn-1 text-gr-800">푸시알림</h1>
              <h1 className="text-body-3 text-gr-400">
                알림을 꺼도 내 소식에서 확인할 수 있어요
              </h1>
            </div>
            <Switch
              checked={pushPermission?.receivePushNotification}
              onCheckedChange={sendMessageToRN}
            />
          </section>
          <section className="h-2 bg-gr-50" />
          <section>
            <SettingCard
              text="이용약관"
              onClick={() => setTermsModal(TermsType.TERMS_OF_USE)}
            />
            <SettingCard
              text="개인정보 처리방침"
              onClick={() => setTermsModal(TermsType.PRIVACY_POLICY)}
            />
          </section>
          <section className="h-2 bg-gr-50" />
          <SettingCard text="로그아웃" onClick={() => setLogOutModal(true)} />
          <SettingCard text="회원탈퇴" onClick={() => setWithdrawModal(true)} />
          <section className="pt-20 text-center text-body-3 text-gr-400">
            <p>문의사항이 있을 경우,</p>
            <p>meowzzip@gmail.com으로 보내주세요</p>
          </section>
        </div>
        <TermsModal open={termsModal} onClose={() => setTermsModal('')} />
        <LogoutModal
          open={logOutModal}
          onConfirm={logOut}
          onCancel={() => setLogOutModal(false)}
        />
        <WithdrawModal
          open={withdrawModal}
          onConfirm={deleteAccountOnServer}
          onCancel={() => setWithdrawModal(false)}
        />
      </div>
    </>
  );
};

export default SettingPageClient;
