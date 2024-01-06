'use clinet';

import { UserProvider } from '@/contexts/EmailContext';

export default function UserInfoProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
