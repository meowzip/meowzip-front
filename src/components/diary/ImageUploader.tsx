'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const deleteImage = () => {
    setImageSrc(null);
  };

  return (
    <div className="relative flex h-[90px] w-[90px] flex-col items-center justify-center gap-1 rounded-16 bg-gr-50">
      {/* 파일 업로드 */}
      {!imageSrc && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      )}
      {/* 업로드 버튼 겸 이미지 프리뷰 */}
      <section
        className="flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat text-btn-3 text-gr-300"
        style={{ backgroundImage: `url(${imageSrc})` }}
        onClick={handleClick}
      >
        {/* 이미지 없을때 */}
        {!imageSrc && (
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/images/icons/camera.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p className="text-btn-3 text-gr-300">사진 추가</p>
          </div>
        )}
      </section>
      {/* 삭제 버튼 */}
      <section
        className="absolute -right-1 -top-1 cursor-pointer"
        onClick={deleteImage}
      >
        {imageSrc && (
          <Image
            src="/images/icons/close-bg.svg"
            alt="icon"
            width={24}
            height={24}
          />
        )}
      </section>
    </div>
  );
};

export default ImageUploader;
