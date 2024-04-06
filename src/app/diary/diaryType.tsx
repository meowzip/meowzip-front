export interface DiaryPageProps {
  id: number;
  images?: string[];
  isFeed: boolean;
  isGivenWater: boolean;
  content: string;
  profiles: {
    id: string;
    image: string;
    style: string;
    name: string;
    gender: 'female' | 'male';
  }[];
  memberId: number;
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
