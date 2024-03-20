import React, { ReactNode, useState } from 'react';
import Topbar from '../ui/Topbar';
import { CalendarModal } from './CalendarModal';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
interface DiaryListLayoutProps {
  children: ReactNode;
}

const DiaryListLayout = ({ children }: DiaryListLayoutProps) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [diaryDate, setDiaryDate] = useAtom(diaryDateAtom);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('ko-KR', options);
  };
  const formattedMonth = formatDate(selectedMonth);

  const changeSearchDiaryDate = (day: 'dayBefore' | 'nextDay') => {
    if (day === 'dayBefore') {
      setDiaryDate(new Date(diaryDate.setDate(diaryDate.getDate() - 1)));
    }
    if (day === 'nextDay') {
      setDiaryDate(new Date(diaryDate.setDate(diaryDate.getDate() + 1)));
    }
  };
  return (
    <>
      {isCalendarOpen ? (
        <Topbar
          type="modal"
          title={formattedMonth}
          onClick={toggleBottomSheet}
          onClose={() => setCalendarOpen(false)}
          hideRight
        />
      ) : (
        <Topbar
          type="home"
          title="title 1"
          onClick={toggleCalendar}
          onLeftClick={() => changeSearchDiaryDate('dayBefore')}
          onRightClick={() => changeSearchDiaryDate('nextDay')}
        />
      )}
      <CalendarModal
        isOpen={isCalendarOpen}
        setCalendarOpen={setCalendarOpen}
        setBottomSheetVisible={setBottomSheetVisible}
        bottomSheetVisible={bottomSheetVisible}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <main className="bg-gr-50">{children}</main>
    </>
  );
};

export default DiaryListLayout;
