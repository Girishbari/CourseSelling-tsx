import React, { useEffect, useState } from "react";
import axios from "axios";


function Purchased() {
  const baseURL = "https://course-selling-tsx.vercel.app/";

  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    fetchPurchasedCourses();
  }, [])

  const fetchPurchasedCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}user/purchasedCourses`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem('localtoken')
        }
      })
      console.log(response.data.purchasedCourses)
      setPurchased(response.data.purchasedCourses)
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }


  return (
    <div className="h-screen   grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  place-content-center gap-2 ">
      {
        purchased ? (
          purchased.map((item) =>
          (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow "
              key={item._id}
            >
              <a href="">
                <img className=" object-contain h-60 w-96 " src={item.imageLink} alt="course image" />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {/* <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg> */}
                  </div>
                  {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span> */}
                </div>
                <div className="flex items-center justify-between">

                </div>
              </div>
            </div>
          )
          )
        ) : (
          <h1>No course purchased</h1>
        )
      }
    </div>
  )
}
export default Purchased;