import { atom } from "recoil";

export const locatorIdState = atom<string | undefined>({
  key: "locatorIdState",
  default: "1",
});

export interface QuizState {
  id: number;
  name: string;
  username: string;
  image: string;
  quiz: string;
  answerId: number;
  choice1: string;
  choice2: string;
  choice3: string;
  myAnswerId: number;
  ratio1: number;
  ratio2: number;
  ratio3: number;
  solved: boolean;
}

export const quizState = atom<QuizState>({
  key: "quizState",
  default: {
    id: 0,
    name: "",
    username: "",
    image: "",
    quiz: "",
    answerId: 0,
    choice1: "",
    choice2: "",
    choice3: "",
    myAnswerId: 0,
    ratio1: 0.0,
    ratio2: 0.0,
    ratio3: 0.0,
    solved: false,
  },
});
