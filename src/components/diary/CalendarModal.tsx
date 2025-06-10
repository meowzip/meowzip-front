import { Calendar } from '../ui/Calendar';
import BottomSheet from '@/components/ui/BottomSheet';
import Topbar from '../ui/Topbar';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/hooks/useToast';
import { getDiariesByMonth } from '@/services/diary';
import { useQuery } from '@tanstack/react-query';
import { diaryDateAtom } from '@/store/diaryAtom';
import { useAtom } from 'jotai';
import { IoIosArrowDown } from 'react-icons/io';

interface CalendarModalProps {
  isOpen: boolean;
  setCalendarOpen: (calendarOpen: boolean) => void;
  setBottomSheetVisible: (bottomSheetVisible: boolean) => void;
  bottomSheetVisible: boolean;
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

const CalendarModal = ({
  isOpen,
  setCalendarOpen,
  setBottomSheetVisible,
  bottomSheetVisible,
  selectedMonth,
  setSelectedMonth
}: CalendarModalProps) => {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const [_, setDiaryDate] = useAtom(diaryDateAtom);

  const { toast } = useToast();

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 약간의 지연을 두어 DOM이 렌더링된 후 애니메이션 시작
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setCalendarOpen(false);
    }, 300);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const goToPreviousYear = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear() - 1, selectedMonth.getMonth(), 1)
    );
  };

  const goToNextYear = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear() + 1, selectedMonth.getMonth(), 1)
    );
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(selectedMonth.getFullYear(), monthIndex, 1);
    const currentDate = new Date();
    if (newDate > currentDate) {
      toast({
        title: 'title',
        description: '미래 날짜로 이동이 불가합니다.'
      });
    } else {
      setSelectedMonth(newDate);
      setBottomSheetVisible(false);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['diaries', selectedMonth],
    queryFn: () => getDiariesByMonth(selectedMonth),
    staleTime: 0
  });

  useEffect(() => {
    if (data) {
      const caredDiaries = data.map((diary: any) => convertDate(diary.date));
      setDays(caredDiaries);
    }
  }, [data]);

  const convertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj;
  };

  const handleSelectDate = (selectedDates: Date[] | undefined) => {
    const currentDate = new Date();
    if (selectedDates && selectedDates.some(date => date > currentDate)) {
      toast({
        title: 'title',
        description: '미래 날짜로 이동이 불가합니다.'
      });
    } else {
      handleCloseModal();
      const selected = selectedDates && selectedDates.at(-1);
      if (selected) {
        selected.setHours(12, 0, 0, 0);
      }
      setDiaryDate(selected ? selected : new Date());
    }
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('ko-KR', options);
  };
  const formattedMonth = formatDate(selectedMonth);

  if (!isOpen) return null;
  if (isError) throw error;

  return (
    <div
      className={`fixed inset-0 z-[50] bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <Topbar type="three">
          <Topbar.Back onClick={handleCloseModal} />
          <Topbar.Title
            title={formattedMonth}
            onClick={() => setBottomSheetVisible(!bottomSheetVisible)}
          >
            <IoIosArrowDown className="ml-1" />
          </Topbar.Title>
          <Topbar.Empty />
        </Topbar>

        <div className="pt-12">
          <Calendar
            selected={days}
            onDateSelect={handleSelectDate}
            month={selectedMonth}
          />
        </div>

        <BottomSheet
          isVisible={bottomSheetVisible}
          setIsVisible={setBottomSheetVisible}
          heightPercent={['70%', '50%']}
        >
          <div className="p-5">
            <button onClick={goToPreviousYear}>{'<'}</button>
            <span className="text-md mx-4 font-semibold">
              {selectedMonth.getFullYear()}년
            </span>
            <button onClick={goToNextYear}>{'>'}</button>
          </div>
          <div className="month-grid grid grid-cols-3 gap-4 px-5">
            {months.map(monthIndex => (
              <button
                key={monthIndex}
                onClick={() => selectMonth(monthIndex - 1)}
                className={`rounded-lg bg-gray-100 p-3 text-center hover:bg-gray-200${
                  selectedMonth.getMonth() === monthIndex - 1
                    ? 'selected border-[1.6px] border-pr-500 bg-gray-50 text-pr-500'
                    : ''
                }`}
              >
                {monthIndex}월
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};

CalendarModal.displayName = 'CalendarModal';

export { CalendarModal };
