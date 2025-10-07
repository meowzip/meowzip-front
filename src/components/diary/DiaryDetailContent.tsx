import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import { CatType } from '@/types/cat';
import Image from 'next/image';

interface DiaryDetailContentProps {
  diaryDetail: any;
}

const DiaryDetailContent = ({ diaryDetail }: DiaryDetailContentProps) => {
  return (
    <div className="m-auto max-w-[640px]">
      <section className="flex flex-col gap-4 border-b border-gr-100 px-4 pb-8 pt-12">
        <h5 className="text-end text-body-4 text-gr-500">
          {diaryDetail?.memberNickname} • {diaryDetail?.caredTime}
        </h5>
        {diaryDetail?.images.length > 0 && (
          <div className="flex h-[300px] w-full">
            <Carousel images={diaryDetail?.images} style="rounded-16" />
          </div>
        )}
        <h4 className="w-full whitespace-pre-line text-body-3 text-gr-black">
          {diaryDetail?.content}
        </h4>
        <article className="mb-2 flex items-center justify-start gap-1">
          {diaryDetail?.isFeed && (
            <Label.Text
              content="🐟 사료"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
          {diaryDetail?.isGivenWater && (
            <Label.Text
              content="💧 물"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
        </article>
      </section>
      <section className="px-4 pb-[120px] pt-4">
        <h3 className="py-3 text-heading-5 text-gr-900">
          태그된 고양이
          <span className="pl-1 text-pr-500">
            {diaryDetail?.taggedCats?.length}
          </span>
        </h3>
        {diaryDetail?.taggedCats?.map((cat: CatType) => (
          <article key={cat.id} className="flex items-center gap-4 py-2">
            <Image
              src={cat.imageUrl}
              alt="cat-image"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <div className="flex items-center gap-2">
              <h4 className="text-body-3 text-gr-900">{cat.name}</h4>
              <Image
                src={`/images/icons/gender-${cat.sex}.svg`}
                alt="cat-gender"
                width={16}
                height={16}
                className={`rounded-full ${
                  cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                }`}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DiaryDetailContent;
