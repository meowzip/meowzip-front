export interface DiaryPageProps {
  pk: number;
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
}

export interface DiaryRegisterReqObj {
  isGivenWater: boolean;
  isFeed: boolean;
  content: string;
  caredDate: string;
  caredTime: string;
  catIds?: number[];
}
