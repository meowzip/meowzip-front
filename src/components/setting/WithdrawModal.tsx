'use client';

import Modal from '@/components/ui/Modal';

interface WithdrawModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawModal = ({ open, onConfirm, onCancel }: WithdrawModalProps) => {
  if (!open) return null;

  return (
    <Modal
      contents={{
        title: '회원탈퇴 하시겠습니까?',
        body: '지금까지의 모든 정보가 삭제되며, \n 복구할 수 없습니다.'
      }}
      scrim={true}
      buttons={[
        {
          content: '탈퇴하기',
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

export default WithdrawModal;
