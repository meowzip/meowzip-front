import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { debounce } from 'lodash';
import { NICKNAME } from '@/components/onboard/NICKNAME';
import { useNickname } from '@/hooks/useNickname';
import { ImageUploadData } from '@/components/diary/ImageUploader';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import Topbar from '@/components/ui/Topbar';
import Image from 'next/image';
import { updateProfileOnServer } from '@/services/nickname';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

interface OnboardProfileModalProps {
  onClose: () => void;
  myProfile: {
    nickname: string;
    profileImageUrl: string;
  };
}

const OnboardProfileModal = ({
  onClose,
  myProfile
}: OnboardProfileModalProps) => {
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState('');
  const [debouncedNickname, setDebouncedNickname] = useState('');
  const [profileImage, setProfileImage] = useState([
    { key: 1, imageSrc: null, croppedImage: null } as ImageUploadData
  ]);
  const [errorObj, setErrorObj] = useState({ error: false, message: '' });

  useEffect(() => {
    if (myProfile) {
      setNickname(myProfile.nickname || '');

      setProfileImage(prevList =>
        prevList.map(prev => ({
          ...prev,
          croppedImage: myProfile.profileImageUrl || DEFAULT_PROFILE_IMAGE_SRC
        }))
      );
    }
  }, [myProfile]);

  const validateNickname = (name: string) => {
    if (name.length < 2) {
      return {
        value: name,
        error: true,
        message: '닉네임은 2자 이상 입력해주세요.'
      };
    }

    const pattern = /^[가-힣A-Za-z0-9]{2,12}$/;
    if (!pattern.test(name)) {
      return {
        value: name,
        error: true,
        message: '닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.'
      };
    }

    const bannedNickname = NICKNAME.find(item => item.includes(name));
    if (bannedNickname) {
      return {
        value: name,
        error: true,
        message: '사용 불가능한 닉네임입니다.'
      };
    }

    return {
      value: name,
      error: false,
      message: ''
    };
  };

  const debounceNickname = useCallback(
    debounce(name => {
      const { value, error, message } = validateNickname(name);
      if (error) {
        return setErrorObj({ error: error, message: message });
      }
      setNickname(value);
      setDebouncedNickname(name);
    }, 500),
    []
  );

  const handleNickname = (e: { target: { value: string } }) => {
    debounceNickname(e.target.value);
    setNickname(e.target.value);
  };

  const { error, message } = useNickname(
    debouncedNickname,
    debouncedNickname.length > 0
  );
  useEffect(() => {
    if (error) {
      setErrorObj({ error: error, message: message });
    }
  }, [error, message]);

  // 이미지가 서버 URL이면 업데이트 요청에서 제외하는 로직
  const isServerUrl = (url: string | null): boolean => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const updateProfile = () => {
    const params: {
      nickname?: string;
      profileImage?: string | null;
    } = {};

    if (nickname !== myProfile.nickname) {
      params.nickname = nickname;
    }

    const isDefaultImage =
      profileImage[0].croppedImage === DEFAULT_PROFILE_IMAGE_SRC;
    const isUnchangedImage =
      profileImage[0].croppedImage === myProfile.profileImageUrl;
    const isServerImage = isServerUrl(profileImage[0].croppedImage);

    // 기본 이미지가 아니고, 이전 이미지와 다른 경우이며, 서버 URL이 아닌 base64 데이터인 경우에만 업데이트
    if (
      !isDefaultImage &&
      !isUnchangedImage &&
      !isServerImage &&
      profileImage[0].croppedImage
    ) {
      if (profileImage[0].croppedImage.startsWith('data:')) {
        params.profileImage = profileImage[0].croppedImage;
      }
    }

    if (Object.keys(params).length > 0) {
      profileMutation.mutate(params);
    } else {
      onClose();
    }
  };

  const profileMutation = useMutation({
    mutationFn: (reqObj: { nickname?: string; profileImage?: string | null }) =>
      updateProfileOnServer(reqObj),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
        onClose();
      } else {
        console.error('프로필 업데이트 에러:', data);
      }
    },
    onError: (error: any) => {
      console.error('프로필 업데이트 요청 실패:', error);
    }
  });

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto h-full min-w-[320px] max-w-[640px] bg-gr-white">
        <Topbar type="three">
          <Topbar.Back onClick={onClose} />
          <Topbar.Title title="프로필 설정" />
          <Topbar.Complete onClick={updateProfile} />
        </Topbar>
        <section className="mx-auto max-w-[640px] px-6 pt-12">
          <OnboardProfileUploader
            data={profileImage}
            setProfileImage={setProfileImage}
          />
          <div className="py-6 text-center text-body-4 text-gr-black">
            <h6>사용하실 프로필과 닉네임을 설정하세요.</h6>
            <h6>닉네임은 띄어쓰기 포함 최대 12자까지 가능합니다.</h6>
          </div>
          <Input
            helperText={errorObj.message}
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            error={errorObj.error ? true : false}
            onChange={handleNickname}
            iconEnd={
              <div onClick={() => setNickname('')}>
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
