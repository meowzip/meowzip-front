export interface DiaryPageProps {
  id: number;
  images?: string[];
  labels: {
    type: 'default' | 'text' | 'icon';
    content?: string;
    icon?: string;
  }[];
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
  catIds?: number[];
}
