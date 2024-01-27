import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const baseURL = "http://localhost:3001/"
  const [data, SetData] = useState({
    username: "",
    password: ""
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!data.username || !data.password) {
      alert('All fields are neccesary');
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    try {
      console.log(data)
      const resp = await fetch(`${baseURL}admin/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          username: data.username,
          password: data.password
        }
      })
      console.log(await resp.json());
      if (resp.ok) navigate("/")
    } catch (error) {
      console.log(error)
    }
  }


  return <section className="">
    <motion.div
      initial={{ opacity: 0, scale: 5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <div className="flex flex-col items-center mt-10 px-6 py-1 mx-auto md:h-screen lg:py-0">
        <a href="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          TeachCode
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6" >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                  onChange={(e) => SetData({ ...data, username: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  ref={inputRef}
                  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  onChange={(e) => SetData({ ...data, password: e.target.value })}
                />
              </div>
              <motion.button
                type="button"
                className="w-full bg-[#2F3C7E]  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileTap={{ scale: 0.9 }}
                onClick={handleLogin}
              >Sign in</motion.button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => navigate('/register')} >Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
}

export default Login;