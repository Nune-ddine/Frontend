// src/contexts/mapState.ts
import { atom } from 'recoil';

export const selectedMapState = atom<number>({
  key: 'selectedMapState',
  default: 1, // 초기 맵 번호
});

export const isManualSelectionState = atom<boolean>({
  key: 'isManualSelectionState',
  default: false, // 초기값은 랜덤 이동 가능 상태
});
