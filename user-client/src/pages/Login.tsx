import HOC from "../utils/HOC";
import { propsType } from "../utils/types";


function Login(props: propsType) {
  return (
    <>
      {props.content()}
    </>
  )

}

export default HOC(Login, "login");
