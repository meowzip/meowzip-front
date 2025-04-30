'use client';

import Modal from '@/components/ui/Modal';

interface LogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ open, onConfirm, onCancel }: LogoutModalProps) => {
  if (!open) return null;

  return (
    <Modal
      contents={{ title: '로그아웃 하시겠습니까?' }}
      scrim={true}
      buttons={[
        {
          content: '로그아웃',
          btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-500',
          textStyle: 'text-gr-white text-btn-1',
          onClick: onConfirm
        },
        {
          content: '취소',
          btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
          textStyle: 'text-gr-300 text-btn-1',
          onClick: onCancel
        }
      ]}
    />
  );
};

export default LogoutModal;
