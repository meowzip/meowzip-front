'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { sessionExpiredModalAtom } from '@/store/authAtom';
import Modal from '@/components/ui/Modal';

const SessionExpiredModal = () => {
  const [isOpen, setIsOpen] = useAtom(sessionExpiredModalAtom);
  const router = useRouter();

  const handleConfirm = () => {
    setIsOpen(false);
    router.push('/signin');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      contents={{
        title: '세션 만료',
        body: '세션이 만료되었습니다. 다시 로그인해주세요.'
      }}
      buttons={[
        {
          content: '확인',
          btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-900',
          textStyle: 'text-gr-white text-btn-1',
          onClick: handleConfirm
        }
      ]}
      scrim={true}
    />
  );
};

export default SessionExpiredModal;
