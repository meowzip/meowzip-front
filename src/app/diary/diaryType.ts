export interface DiaryObj {
  id: number;
  isGivenWater: boolean;
  isFeed: boolean;
  content: string;
  images?: string[];
  caredTime: string;
  memberId: number;
  memberNickname: string;
  taggedCats: TaggedCat[];
}

export interface DiaryRegisterReqObj {
  isGivenWater: boolean;
  isFeed: boolean;
  content: string;
  images: string[];
  caredDate: string;
  caredTime: string;
  taggedCats?: number[];
}

export interface TaggedCat {
  id: number;
  imageUrl: string;
  name: string;
  sex: 'F' | 'M';
}
