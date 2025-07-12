import ImageUploader, {
  ImageUploadData
} from '@/components/diary/ImageUploader';
import Chip from '@/components/ui/Chip';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import React, { useEffect, useState } from 'react';
import BackIcon from '../../../public/images/icons/back.svg';
import Button from '@/components/ui/Button';
import BottomSheet from '@/components/ui/BottomSheet';
import TimeInput from '@/components/diary/TimeInput';
import SearchCatModal from './SearchCatModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDiaryOnServer, registerDiaryOnServer } from '@/services/diary';
import { DiaryRegisterReqObj } from '@/app/diary/diaryType';
import { useRouter } from 'next/navigation';
import { CatType } from '@/types/cat';
import CloseIcon from '../../../public/images/icons/close.svg';
import Image from 'next/image';
import { toast } from '../ui/hooks/useToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const diaryFormSchema = z.object({
  content: z.string().max(500, '일지는 500자 이하로 작성해주세요.'),
  caredDate: z.string(),
  caredTime: z.object({
    hour: z.string(),
    minute: z.string()
  }),
  isGivenWater: z.boolean(),
  isFeed: z.boolean(),
  taggedCats: z
    .array(z.custom<CatType>())
    .min(1, '고양이를 최소 1마리 이상 선택해주세요.'),
  images: z
    .array(z.custom<ImageUploadData>())
    .max(3, '이미지는 최대 3개까지 업로드 가능합니다.')
});

type DiaryFormData = z.infer<typeof diaryFormSchema>;

type DiaryRegisterReqWithCats = Omit<DiaryRegisterReqObj, 'taggedCats'> & {
  taggedCats: CatType[];
};

interface DiaryWriteModalProps {
  onClose: () => void;
  id?: number;
  diaryDetail?: DiaryRegisterReqWithCats;
}

const DiaryWriteModal = ({
  onClose,
  id,
  diaryDetail
}: DiaryWriteModalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return {
      hour: now.getHours().toString().padStart(2, '0'),
      minute: now.getMinutes().toString().padStart(2, '0')
    };
  };

  const form = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      content: '',
      caredDate: getCurrentDate(),
      caredTime: getCurrentTime(),
      isGivenWater: false,
      isFeed: false,
      taggedCats: [],
      images: [
        { key: 1, imageSrc: null, croppedImage: null },
        { key: 2, imageSrc: null, croppedImage: null },
        { key: 3, imageSrc: null, croppedImage: null }
      ]
    }
  });

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    trigger
  } = form;

  const watchedData = watch();
  const {
    content,
    caredTime,
    isGivenWater,
    isFeed,
    taggedCats,
    images,
    caredDate
  } = watchedData;

  const [searchCatModal, setSearchCatModal] = useState(false);
  const [selectTimeBottomSheet, setSelectTimeBottomSheet] = useState(false);

  const formatDateToISO = (dateStr: string) => {
    if (dateStr.includes('-')) return dateStr;

    const year = new Date().getFullYear();
    const match = dateStr.match(/(\d+)월\s*(\d+)일/);
    if (!match) return dateStr;

    const month = match[1].padStart(2, '0');
    const day = match[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateDiaryImages = (images: string[]) => {
    if (!images) return [];

    const updatedImageList = images.map((image, index) => ({
      key: index,
      imageSrc: null,
      croppedImage: image
    }));

    updatedImageList.push({
      key: images.length,
      imageSrc: null,
      croppedImage: ''
    });
    return updatedImageList.slice(0, 3);
  };

  useEffect(() => {
    if (diaryDetail) {
      reset({
        content: diaryDetail.content,
        caredDate: diaryDetail.caredDate,
        caredTime: {
          hour:
            diaryDetail.caredTime.split(':')[0].split(' ')[1] ||
            diaryDetail.caredTime.split(':')[0],
          minute: diaryDetail.caredTime.split(':')[1]
        },
        isGivenWater: diaryDetail.isGivenWater,
        isFeed: diaryDetail.isFeed,
        taggedCats: diaryDetail.taggedCats,
        images: updateDiaryImages(diaryDetail?.images || [])
      });
    }
  }, [diaryDetail, reset]);

  const displayTime = () => {
    const { hour, minute } = caredTime;
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

  const prepareSubmitData = (data: DiaryFormData): DiaryRegisterReqObj => {
    const processedImages = data.images
      ?.filter(img => img.croppedImage)
      ?.map(img => img.croppedImage)
      ?.filter(img => img !== null) as string[];

    const formattedDate = formatDateToISO(data.caredDate);

    const catIds = data.taggedCats.map(cat => Number(cat.id));

    return {
      isGivenWater: data.isGivenWater,
      isFeed: data.isFeed,
      content: data.content,
      caredDate: formattedDate,
      caredTime: displayTime(),
      catIds: catIds,
      images: processedImages
    };
  };

  const onSubmit = (data: DiaryFormData) => {
    if (isSubmitting) return;

    if (!data.taggedCats || data.taggedCats.length === 0) {
      toast({
        description: '고양이를 선택해주세요'
      });
      return;
    }

    if (!data.content.trim()) {
      toast({
        description: '간단한 돌봄 기록이라도 남겨보세요!'
      });
      return;
    }

    try {
      const submitData = prepareSubmitData(data);

      if (id) {
        editDiaryMutation.mutate({ id, diary: submitData });
      } else {
        registerDiaryMutation.mutate(submitData);
      }
    } catch (error) {
      console.error('일지 저장 중 오류:', error);
    }
  };

  const onError = (errors: any) => {
    if (errors.taggedCats) {
      toast({
        description: '고양이를 선택해주세요'
      });
    } else if (errors.images) {
      toast({
        title: '이미지 업로드 중 오류가 발생했어요.',
        description: errors.images.message
      });
    }
  };

  const registerDiaryMutation = useMutation({
    mutationFn: (reqObj: DiaryRegisterReqObj) => {
      return registerDiaryOnServer(reqObj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'diaries'
      });

      onClose();
      setTimeout(() => {
        router.push('/diary');
      }, 350);
    },
    onError: error => {
      toast({
        title: '일지 등록 중 오류가 발생했습니다.',
        description: error.message || '일지 등록 중 오류가 발생했습니다.'
      });
      console.error('일지 등록 중 오류:', error);
    }
  });

  const editDiaryMutation = useMutation({
    mutationFn: (reqObj: { id: number; diary: DiaryRegisterReqObj }) =>
      editDiaryOnServer(reqObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryDetail'] });
      toast({
        description: '일지가 성공적으로 수정되었습니다.'
      });
      onClose();
    },
    onError: error => {
      toast({
        title: '일지 수정 중 오류가 발생했습니다.',
        description: error.message || '일지 수정 중 오류가 발생했습니다.'
      });
      console.error('일지 수정 중 오류:', error);
    }
  });

  const handleChipClick = (chipKey: 'food' | 'water') => {
    if (chipKey === 'food') {
      setValue('isFeed', !isFeed);
    } else if (chipKey === 'water') {
      setValue('isGivenWater', !isGivenWater);
    }
  };

  const handleRemoveCat = (catId: string) => {
    const updatedCats = taggedCats.filter(cat => cat.id !== catId);
    setValue('taggedCats', updatedCats);
  };

  const handleTimeChange = (time: { hour: string; minute: string }) => {
    setValue('caredTime', time);
  };

  const handleImageUpload = (
    newImages:
      | ImageUploadData[]
      | ((prev: ImageUploadData[]) => ImageUploadData[])
  ) => {
    if (typeof newImages === 'function') {
      setValue('images', newImages(images));
    } else {
      setValue('images', newImages);
    }
  };

  const handleAddCats = async (
    cats: CatType[] | ((prev: CatType[]) => CatType[])
  ) => {
    let newCats: CatType[];

    if (typeof cats === 'function') {
      newCats = cats(taggedCats);
    } else {
      newCats = cats;
    }

    setValue('taggedCats', newCats, {
      shouldValidate: true,
      shouldDirty: true
    });

    await trigger('taggedCats');
  };

  const chipObjList = [
    { key: 'food', content: '🐟 사료', checked: isFeed },
    { key: 'water', content: '💧 물', checked: isGivenWater }
  ];

  return (
    <>
      <div className="h-full w-full overflow-y-auto">
        <Topbar type="three">
          <Topbar.Back onClick={onClose} />
          <Topbar.Title title="일지쓰기" />
          <Topbar.Complete
            onClick={handleSubmit(onSubmit, onError)}
            isLoading={
              isSubmitting ||
              registerDiaryMutation.isPending ||
              editDiaryMutation.isPending
            }
          />
        </Topbar>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="m-auto max-w-[640px]"
        >
          <section className="flex items-center justify-between px-4 py-2 pt-12">
            <h5 className="py-2 text-heading-5 text-gr-900">돌봄 시간</h5>
            <Button
              type="button"
              onClick={() => {
                setSelectTimeBottomSheet(!selectTimeBottomSheet);
              }}
              className="h-[37px] w-fit rounded-[20px] border border-gr-100 bg-gr-white px-4 py-[10px]"
              disabled={false}
            >
              <Button.Text
                text={displayTime()}
                className="text-btn-2 text-gr-800"
              />
            </Button>
          </section>
          <section className="flex flex-col gap-4">
            <article>
              <h5 className="p-4 text-heading-5 text-gr-900">돌봄 일지</h5>
              <div className="px-4">
                <Textarea
                  propObj={{
                    placeholder: '오늘 하루의 돌봄 일지를 기록해보세요.',
                    content: content,
                    maxLength: 500
                  }}
                  onChange={value => setValue('content', value)}
                />
              </div>
            </article>
            <article>
              <h5 className="p-4 text-heading-5 text-gr-900">
                사진
                <span className="text-pr-500">
                  {images.filter(diary => diary.croppedImage).length || 0}
                </span>
                /3
              </h5>
              <div className="flex gap-3 px-4">
                {images.map((diary, idx: number) => {
                  if (idx === 0 || images[idx - 1].croppedImage) {
                    return (
                      <ImageUploader
                        key={diary.key}
                        data={diary}
                        deleteBtn
                        onUpload={handleImageUpload}
                        images={images}
                      />
                    );
                  }
                })}
              </div>
            </article>
            <article>
              <h5 className="p-4 text-heading-5 text-gr-900">돌봄 기록</h5>
              <div className="flex gap-2 px-4 py-1">
                {chipObjList.map(chip => {
                  return (
                    <Chip
                      key={chip.key}
                      propObj={chip}
                      onClick={() =>
                        handleChipClick(chip.key as 'food' | 'water')
                      }
                    />
                  );
                })}
              </div>
            </article>
            <article>
              <BottomSheet
                disableDrag
                isVisible={selectTimeBottomSheet}
                setIsVisible={() =>
                  setSelectTimeBottomSheet(!selectTimeBottomSheet)
                }
                heightPercent={['70%', '50%']}
              >
                <div className="flex h-12 items-center justify-center text-heading-3">
                  돌봄 시간을 입력하세요.
                </div>
                <div className="px-4 pb-10 pt-4">
                  <TimeInput
                    time={caredTime}
                    setTime={handleTimeChange}
                    setSelectTimeBottomSheet={setSelectTimeBottomSheet}
                  />
                </div>
              </BottomSheet>
            </article>
            <article>
              <div className="flex items-center justify-between p-4">
                <h5 className="text-heading-5 text-gr-900">
                  고양이 태그
                  <span className="pl-1 text-pr-500">{taggedCats.length}</span>
                </h5>
                <BackIcon
                  width={16}
                  height={16}
                  stroke="var(--gr-black)"
                  className="rotate-180"
                  onClick={() => setSearchCatModal(true)}
                />
              </div>
              <ul className="px-4 py-1 pb-20">
                {taggedCats.map((cat: CatType) => {
                  return (
                    <li
                      key={cat.id}
                      className="flex items-center justify-between gap-4 self-stretch py-2"
                    >
                      <Image
                        src={cat.imageUrl}
                        alt="cat-image"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-1 items-center gap-2">
                        <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
                        <Image
                          src={`/images/icons/gender-${cat.sex}.svg`}
                          alt="cat-gender"
                          width={16}
                          height={16}
                          className={`rounded-full ${
                            cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                          }`}
                        />
                      </div>
                      <div className="rounded-full border-[1.5px] border-gr-white bg-gr-200 p-1">
                        <CloseIcon
                          width={12}
                          height={12}
                          stroke="var(--gr-white)"
                          onClick={() => handleRemoveCat(cat.id)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        </form>
      </div>
      {searchCatModal && (
        <SearchCatModal
          setSearchCatModal={setSearchCatModal}
          setTaggedCatList={handleAddCats}
        />
      )}
    </>
  );
};

export default DiaryWriteModal;
