import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import { useRecoilState } from "recoil"
import { userState } from "../store/atoms";
import { SignupRequest, authResp, userStateType } from "../utils/types";

const HOC = (WrappedComponent: React.ComponentType<any>, entity: any) => {
  const someFun = (props: object) => {
    const baseURL = "https://server-rouge-phi.vercel.app/";
    const dataRef = useRef<SignupRequest>({
      username: "",
      password: ""
    })
    const [userData, setUserData] = useRecoilState<userStateType>(userState);
    const navigate = useNavigate();

    const handleClick = async () => {
      if (!dataRef.current.username || !dataRef.current.password) {
        alert('some fields are missing')
        return;
      }
      try {
        const response: authResp = await axios.post(`${baseURL}user/${entity}`, dataRef.current)
        // console.log(response.data)
        if ('token' in response.data && 'message' in response.data) {
          console.log(response.data.message)
          localStorage.setItem('localtoken', response.data.token);
        }
        localStorage.setItem('email', dataRef.current.username);
        localStorage.setItem('isLoggedIn', 'true')
        setUserData({
          isLoading: false,
          isLoggedIn: true,
          userEmail: dataRef.current.username,
          userName: dataRef.current.username.split("@")[0].toUpperCase()
        })
        navigate('/')
      } catch (error: any) {
        console.log(error.response?.data.message)
        alert(error.response?.data.message)
      }
    }

    const render = () => {
      return (
        <section >

          <motion.div
            initial={{ opacity: 0, scale: 5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            className="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-3">
            <a href="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              TeachCode
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up
                </h1>
                <div className="space-y-4 md:space-y-6" >
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email/username</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 "
                      placeholder="name@email.com"
                      required
                      onChange={(e) => dataRef.current.username = e.target.value}
                      defaultValue={dataRef.current.username}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required
                      onChange={(e) => dataRef.current.password = e.target.value}
                      defaultValue={dataRef.current.password}
                    />
                  </div>
                  {entity === 'login' ? (
                    <div>
                      <motion.button
                        type="button"
                        className="w-full bg-[#2F3C7E]  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleClick}
                        whileTap={{ scale: 0.9 }}
                      >Sign in</motion.button>
                      <p className="text-sm font-light mt-2 text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          onClick={() => navigate('/register')
                          } >Sign up</a>
                      </p>
                    </div>
                  ) :
                    (<div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="w-full bg-[#2F3C7E] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleClick}
                      >Sign Up

                      </motion.button>

                    </div>

                    )

                  }

                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )
    }
    return <WrappedComponent content={render} />
  }
  return someFun;
}

export default HOC;