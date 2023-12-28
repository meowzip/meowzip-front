'use client';

import { ReactNode, useEffect, useState } from 'react';
import CloseIcon from '../../../public/images/icons/close.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover';

interface TooltipProps {
  content: string;
  trigger: ReactNode;
}

const Tooltip = ({ content, trigger }: TooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [element, setElement] = useState<HTMLElement>();
  const [dataSide, setDataSide] = useState('');

  useEffect(() => {
    if (!openTooltip) return;

    const el = document.getElementById('content');
    el && setElement(el);
  }, [openTooltip]);

  useEffect(() => {
    if (!element) return;

    const dataSideValue = element?.getAttribute('data-side');
    dataSideValue && setDataSide(dataSideValue);
  }, [element]);

  return (
    <Popover open={openTooltip} onOpenChange={setOpenTooltip}>
      <PopoverTrigger asChild className="relative">
        {trigger}
      </PopoverTrigger>
      {openTooltip && (
        <PopoverContent
          id="content"
          className="w-fit border-0 bg-none p-0 shadow-none"
        >
          <div
            className={`absolute ${
              dataSide === 'bottom' ? '-top-[7px]' : '-bottom-[7px]'
            } left-7 z-20 h-[14px] w-[14px] rotate-45 bg-pr-500`}
          />
          <div className="flex items-center gap-1 rounded-full bg-pr-500 px-3 py-[6px]">
            <h6 className="text-btn-2 text-gr-white">{content}</h6>
            <CloseIcon
              width={12}
              height={12}
              stroke="var(--pr-300)"
              onClick={() => setOpenTooltip(false)}
            />
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Tooltip;
