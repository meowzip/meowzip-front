import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface EmailProps {
  setStep: () => void;
}
export default function Email({ setStep }: EmailProps) {
  return (
    <section className="w-full px-6 text-[24px] font-bold text-gray-800">
      <div className="mb-[32px]">
        이메일을 입력하여 <br /> 로그인해 주세요
      </div>
      <div className="pb-4">
        <Input variant="outlined" placeholder="이메일을 입력하세요" disabled />
      </div>
      <Button onClick={setStep} className="w-full">
        계정 확인하기
      </Button>
    </section>
  );
}
