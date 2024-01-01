import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { debounce } from 'lodash';
import { NICKNAME } from '@/components/onboard/NICKNAME';
import { validateNicknameOnServer } from '@/services/signup';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import Topbar from '@/components/ui/Topbar';
import Image from 'next/image';

interface OnboardProfileModalProps {
  onClose: () => void;
}

const OnboardProfileModal = ({ onClose }: OnboardProfileModalProps) => {
  const [nickname, setNickname] = useState({
    value: '',
    error: false,
    msg: ''
  });

  /**
   * @description nickname 유효성 검사
   * @returns setNickname
   */
  const validateNickname = (name: string) => {
    if (name.length < 2) {
      return setNickname(prev => ({
        ...prev,
        error: true,
        msg: '닉네임은 2자 이상 입력해주세요.'
      }));
    }

    const pattern = /^[가-힣A-Za-z0-9]{2,12}$/;

    if (!pattern.test(name)) {
      return setNickname(prev => ({
        ...prev,
        error: true,
        msg: '닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.'
      }));
    }

    const bannedNickname = NICKNAME.find(item => item.includes(name));
    const res = validateNicknameOnServer(name);
    console.log('res', res);

    if (bannedNickname) {
      return setNickname(prev => ({
        ...prev,
        error: true,
        msg: '사용 불가능한 닉네임입니다.'
      }));
    }

    return setNickname(prev => ({
      ...prev,
      error: false,
      msg: ''
    }));
  };

  /**
   * @description debounce nickname input
   */
  const debounceNickname = useCallback(
    debounce(name => {
      validateNickname(name);
    }, 500),
    []
  );

  const handleNickname = (e: { target: { value: string } }) => {
    setNickname(prev => ({ ...prev, value: e.target.value }));
    debounceNickname(e.target.value);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
        <Topbar type="modal" title="프로필 설정" onClose={onClose} />
        <section className="px-6 pt-5">
          <OnboardProfileUploader />
          <div className="py-6 text-center text-body-4 text-gr-black">
            <h6>사용하실 프로필과 닉네임을 설정하세요.</h6>
            <h6>닉네임은 띄어쓰기 포함 최대 12자까지 가능합니다.</h6>
          </div>
          <Input
            helperText={nickname.msg}
            value={nickname.value}
            placeholder="닉네임을 입력해주세요."
            error={nickname.error ? true : false}
            onChange={handleNickname}
            iconEnd={
              <div
                onClick={() => setNickname(prev => ({ ...prev, value: '' }))}
              >
                <Image
                  src="/images/icons/close-btn.svg"
                  alt="close-btn"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </div>
            }
          />
        </section>
      </div>
    </>
  );
};

export default OnboardProfileModal;
