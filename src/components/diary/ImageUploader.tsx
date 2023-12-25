'use client';

import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import useCropper from '@/components/ui/hooks/useCropper';
import CloseIcon from '../../../public/images/icons/close.svg';
import PencilIcon from '../../../public/images/icons/pencil.svg';

interface ImageUploaderProps {
  width?: string;
  height?: string;
  radius?: string;
  preview?: ReactNode;
  editBtn?: boolean;
  deleteBtn?: boolean;
}

const ImageUploader = ({
  width,
  height,
  radius,
  preview,
  editBtn,
  deleteBtn
}: ImageUploaderProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
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

  const deleteImage = () => {
    setImageSrc(null);
    setCroppedImage(null);
  };

  const editImage = () => {
    console.log('이미지 있으면 시스템 시트 or 삭제 버튼');
    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };
  };

  const imageElement = useRef(null);
  const { handleCrop, croppedImage, setCroppedImage } = useCropper(
    imageSrc,
    imageElement
  );

  return (
    <div
      className={`${width || 'w-[90px]'} ${height || 'h-[90px]'} ${
        radius || 'rounded-16'
      } relative flex  flex-col items-center justify-center bg-gr-50 `}
    >
      {/* 파일 업로드 */}
      {!imageSrc && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={selectImage}
          className="hidden"
        />
      )}
      {/* 업로드 버튼 겸 이미지 프리뷰 */}
      <section
        className={`flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat text-btn-3 text-gr-300 ${
          radius || 'rounded-16'
        }`}
        style={{ backgroundImage: `url(${croppedImage})` }}
        onClick={() => fileInputRef.current?.click()}
      >
        {!croppedImage &&
          (preview || (
            <div className="flex flex-col items-center justify-center gap-1">
              <Image
                src="/images/icons/camera.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <p className="text-btn-3 text-gr-300">사진 추가</p>
            </div>
          ))}
      </section>
      {/* 상단 삭제 버튼 */}
      {croppedImage && deleteBtn && (
        <section
          className="absolute -right-1 -top-1 cursor-pointer"
          onClick={deleteImage}
        >
          <Image
            src="/images/icons/close-bg.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </section>
      )}
      {/* 하단 수정/삭제 버튼 */}
      {editBtn && (
        <section className="absolute bottom-0 right-0 rounded-16">
          <div className="h-full w-full rounded-full border-[1.5px] border-gr-white bg-gr-700 p-1">
            {croppedImage ? (
              <CloseIcon
                width={16}
                height={16}
                stroke="var(--gr-white)"
                onClick={deleteImage}
              />
            ) : (
              <PencilIcon
                width={16}
                height={16}
                stroke="var(--gr-white)"
                onClick={() => fileInputRef.current?.click()}
              />
            )}
          </div>
        </section>
      )}
      {/* crop image */}
      <section className="w-full">
        {imageSrc && !croppedImage && (
          <div className="fixed left-0 top-0 z-[200] ">
            <div className="h-screen w-screen bg-gr-white">
              <Image
                ref={imageElement}
                src={imageSrc}
                alt="cropped-image"
                width={24}
                height={24}
              />
              <div className="fixed left-1/2 top-8 -translate-x-1/2">
                <Button variant="secondary" size="md" onClick={handleCrop}>
                  이미지 자르기
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ImageUploader;
