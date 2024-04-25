import Topbar from '../ui/Topbar';

interface SignInMainProps {
  setStep: () => void;
}
export default function CatRegisterComplete({ setStep }: SignInMainProps) {
  return <Topbar type="zip" title="등록 완료!" onClick={setStep} />;
}
