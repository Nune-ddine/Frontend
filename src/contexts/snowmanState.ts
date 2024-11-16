import { atom } from 'recoil';

export interface SnowmanState {
  name: string;
  image: string;
  posX: number;
  posY: number;
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
    posX: 0,
    posY: 0,
    quiz: '',
    answerId: 0,
    content1: '',
    content2: '',
    content3: '',
  },
});


export const selectedItemState = atom({
  key: 'selectedItemState',
  default: {
    imgSrc: '', // Image path of the clicked item
    name: '',   // Name of the clicked item
  },
});

export const isQuizModeState = atom({
  key: 'isQuizModeState',
  default: false,
});