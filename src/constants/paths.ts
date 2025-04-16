export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNIN: '/signin',

  DIARY: '/diary',
  DIARY_WRITE: '/diary/write',
  DIARY_DETAIL: (id: string | number) => `/diary/${id}`,

  ZIP: '/zip',
  ZIP_DETAIL: (id: string | number) => `/zip/${id}`,

  COMMUNITY: '/community',
  COMMUNITY_WRITE: '/community/write',
  COMMUNITY_DETAIL: (slug: string) => `/community/${slug}`,

  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile/settings',
  PROFILE_DETAIL: (id: string | number) => `/profile/${id}`,

  CAT_REGISTER: '/cat-register'
} as const;
