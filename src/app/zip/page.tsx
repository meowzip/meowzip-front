'use client';

import { ZipPageProps } from '@/app/zip/catType';
import { catsAtom } from '@/atoms/catsAtom';
import ZipCard from '@/components/zip/ZipCard';
import { getCatsOnServer } from '@/services/cat';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ZipPage = () => {
  const router = useRouter();

  const [cats, setCats] = useAtom(catsAtom);
  const [selectedModal, setSelectedModal] = useState({} as ZipPageProps);

  const { data: catData } = useQuery({
    queryKey: ['getCats'],
    queryFn: () => getCatsOnServer({ page: 0, size: 10 }),
    staleTime: 1000 * 60 * 10
  });

  useEffect(() => {
    if (catData) {
      setCats(catData);
    }
  }, [catData]);

  const openDetailModal = (item: ZipPageProps) => {
    setSelectedModal(item);
    router.push(`/zip/${item.id}`);
  };

  return (
    <>
      <h1 className="flex h-12 items-center px-4 text-heading-3 text-gr-900">
        모음집
      </h1>
      <section className="h-screen bg-gr-50 p-4">
        <div className="grid grid-cols-2 gap-4 ">
          {cats.map(cat => (
            <ZipCard
              key={cat.id}
              {...cat}
              onClick={() => openDetailModal(cat)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ZipPage;
