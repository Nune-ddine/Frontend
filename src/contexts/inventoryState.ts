import { atom } from 'recoil';

// true/false를 담은 24칸의 배열
export const inventoryState = atom<boolean[]>({
   key: 'inventoryState',
   default: Array(24).fill(false),
   });
