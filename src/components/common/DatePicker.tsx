import React, { useState, useEffect } from 'react';
import Picker from '../ui/picker/Picker';

type DatePickerProps = {
  onSelectedChange: (selected: string) => void;
};

const DatePicker = ({ onSelectedChange }: DatePickerProps) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const initialYear = currentYear;
  const initialMonth = `${currentMonth}월`;
  const initialDay = `${currentDay}일`;

  const [selectedYear, setSelectedYear] = useState<string | number>(
    initialYear
  );
  const [selectedMonth, setSelectedMonth] = useState<string | number>(
    initialMonth
  );
  const [selectedDay, setSelectedDay] = useState<string | number>(initialDay);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleYearChange = (year: string | number) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: string | number) => {
    setSelectedMonth(month);
  };

  const handleDayChange = (day: string | number) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-white">
      <div
        className="flex items-start justify-center gap-[9px] self-stretch px-4 pb-8 pt-4"
        style={{
          height: '180px',
          alignItems: 'flex-start'
        }}
      >
        {isReady && (
          <>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Picker
                key="year-picker"
                list={years}
                onSelectedChange={handleYearChange}
                initialSelected={initialYear}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Picker
                key="month-picker"
                list={months}
                onSelectedChange={handleMonthChange}
                initialSelected={initialMonth}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Picker
                key="day-picker"
                list={days}
                onSelectedChange={handleDayChange}
                initialSelected={initialDay}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex h-12 w-full flex-1 items-start justify-center gap-2 self-stretch px-4">
        <button
          className="flex flex-1 items-center justify-center gap-[10px] rounded-16 border border-gr-100 bg-blue-500 px-4 py-3 text-white"
          onClick={() =>
            onSelectedChange(
              `${selectedYear}년  /  ${selectedMonth}   /  ${selectedDay}`
            )
          }
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
