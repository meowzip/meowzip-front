import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { signupOnServer } from '@/services/signup';
import BottomSheet from '@/components/ui/BottomSheet';

interface SignupAgreeBottomSheetProps {
  open: boolean;
  password: string;
  setIsVisible: (isVisible: boolean) => void;
}

const SignupAgreeBottomSheet = ({
  open,
  password,
  setIsVisible
}: SignupAgreeBottomSheetProps) => {
  const router = useRouter();

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const openTermsOfUseModal = () => {
    console.log('openTermsOfUse');
  };
  const openPrivacyModal = () => {
    console.log('openPrivacy');
  };

  // 개별 동의 변경시 실행
  useEffect(() => {
    setAgreeAll(agreeTerms && agreePrivacy);
  }, [agreeTerms, agreePrivacy]);

  // 전체 동의 변경시 실행
  const handleAgreeAllChange = () => {
    setAgreeAll(!agreeAll);
    setAgreeTerms(!agreeAll);
    setAgreePrivacy(!agreeAll);
  };

  const signUp = () => {
    const data = signupOnServer({ email: 'asdf', password: password });
    console.log('data', data);
    // router.push('/onboard');
  };

  return (
    <BottomSheet isVisible={open} setIsVisible={setIsVisible}>
      <div className="flex items-center space-x-2 rounded-14 bg-gr-50 p-4">
        <Checkbox
          id="agreeAll"
          kind="hasBg"
          isChecked={agreeAll}
          onClick={handleAgreeAllChange}
        />
        <label
          htmlFor="agreeAll"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          전체 동의하기
        </label>
      </div>
      <ul className="pt-[10px]">
        <li className="flex items-center justify-between">
          <div className="flex items-center space-x-2 py-2 pl-2">
            <Checkbox
              id="terms"
              kind="noBg"
              isChecked={agreeTerms}
              onClick={() => setAgreeTerms(!agreeTerms)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <h5 className="text-body-3 text-gr-black">
                <span className="text-pr-500">(필수)</span> 서비스 이용약관 동의
              </h5>
            </label>
          </div>
          <img
            src="/images/icons/right.svg"
            alt="right"
            className="h-6 w-6"
            onClick={openTermsOfUseModal}
          />
        </li>
        <li className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-2 py-2 pl-2">
            <Checkbox
              id="privacy"
              kind="noBg"
              isChecked={agreePrivacy}
              onClick={() => setAgreePrivacy(!agreePrivacy)}
            />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <h5 className="text-body-3 text-gr-black">
                <span className="text-pr-500">(필수)</span> 개인정보 수집 및
                처리방침 안내 및 동의
              </h5>
            </label>
          </div>
          <img
            src="/images/icons/right.svg"
            alt="right"
            className="h-6 w-6"
            onClick={openPrivacyModal}
          />
        </li>
      </ul>
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!agreeAll ? true : false}
        onClick={signUp}
      >
        동의하고 시작하기
      </Button>
    </BottomSheet>
  );
};

export default SignupAgreeBottomSheet;
