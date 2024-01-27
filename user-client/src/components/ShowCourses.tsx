import { useEffect, useState } from "react";
import Filter from "./Filter"
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil"
import { userState, courseFilter } from "../store/atoms";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { authResp } from "../utils/types";


interface RazorpayResponse {
  amount: number;
  orderID: string;
  // Add other properties based on the actual response structure
}


const loadScript = (src: any) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


{/* { {item.description.toString()}} ===  {String(item.price)} */ }


function ShowCourses() {
  const baseURL = "https://course-selling-tsx.vercel.app/";
  const userData = useRecoilValue(userState);
  const [coursesList, setCoursesList] = useRecoilState(courseFilter);
  const [purchasedCourses, setPurchasedCourses] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [])

  const fetchCourses = async () => {
    try {
      if (!localStorage.getItem('isLoggedIn')) throw new Error("user is not logged in")
      const response: authResp = await axios.get(`${baseURL}user/courses`, {
        params: {
          pageno: 1,
          skip: 0
        },
        headers: {
          authorization: "Bearer " + localStorage.getItem('localtoken')
        }
      })
      if ('courses' in response.data) {
        setCoursesList({
          courses: response.data?.courses,
          totalpages: response.data.totalpages,
          courseslength: response.data.courseslength,
          pageno: response.data.pageno,
          perpage: response.data.perpage
        })
      }


    } catch (error) {
      console.log(error)
      alert(error)
    }

  }

  const buyCourse = async (id: String) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    axios
      .post<RazorpayResponse>(
        `${baseURL}user/razorpay/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("localtoken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        var options = {
          key: "rzp_test_De1qw413NLBPEG", // Enter the Key ID generated from the Dashboard
          amount: res.data.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "TeachCode Corp",
          description: "Test Transaction",
          image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg",
          order_id: res.data.orderID,
          handler: function () {

            alert("transcation successfull");
            axios
              .post(
                `${baseURL}/user/courses/${id}`,
                {},
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("localtoken"),
                  },
                }
              )
              .then((res) => {
                console.log(res);
                setPurchasedCourses(res.data.purchasedcourse);
              });
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const renderCourses = coursesList.courses?.map((item) => {
    return (
      <motion.div
        className="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        key={String(item._id || '')}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Link to={`/viewcourses/${item._id}`}>
          <img className=" object-contain h-60 w-96 " src={String(item.imageLink)} alt="course image" />
        </Link>
        <div className="px-5 pb-5">
          <a href="">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
            </div>
            <p className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1.5 rounded h-10 overflow-hidden">{item.description.toString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs.{String(item.price)}</span>
            {item._id === purchasedCourses ? (
              <button className="bg-transparent hover:bg-[#2F3C7E] text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl ">View</button>
            ) : (
              <motion.button
                className="inset-0 bg-[#2F3C7E] px-5 py-2 text-white shadow-md rounded-2xl"
                onClick={() => buyCourse((item._id))}
                whileTap={{ scale: 0.7 }}
              >Buy now
              </motion.button>
            )

            }



          </div>
        </div>
      </motion.div>
    )
  })

  return (
    <div className="">

      <Filter />
      <div className=" h-[100%] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  place-content-center gap-2 ">
        {renderCourses}
      </div>
      <Pagination />
    </div>

  )
}

export default ShowCourses;