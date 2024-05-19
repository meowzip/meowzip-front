import { DiaryObj } from '@/app/diary/diaryType';

export interface CatBaseType {
  id: number;
  imageUrl: string;
  name: string;
  isCoParented: boolean;
  dDay: number;
  sex: 'F' | 'M';
  isNeutered: 'Y' | 'N' | 'UNDEFINED';
  metAt: string;
  memo: string;
}

export interface CoParent {
  memberId: number;
  imageUrl: string;
  nickname: string;
  isRequested: boolean;
}

export interface CatListObj extends CatBaseType {
  coParentedCount: number;
}

export interface CatDetail extends CatBaseType {
  coParents: CoParent[];
  diaries: DiaryObj[];
}

export interface CatRegisterReqObj {
  croppedImage: string | null;
  image: string | null;
  isNeutered: string | null;
  memo: string;
  metAt: string;
  name: string;
  sex: string | null;
}
