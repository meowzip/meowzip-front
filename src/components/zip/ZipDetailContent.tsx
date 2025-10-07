import Link from 'next/link';
import ZipDetailCatCard from './ZipDetailCatCard';
import DetailCardLayout from './DetailCardLayout';
import ZipDetailCoParents from './ZipDetailCoParents';
import ZipDetailDiary from './ZipDetailDiary';
import { CoParent } from '@/types/cat';
import { DiaryObj } from '@/app/diary/diaryType';

interface ZipDetailContentProps {
  catDetail: any;
  onCoParentsClick: () => void;
  onShowCoParentsModal: () => void;
}

const ZipDetailContent = ({
  catDetail,
  onCoParentsClick,
  onShowCoParentsModal
}: ZipDetailContentProps) => {
  return (
    <section className="mx-auto flex h-screen max-w-[640px] flex-col gap-4 overflow-auto bg-gr-50 px-4 pb-32 pt-[72px]">
      <article className="rounded-16">
        <ZipDetailCatCard {...catDetail} />
      </article>
      <DetailCardLayout
        titleObj={{
          title: '공동집사',
          onClick: onCoParentsClick
        }}
        btnObj={
          catDetail.isOwner && {
            text: '함께할 공동집사 찾기',
            onClick: onShowCoParentsModal
          }
        }
      >
        <div className="flex pt-2">
          {catDetail.coParents?.map((coParent: CoParent) => (
            <ZipDetailCoParents key={coParent.memberId} {...coParent} />
          ))}
        </div>
      </DetailCardLayout>
      {catDetail.isAccessibleToDiaries && (
        <DetailCardLayout
          titleObj={{ title: '일지' }}
          btnObj={{
            text: '더보기',
            onClick: () => {} // router.push는 클라이언트에서
          }}
        >
          {catDetail.diaries?.slice(0, 3).map((diary: DiaryObj) => (
            <Link href={`/diary/${diary.id}`} key={diary.id}>
              <ZipDetailDiary {...diary} />
            </Link>
          ))}
        </DetailCardLayout>
      )}
    </section>
  );
};

export default ZipDetailContent;
