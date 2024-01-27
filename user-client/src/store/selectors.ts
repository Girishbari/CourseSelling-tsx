import { selector } from "recoil";
import { courseFilter, userState } from "./atoms";

export const userLogged = selector({
  key: 'userLogged',
  get: ({ get }) => {
    const state = get(userState);
    return state.userEmail;
  },
});


