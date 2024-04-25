import Topbar from '../ui/Topbar';

interface SignInMainProps {
  setStep: () => void;
}
export default function CatInfo({ setStep }: SignInMainProps) {
  return <Topbar type="zip" title="고양이 등록(3/3)" onClick={setStep} />;
}
