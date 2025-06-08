import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseModalAnimationProps {
  onClose?: () => void; // 추가 닫기 로직
  animationDuration?: number; // 기본 300ms
}

export const useModalAnimation = ({
  onClose,
  animationDuration = 300
}: UseModalAnimationProps = {}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    // 첫 번째 프레임에서 초기 상태를 DOM에 반영
    requestAnimationFrame(() => {
      // 두 번째 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        setShow(true);
      });
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose?.();
      router.back();
    }, animationDuration);
  };

  const animationClasses = `transition-transform duration-300 ${
    show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
  }`;

  return {
    show,
    handleClose,
    animationClasses
  };
};
