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

function LinkItem({ item, handleDeleteItem }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [linkName, setLinkName] = useState("Site Name");
  const [linkImage, setLinkImage] = useState("");
  const [linkDescription, setLinkDescription] = useState("Site Description");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [isSpotify, setIsSpotify] = useState(false);

  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#FFA500", // Orange
    "#000000", // Black
    "#FFFFFF",
  ];

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  useEffect(() => {
    const fetchAndStoreSiteInfo = async (link) => {
      var urlWithoutProtocol = link.replace(/^https?:\/\//i, "");
      urlWithoutProtocol = await getDomain(urlWithoutProtocol);
      if (!urlWithoutProtocol) return;
      if (urlWithoutProtocol == "spotify.com") {
        setIsSpotify(true);
      }

      // Fetch site metadata from the API
      urlMetadata(link, {
        requestHeaders: {},
      }).then(
        (metadata) => {
          setSiteInfo(metadata);
          if (metadata.name != "") {
            setLinkName(metadata.name);
          } else {
            if (metadata["og:site_name"] != "") {
              setLinkName(metadata["og:site_name"]);
            }
          }

          if (metadata.image != "") {
            setLinkImage(metadata.name);
          } else {
            if (metadata["og:image"] != "") {
              setLinkImage(metadata["og:image"]);
            }
          }

          if (metadata["description"] != "") {
            setLinkDescription(metadata["description"]);
          }

          //Disabled theme color extraction from sites.
          /*if (metadata["theme-color"] != "") {
            if (metadata["theme-color"].length <= 10) {
              setBgColor(hexToRgba(metadata["theme-color"], 0.1));
            } else {
              setBgColor(metadata["theme-color"]);
            }
          }*/
        },
        (err) => {
          console.log(err);
        }
      );

      // Fetch site icon
      try {
        const iconResponse = await fetch(
          `https://icon.horse/icon/${urlWithoutProtocol}`
        );
        setSiteIcon(iconResponse.url);
      } catch (error) {
        console.error("Error fetching site icon:", error);
      }
    };

    fetchAndStoreSiteInfo(item.link);
    console.log(siteIcon, siteInfo, linkName, linkDescription);
  }, [item.link]);

  function stopP(event) {
    event.stopPropagation();
  }

  return (
    <div
      style={{ backgroundColor: `${bgColor}10` }}
      className={`w-full h-full ${!isSpotify ? "rounded-2xl p-4" : ""}`}
    >
      {!isSpotify ? (
        <div className=" max-h-full flex items-start flex-col ">
          <div className="flex relative w-full flex-row gap-2">
            <img
              src={siteIcon}
              className="w-[2.5vw] mt-2 ml-2 h-[2.5vw] relative rounded-md"
            />
            <TextareaAutosize
              value={linkName}
              maxLength={50}
              onClick={stopP}
              className="w-full mt-1 h-min bg-transparent relative overflow-auto text-left p-1 px-2 outline-none rounded-md duration-300 hover:bg-[rgba(161,161,161,0.25)] text-gray-800 text-md font-bold resize-none"
            ></TextareaAutosize>
          </div>
          <div className="flex max-h-full overflow-auto gap-3 flex-row h-full w-full justify-around">
            <TextareaAutosize
              value={linkDescription}
              maxLength={50}
              onClick={stopP}
              className="w-full max-h-full h-auto mt-1 overflow-auto bg-transparent px-2 p-1 text-ellipsis relative text-left outline-none rounded-md duration-300 hover:bg-[rgba(161,161,161,0.25)] text-gray-800 text-sm font-regular resize-none"
            >
              {linkDescription}
            </TextareaAutosize>
            {linkImage != "" && (
              <div className="mt-1 rounded-2xl h-content max-h-full w-full">
                <img
                  className=" mt-1 object-cover w-full h-full rounded-2xl"
                  src={linkImage}
                />
              </div>
            )}
          </div>
          <button className="w-auto h-auto opacity-0 duration-200">
            <TbTrash
              onClick={() => {
                handleDeleteItem(item);
              }}
              className="absolute text-gray-800 w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-2 right-2 p-1"
            />
          </button>
          <button className="w-auto h-auto opacity-0 duration-200">
            <TbPalette
              onClick={() => {
                setPaletteOpen((prev) => !prev);
              }}
              className="absolute text-gray-800 w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-12 right-2 p-1"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", duration: 0.3 }}
              animate={{
                opacity: paletteOpen ? 1 : 0,
                scale: paletteOpen ? 1 : 0.8,
              }}
              className="absolute w-auto items-center justify-center grid grid-cols-2 p-2 gap-2 text-gray-800 h-auto z-50 drop-shadow-xl hover:scale-125 duration-150 bg-white rounded-2xl top-12 right-10"
            >
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`bg-red-400 rounded-2xl ${
                    color == "#FFFFFF" ? "border" : "border-none"
                  } hover:scale-150 h-4 w-4 duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </motion.div>
          </button>
          <TbAspectRatio className="absolute bg-white text-gray-800 w-7 h-7  rounded-full bottom-2 right-2 p-1" />
          <style>
            {`
    .hover-trigger:hover button {
      opacity: 1;
    }
  `}
          </style>
        </div>
      ) : (
        <div
          style={{
            pointerEvents: "none",
          }}
          className="h-full items-center justify-start w-full flex flex-col"
        >
          <Spotify
            wide={false}
            className="rounded-2xl h-[90%] w-full absolute z-10"
            link={item.link}
          ></Spotify>
        </div>
      )}
    </div>
  );
}

export default LinkItem;
