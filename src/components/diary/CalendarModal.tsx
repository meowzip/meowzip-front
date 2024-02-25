import { Calendar } from '../ui/Calendar';
import Modal from '@/components/ui/Modal';
import BottomSheet from '@/components/ui/BottomSheet';
import { useState } from 'react';
import { useToast } from '../ui/hooks/useToast';

interface CalendarModalProps {
  isOpen: boolean;
  setBottomSheetVisible: (bottomSheetVisible: boolean) => void;
  bottomSheetVisible: boolean;
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

const CalendarModal = ({
  isOpen,
  setBottomSheetVisible,
  bottomSheetVisible,
  selectedMonth,
  setSelectedMonth
}: CalendarModalProps) => {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const { toast } = useToast();

  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1월부터 12월까지의 배열 생성

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

  const handleSelectDate = (selectedDates: Date[] | undefined) => {
    const currentDate = new Date();
    if (selectedDates && selectedDates.some(date => date > currentDate)) {
      toast({
        title: 'title',
        description: '미래 날짜로 이동이 불가합니다.'
      });
    } else {
      setDays(selectedDates);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <Modal
        customContent={
          <div>
            <Calendar
              selected={days}
              onSelect={handleSelectDate}
              mode="multiple"
              month={selectedMonth}
            />
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
                    className={`rounded-lg bg-gray-100 p-3 text-center  hover:bg-gray-200${
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
        }
      />
    </div>
  );
};

CalendarModal.displayName = 'CalendarModal';

export { CalendarModal };
