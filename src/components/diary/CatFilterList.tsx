import Filter from './Filter';
import FilterSkeleton from './FilterSkeleton';
import CatRegisterBtn from './CatRegisterBtn';
import Link from 'next/link';
import { InfiniteQueryResponse } from '@/types/infiniteListType';
import { CatListObj } from '@/types/cat';

interface Props {
  catList: InfiniteQueryResponse<CatListObj>;
  isLoading: boolean;
  selectedCatId: number | null;
  onSelect: (id: number | null) => void;
  catsRef: (node?: Element | null) => void;
}

const CatFilterList = ({
  catList,
  isLoading,
  selectedCatId,
  onSelect,
  catsRef
}: Props) => {
  return (
    <section className="flex h-28 justify-start overflow-scroll bg-gr-white px-2 scrollbar-hide">
      {isLoading ? (
        <FilterSkeleton />
      ) : catList?.pages[0]?.items?.length === 0 ? (
        <Link href="/cat-register" scroll={false}>
          <CatRegisterBtn onClick={() => {}} />
        </Link>
      ) : (
        <>
          <Filter
            key="all"
            id={-1}
            imageUrl="/images/icons/all-cats.svg"
            name="전체보기"
            isSelected={selectedCatId === null}
            onClick={() => onSelect(null)}
            coParentedCount={0}
          />
          {catList?.pages.map(page =>
            page?.items?.map((cat: any) => (
              <Filter
                key={cat.id}
                id={cat.id}
                imageUrl={cat.imageUrl}
                name={cat.name}
                isSelected={selectedCatId === cat.id}
                onClick={() => onSelect(cat.id)}
                coParentedCount={cat.coParentedCount}
              />
            ))
          )}
          <div ref={catsRef} className="h-20 bg-transparent" />
          <Link href="/cat-register" scroll={false}>
            <CatRegisterBtn />
          </Link>
        </>
      )}
    </section>
  );
};

export default CatFilterList;
