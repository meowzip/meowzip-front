import { atom, createStore } from 'jotai';

export const authStore = createStore();

export const sessionExpiredModalAtom = atom(false);
