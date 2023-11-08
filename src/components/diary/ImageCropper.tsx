import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  imageSrc: string;
}

const ImageCropper = ({ imageSrc }: ImageCropperProps) => {
  const imageElement = useRef(null);

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

  return (
    <div className="h-screen w-screen bg-gr-white">
      <Image
        ref={imageElement}
        src={imageSrc}
        alt="cropped-image"
        width={24}
        height={24}
      />
    </div>
  );
};

export default ImageCropper;
