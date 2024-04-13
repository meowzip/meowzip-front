import Image from 'next/image';
import React from 'react';

const coParents = [
  { memberId: 1, imageUrl: 'https://github.com/shadcn.png', nickname: '민지' },
  { memberId: 2, imageUrl: 'https://github.com/shadcn.png', nickname: '해린' },
  { memberId: 3, imageUrl: 'https://github.com/shadcn.png', nickname: '소미' }
];

const FindCoParentsModal = () => {
  const requestCoParenting = (id: number) => {
    console.log('request coparenting', id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <section>검색 input</section>
      <ul className="p-4">
        {coParents.map(coParent => (
          <li
            key={coParent.memberId}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={coParent.imageUrl}
                alt="image"
                width={48}
                height={48}
                className="rounded-full"
              />
              <p className="text-body-2 text-gr-900">{coParent.nickname}</p>
            </div>
            <button
              className="flex h-[34px] w-20 items-center justify-center gap-[2px] rounded-[6px] bg-pr-500 text-btn-2 text-gr-white"
              onClick={() => requestCoParenting(coParent.memberId)}
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
      </ul>
    </div>
  );
};

export default FindCoParentsModal;
