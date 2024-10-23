import { CatListObj } from '@/app/zip/catType';
import Topbar from '@/components/ui/Topbar';
import { useCats } from '@/hooks/useCats';
import { useRouter } from 'next/navigation';
import ZipCard from '@/components/zip/ZipCard';

interface OtherMemberZipModalProps {
  onClose: () => void;
  memberId: number;
  memberName: string;
}

const OtherMemberZipModal: React.FC<OtherMemberZipModalProps> = ({
  onClose,
  memberId,
  memberName
}) => {
  const router = useRouter();

  const { data: catList } = useCats({ page: 0, size: 10, id: memberId });

  const openDetailModal = (item: CatListObj) => {
    router.push(`/zip/${item.id}`);
  };

  return (
    <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title={`${memberName} 모음집`} />
        <Topbar.Empty />
      </Topbar>
      <section className="pb-30 h-screen bg-gr-50 px-4 pt-16">
        <div className="grid grid-cols-2 gap-4">
          {catList?.map((cat: CatListObj) => (
            <ZipCard
              key={cat.id}
              {...cat}
              onClick={() => openDetailModal(cat)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OtherMemberZipModal;
