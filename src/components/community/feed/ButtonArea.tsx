import Image from 'next/image';
import React from 'react';

interface ButtonAreaProps {
  like: number;
  comment: number;
  clickLike: () => void;
  clickComment: () => void;
  clickBookmark: () => void;
}

const ButtonArea = ({
  like,
  comment,
  clickLike,
  clickComment,
  clickBookmark
}: ButtonAreaProps) => {
  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[10px]">
        <div className="flex items-center gap-[2px]" onClick={clickLike}>
          <Image
            src="/images/icons/heart.svg"
            alt="heart"
            width={24}
            height={24}
          />
          <h6 className="text-body-3 text-gr-400">{like}</h6>
        </div>
        <div className="flex items-center gap-[2px]" onClick={clickComment}>
          <Image
            src="/images/icons/comment.svg"
            alt="comment"
            width={24}
            height={24}
          />
          <h6 className="text-body-3 text-gr-400">{comment}</h6>
        </div>
      </div>
      <Image
        src="/images/icons/bookmark.svg"
        alt="bookmark"
        width={24}
        height={24}
        onClick={clickBookmark}
      />
    </div>
  );
};

export default ButtonArea;
