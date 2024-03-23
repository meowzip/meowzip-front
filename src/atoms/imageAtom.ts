import { atom } from 'jotai';

export interface ImageUploadData {
  key: number;
  imageSrc: string | null;
  croppedImage: string | null;
}

export const profileImageAtom = atom([] as ImageUploadData[]);
export const diaryImageListAtom = atom([] as ImageUploadData[]);
export const feedImageListAtom = atom([] as ImageUploadData[]);
