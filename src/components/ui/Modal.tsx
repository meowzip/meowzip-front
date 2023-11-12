import React, { createRef, useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  contents: {
    title: string;
    body?: string;
    img?: string;
  };
  buttons: {
    variant: 'text' | 'primary' | 'secondary' | 'tertiary' | 'outline';
    size: 'lg' | 'md' | 'sm' | 'icon';
    content: string;
    style: string;
  }[];
  scrim: boolean;
  onClose: () => void;
}

const Modal = ({ contents, buttons, scrim, onClose }: ModalProps) => {
  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const bodyEl = document.body;
    const overflow = bodyEl?.style.overflow;
    bodyEl.style.overflow = 'hidden';

    return () => {
      bodyEl.style.overflow = overflow;
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] ${
        scrim && 'bg-scrim'
      }`}
    >
      <div
        ref={modalRef}
        className="absolute left-1/2 top-1/2 h-fit w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-gr-white px-4 pb-4 pt-6 text-left shadow-modal"
      >
        <section className="px-2 pb-6 pt-4 text-center">
          <h2 className="pb-2 text-center text-heading-3 text-gr-black">
            {contents.title}
          </h2>
          <h5 className="text-body-2 text-gr-600">{contents.body}</h5>
        </section>
        <section className="flex flex-col gap-2">
          {buttons.map(btn => (
            <Button
              key={btn.content}
              variant={btn.variant}
              size={btn.size}
              className={`${btn.style}`}
              onClick={onClose}
            >
              {btn.content}
            </Button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Modal;
