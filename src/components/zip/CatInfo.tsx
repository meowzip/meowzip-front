import { useState } from 'react';
import { CatRegisterReqObj } from '@/app/zip/catType';
import Topbar from '../ui/Topbar';
import Textarea from '../ui/Textarea';
import BottomSheet from '../ui/BottomSheet';
import DatePicker from '../common/DatePicker';

interface SignInMainProps {
  setStep: () => void;
  catData: CatRegisterReqObj;
  setCatData: (data: any) => void;
  setPrev: () => void;
}

const todayToDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}년  /  ${month}월  /  ${day}일`;
};

export default function CatInfo({
  setStep,
  catData,
  setPrev
}: SignInMainProps) {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | number>(
    todayToDateString
  );
  const [textareaContent, setTextAreaContent] = useState('');

  const handleSelectedChange = (selected: string) => {
    setSelectedItem(selected);
    setOpenBottomSheet(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] overflow-y-auto bg-gr-white">
      <Topbar
        type="zip"
        title="고양이 등록(3/3)"
        onClick={setStep}
        onClose={setPrev}
      />
      <section className="mt-12 flex flex-col items-center self-stretch p-6">
        <article className="flex w-full flex-col items-center justify-center gap-4 pb-8">
          <div
            className="flex h-16 w-16 items-center justify-center gap-[10px] rounded-full bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${catData?.croppedImage})` }}
          ></div>
          <p className="flex flex-col justify-center text-center text-heading-1 font-bold">
            <span className="block">
              <span className="text-pr-500">{catData?.name}</span>
              <span>에 대해</span>
            </span>
            <span className="block">알려주세요!</span>
          </p>
        </article>
        <article className="flex flex-col items-start self-stretch pb-6">
          <article className="flex items-center self-stretch">
            <p className="font-bold">성별이 뭐예요?</p>
          </article>
          <article className="flex items-start justify-center gap-3 self-stretch">
            {/* <Button variant="tertiary" size="lg" className="rounded-8">
              tertiary
            </Button> */}
            <div className="flex w-[375px] items-center justify-center px-3 py-[10px]">
              <img src={`/images/icons/gender-F.svg`} alt="Female" />
              여아
            </div>
            <div className="flex w-[375px] items-center justify-center px-3 py-[10px]">
              <img src={`/images/icons/gender-M.svg`} alt="" />
              남아
            </div>
            <div className="flex w-[375px] items-center justify-center px-3 py-[10px]">
              모름
            </div>
          </article>
        </article>
        <article className="flex flex-col items-center self-stretch pb-6">
          <p className="flex items-center gap-1 self-stretch py-3 font-bold">
            언제 처음 만나셨나요?
          </p>
          <button
            className="flex h-12 items-center justify-center self-stretch rounded-lg border border-gr-100"
            onClick={() => setOpenBottomSheet(true)}
          >
            {selectedItem}
          </button>
        </article>
        <article className="flex flex-col items-start self-stretch pb-6">
          <article className="flex items-center self-stretch">
            <p className="py-3 font-bold">중성화(TNR)했나요?</p>
          </article>
          <article className="flex items-start justify-center gap-3 self-stretch">
            <div className="flex w-[375px] items-center justify-center rounded-lg bg-gr-50 px-3 py-[10px]">
              완료
            </div>
            <div className="flex w-[375px] items-center justify-center rounded-lg bg-gr-50 px-3 py-[10px]">
              미완료
            </div>
            <div className="flex w-[375px] items-center justify-center rounded-lg bg-gr-50 px-3 py-[10px]">
              모름
            </div>
          </article>
        </article>
        <article className="flex flex-col items-start self-stretch pb-20">
          <p className="flex items-center self-stretch py-3 font-bold">
            특징이 있나요?
          </p>
          <Textarea
            propObj={{
              placeholder: '예) 애교 많고 사람 좋아하는 개냥이에요.',
              content: textareaContent,
              maxLength: 100,
              style:
                'border border-gr-100 rounded-lg h-[120px] p-4 w-full min-h-[160px]'
            }}
            onChange={e => setTextAreaContent(e)}
          />
        </article>
      </section>
      <BottomSheet
        isVisible={openBottomSheet}
        setIsVisible={setOpenBottomSheet}
        topBar={<div className="font-medium">날짜 선택</div>}
        heightPercent={['70%', '50%']}
      >
        <DatePicker onSelectedChange={handleSelectedChange} />
      </BottomSheet>
    </div>
  );
}
