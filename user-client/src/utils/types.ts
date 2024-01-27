import { ReactNode } from "react";

export type userStateType = {
  isLoading: boolean,
  isLoggedIn: boolean,
  userEmail: string,
  userName: string
}

export type SignupRequest = {
  username: string;
  password: string;
};

export type propsType = {
  content: () => void;
}

interface dataType {
  message: string,
  token: string
}


export type authResp = {
  config: {},
  data: dataType | courseType,
  headers: {},
  request: {},
  status: Number,
  statusText: String
}

export type courseObj = {
  description: Number
  imageLink: string
  price: Number
  published: boolean
  title: String
  __v: 0
  _id: String
}

export type courseType = {
  courses: courseObj[] | []
  courseslength: number
  pageno: number
  perpage: number
  totalpages: number
}

// export interface courseFilterType extends courseType {
//   defaultCourseList: any[];
// }

