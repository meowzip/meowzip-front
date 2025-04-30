'use client';

import Topbar from '@/components/ui/Topbar';
import Terms from '@/components/signup/Terms';
import { TermsType } from '@/constants/general';

interface TermsModalProps {
  open: string;
  onClose: () => void;
}

const TermsModal = ({ open, onClose }: TermsModalProps) => {
  if (!open) return null;

  const title =
    open === TermsType.TERMS_OF_USE
      ? '서비스 이용약관'
      : '개인정보 수집 및 처리방침';

  return (
    <div className="fixed left-0 top-0 z-[50] mx-auto h-screen w-full max-w-[640px] overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title={title} />
        <Topbar.Empty />
      </Topbar>
      <div className="flex flex-col gap-2 px-2 py-2 pt-12">
        <Terms type={open} />
      </div>
    </div>
  );
};

export default TermsModal;
