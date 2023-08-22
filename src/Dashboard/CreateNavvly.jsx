import {
  DesktopIcon,
  FrameIcon,
  ImageIcon,
  Link2Icon,
  MobileIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import GridLayout from "react-grid-layout";

import "./custom-resizeble-styles.css";
import "./custom-grid-styles.css";

import {
  TbAspectRatio,
  TbLink,
  TbAbc,
  TbPhoto,
  TbMapPin,
  TbClipboardText,
} from "react-icons/tb";
import DraggableGrid from "./DraggableGrid";
import urlMetadata from "url-metadata";
import extractUrls from "extract-urls";

function CreateNavvly({ userIdToSet }) {
  const tabItems = ["D", "M"];
  const [selectedItem, setSelectedItem] = useState(0);
  const [avatar, setAvatar] = useState(
    "https://i1.sndcdn.com/artworks-tIkXzn6bIfFuy1IW-1DCyAg-t500x500.jpg"
  );
  const [name, setName] = useState(userIdToSet);
  const [description, setDescription] = useState("");
  const gridRef = useRef(null);
  const linkRef = useRef(null);

  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    if (inputValue != "") {
      setInputValue("");
    }
    setInputVisible((prev) => !prev);
    if (linkRef.current) {
      linkRef.current.focus();
    }
  };
  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputBlur = () => {
    // Validate the input value as a URL using the extract-urls package
    if (inputValue != "") {
      const urls = extractUrls(inputValue);

      if (urls.length > 0) {
        // Set the first valid URL found
        gridRef.current.handleAddItem(2, 2, "link", urls[0]);
      }
    }
    setInputValue("");
    // Close the input bar
    setInputVisible(false);
  };

  const handleInputPaste = (event) => {
    // Validate the input value as a URL using the extract-urls package
    const urls = extractUrls(event.clipboardData.getData("text"));

    if (urls.length > 0) {
      // Set the first valid URL found
      gridRef.current.handleAddItem(2, 2, "link", urls[0]);
    }
    setInputValue("");
    // Close the input bar
    setInputVisible(false);
  };

  const fileInputRef = useRef(null);

  const handlePhotoButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleInputChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        gridRef.current.handleAddImageItem(2, 3, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", duration: 1 }}
      className="h-full w-screen relative flex justify-center items-center pl-16"
    >
      <div className="flex justify-center items-center relative flex-col gap-6">
        <div className="h-auto z-50 relative flex flex-col items-center w-[4vw] bg-white border rounded-2xl drop-shadow-xl ">
          <button
            onClick={() => {
              handleButtonClick();
            }}
            className="w-[2.5vw] relative h-[2.5vw] flex items-center justify-center rounded-2xl m-2.5 border bg-white hover:bg-gray-100 duration-150 active:scale-90"
          >
            <TbLink className="w-[1.2vw] relative h-[1.2vw]" />
            <AnimatePresence>
              {isInputVisible && (
                <motion.input
                  ref={linkRef}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", duration: 1 }}
                  type="text"
                  autoFocus={true}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onPaste={handleInputPaste}
                  onSubmit={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleInputBlur();
                    }
                  }}
                  placeholder="Enter Your Link"
                  className="w-[15vw] h-[3vw] border z-30 left-[4vw] absolute t-0 px-4 py-3 text-gray-500 outline-none bg-gray-100 shadow-2xl rounded-2xl"
                />
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => {
              gridRef.current.handleAddTextItem(2, 1, "text");
            }}
            className="w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-2xl m-2.5 border bg-white hover:bg-gray-100 duration-150 active:scale-90"
          >
            <TbAbc className="w-[1.4vw] h-[1.4vw]" />
          </button>
          <button
            onClick={handlePhotoButtonClick}
            className="w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-2xl m-2.5 border bg-white hover:bg-gray-100 duration-150 active:scale-90"
          >
            <TbPhoto className="w-[1vw] h-[1vw]" />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*" // Specify accepted file types (e.g., images)
            style={{ display: "none" }}
            onChange={handleInputChangeImage}
          />
          <button
            onClick={() => {
              gridRef.current.handleAddMapItem(2, 3, "map");
            }}
            className="w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-2xl m-2.5 border bg-white hover:bg-gray-100 duration-150 active:scale-90"
          >
            <TbMapPin className="w-[1.1vw] h-[1.1vw]" />
          </button>
        </div>
        <div className="h-auto relative flex flex-col items-center w-[4vw] bg-white border rounded-2xl drop-shadow-xl">
          <div className="px-4">
            <ul
              role="tablist"
              className="flex flex-col max-w-screen-xl mx-auto items-center overflow-x-auto text-sm rounded-lg sm:flex"
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
              ></select>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ width: "100vw", height: "100vh" }}
        transition={{ type: "spring", duration: 2 }}
        animate={
          selectedItem == 0
            ? {
                width: "100vw",
                height: "100vh",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }
            : { width: "30vw", height: "90vh" }
        }
        className="relative z-10 flex ml-12 bg-white border rounded-2xl drop-shadow-xl "
      >
        <div
          className="draggableCss"
          class="rounded-2xl w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar p-8 relative"
        >
          <DraggableGrid ref={gridRef} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CreateNavvly;
