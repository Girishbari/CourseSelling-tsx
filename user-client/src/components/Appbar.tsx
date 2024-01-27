import React, { useEffect } from "react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms";
import { useRecoilValue } from "recoil";
import { userLogged } from "../store/selectors";

function Appbar() {
  const navigate = useNavigate();
  const [ishidden, setHidden] = useState(false);
  const userEmail = useRecoilValue(userLogged);

  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);

  if (userEmail) {
    return (
      <nav className="fixed top-0 z-50 w-full bg-[#2F3C7E] shadow-lg ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <RxHamburgerMenu size={30} />
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  TeachCode
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <img
                className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300"
                src="https://cdn.pixabay.com/photo/2021/04/07/07/37/snake-6158325_1280.png"
                alt="Bordered avatar"
              />
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0 z-50 w-full bg-[#2F3C7E] shadow-lg ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <RxHamburgerMenu size={30} />
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  TeachCode
                </span>
              </a>
            </div>
            <div className="flex items-center">
              {/* <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300" src="https://cdn.pixabay.com/photo/2021/04/07/07/37/snake-6158325_1280.png" alt="Bordered avatar" /> */}

              <div className="flex items-center ms-3">
                <div>
                  <motion.button
                    type="button"
                    className="text-blue bg-white hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    type="button"
                    className="text-blue bg-white hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/register")}
                  >
                    SignUp
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Appbar;
