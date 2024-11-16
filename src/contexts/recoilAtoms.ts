import { atom } from "recoil";

export const snowmanState = atom<{ x: number; y: number } | null>({
  key: "snowmanState",
  default: null,
});

export const locatorIdState = atom<number | undefined>({
  key: "locatorIdState",
  default: 1,
});