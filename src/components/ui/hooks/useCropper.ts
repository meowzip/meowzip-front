import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { ImageUploadData } from '@/components/diary/ImageUploader';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface CropperImageElement extends HTMLImageElement {
  cropper: Cropper;
}

const useCropper = (
  key: number | undefined,
  imageSrc: string | null | undefined,
  imageElement: MutableRefObject<CropperImageElement | null>,
  onUpload:
    | Dispatch<SetStateAction<ImageUploadData[]>>
    | Dispatch<SetStateAction<ImageUploadData>>
) => {
  useEffect(() => {
    // 이미지가 없으면 크로퍼를 초기화하지 않음
    if (!imageElement.current || !imageSrc) {
      return;
    }

    try {
      const cropper = new Cropper(imageElement.current, {
        viewMode: 1,
        aspectRatio: 1,
        modal: true,
        background: false,
        dragMode: 'move'
      });

      return () => {
        cropper.destroy();
      };
    } catch (error) {
      console.error('Cropper initialization error:', error);
    }
  }, [imageSrc, imageElement]);

  const handleCrop = () => {
    if (!imageElement.current) {
      console.warn('Image element is not available');
      return;
    }

    try {
      const cropper = imageElement.current.cropper;
      if (!cropper) {
        console.warn('Cropper instance is not available');
        return;
      }

      const croppedCanvas = cropper.getCroppedCanvas();
      if (!croppedCanvas) {
        console.warn('Failed to get cropped canvas');
        return;
      }

      // Canvas 크기 조절
      const MAX_HEIGHT = 800;
      const MAX_WIDTH = 800;

      const resizedCanvas = document.createElement('canvas');
      const ctx = resizedCanvas.getContext('2d');
      if (!ctx) {
        console.warn('Failed to get canvas context');
        return;
      }

      resizedCanvas.width = MAX_WIDTH;
      resizedCanvas.height = MAX_HEIGHT;
      ctx.drawImage(croppedCanvas, 0, 0, MAX_WIDTH, MAX_HEIGHT);

      // Canvas를 이미지로 변환하여 압축 && 이미지 품질 설정
      const resizedImage = resizedCanvas.toDataURL('image/jpeg', 0.8);

      onUpload((prevList: any) => {
        if (Array.isArray(prevList)) {
          return prevList.map(item =>
            item.key === key ? { ...item, croppedImage: resizedImage } : item
          );
        } else if (
          prevList &&
          typeof prevList === 'object' &&
          !Array.isArray(prevList)
        ) {
          return { ...prevList, croppedImage: resizedImage };
        } else {
          return [];
        }
      });
    } catch (error) {
      console.error('Error during crop operation:', error);
    }
  };

  return { handleCrop };
};

export default useCropper;
