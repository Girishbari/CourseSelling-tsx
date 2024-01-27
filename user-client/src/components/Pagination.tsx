import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { courseFilter } from "../store/atoms";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Pagination() {
  const baseURL = "https://server-rouge-phi.vercel.app/";

  const [coursesList, setCoursesList] = useRecoilState(courseFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);

  let totalPages = [];
  for (var i = 1; i <= coursesList.totalpages; i++) {
    totalPages.push(i);
  }

  useEffect(() => {
    fetchCourses();
  }, [currentPage, skip]);

  const fetchCourses = async () => {
    try {
      if (!localStorage.getItem("isLoggedIn"))
        throw new Error("user is not logged in");
      const response = await axios.get(`${baseURL}user/courses`, {
        params: {
          pageno: currentPage,
          skip: skip,
        },
        headers: {
          authorization: "Bearer " + localStorage.getItem("localtoken"),
        },
      });
      setCoursesList({
        courses: response.data?.courses,
        totalpages: response.data.totalpages,
        courseslength: response.data.courseslength,
        pageno: response.data.pageno,
        perpage: response.data.perpage

      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderPageNumber = totalPages.map((index) => {
    let color = 'text-gray-600';
    if (index % 2 == 0) color = 'text-blue-600';

    return (
      <li key={index}>
        <a
          href=""
          className={`flex items-center justify-center px-3 h-8 leading-tight ${color} bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 `}
          onClick={() => handlePaginateClick(currentPage + 1, skip + 4)}
        >
          {index}
        </a>
      </li>
    );
  });

  const handlePaginateClick = (page: number, pagetoskip: number) => {
    if (page > 0 && page <= coursesList.totalpages) {
      setSkip(pagetoskip);
      setCurrentPage(page);

    } else {
      alert("cant go beyond")
      return;
    }
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm mx-auto mt-10">

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>

              <FaAngleLeft
                size={18}
                color="#2F3C7E"
                onClick={() => handlePaginateClick(currentPage - 1, skip - 4)}
              />
            </a>
          </li>
          {renderPageNumber}
          <li>
            <a href="" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <FaAngleRight
                size={18}
                color="#2F3C7E"
                onClick={() => handlePaginateClick(currentPage + 1, skip + 4)}
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
