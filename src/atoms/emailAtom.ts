import { atom } from 'jotai';

export const emailAtom = atom('');

export const emailValidAtom = atom(get => {
  const email = get(emailAtom);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
});
