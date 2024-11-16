import { atom } from "recoil";

export const snowmanLocState = atom<{ x: number; y: number } | null>({
  key: "snowmanLocState",
  default: null,
});

export const locatorIdState = atom<string | undefined>({
  key: "locatorIdState",
  default: undefined,
});