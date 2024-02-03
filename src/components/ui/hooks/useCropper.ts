import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { ImageUploadData } from '@/atoms/imageAtom';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface CropperImageElement extends HTMLImageElement {
  cropper: Cropper;
}

const useCropper = (
  key: string,
  imageSrc: string | null,
  imageElement: MutableRefObject<CropperImageElement | null>,
  onUpload: Dispatch<SetStateAction<ImageUploadData[]>>
) => {
  useEffect(() => {
    if (imageElement.current && imageSrc) {
      const cropper = new Cropper(imageElement.current, {
        viewMode: 1,
        aspectRatio: 1,
        modal: true,
        background: false
      });

      return () => {
        cropper.destroy();
      };
    }
  }, [imageSrc]);

  const handleCrop = () => {
    if (imageElement.current) {
      const cropper = imageElement.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL('image/jpeg');

      onUpload(prevList =>
        prevList.map(item =>
          item.key === key ? { ...item, croppedImage } : item
        )
      );
    }
  };

  return { handleCrop };
};

export default useCropper;
