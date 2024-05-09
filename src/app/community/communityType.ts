export interface FeedType {
  id: number;
  memberId: number;
  memberNickname: string;
  isMine: boolean;
  content: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}
