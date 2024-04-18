'use client';

import { CoParent } from '@/app/zip/catType';
import BottomSheet from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import Topbar from '@/components/ui/Topbar';
import CoParentsRequestBottomSheet from '@/components/zip/CoParentsRequestBottomSheet';
import { useCoParents } from '@/hooks/useCats';
import { debounce } from 'lodash';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface FindCoParentsModalProps {
  setShowCoParentsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindCoParentsModal = ({
  setShowCoParentsModal
}: FindCoParentsModalProps) => {
  const [keyword, setKeyword] = useState('');
  const [requestBottomSheet, setRequestBottomSheet] = useState(false);
  const [coParentList, setCoParentList] = useState<CoParent[]>([]);
  const [coParent, setCoParent] = useState<CoParent>({} as CoParent);

  const { data: coParents, isError, isLoading } = useCoParents(keyword);

  useEffect(() => {
    setCoParentList(coParents?.items);
  }, [coParents]);

  const debounceNickname = useCallback(
    debounce(name => {
      setKeyword(name);
    }, 500),
    []
  );
  const handleNickname = (e: { target: { value: string } }) => {
    debounceNickname(e.target.value);
  };

  const requestCoParenting = (parent: CoParent) => {
    console.log('request coparenting', parent);
    setCoParent(parent);
    setRequestBottomSheet(true);
  };

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <section>
        <Topbar
          type="search"
          onClose={() => setShowCoParentsModal(false)}
          onChange={handleNickname}
        />
      </section>
      <ul className="p-4 pt-12">
        {coParentList ? (
          <>
            {coParentList?.map((coParent: CoParent) => (
              <li
                key={coParent.memberId}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={coParent.imageUrl || 'https://github.com/shadcn.png'}
                    alt="image"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                  <p className="text-body-2 text-gr-900">{coParent.nickname}</p>
                </div>
                <button
                  className="flex h-[34px] w-20 items-center justify-center gap-[2px] rounded-[6px] bg-pr-500 text-btn-2 text-gr-white"
                  onClick={() => requestCoParenting(coParent)}
                >
                  <p>요청</p>
                  <Image
                    src="/images/icons/plane.svg"
                    alt="send"
                    width={20}
                    height={20}
                  />
                </button>
              </li>
            ))}
          </>
        ) : (
          <div>공동집사가 없습니다.</div>
        )}
      </ul>

      <CoParentsRequestBottomSheet
        isVisible={requestBottomSheet}
        setIsVisible={setRequestBottomSheet}
        coParent={coParent}
      />
    </div>
  );
};

export default FindCoParentsModal;
