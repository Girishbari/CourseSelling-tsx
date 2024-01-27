import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil"
import { courseFilter } from "../store/atoms";

export default function Filter() {
  const baseURL = "https://course-selling-tsx.vercel.app/"
  const Languages = ['Nextjs', 'Java', 'Golang', 'Javascript', 'Python']

  const [coursesList, setCoursesList] = useRecoilState(courseFilter)

  const handleFilter = async (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    try {
      const resp = await axios.get(`${baseURL}user/courses/${event.target.value}`)
      console.log(resp.data)
      setCoursesList({
        courses: resp.data.courseList,
        totalpages: coursesList.totalpages,
        courseslength: coursesList.courseslength,
        pageno: coursesList.pageno,
        perpage: coursesList.perpage
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <label htmlFor="lang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter a Language</label>
      <select id="lang"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        onChange={handleFilter}
      >
        <option defaultValue={''}>Choose a Language</option>
        {Languages.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </select>

    </>
  )
}