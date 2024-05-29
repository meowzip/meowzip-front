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

export interface CommentType {
  type: string;
  commentId: number;
  writerId: string;
  writerNickname: string;
  content: string;
  writerProfile: string;
  registerTime: string;
}
