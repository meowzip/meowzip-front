import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CatObjType, CatRegisterReqObj, CoParent } from '@/types/cat';
import Topbar from '../ui/Topbar';
import Textarea from '../ui/Textarea';
import BottomSheet from '../ui/BottomSheet';
import DatePicker from '../common/DatePicker';
import Button from '../ui/Button';
import { editCat, registerCat } from '@/services/cat';
import ImageUploader from '../diary/ImageUploader';
import { Input } from '../ui/Input';
import { DiaryObj } from '@/app/diary/diaryType';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '../ui/hooks/useToast';

const catFormSchema = z.object({
  name: z
    .string()
    .min(1, '고양이 이름을 입력해주세요')
    .max(20, '이름은 20자 이하로 입력해주세요')
    .regex(
      /^[가-힣a-zA-Z0-9\s]+$/,
      '이름에는 한글, 영문, 숫자만 입력 가능합니다'
    ),
  sex: z.enum(['F', 'M', 'UNDEFINED'], {
    required_error: '성별을 선택해주세요'
  }),
  isNeutered: z.enum(['Y', 'N', 'UNDEFINED'], {
    required_error: '중성화 여부를 선택해주세요'
  }),
  metAt: z
    .string()
    .min(1, '만난 날짜를 선택해주세요')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다'),
  memo: z.string().max(100, '특징은 100자 이하로 입력해주세요').optional(),
  image: z.string().nullable().optional(),
  croppedImage: z.string().nullable().optional(),
  imageUrl: z.string().optional()
});

type CatFormData = z.infer<typeof catFormSchema>;

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

const formatDate = (input: string): string => {
  if (!input || typeof input !== 'string') {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input;
  }

  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(input)) {
    const [year, month, day] = input.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const korDateMatch = input.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (korDateMatch) {
    const [, year, month, day] = korDateMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function CatInfo({
  setStep,
  catData,
  setPrev,
  type
}: SignInMainProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<CatFormData>({
    resolver: zodResolver(catFormSchema),
    defaultValues: {
      name: catData.name || '',
      sex: (catData.sex as 'F' | 'M' | 'UNDEFINED') || undefined,
      isNeutered: (catData.isNeutered as 'Y' | 'N' | 'UNDEFINED') || undefined,
      metAt: catData.metAt
        ? formatDate(catData.metAt)
        : formatDate(todayToDateString()),
      memo: catData.memo || '',
      image: catData.image || null,
      croppedImage: catData.croppedImage || null,
      imageUrl: catData.imageUrl || undefined
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

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
      toast({
        title: '오류가 발생했습니다',
        description: '다시 시도해주세요.'
      });
    }
  });

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    key: 0,
    imageSrc: '',
    croppedImage: null as string | null
  });

  useEffect(() => {
    if (catData.croppedImage || catData.imageUrl || catData.image) {
      setSelectedImage({
        key: 0,
        imageSrc:
          catData.croppedImage || catData.imageUrl || catData.image || '',
        croppedImage:
          catData.croppedImage || catData.imageUrl || catData.image || ''
      });
    }
  }, [catData]);

  const handleDateSelect = (selected: string) => {
    setValue('metAt', formatDate(selected), { shouldValidate: true });
    setOpenBottomSheet(false);
  };

  const onSubmit = (data: CatFormData) => {
    try {
      const updatedCatData: CatObjType & {
        id?: number;
        diaries?: DiaryObj[];
        coParents?: CoParent[];
        dDay?: number;
      } = {
        ...catData,
        ...data,
        memo: data.memo || ''
      };

      if (catData.croppedImage) {
        updatedCatData.croppedImage = catData.croppedImage;
        updatedCatData.image = catData.image;
      } else if (catData.image) {
        updatedCatData.image = catData.image;
        updatedCatData.croppedImage = null;
      } else if (
        catData.imageUrl &&
        catData.imageUrl !== 'string' &&
        catData.imageUrl.trim() !== ''
      ) {
        updatedCatData.imageUrl = catData.imageUrl;
        updatedCatData.image = null;
        updatedCatData.croppedImage = null;
      } else {
        updatedCatData.image = null;
        updatedCatData.croppedImage = null;
      }

      mutation.mutate(updatedCatData);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: '오류가 발생했습니다',
        description: '폼 데이터를 확인해주세요.'
      });
    }
  };

  const handleFormSubmit = () => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast({
        title: '입력 오류',
        description: firstError?.message || '모든 필수 정보를 입력해주세요.'
      });
      return;
    }

    handleSubmit(onSubmit)();
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return todayToDateString();

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return todayToDateString();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년  /  ${month}월  /  ${day}일`;
  };

  const handleFocus = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setTimeout(() => {
        document.activeElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
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
          onClick={handleFormSubmit}
          isLoading={mutation.isPending}
        />
      </Topbar>
      <section className="mx-auto mt-12 flex max-w-[640px] flex-col items-center self-stretch p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

          {type === 'edit' && (
            <article className="flex flex-col items-center self-stretch pb-6">
              <p className="flex items-center gap-1 self-stretch py-3 font-bold">
                이름 <span className="text-red-500">*</span>
              </p>
              <div className="w-full">
                <Input
                  {...register('name')}
                  variant="outlined"
                  placeholder={catData?.name}
                  className={`flex flex-shrink-0 flex-col items-center justify-end ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </article>
          )}

          <article className="flex flex-col items-start self-stretch pb-6">
            <article className="flex items-center self-stretch">
              <p className="font-bold">
                성별이 뭐예요? <span className="text-red-500">*</span>
              </p>
            </article>
            <article className="flex items-start justify-between gap-3 self-stretch pt-4">
              <Button
                type="button"
                onClick={() => setValue('sex', 'F', { shouldValidate: true })}
                className={`${watchedValues.sex === 'F' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Icon icon="/images/icons/gender-F.svg" alt="Female" />
                <Button.Text
                  text="여아"
                  className={`${watchedValues.sex === 'F' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
              <Button
                type="button"
                onClick={() => setValue('sex', 'M', { shouldValidate: true })}
                className={`${watchedValues.sex === 'M' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Icon icon="/images/icons/gender-M.svg" alt="Male" />
                <Button.Text
                  text="남아"
                  className={`${watchedValues.sex === 'M' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  setValue('sex', 'UNDEFINED', { shouldValidate: true })
                }
                className={`${watchedValues.sex === 'UNDEFINED' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Icon
                  icon="/images/icons/question.svg"
                  alt="UNDEFINED"
                />
                <Button.Text
                  text="모름"
                  className={`${watchedValues.sex === 'UNDEFINED' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
            </article>
            {errors.sex && (
              <p className="mt-2 text-sm text-red-500">{errors.sex.message}</p>
            )}
          </article>

          <article className="flex flex-col items-center self-stretch pb-6">
            <p className="flex items-center gap-1 self-stretch py-3 font-bold">
              언제 처음 만나셨나요? <span className="text-red-500">*</span>
            </p>
            <button
              type="button"
              className={`flex h-12 items-center justify-center self-stretch rounded-lg border ${
                errors.metAt ? 'border-red-500' : 'border-gr-100'
              }`}
              onClick={() => setOpenBottomSheet(true)}
            >
              {formatDateForDisplay(watchedValues.metAt)}
            </button>
            {errors.metAt && (
              <p className="mt-1 text-sm text-red-500">
                {errors.metAt.message}
              </p>
            )}
          </article>

          <article className="flex flex-col items-start self-stretch pb-6">
            <article className="flex items-center self-stretch">
              <p className="py-3 font-bold">
                중성화(TNR)했나요? <span className="text-red-500">*</span>
              </p>
            </article>
            <article className="flex items-start justify-center gap-3 self-stretch">
              <Button
                type="button"
                onClick={() =>
                  setValue('isNeutered', 'Y', { shouldValidate: true })
                }
                className={`${watchedValues.isNeutered === 'Y' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Text
                  text="완료"
                  className={`${watchedValues.isNeutered === 'Y' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  setValue('isNeutered', 'N', { shouldValidate: true })
                }
                className={`${watchedValues.isNeutered === 'N' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Text
                  text="미완료"
                  className={`${watchedValues.isNeutered === 'N' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  setValue('isNeutered', 'UNDEFINED', { shouldValidate: true })
                }
                className={`${watchedValues.isNeutered === 'UNDEFINED' ? 'border-pr-500 bg-gr-white' : 'border-gr-50 bg-gr-50'} w-full gap-1 rounded-lg border-[1.6px] px-3 py-[10px]`}
              >
                <Button.Text
                  text="모름"
                  className={`${watchedValues.isNeutered === 'UNDEFINED' ? 'text-pr-500' : 'text-gr-300'} text-btn-2`}
                />
              </Button>
            </article>
            {errors.isNeutered && (
              <p className="mt-2 text-sm text-red-500">
                {errors.isNeutered.message}
              </p>
            )}
          </article>

          <article className="flex flex-col items-start self-stretch pb-20">
            <p className="flex items-center self-stretch py-3 font-bold">
              특징이 있나요?
            </p>
            <Textarea
              propObj={{
                placeholder: '예) 애교 많고 사람 좋아하는 개냥이에요.',
                content: watchedValues.memo || '',
                maxLength: 100,
                style: `border rounded-lg h-[120px] p-4 w-full min-h-[160px] ${
                  errors.memo ? 'border-red-500' : 'border-gr-100'
                }`
              }}
              onChange={(value: string) =>
                setValue('memo', value, { shouldValidate: true })
              }
              onFocus={handleFocus}
            />
            {errors.memo && (
              <p className="mt-1 text-sm text-red-500">{errors.memo.message}</p>
            )}
          </article>
        </form>
      </section>

      <BottomSheet
        isVisible={openBottomSheet}
        setIsVisible={setOpenBottomSheet}
        topBar={<div className="font-medium">날짜 선택</div>}
        heightPercent={['70%', '50%']}
      >
        <DatePicker onSelectedChange={handleDateSelect} />
      </BottomSheet>
    </div>
  );
}
