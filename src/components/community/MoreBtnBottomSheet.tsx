import ActionButton from '@/components/ui/ActionButton';
import BottomSheet from '@/components/ui/BottomSheet';
import Modal from '@/components/ui/Modal';
import { getCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

interface MoreBtnBottomSheetProps {
  type: 'community' | 'zip' | 'diary';
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  heightPercent: string[];
  name?: string;
  memberId?: number;
  onDelete?: () => void;
  onEdit?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  showWriteModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreBtnBottomSheet: React.FC<MoreBtnBottomSheetProps> = ({
  type,
  isVisible,
  setIsVisible,
  heightPercent,
  name,
  memberId,
  onDelete,
  onEdit,
  onBlock,
  onReport,
  showWriteModal
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body?: string;
    primaryBtn: { content: string; onClick: () => void };
  }>();

  const token = getCookie('Authorization');
  const decodedToken: { memberId: number } = jwtDecode(token);

  const openModalEdit = () => {
    setIsVisible(false);
    showWriteModal && showWriteModal(true);
    onEdit && onEdit();
  };
  const openModalDelete = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: '삭제하시겠습니까?',
      primaryBtn: {
        content: '삭제',
        onClick: () => {
          onDelete && onDelete(), setShowModal(false);
        }
      }
    });
  };
  const openModalReport = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: '해당 게시글을 \n 신고하시겠습니까?',
      primaryBtn: {
        content: '신고하기',
        onClick: () => {
          onReport && onReport(), setShowModal(false);
        }
      }
    });
  };
  const openModalBlock = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: `${name}님을 \n 차단하시겠습니까?`,
      body: '차단된 사용자의 게시글과 댓글을 회원님께 \n 더이상 표시하지 않습니다.',
      primaryBtn: {
        content: '차단하기',
        onClick: () => {
          onBlock && onBlock(), setShowModal(false);
        }
      }
    });
  };

  return (
    <>
      <BottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        topBar={true}
        heightPercent={heightPercent}
      >
        <div className="px-4">
          {decodedToken?.memberId === memberId || type === 'zip' ? (
            <>
              <ActionButton
                icon="/images/icons/edit.svg"
                content="수정하기"
                onClick={() => openModalEdit()}
              />
              <ActionButton
                icon="/images/icons/delete.svg"
                content="삭제하기"
                onClick={() => openModalDelete()}
              />
            </>
          ) : (
            <>
              <ActionButton
                icon="/images/icons/edit.svg"
                content="게시물 신고하기"
                onClick={() => openModalReport()}
              />
              <ActionButton
                icon="/images/icons/delete.svg"
                content="작성자 차단하기"
                onClick={() => openModalBlock()}
              />
            </>
          )}
        </div>
      </BottomSheet>

      {showModal && (
        <Modal
          contents={{ title: modalContent?.title, body: modalContent?.body }}
          scrim={true}
          buttons={[
            {
              variant: 'primary',
              size: 'lg',
              content: modalContent?.primaryBtn.content || '',
              style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700',
              onClick: modalContent?.primaryBtn.onClick
            },
            {
              variant: 'text',
              size: 'lg',
              content: '나중에 할게요',
              style: 'w-full rounded-[16px] px-4 py-2 text-gr-300',
              onClick: () => setShowModal(false)
            }
          ]}
        />
      )}
    </>
  );
};

export default MoreBtnBottomSheet;
