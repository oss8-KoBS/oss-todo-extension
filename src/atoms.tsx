import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const currDate = new Date();
let afterDayDate = new Date();
afterDayDate.setDate(currDate.getDate() + 1);

export const navState = atom<"TODO" | "THEME" | "CLOCK">({
  key: "navState",
  default: "TODO",
});

const { persistAtom: persistTodo } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export interface IToDo {
  id: number;
  text: string;
  // expDate == null, expire date is not set.
  expDate: Date | null;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [{ id: 1, text: "Write To Do", expDate: null }],
    Doing: [
      { id: 2, text: "Write Doing", expDate: null },
      { id: 4, text: "Type todo press enter", expDate: null },
    ],
    Done: [{ id: 3, text: "Write Done", expDate: null }],
  },
  effects_UNSTABLE: [persistTodo],
});

const { persistAtom: persistTheme } = recoilPersist({
  key: "themeLocal",
  storage: localStorage,
});

export const themeState = atom<
  | "DEFAULT"
  | "RED"
  | "BLACK"
  | "PURPLE"
  | "GREEN"
  | "PEACH"
  | "ORANGE"
  | "AVOCADO"
  | "PASTEL"
  | "KAKAO"
  | "CHRISTMAS"
  | "SKY"
>({
  key: "currentTheme",
  default: "DEFAULT",
  effects_UNSTABLE: [persistTheme],
});

export const dragBoard = atom<boolean>({
  key: "dragBoard",
  default: true,
});

export const dragCard = atom<boolean>({
  key: "dragCard",
  default: true,
});

export const addBoardDialog = atom<boolean>({
  key: "addBoardDialog",
  default: false,
});

export const editCardDialog = atom<number | null>({
  key: "editCardDialog",
  default: null,
});
