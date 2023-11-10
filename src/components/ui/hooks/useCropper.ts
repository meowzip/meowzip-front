import { MutableRefObject, useEffect, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface CropperImageElement extends HTMLImageElement {
  cropper: Cropper;
}

const useCropper = (
  imageSrc: string | null,
  imageElement: MutableRefObject<CropperImageElement | null>
) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

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

      return setCroppedImage(croppedImage);
    }
  };

  return { handleCrop, croppedImage, setCroppedImage };
};

export default useCropper;
