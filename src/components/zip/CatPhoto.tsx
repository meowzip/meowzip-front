import Topbar from '../ui/Topbar';
// import ImageUploader from '@/components/diary/ImageUploader';
import { CatRegisterReqObj } from '@/app/zip/catType';
import { ImageUploadData } from '@/atoms/imageAtom';
import Image from 'next/image';
interface SignInMainProps {
  setStep: () => void;
  catData: CatRegisterReqObj;
  setCatData: (data: any) => void;
}

export default function CatPhoto({
  setStep,
  catData,
  setCatData
}: SignInMainProps) {
  const defaultImage: ImageUploadData = {
    key: 0,
    imageSrc:
      'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
    croppedImage: null
  };
  const catImages = [
    {
      key: 0,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 1,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 2,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 3,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 4,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 5,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 6,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <Topbar type="zip" title="고양이 등록(2/3)" onClick={setStep} />
      <section className="pt-20">
        <div className="flex items-center justify-center">
          <img
            className="rounded-16"
            src={defaultImage.imageSrc || ''}
            width={200}
            height={200}
            alt="고양이 사진"
          />
        </div>
      </section>
      <section className="px-6">
        <div className="py-4 text-center text-body-4 text-gr-black">
          고양이 대표 사진를 하나 선택하세요!
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex items-center justify-center rounded-3xl bg-gray-50">
            <Image
              src="/images/icons/camera.svg"
              width={24}
              height={24}
              alt="camera-image"
            />
          </div>
          {catImages.map(data => (
            <Image
              key={data.key}
              className="rounded-3xl"
              src={data.imageSrc}
              width={100}
              height={100}
              alt="고양이 사진"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
