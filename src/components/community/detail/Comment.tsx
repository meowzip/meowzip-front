import Profile from '@/components/ui/Profile';
import Image from 'next/image';
import Label from '@/components/ui/Label';
import { CommentType } from '@/types/communityType';

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div
      className={`${
        comment.type === 'reply' && 'pl-8'
      } flex items-start justify-between px-4`}
    >
      {/* <p>{comment.type}</p> */}
      <Profile
        items={[
          {
            id: 1,
            imageUrl: 'https://github.com/shadcn.png',
            style: 'w-10 h-10'
          }
        ]}
        lastLeft="left-[100px]"
      />
      {/* <Profile
          items={[
            {
              id: 1,
              imageUrl: comment.writerProfile,
              style: 'w-10 h-10'
            }
          ]}
          lastLeft="left-[100px]"
        /> */}
      <div className="w-[75%] text-sm">
        <div className="flex">
          <div className="text-bold pr-2">{comment.writerId}</div>
          {/* <Label type="badge" content="작성자" /> */}
        </div>
        {/* <div>{comment.commentId}</div> */}
        <div>{comment.content}</div>
        <div className="flex text-gr-500">
          <p>{comment.registerTime}</p>
          <button className="ml-5">답글 달기</button>
        </div>
      </div>
      <Image
        src="/images/icons/menu.svg"
        alt="calendar"
        width={24}
        height={24}
        className="h-6 w-6"
        // onClick={onClick}
      />
    </div>
  );
}
