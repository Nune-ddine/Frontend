import { atom } from 'recoil';

export interface SnowmanState {
  name: string;
  image: string | null;
  posX: number | null;
  posY: number | null;
  quiz: string;
  answerId: number;
  content1: string;
  content2: string;
  content3: string;
}

export const snowmanState = atom<SnowmanState>({
  key: 'snowmanState', // 고유한 키 설정, 이걸로 외부에서 state를 사용한다.
  default: {
    name: '',
    image: '',
    posX: null,
    posY: null,
    quiz: '',
    answerId: 0,
    content1: '',
    content2: '',
    content3: '',
  },
});

export const snowmanExsitState = atom<boolean>({
  key: 'snowmanExistState',
  default: false,
});

export const shapeExistState = atom<boolean>({
  key: 'shapeExistState',
  default: false,
});
