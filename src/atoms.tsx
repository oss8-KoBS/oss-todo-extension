import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const currDate = new Date();
let afterDayDate = new Date();
afterDayDate.setDate(currDate.getDate() + 1);

export const navState = atom<"TODO" | "THEME" | "CLOCK">({
  key: "navState",
  default: "TODO",
});

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export interface IToDo {
  id: number;
  text: string;
  // expDate == null, expire date is not set.
  expDate: Date | null;
}
interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [{ id: 1, text: "Write To Do", expDate: currDate }],
    Doing: [{ id: 2, text: "Write Doing", expDate: afterDayDate }],
    Done: [{ id: 3, text: "Write Done", expDate: afterDayDate }],
  },
  effects_UNSTABLE: [persistAtom],
});
