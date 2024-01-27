import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import { motion } from "framer-motion";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = React.useState("");

  return <div className="md: h-screen">
    <section className="mt-8">
      <div className="bg-white rounded-lg border-gray-800 py-5 px-4 mx-auto max-w-2xl md:px-10 ">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Course</h2>
        <div >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="md:col-span-2">

              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BsCloudUpload color="gray" size={30} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload Cover Photo</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

            </div>
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
            </div>
            <div className="w-full">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tech Stack</label>
              <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required />
            </div>
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
            </div>
            <div className="w-full">
              <label className="relative inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <motion.div
                  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.8 }}
                  className="w-10 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:bg-blue-600"></motion.div>
                <span className="ms-3 text-sm font-medium text-gray-900">Toggle to Publish</span>
              </label>
            </div>

          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring"
            }}
            type="submit"
            className=" bg-[#2F3C7E]  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-800">
            Create
          </motion.button>
        </div>
      </div>
    </section>
  </div>
}
export default CreateCourse;