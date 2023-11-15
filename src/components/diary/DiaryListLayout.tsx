import React, { ReactNode } from 'react';
import Topbar from '../ui/Topbar';

interface DiaryListLayoutProps {
  children: ReactNode;
}

const DiaryListLayout = ({ children }: DiaryListLayoutProps) => {
  return (
    <>
      <Topbar type="home" title="title 1" />
      <main className="bg-gr-100">{children}</main>
    </>
  );
};

export default DiaryListLayout;
