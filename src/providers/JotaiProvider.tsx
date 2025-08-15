'use client';

import { Provider } from 'jotai';
import { authStore } from '@/store/authAtom';

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={authStore}>{children}</Provider>;
};

export default JotaiProvider;
