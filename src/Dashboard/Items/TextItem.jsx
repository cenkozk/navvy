import {
  Cross1Icon,
  DesktopIcon,
  FrameIcon,
  ImageIcon,
  Link2Icon,
  MobileIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import GridLayout from "react-grid-layout";

import "../custom-resizeble-styles.css";
import "../custom-grid-styles.css";
import {
  TbAspectRatio,
  TbLink,
  TbAbc,
  TbPhoto,
  TbMapPin,
  TbTrash,
  TbChevronsDownRight,
  TbPalette,
} from "react-icons/tb";
import { nanoid } from "nanoid";
import urlMetadata from "url-metadata";
import { getDomain } from "tldts";
import hexToRgba from "hex-to-rgba";
import { Spotify } from "react-spotify-embed";

function TextItem({ item, setLayout, handleDeleteItem }) {
  const [bgColor, setBgColor] = useState("#ffffff");
  console.log(item);

  function stopP(event) {
    event.stopPropagation();
  }

  const [textContent, setTextContent] = useState(item.textContent);

  const handleTextChange = (event) => {
    const newTextContent = event.target.value;
    setTextContent(newTextContent);

    // Update the text content in the layout state
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((layoutItem) => {
        if (layoutItem.i === item.i) {
          return { ...layoutItem, textContent: newTextContent };
        }
        return layoutItem;
      });
      return updatedLayout;
    });
  };

  return (
    <div
      style={{ backgroundColor: `${bgColor}10` }}
      className={`w-full h-full p-4 flex `}
    >
      <TextareaAutosize
        value={textContent}
        onChange={handleTextChange}
        placeholder="Type text here..."
        maxLength={500}
        onClick={stopP}
        className="w-full mt-0.5 rounded-xl max-h-full h-full bg-transparent relative overflow-auto text-left p-1 px-2 outline-none duration-300 hover:bg-[rgba(161,161,161,0.15)] text-gray-800 text-lg font-bold resize-none"
      ></TextareaAutosize>
      <button className="w-auto h-auto opacity-0 duration-200">
        <TbTrash
          onClick={() => {
            handleDeleteItem(item);
          }}
          className="absolute text-gray-800 w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-2 right-2 p-1"
        />
      </button>
      <button className="opacity-0 duration-150 ">
        <TbAspectRatio className="absolute bg-white text-gray-800 w-7 h-7 rounded-full bottom-2 right-2 p-1" />
      </button>
      <style>
        {`
      .hover-trigger:hover button {
        opacity: 1;
      }
    `}
      </style>
    </div>
  );
}

export default TextItem;
