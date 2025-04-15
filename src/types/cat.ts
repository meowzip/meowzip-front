export type CatType = {
  id: string;
  imageUrl: string;
  style: string;
  name: string;
  sex: 'M' | 'F';
};

export interface CatFilterType {
  id: string;
  imageUrl: string;
  name: string;
  coParentedCount: number;
  dDay: number;
  sex: 'F' | 'M';
  isNeutered: 'Y';
}
