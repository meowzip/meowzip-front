import Topbar from '@/components/ui/Topbar';
import { useEffect, useState } from 'react';
import { useCats } from '@/hooks/useCats';
import { Cat } from '@/types/cat';
interface SearchCatModalProps {
  setSearchCatModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaggedCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
}

export default function SearchCatModal({
  setSearchCatModal,
  setTaggedCatList
}: SearchCatModalProps) {
  const [catList, setCatList] = useState<Cat[]>([]);
  const { data: cats } = useCats({ page: 0, size: 10 });

  useEffect(() => {
    setCatList(cats);
  }, [cats]);

  const closeCurrentModal = () => setSearchCatModal(false);

  const selectCat = (cat: Cat) => {
    setTaggedCatList(prev => {
      if (prev.some(prevCat => prevCat.id === cat.id)) {
        return prev;
      } else {
        return [...prev, cat];
      }
    });
    closeCurrentModal();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm !== '') {
      const filteredAndSortedCats = catList
        .filter((cat: Cat) => cat.name.toLowerCase().includes(searchTerm))
        .concat(
          catList.filter(
            (cat: Cat) => !cat.name.toLowerCase().includes(searchTerm)
          )
        );
      setCatList(filteredAndSortedCats);
    } else {
      setCatList(catList);
    }
  };

  return (
    <article>
      <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto  bg-gr-white">
        <Topbar
          type="search"
          onClose={closeCurrentModal}
          onChange={handleOnChange}
        />
        <ul className="flex flex-col gap-2 px-2 py-2">
          {catList ? (
            <>
              {catList.map((cat: Cat) => (
                <li
                  key={cat.id}
                  className="flex items-center gap-4 py-2"
                  onClick={() => selectCat(cat)}
                >
                  <img
                    src={cat.imageUrl}
                    alt="cat-image"
                    className="h-12 w-12 rounded-full border"
                  />
                  <div className="flex gap-2">
                    <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
                    <img
                      src={`/images/icons/gender-${cat.sex}.svg`}
                      alt="tag cat"
                      className={`rounded-full ${
                        cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                      }`}
                    />
                  </div>
                </li>
              ))}
            </>
          ) : (
            <div>고양이가 없습니다.</div>
          )}
        </ul>
      </div>
    </article>
  );
}
