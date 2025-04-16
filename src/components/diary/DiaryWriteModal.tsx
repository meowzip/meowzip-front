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

type DiaryRegisterReqWithCats = Omit<DiaryRegisterReqObj, 'taggedCats'> & {
  taggedCats: CatType[];
};

interface DiaryWriteModalProps {
  onClose: () => void;
  id: number;
  diaryDetail?: DiaryRegisterReqWithCats;
}

const DiaryWriteModal = ({
  onClose,
  id,
  diaryDetail
}: DiaryWriteModalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const caredDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const formatDateToISO = (dateStr: string) => {
    if (dateStr.includes('-')) return dateStr;

    const year = new Date().getFullYear();
    const match = dateStr.match(/(\d+)월\s*(\d+)일/);
    if (!match) return dateStr;

    const month = match[1].padStart(2, '0');
    const day = match[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [textareaContent, setTextareaContent] = useState('');
  const [currentTime, setCurrentTime] = useState({
    hour: new Date().getHours().toString().padStart(2, '0'),
    minute: new Date().getMinutes().toString().padStart(2, '0')
  });
  const [chipObjList, setChipObjList] = useState([
    { key: 'food', content: '🐟 사료', checked: false },
    { key: 'water', content: '💧 물', checked: false }
  ]);
  const [searchCatModal, setSearchCatModal] = useState(false);
  const [selectTimeBottomSheet, setSelectTimeBottomSheet] = useState(false);
  const [taggedCatList, setTaggedCatList] = useState<CatType[]>([]);
  const [diaryImageList, setDiaryImageList] = useState<ImageUploadData[]>([
    { key: 1, imageSrc: null, croppedImage: null },
    { key: 2, imageSrc: null, croppedImage: null },
    { key: 3, imageSrc: null, croppedImage: null }
  ]);
  const [caredDateState, setCaredDateState] = useState(caredDate());

  const settingDiaryDetail = () => {
    if (!diaryDetail) return;

    setTextareaContent(diaryDetail.content);
    setCurrentTime({
      hour: diaryDetail.caredTime.split(':')[0].split(' ')[1],
      minute: diaryDetail.caredTime.split(':')[1]
    });
    setCaredDateState(diaryDetail.caredDate);
    setChipObjList(prevList =>
      prevList.map(prevChip =>
        prevChip.key === 'food'
          ? { ...prevChip, checked: diaryDetail.isFeed }
          : prevChip.key === 'water'
            ? { ...prevChip, checked: diaryDetail.isGivenWater }
            : prevChip
      )
    );
    setDiaryImageList(updateDiaryImages(diaryDetail?.images));
    setTaggedCatList(diaryDetail.taggedCats);
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
    settingDiaryDetail();
  }, [diaryDetail]);

  const displayTime = () => {
    const { hour, minute } = currentTime;
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

  const settingParams = () => {
    const images = diaryImageList
      ?.filter(diary => diary.croppedImage)
      ?.map(diary => diary.croppedImage);

    const rawDate = id ? caredDateState : caredDate();
    const formattedDate = formatDateToISO(rawDate);

    return {
      isGivenWater: chipObjList.find(chip => chip.key === 'water')
        ?.checked as boolean,
      isFeed: chipObjList.find(chip => chip.key === 'food')?.checked as boolean,
      content: textareaContent,
      caredDate: formattedDate,
      caredTime: displayTime(),
      catIds: taggedCatList.map(cat => cat.id),
      images: images.filter(image => image !== null) as string[]
    };
  };

  const saveDiary = () => {
    if (registerDiaryMutation.isPending || editDiaryMutation.isPending) {
      return;
    }

    try {
      const params = settingParams();

      if (!params.content.trim()) {
        toast({
          title: '일지 내용을 입력해주세요.',
          description: '일지 내용을 입력해주세요.'
        });
        return;
      }

      if (id) {
        editDiaryMutation.mutate({ id, diary: params });
      } else {
        registerDiaryMutation.mutate(params);
      }
    } catch (error) {
      console.error('일지 저장 중 오류:', error);
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
      router.push('/diary');
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

  useEffect(() => {
    return () => {
      setDiaryImageList([]);
    };
  }, []);

  return (
    <div className="fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title="일지쓰기" />
        <Topbar.Complete
          onClick={saveDiary}
          isLoading={
            registerDiaryMutation.isPending || editDiaryMutation.isPending
          }
        />
      </Topbar>
      <div className="m-auto max-w-[640px]">
        <section className="flex items-center justify-between px-4 py-2 pt-12">
          <h5 className="py-2 text-heading-5 text-gr-900">돌봄 시간</h5>
          <Button
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
                  content: textareaContent,
                  maxLength: 500
                }}
                onChange={e => setTextareaContent(e)}
              />
            </div>
          </article>
          <article>
            <h5 className="p-4 text-heading-5 text-gr-900">
              사진
              <span className="text-pr-500">
                {diaryImageList.filter(diary => diary.croppedImage).length || 0}
              </span>
              /3
            </h5>
            <div className="flex gap-3 px-4">
              {diaryImageList.map((diary, idx: number) => {
                if (idx === 0 || diaryImageList[idx - 1].croppedImage) {
                  return (
                    <ImageUploader
                      key={diary.key}
                      data={diary}
                      deleteBtn
                      onUpload={setDiaryImageList}
                      images={diaryImageList}
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
                      setChipObjList(prevList =>
                        prevList.map(prevChip =>
                          prevChip.key === chip.key
                            ? { ...prevChip, checked: !prevChip.checked }
                            : prevChip
                        )
                      )
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
                  time={currentTime}
                  setTime={setCurrentTime}
                  setSelectTimeBottomSheet={setSelectTimeBottomSheet}
                />
              </div>
            </BottomSheet>
          </article>
          <article>
            <div className="flex items-center justify-between p-4">
              <h5 className="text-heading-5 text-gr-900">
                고양이 태그
                <span className="pl-1 text-pr-500">{taggedCatList.length}</span>
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
              {taggedCatList.map((cat: CatType) => {
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
                        onClick={() => {
                          setTaggedCatList(prevList =>
                            prevList.filter(prevCat => prevCat.id !== cat.id)
                          );
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        </section>
      </div>
      {searchCatModal && (
        <SearchCatModal
          setSearchCatModal={setSearchCatModal}
          setTaggedCatList={setTaggedCatList}
        />
      )}
    </div>
  );
};

export default DiaryWriteModal;
