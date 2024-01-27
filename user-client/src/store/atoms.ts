import { atom } from "recoil";
import { courseType, userStateType } from "../utils/types";

export const userState = atom({
  key: 'userState',
  default: {
    isLoading: false,
    isLoggedIn: false,
    userEmail: '',
    userName: ''
  },
});

export const courseFilter = atom({
  key: 'courseFilter',
  default: {} as courseType
})



