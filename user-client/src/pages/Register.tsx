import HOC from "../utils/HOC";
import { propsType } from "../utils/types";


function Register(props: propsType) {
  return (
    <>
      {props.content()}
    </>
  )

}

export default HOC(Register, "signup");
