import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();



  return (
    <div className=" flex justify-between align-baseline bg-[#2F3C7E] pt-3 pr-5 pl-5 pb-1">
      <div className="flex w-[100px] border-black align-baseline gap-8">
        <p className="text-2xl font-semibold text-white">TeachCode</p>
      </div>
      <nav className="mt-1 text-white text-2xl font-semibold">
        <motion.div layoutId="underline" >
          <a href="" >Home</a>
        </motion.div>
        <a href="" className="ml-3">Create</a>
      </nav>
      <div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring"
          }}
          type="button" data-modal-target="authentication-modal" className="text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          onClick={() => navigate('/register')}
        >Register</motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring"
          }}
          type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => navigate("/login")}
        >Login
        </motion.button>
      </div>
    </div>
  )
}

export default Appbar;