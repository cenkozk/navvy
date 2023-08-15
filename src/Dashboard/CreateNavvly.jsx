import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

function CreateNavvly() {
  const tabItems = ["D", "M"];
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", duration: 1 }}
      className="h-full w-screen relative flex justify-center items-center p-16 py-16 "
    >
      <div className="flex justify-center items-center relative flex-col gap-6">
        <div className="h-auto relative flex flex-col items-center w-[4vw] bg-white border rounded-2xl drop-shadow-xl ">
          <div className="w-[2.5vw] h-[2.5vw] rounded-2xl m-2.5 border bg-white"></div>
          <div className="w-[2.5vw] h-[2.5vw] rounded-2xl m-2.5 border bg-white"></div>
          <div className="w-[2.5vw] h-[2.5vw] rounded-2xl m-2.5 border bg-white"></div>
          <div className="w-[2.5vw] h-[2.5vw] rounded-2xl m-2.5 border bg-white"></div>
        </div>
        <div className="h-auto relative flex flex-col items-center w-[4vw] bg-white border rounded-2xl drop-shadow-xl ">
          <div className="px-4">
            <ul
              role="tablist"
              className="flex flex-col max-w-screen-xl mx-auto px-3 items-center overflow-x-auto text-sm rounded-lg sm:flex"
            >
              {tabItems.map((item, idx) => (
                <li key={idx} className="py-2.5">
                  <button
                    role="tab"
                    aria-selected={selectedItem == idx ? true : false}
                    aria-controls={`tabpanel-${idx + 1}`}
                    className={`w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-xl duration-150 active:scale-90 font-medium ${
                      selectedItem == idx
                        ? "bg-gray-800 text-white shadow-sm active:bg-gray-600"
                        : "text-gray-500 hover:text-gray-800 active:bg-gray-200"
                    }`}
                    onClick={() => setSelectedItem(idx)}
                  >
                    {item == "D" ? (
                      <DesktopIcon className="w-[1.1vw] h-[1.1vw]" />
                    ) : (
                      <MobileIcon className="w-[1.1vw] h-[1.1vw]" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative text-gray-500 sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <select
                value={tabItems[selectedItem]}
                className="p-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600"
                onChange={(e) =>
                  setSelectedItem(tabItems.indexOf(e.target.value))
                }
              >
                {tabItems.map((item, idx) => (
                  <option key={idx} idx={idx}></option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ width: "85vw", height: "90vh" }}
        animate={
          selectedItem == 0
            ? { width: "85vw", height: "90vh" }
            : { width: "30vw", height: "90vh" }
        }
        className="relative flex flex-row ml-12 bg-white border rounded-2xl drop-shadow-xl "
      >
        <div className="bg-red-400 rounded-2xl border h-full w-full"></div>
        <div className="bg-green-400 rounded-2xl h-full w-full"></div>
        <div className="bg-gray-400 rounded-2xl h-full w-full"></div>
      </motion.div>
    </motion.div>
  );
}

export default CreateNavvly;
