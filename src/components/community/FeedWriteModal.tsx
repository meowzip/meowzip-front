import { feedImageListAtom } from '@/atoms/imageAtom';
import ImageUploader from '@/components/diary/ImageUploader';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ImageUploadData } from '@/atoms/imageAtom';
import { FeedType } from '@/app/community/communityType';

interface FeedWriteModalProps {
  onClose: () => void;
  feedDetail: FeedType;
}

const FeedWriteModal = ({ onClose, feedDetail }: FeedWriteModalProps) => {
  const [textareaContent, setTextareaContent] = useState('');
  const [feedImageList, setFeedImageList] = useAtom(feedImageListAtom);

  const settingFeedDetail = () => {
    if (!feedDetail) return;

    setTextareaContent(feedDetail.content);
    setFeedImageList(updateDiaryImages(feedDetail?.images));
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
    settingFeedDetail();
  }, [feedDetail]);

  const saveFeed = () => {
    console.log('저장');
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="save" title="글쓰기" onClose={onClose} onClick={saveFeed} />
      <article className="p-4 pt-14">
        <Textarea
          propObj={{
            placeholder: '사람들과 나누고 싶은 일들을 공유해보세요!',
            content: textareaContent,
            maxLength: 500
          }}
          onChange={e => setTextareaContent(e)}
        />
      </article>
      <article>
        <h5 className="p-4 text-heading-5 text-gr-900">
          사진
          <span className="text-pr-500">
            {feedImageList.filter(feed => feed.croppedImage).length || 0}
          </span>
          /3
        </h5>
        <div className="flex gap-3 px-4">
          {feedImageList.map((diary, idx: number) => {
            if (idx === 0 || feedImageList[idx - 1].croppedImage) {
              return (
                <ImageUploader
                  key={diary.key}
                  data={diary}
                  deleteBtn
                  onUpload={setFeedImageList}
                  images={feedImageList}
                />
              );
            }
          })}
        </div>
      </article>
    </div>
  );
};

export default FeedWriteModal;
