import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaLock, FaUnlock, FaFileVideo } from "react-icons/fa";
import axios from "axios";



export default function View() {
  const { id } = useParams();
  const baseURL = "https://server-rouge-phi.vercel.app/";


  const handleBuy = async () => {
    try {
      const response = await axios.post(`${baseURL}user/courses/${id}`, {}, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("localtoken")
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <div className="relative mt-10 sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-left text-gray-500 lg: ">
          <tbody >
            <tr className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <FaFileVideo size={30} title="Demo 1" cursor={''} /> Demo 1
              </th>
              <td className="px-6 py-4 text-center">
                <a href="" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <FaUnlock size={20} />
                </a>
              </td>

            </tr>
            <tr className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <FaFileVideo size={30} title="Demo 2" /> Demo 2
              </th>
              <td className="px-6 py-4 text-right">
                <a href="" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <FaLock size={20} />

                </a>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )

}
