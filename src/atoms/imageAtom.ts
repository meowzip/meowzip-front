import { atom } from 'jotai';

export interface ImageUploadData {
  key: string;
  imageSrc: string | null;
  croppedImage: string | null;
}

export const profileImageAtom = atom<ImageUploadData[]>([
  { key: '1', imageSrc: null, croppedImage: null }
]);
export const diaryImageListAtom = atom<ImageUploadData[]>([
  { key: '1', imageSrc: null, croppedImage: null },
  { key: '2', imageSrc: null, croppedImage: null },
  { key: '3', imageSrc: null, croppedImage: null }
]);
export const feedImageListAtom = atom<ImageUploadData[]>([
  { key: '1', imageSrc: null, croppedImage: null },
  { key: '2', imageSrc: null, croppedImage: null },
  { key: '3', imageSrc: null, croppedImage: null }
]);
