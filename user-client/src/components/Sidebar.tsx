import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil"
import { userLogged } from "../store/selectors";
import { userState } from "../store/atoms";
import { useNavigate } from "react-router-dom";



export default function Sidebar() {

  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState)



  const handleLogout = () => {
    try {
      setUserData({
        isLoading: false,
        isLoggedIn: false,
        userEmail: '',
        userName: ''
      })
      localStorage.removeItem('localtoken');
      localStorage.removeItem('email');
      localStorage.removeItem('isLoggedIn');
      navigate('/*')

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform -translate-x-full bg-[#36458f] border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-[#36458f] dark:bg-gray-800">
        <ul className="space-y-2 font-normal text-xl">
          <li className="border-b-[1px] border-gray-600 pb-5 ">
            <Link to={'/'} className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group">

              <span className="ms-3">Home</span>
            </Link>
            <Link to="/" className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group">

              <span className="ms-3">Courses</span>
            </Link>
            <span className="border-white"></span>
          </li>
          {userData.isLoggedIn ? (
            <li className="">
              <Link to="/purchasedcourses" className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group">

                <span className="ms-3">Purchases</span>
              </Link>
              <Link to={'/'} className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group">

                <span className="ms-3">Setting</span>
              </Link>

              <button onClick={handleLogout} className="w-full flex items-center py-2 px-5 rounded-lg text-white hover:bg-white hover:text-black group ">Logout</button>

            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </aside>
  )
}
