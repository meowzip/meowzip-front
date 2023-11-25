export interface DiaryPageProps {
  images?: string[];
  labels: {
    type: 'default' | 'text' | 'icon';
    content?: string;
    icon?: string;
  }[];
  content: string;
  profiles: {
    key: string;
    image: string;
    style: string;
    name: string;
    gender: 'female' | 'male';
  }[];
}
