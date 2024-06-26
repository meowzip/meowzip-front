import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { debounce } from 'lodash';
import { NICKNAME } from '@/components/onboard/NICKNAME';
import { useAtom } from 'jotai';
import { nicknameAtom } from '@/atoms/nicknameAtom';
import { useNickname } from '@/hooks/useNickname';
import { profileImageAtom } from '@/atoms/imageAtom';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import Topbar from '@/components/ui/Topbar';
import Image from 'next/image';
import { updateProfileOnServer } from '@/services/nickname';
import { useMutation } from '@tanstack/react-query';

interface OnboardProfileModalProps {
  onClose: () => void;
}

const OnboardProfileModal = ({ onClose }: OnboardProfileModalProps) => {
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [nicknameObj, setNicknameObj] = useState({
    value: '',
    error: false,
    msg: ''
  });
  const [debouncedNickname, setDebouncedNickname] = useState('');
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);

  useEffect(() => {
    setNicknameObj(prev => ({ ...prev, value: nickname }));
  }, []);

  /**
   * @description nickname 유효성 검사
   * @returns setNickname
   */
  const validateNickname = (name: string) => {
    if (name.length < 2) {
      return {
        value: name,
        error: true,
        msg: '닉네임은 2자 이상 입력해주세요.'
      };
    }

    const pattern = /^[가-힣A-Za-z0-9]{2,12}$/;
    if (!pattern.test(name)) {
      return {
        value: name,
        error: true,
        msg: '닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.'
      };
    }

    const bannedNickname = NICKNAME.find(item => item.includes(name));
    if (bannedNickname) {
      return {
        value: name,
        error: true,
        msg: '사용 불가능한 닉네임입니다.'
      };
    }

    return {
      value: name,
      error: false,
      msg: ''
    };
  };

  /**
   * @description debounce nickname input
   */
  const debounceNickname = useCallback(
    debounce(name => {
      const nickObj = validateNickname(name);
      nickObj && setNicknameObj(nickObj);
      setDebouncedNickname(name);
    }, 500),
    []
  );

  const handleNickname = (e: { target: { value: string } }) => {
    setNicknameObj(prev => ({ ...prev, value: e.target.value }));
    debounceNickname(e.target.value);
  };

  const { nickObj } = useNickname(
    debouncedNickname,
    debouncedNickname.length > 0
  );
  useEffect(() => {
    setNicknameObj(nickObj);
  }, [nickObj]);

  /**
   * @description profile 저장
   */
  const updateProfile = () => {
    const params = {
      nickname: nickObj.value,
      profileImage: profileImage[0].croppedImage
    };

    profileMutation.mutate(params);
  };

  const profileMutation = useMutation({
    mutationFn: (reqObj: { nickname: string; profileImage: string | null }) =>
      updateProfileOnServer(reqObj),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        console.log('ok data', data);
        setNickname(data.data.nickname);
        setProfileImage(data.data.profileImage);
        onClose();
      } else {
        console.log('error data', data);
        // router.push('/onboard');
      }
    }
  });

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
        <Topbar type="three">
          <Topbar.Back onClick={onClose} />
          <Topbar.Title title="프로필 설정" />
          <Topbar.Complete onClick={updateProfile} />
        </Topbar>
        <section className="px-6 pt-5">
          <OnboardProfileUploader data={profileImage} />
          <div className="py-6 text-center text-body-4 text-gr-black">
            <h6>사용하실 프로필과 닉네임을 설정하세요.</h6>
            <h6>닉네임은 띄어쓰기 포함 최대 12자까지 가능합니다.</h6>
          </div>
          <Input
            helperText={nicknameObj.msg}
            value={nicknameObj.value}
            placeholder="닉네임을 입력해주세요."
            error={nicknameObj.error ? true : false}
            onChange={handleNickname}
            iconEnd={
              <div
                onClick={() => setNicknameObj(prev => ({ ...prev, value: '' }))}
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
