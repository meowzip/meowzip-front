import Topbar from '@/components/ui/Topbar';
import { useState } from 'react';

interface SearchCatModalProps {
  setSearchCatModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type Cat = {
  key: string;
  src: string;
  style: string;
  name: string;
  gender: 'male' | 'female';
};

export default function SearchCatModal({
  setSearchCatModal
}: SearchCatModalProps) {
  const [filteredCatList, setFilteredCatList] = useState<Cat[]>([]);
  const [showCatList, setShowCatList] = useState(false);

  const catList: Cat[] = [
    { key: '1', src: 'image', style: '', name: '냥이', gender: 'female' },
    { key: '2', src: 'image', style: '', name: '냥냥이', gender: 'male' },
    { key: '3', src: 'image', style: '', name: '냥냥냥이', gender: 'female' },
    { key: '4', src: 'image', style: '', name: '삼색이', gender: 'male' },
    { key: '5', src: 'image', style: '', name: '빈집이', gender: 'male' },
    { key: '6', src: 'image', style: '', name: '무', gender: 'female' },
    { key: '7', src: 'image', style: '', name: '야통이', gender: 'male' }
  ];

  const onClose = () => setSearchCatModal(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setShowCatList(true);

    if (searchTerm !== '') {
      const filteredAndSortedCats = catList
        .filter(cat => cat.name.toLowerCase().includes(searchTerm))
        .concat(
          catList.filter(cat => !cat.name.toLowerCase().includes(searchTerm))
        );
      setFilteredCatList(filteredAndSortedCats);
    } else {
      setFilteredCatList(catList);
    }
  };

  return (
    <article>
      <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto  bg-gr-white">
        <Topbar type="search" onClose={onClose} onChange={handleOnChange} />
        {showCatList && (
          <ul className="flex flex-col gap-2 px-2 py-2">
            {filteredCatList.map(cat => (
              <li key={cat.key} className="flex items-center gap-4 py-2">
                <img
                  src="/vercel.svg"
                  // src={cat.src }
                  alt="cat-image"
                  className="h-12 w-12 rounded-full border"
                />
                <div className="flex gap-2">
                  <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
                  <img
                    src={`/images/icons/gender-${cat.gender}.svg`}
                    alt="tag cat"
                    className={`rounded-full ${
                      cat.gender === 'female' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
