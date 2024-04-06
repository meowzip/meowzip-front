import { CatListObj } from '@/app/zip/catType';
import { atom } from 'jotai';

export const catsAtom = atom([] as CatListObj[]);
