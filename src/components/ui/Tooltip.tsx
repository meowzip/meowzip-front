import CloseIcon from '../../../public/images/icons/close.svg';

interface TooltipProps {
  content: string;
  positionX?: string;
  positionY?: string;
  onClick: () => void;
}

const Tooltip = ({ content, onClick }: TooltipProps) => {
  return (
    <>
      {/* <div className="group relative flex flex-col"> */}
      <div className="absolute -top-1 left-10 z-20 h-[14px] w-[14px] rotate-45 bg-pr-500" />
      <div
        className={`absolute z-10 flex w-max items-center gap-1 rounded-full bg-pr-500 px-3 py-[6px]`}
      >
        <h6 className="break-all text-btn-2 text-gr-white">{content}</h6>
        <CloseIcon
          width={12}
          height={12}
          stroke="var(--pr-300)"
          onClick={onClick}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default Tooltip;
