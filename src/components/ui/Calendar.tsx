import React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';

interface CalendarProps
  extends Omit<React.ComponentProps<typeof DayPicker>, 'mode' | 'selected'> {
  selected?: Date[];
  onDateSelect?: (dates: Date[] | undefined) => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  onMonthChange,
  selected,
  onDateSelect,
  ...props
}: CalendarProps) {
  const getDayStyle = (date: Date) => {
    if (
      !selected?.some(
        selectedDate =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear()
      )
    ) {
      return {
        backgroundImage: 'url("/images/icons/cats/cat-face.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'contain'
      };
    }

    const dayImages = {
      0: '/cat-sun.svg', // 일요일
      1: '/cat-mon.svg', // 월요일
      2: '/cat-tue.svg', // 화요일
      3: '/cat-wed.svg', // 수요일
      4: '/cat-thu.svg', // 목요일
      5: '/cat-fri.svg', // 금요일
      6: '/cat-sat.svg' // 토요일
    };

    const dayImage = dayImages[date.getDay() as keyof typeof dayImages];
    return {
      backgroundImage: `url("/images/icons/cats/${dayImage}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundSize: 'contain'
    };
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (onDateSelect) {
      onDateSelect(date ? [date] : undefined);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <DayPicker
        mode="single"
        month={month}
        onMonthChange={onMonthChange}
        selected={selected ? selected[selected.length - 1] : undefined}
        onSelect={(date: Date | undefined) => {
          if (onDateSelect) {
            onDateSelect(date ? [date] : undefined);
          }
        }}
        modifiers={{
          disabled: date => date > new Date()
        }}
        footer={null}
        className={cn(className)}
        components={{
          Day: ({ date, ...dayProps }) => {
            const isSelected = selected?.some(
              selectedDate =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getMonth() === date.getMonth() &&
                selectedDate.getFullYear() === date.getFullYear()
            );

            return (
              <button
                onClick={() => handleDateSelect(date)}
                {...dayProps}
                style={{
                  ...getDayStyle(date),
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
                className={cn(
                  'w-[26px] max-w-[30px] rounded-none pb-[1.5rem] pt-[0] text-[12px] hover:bg-transparent',
                  'relative',
                  'text-gr-900'
                )}
              >
                <span
                  className={cn(
                    'z-10 px-2',
                    isSelected &&
                      'rounded-full border border-pr-500 bg-pr-500 text-white'
                  )}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          }
        }}
        classNames={{
          caption: 'hidden',
          months:
            'flex justify-ceanter items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4  w-full',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex justify-around',
          head_cell:
            'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full justify-around mt-3',
          cell: 'w-[26px] h-10 w-9 text-center rounded-full text-sm p-0 relative [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:h-[20px] [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
          day_today: 'text-accent-foreground',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_hidden: 'invisible',
          ...classNames
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
