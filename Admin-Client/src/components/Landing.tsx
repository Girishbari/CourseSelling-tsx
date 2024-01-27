import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      margin: 'auto',
      maxWidth: '100%',
      padding: '10px',
    }}>
      <section className=" md:h-screen">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Become the software engineer that companies love to hire</h1>

            <a href="" className=" bg-blue-600 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900" onClick={() => navigate("/register")}>
              Start now

            </a>
            <a href="" className="  inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white " onClick={() => (navigate('/login'))}>
              Login

            </a>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://cdn.pixabay.com/photo/2015/06/14/15/42/traffic-sign-809006_1280.jpg" alt="mockup" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing;