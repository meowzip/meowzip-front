'use client';

import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SettingCard from '@/components/setting/SettingCard';
import { Switch } from '@/components/ui/Switch';
import Modal from '@/components/ui/Modal';
import { deleteAccountOnServer } from '@/services/signup';

const SettingPage = () => {
  const router = useRouter();

  const [openFirstRunModal, setOpenFirstRunModal] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const allowNotify = () => {
    console.log('알림 허용 api');
    setSwitchOn(true);
    setOpenFirstRunModal(false);
  };
  const disallowNotify = () => {
    console.log('알림 허용 안함 api');
    setSwitchOn(false);
    setOpenFirstRunModal(false);
  };

  const logOut = () => {
    console.log('로그아웃');
  };

  const onRightClick = () => {
    console.log('click right');
  };

  return (
    <>
      {openFirstRunModal ? (
        <Modal
          contents={{
            title: '‘냥.zip’에서 알림을 \n 보내고자 합니다.',
            body: '경고, 사운드 및 아이콘 배지가 알림에 \n 포함 될 수 있습니다. 설정에서 이를 구성할 \n 수 있습니다.'
          }}
          scrim={true}
          buttons={[
            {
              variant: 'primary',
              size: 'lg',
              content: '허용',
              style: 'w-full rounded-[16px] px-4 py-2 bg-pr-500',
              onClick: () => allowNotify()
            },
            {
              variant: 'text',
              size: 'lg',
              content: '허용 안함',
              style: 'w-full rounded-[16px] px-4 py-2 text-gr-300',
              onClick: () => disallowNotify()
            }
          ]}
        />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
          <Topbar type="three">
            <Topbar.Back onClick={() => router.back()} />
            <Topbar.Title title="설정" />
            <Topbar.Empty />
          </Topbar>
          <section className="flex items-center justify-between pb-4 pl-5 pr-4 pt-16">
            <div>
              <h1 className="text-btn-1 text-gr-800">푸시알림</h1>
              <h1 className="text-body-3 text-gr-400">
                알림을 꺼도 내 소식에서 확인할 수 있어요
              </h1>
            </div>
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          </section>
          <section className="h-2 bg-gr-50" />
          <section>
            <SettingCard text="이용약관" onClick={onRightClick} />
            <SettingCard text="개인정보 처리방침" onClick={onRightClick} />
          </section>
          <section className="h-2 bg-gr-50" />
          <SettingCard text="로그아웃" onClick={() => setLogOutModal(true)} />
          <SettingCard text="회원탈퇴" onClick={() => setWithdrawModal(true)} />
          <section className="pt-20 text-center text-body-3 text-gr-400">
            <p>문의사항이 있을 경우,</p>
            <p>nyangzip@gmail.com으로 보내주세요</p>
          </section>

          {logOutModal && (
            <Modal
              contents={{ title: '로그아웃 하시겠습니까?' }}
              scrim={true}
              buttons={[
                {
                  variant: 'primary',
                  size: 'lg',
                  content: '로그아웃',
                  style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700',
                  onClick: () => logOut()
                },
                {
                  variant: 'text',
                  size: 'lg',
                  content: '취소',
                  style: 'w-full rounded-[16px] px-4 py-2 text-gr-300',
                  onClick: () => setLogOutModal(false)
                }
              ]}
            />
          )}
          {withdrawModal && (
            <Modal
              contents={{
                title: '회원탈퇴 하시겠습니까?',
                body: '지금까지의 모든 정보가 삭제되며, \n 복구할 수 없습니다.'
              }}
              scrim={true}
              buttons={[
                {
                  variant: 'primary',
                  size: 'lg',
                  content: '탈퇴하기',
                  style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700',
                  onClick: () => deleteAccountOnServer()
                },
                {
                  variant: 'text',
                  size: 'lg',
                  content: '취소',
                  style: 'w-full rounded-[16px] px-4 py-2 text-gr-300',
                  onClick: () => setWithdrawModal(false)
                }
              ]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SettingPage;
