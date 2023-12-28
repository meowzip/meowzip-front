interface TextareaProps {
  propObj: {
    placeholder: string;
    content: string;
    maxLength?: number;
    style?: string;
  };
  disabled?: boolean;
  onChange: (content: string) => void;
}

const Textarea = ({ propObj, disabled, onChange }: TextareaProps) => {
  return (
    <div className={`flex flex-col gap-[6px] ${propObj.style}`}>
      <textarea
        tabIndex={1}
        placeholder={propObj.placeholder}
        className="h-[210px] resize-none py-2 text-label-1 text-gr-800 placeholder:text-gr-200 focus:bg-gr-white focus:outline-none disabled:cursor-not-allowed"
        disabled={disabled}
        value={propObj.content}
        onChange={e => onChange(e.target.value)}
        maxLength={propObj.maxLength}
      />
      {propObj.maxLength && (
        <p className="flex justify-end text-label-2 text-gr-500">
          <span className="text-pr-500">{propObj.content.length || 0}</span>/
          {propObj.maxLength}
        </p>
      )}
    </div>
  );
};

export default Textarea;
