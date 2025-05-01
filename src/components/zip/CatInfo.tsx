import { useEffect, useState } from 'react';
import { CatObjType, CatRegisterReqObj, CoParent } from '@/app/zip/catType';
import Topbar from '../ui/Topbar';
import Textarea from '../ui/Textarea';
import BottomSheet from '../ui/BottomSheet';
import DatePicker from '../common/DatePicker';
import Button from '../ui/Button';
import { editCat, registerCat } from '@/services/cat';
import ImageUploader from '../diary/ImageUploader';
import { Input } from '../ui/Input';
import useCatNameHandler from '@/hooks/zip/useCatNameHandler';
import { DiaryObj } from '@/app/diary/diaryType';
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface SignInMainProps {
  setStep: () => void;
  catData: CatRegisterReqObj;
  setPrev: () => void;
  type: 'register' | 'edit';
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
  setPrev,
  type
}: SignInMainProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      newCatData: CatObjType & {
        id?: number;
        diaries?: DiaryObj[];
        coParents?: CoParent[];
        dDay?: number;
      }
    ) => (type === 'edit' ? editCat(newCatData) : registerCat(newCatData)),
    onSuccess: response => {
      if (response && response.status === 200) {
        setStep();
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getCats'
        });
        queryClient.invalidateQueries({ queryKey: ['catDetail'] });
      }
    },
    onError: error => {
      console.error('Error:', error);
    }
  });

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [textareaContent, setTextAreaContent] = useState('');
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | number>(
    todayToDateString
  );
  const [selectedNeutered, setSelectedNeutered] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState({
    key: 0,
    imageSrc: '',
    croppedImage: null as string | null
  });
  const { catName, handleCatNameChange } = useCatNameHandler();

  useEffect(() => {
    setSelectedSex(catData.sex);
    setSelectedNeutered(catData.isNeutered);
    if (catData.metAt) setSelectedItem(catData.metAt);
    if (catData.memo) setTextAreaContent(catData.memo);
    if (catData.name)
      handleCatNameChange({
        target: { value: catData.name }
      } as React.ChangeEvent<HTMLInputElement>);

    if (catData.croppedImage || catData.imageUrl || catData.image) {
      setSelectedImage({
        key: 0,
        imageSrc:
          catData.croppedImage || catData.imageUrl || catData.image || '',
        croppedImage: catData.croppedImage || null
      });
    }
  }, [catData]);

  const handleSelectedChange = (selected: string) => {
    setSelectedItem(selected);
    setOpenBottomSheet(false);
  };
  [];

  const formatDate = (input: string): string => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return input;
    }

    if (!input || typeof input !== 'string') {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }

    const parts = input
      .replace(/년|월|일/g, '')
      .split('/')
      .map(part => part.trim());

    if (parts.length !== 3) {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }

    const [year, month, day] = parts;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const updateCatData = () => {
    const updatedCatData: CatObjType & {
      id?: number;
      diaries?: DiaryObj[];
      coParents?: CoParent[];
      dDay?: number;
    } = {
      ...catData,
      name: catName.value || catData.name,
      sex: selectedSex || 'UNDEFINED',
      isNeutered: selectedNeutered || 'UNDEFINED',
      metAt: formatDate(selectedItem as string),
      memo: textareaContent || ''
    };

    if (updatedCatData.memo === 'string') {
      updatedCatData.memo = '';
    }

    const finalData = { ...updatedCatData };

    if (selectedImage.croppedImage) {
      finalData.croppedImage = selectedImage.croppedImage;
      finalData.image = selectedImage.imageSrc;
      if ('imageUrl' in finalData) {
        delete finalData.imageUrl;
      }
    } else if (selectedImage.imageSrc) {
      finalData.image = selectedImage.imageSrc;
      finalData.croppedImage = null;
      if ('imageUrl' in finalData) {
        delete finalData.imageUrl;
      }
    } else if (
      catData.imageUrl &&
      catData.imageUrl !== 'string' &&
      catData.imageUrl.trim() !== ''
    ) {
      finalData.imageUrl = catData.imageUrl;
      finalData.image = null;
      finalData.croppedImage = null;
    } else {
      // 기본 이미지를 사용하는 경우 (모든 이미지 필드 제거)
      if ('imageUrl' in finalData) {
        delete finalData.imageUrl;
      }
      finalData.image = null;
      finalData.croppedImage = null;
    }

    if (!finalData.name || finalData.name.trim() === '') {
      throw new Error('고양이 이름을 입력해주세요');
    }

    if (!finalData.sex || !finalData.metAt) {
      throw new Error('필수 정보를 입력해주세요');
    }

    console.log('최종 제출 데이터:', finalData);
    return finalData;
  };

  const handleOnClick = async () => {
    try {
      const newCatData = updateCatData();
      mutation.mutate(newCatData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto h-full min-w-[320px] max-w-[640px] overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title
          title={type === 'register' ? '고양이 등록(3/3)' : '정보 수정'}
        />
        <Topbar.Complete
          onClick={handleOnClick}
          isLoading={mutation.isPending}
        />
      </Topbar>
      <section className="mx-auto mt-12 flex max-w-[640px] flex-col items-center self-stretch p-6">
        <article className="flex w-full flex-col items-center justify-center gap-4 pb-8">
          {type === 'register' ? (
            <>
              <div
                className="flex h-16 w-16 items-center justify-center gap-[10px] rounded-full bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${catData?.croppedImage || catData?.imageUrl || '/images/icons/cat-basic.svg'})`
                }}
              ></div>
              <p className="flex flex-col justify-center text-center text-heading-1 font-bold">
                <span className="block">
                  <span className="text-pr-500">{catData?.name}</span>
                  <span>에 대해</span>
                </span>
                <span className="block">알려주세요!</span>
              </p>
            </>
          ) : (
            <ImageUploader
              width="w-[120px]"
              height="h-[120px]"
              radius="rounded-[48px]"
              preview={
                <img
                  className="h-full w-full rounded-[48px]"
                  src={
                    selectedImage.imageSrc ||
                    catData?.imageUrl ||
                    '/images/icons/cat-basic.svg'
                  }
                  alt={catData?.name || '고양이 이미지'}
                />
              }
              editBtn
              data={selectedImage}
              onUpload={(data: any) => {
                setSelectedImage(data);
              }}
            />
          )}
        </article>
        <article className="flex flex-col items-start self-stretch pb-6">
          {type === 'edit' && (
            <article className="flex flex-col items-center self-stretch pb-6">
              <p className="flex items-center gap-1 self-stretch py-3 font-bold">
                이름
              </p>
              <div className="w-full">
                <Input
                  variant="outlined"
                  placeholder={catData?.name}
                  className="flex flex-shrink-0 flex-col items-center justify-end"
                  value={catName.value}
                  onChange={handleCatNameChange}
                />
              </div>
            </article>
          )}
          <article className="flex items-center self-stretch">
            <p className="font-bold">성별이 뭐예요?</p>
          </article>
          <article className="flex items-start justify-between gap-3 self-stretch pt-4">
            <Button
              onClick={() => setSelectedSex('F')}
              className={`${selectedSex === 'F' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Icon icon="/images/icons/gender-F.svg" alt="Female" />
              <Button.Text
                text="여아"
                className={`${selectedSex === 'F' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
            <Button
              onClick={() => setSelectedSex('M')}
              className={`${selectedSex === 'M' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Icon icon="/images/icons/gender-M.svg" alt="Male" />
              <Button.Text
                text="남아"
                className={`${selectedSex === 'M' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
            <Button
              onClick={() => setSelectedSex('UNDEFINED')}
              className={`${selectedSex === 'UNDEFINED' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Icon icon="/images/icons/question.svg" alt="UNDEFINED" />
              <Button.Text
                text="모름"
                className={`${selectedSex === 'UNDEFINED' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
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
            <Button
              onClick={() => setSelectedNeutered('Y')}
              className={`${selectedNeutered === 'Y' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Text
                text="완료"
                className={`${selectedNeutered === 'Y' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
            <Button
              onClick={() => setSelectedNeutered('N')}
              className={`${selectedNeutered === 'N' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Text
                text="미완료"
                className={`${selectedNeutered === 'N' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
            <Button
              onClick={() => setSelectedNeutered('UNDEFINED')}
              className={`${selectedNeutered === 'UNDEFINED' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
            >
              <Button.Text
                text="모름"
                className={`${selectedNeutered === 'UNDEFINED' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
              />
            </Button>
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
