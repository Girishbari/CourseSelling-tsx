import { useState } from "react";
// import img from "../assets/landing"
import { FaArrowRightLong } from "react-icons/fa6";


function ShowCourses() {
  const [courses, setCourses] = useState([]);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return <div className="md:h-screen">
    <Course />
  </div>
}

function Course() {
  return <div className="max-w-screen-xl grid gap-y-6 border-black bottom-3 px-4 py-8 mx-auto lg:grid-cols-3 justify-center  md:grid-cols-2  ">

    <div className="max-w-sm relative  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <span className="bg-red-300 absolute left-2 top-2 z-10 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">Not Published </span>
      <a href="#">
        <img className="rounded-t-lg" src={img} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Update info
          <FaArrowRightLong color="white" />
        </a>
      </div>
    </div>

  </div>
}

export default ShowCourses;