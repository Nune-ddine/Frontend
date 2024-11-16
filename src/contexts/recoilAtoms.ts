import { atom } from "recoil";

export const snowmanState = atom<{ x: number; y: number } | null>({
  key: "snowmanState",
  default: null,
});

export const locatorIdState = atom<string | undefined>({
  key: "locatorIdState",
  default: undefined,
});