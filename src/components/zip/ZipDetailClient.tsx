'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/ui/Topbar';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { deleteCat } from '@/services/cat';
import { useToast } from '@/components/ui/hooks/useToast';
import ZipDetailContent from './ZipDetailContent';
import CoParentsBottomSheet from './CoParentsBottomSheet';
import FindCoParentsModal from './FindCoParentsModal';

interface ZipDetailClientProps {
  catDetail: any;
  id: number;
}

const ZipDetailClient = ({ catDetail, id }: ZipDetailClientProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [coParentsBottomSheet, setCoParentsBottomSheet] = useState(false);
  const [showCoParentsModal, setShowCoParentsModal] = useState(false);

  const handleCoParentsClick = useCallback(() => {
    if (catDetail.coParents.length === 0) {
      toast({
        description: '공동집사가 없습니다.',
        duration: 1000
      });
      return;
    }
    setCoParentsBottomSheet(true);
  }, [catDetail.coParents, toast]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteCat(catDetail?.id);
      toast({ description: '삭제되었습니다.', duration: 1000 });
      router.replace('/zip');
    } catch (e) {
      toast({
        description: '삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
        duration: 1500
      });
    }
  }, [catDetail?.id, toast, router]);

  const handleEdit = useCallback(() => {
    router.push(`/zip/${id}/edit?catId=${catDetail?.id}`);
    setEditBottomSheet(false);
  }, [router, id, catDetail?.id]);

  return (
    <>
      <Topbar type="two">
        <Topbar.Back onClick={() => router.back()} />
        {catDetail?.isOwner ? (
          <Topbar.More onClick={() => setEditBottomSheet(true)} />
        ) : (
          <Topbar.Empty />
        )}
      </Topbar>
      <ZipDetailContent
        catDetail={catDetail}
        onCoParentsClick={handleCoParentsClick}
        onShowCoParentsModal={() => setShowCoParentsModal(true)}
      />
      <MoreBtnBottomSheet
        type="zip"
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={catDetail?.name}
        memberId={catDetail?.id}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <CoParentsBottomSheet
        isVisible={coParentsBottomSheet}
        setIsVisible={() => setCoParentsBottomSheet(!coParentsBottomSheet)}
        coParents={catDetail.coParents}
      />
      {showCoParentsModal && (
        <FindCoParentsModal
          setShowCoParentsModal={setShowCoParentsModal}
          catId={catDetail.id}
        />
      )}
    </>
  );
};

export default ZipDetailClient;
