import React, { ReactNode, useState } from 'react';
import Topbar from '../ui/Topbar';
import { CalendarModal } from './CalendarModal';
interface DiaryListLayoutProps {
  children: ReactNode;
}

const DiaryListLayout = ({ children }: DiaryListLayoutProps) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const toggleCalendar = () => setCalendarOpen(!isCalendarOpen);

  return (
    <>
      <Topbar type="home" title="title 1" onClick={toggleCalendar} />
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
      <main className="bg-gr-100">{children}</main>
    </>
  );
};

export default DiaryListLayout;
