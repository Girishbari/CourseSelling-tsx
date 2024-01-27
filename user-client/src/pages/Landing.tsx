import React from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../utils/Protected";
import { View, Purchased, ShowCourses, Appbar, Sidebar } from "../components"
import { Routes, Route } from 'react-router-dom';




function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <Sidebar />
      <div className=" py-5 z-0 sm:ml-72 lg:pl-5 ">
        <div className="p-10 min-h-screen mt-14">
          <ProtectedRoute>
            <Routes>
              <Route path="/viewcourses/:id" element={<View />} />
              <Route path='/purchasedcourses' element={<Purchased />} />
              <Route path="/" element={<ShowCourses />} />
            </Routes>

          </ProtectedRoute>
        </div>
      </div>

    </>
  )
}

export default Landing;