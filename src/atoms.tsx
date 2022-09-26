import { atom } from "recoil";

export const navState = atom<"TODO" | "THEME" | "CLOCK">({
  key: "navState",
  default: "TODO",
});
