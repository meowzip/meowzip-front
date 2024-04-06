import { Button } from '@/components/ui/Button';
import React from 'react';

interface DetailCardLayoutProps {
  titleObj: {
    title: string;
    onClick?: () => void;
  };
  btnObj: {
    text: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

const DetailCardLayout = ({
  titleObj,
  btnObj,
  children
}: DetailCardLayoutProps) => {
  return (
    <section className="rounded-16 bg-gr-white">
      <h1
        className="px-5 pb-2 pt-5 text-heading-4 text-gr-900"
        onClick={() => titleObj.onClick && titleObj.onClick()}
      >
        {titleObj.title}
      </h1>
      <div className="px-5">{children}</div>
      <div className="mx-5 mb-6 mt-4 rounded-lg bg-gr-50">
        <Button
          variant="text"
          icon="/images/icons/right.svg"
          className="px-0 text-btn-2 text-gr-600"
          onClick={() => btnObj.onClick()}
        >
          {btnObj.text}
        </Button>
      </div>
    </section>
  );
};

export default DetailCardLayout;
