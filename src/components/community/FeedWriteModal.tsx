import { feedImageListAtom } from '@/atoms/imageAtom';
import ImageUploader from '@/components/diary/ImageUploader';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ImageUploadData } from '@/atoms/imageAtom';

interface FeedWriteModalProps {
  onClose: () => void;
}

const FeedWriteModal = ({ onClose }: FeedWriteModalProps) => {
  const [textareaContent, setTextareaContent] = useState('');
  // const [feedImageList, setFeedImageList] = useAtom(feedImageListAtom);
  const [feedImageList, setFeedImageList] = useState([
    {
      key: 0,
      imageSrc: null,
      croppedImage:
        'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg'
    },
    {
      key: 1,
      imageSrc: null,
      croppedImage: 'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg'
    },
    {
      key: 2,
      imageSrc: null,
      croppedImage:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
    }
  ] as ImageUploadData[]);

  const saveFeed = () => {
    console.log('저장');
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="save" title="글쓰기" onClose={onClose} onClick={saveFeed} />
      <article className="p-4">
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
