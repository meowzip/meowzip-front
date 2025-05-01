import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

export const BOTTOM_NAV = [
  {
    key: 'diary',
    value: '일지',
    img: {
      active: '/images/icons/bottom-diary-active.svg',
      default: '/images/icons/bottom-diary-default.svg'
    }
  },
  {
    key: 'zip',
    value: '모음집',
    img: {
      active: '/images/icons/bottom-zip-active.svg',
      default: '/images/icons/bottom-zip-default.svg'
    }
  },
  {
    key: 'community',
    value: '커뮤니티',
    img: {
      active: '/images/icons/bottom-community-active.png',
      default: '/images/icons/bottom-community-default.png'
    }
  },
  {
    key: 'profile',
    value: '프로필',
    img: {
      active: DEFAULT_PROFILE_IMAGE_SRC,
      default: DEFAULT_PROFILE_IMAGE_SRC
    }
  }
];
