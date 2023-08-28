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
import axios from "axios";

function LinkItem({ item, handleDeleteItem, setLayout }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [linkName, setLinkName] = useState("Site Name");
  const [linkImage, setLinkImage] = useState("");
  const [linkDescription, setLinkDescription] = useState("Site Description");
  const [bgColor, setBgColor] = useState(item.bgColor || "#ffffff");
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
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((layoutItem) => {
        if (layoutItem.i === item.i) {
          return { ...layoutItem, bgColor: color };
        }
        return layoutItem;
      });
      return updatedLayout;
    });
  };

  useEffect(() => {
    const fetchAndStoreSiteInfo = async (link) => {
      var urlWithoutProtocol = await getDomain(link);
      if (!urlWithoutProtocol) return;
      if (urlWithoutProtocol == "spotify.com") {
        setIsSpotify(true);
      }

      /*const metadataResponse = await axios.get(
        `http://localhost:5000/fetch-site-info?link=${link}`
      );*/
      /*const iconResponse = await axios.get(
        `http://localhost:5000/fetch-site-icon?link=${urlWithoutProtocol}`
      );*/

      //console.log(metadataResponse, iconResponse);

      //const metadata = metadataResponse.data;

      setSiteIcon(
        `https://corsproxy.io/?${encodeURIComponent(
          `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`
        )}`
      );
      // Update the text content in the layout state
      setLayout((prevLayout) => {
        const updatedLayout = prevLayout.map((layoutItem) => {
          if (layoutItem.i === item.i) {
            return {
              ...layoutItem,
              icon: `https://corsproxy.io/?${encodeURIComponent(
                `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`
              )}`,
            };
          }
          return layoutItem;
        });
        return updatedLayout;
      });

      const metadata = await urlMetadata(
        `https://cors-anywhere.herokuapp.com/${link}`,
        {
          requestHeaders: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36",
          },
        }
      );

      console.log(metadata);

      setSiteInfo(metadata);

      if (metadata["og:title"] != "") {
        setLinkName(metadata["og:title"]);
      }

      if (metadata.image != "") {
        setLinkImage(metadata.image);
      } else {
        if (metadata["og:image"] != "") {
          setLinkImage(metadata["og:image"]);
        }
      }

      if (metadata["description"] != "") {
        setLinkDescription(metadata["description"]);
      }

      /* try {
        //https://icon.horse/icon/${urlWithoutProtocol}
        fetch(
          `https://corsproxy.io/?${encodeURIComponent(
            `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`
          )}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result;
              

            reader.readAsDataURL(blob);
          });
      } catch (error) {
        console.error("Error fetching site icon:", error);
      }*/
    };

    fetchAndStoreSiteInfo(item.link);
  }, [item.link]);

  function stopP(event) {
    event.stopPropagation();
  }

  function handleNameAndDescriptionChange() {
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((layoutItem) => {
        if (layoutItem.i === item.i) {
          return {
            ...layoutItem,
            linkName: linkName,
            linkDescription: linkDescription,
          };
        }
        return layoutItem;
      });
      return updatedLayout;
    });
  }

  useEffect(() => {
    if (!isSpotify) return;

    // Embed the Spotify song using oEmbed (this could be done in your component)
  }, [isSpotify]);

  return (
    <div
      style={{ backgroundColor: `${bgColor}10` }}
      className={`w-full h-full z-50 ${!isSpotify ? "rounded-2xl p-4" : ""}`}
    >
      {!isSpotify ? (
        <div className=" max-h-full flex items-start flex-col ">
          <div className="flex relative w-full flex-row gap-2">
            {siteIcon != null ? (
              <img
                src={siteIcon}
                className="w-[2.5vw] mt-2 ml-2 h-[2.5vw] relative rounded-md"
              />
            ) : (
              <div class="w-[2.5vw] animate-pulse mt-2 ml-2 h-[2.5vw] flex items-center justify-center bg-gray-300 rounded">
                <svg
                  class="relative w-full p-2 h-full rounded-md text-gray-200 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            )}
            <TextareaAutosize
              value={linkName}
              onChange={(e) =>
                setLinkName(e.target.value, handleNameAndDescriptionChange())
              }
              maxLength={50}
              onClick={stopP}
              className="w-full mt-1 h-min bg-transparent relative overflow-auto text-left p-1 px-2 outline-none rounded-md duration-300 hover:bg-[rgba(161,161,161,0.25)] text-gray-800 text-md font-bold resize-none"
            ></TextareaAutosize>
          </div>
          <div className="flex max-h-full overflow-auto gap-3 flex-row h-full w-full justify-around">
            <TextareaAutosize
              value={linkDescription}
              onChange={(e) =>
                setLinkDescription(
                  e.target.value,
                  handleNameAndDescriptionChange()
                )
              }
              maxLength={50}
              onClick={stopP}
              className="w-full min-[2000px]:hidden max-h-full h-auto mt-1 overflow-auto bg-transparent px-2 p-1 text-ellipsis relative text-left outline-none rounded-md duration-300 hover:bg-[rgba(161,161,161,0.25)] text-gray-800 text-sm font-regular resize-none"
            >
              {linkDescription}
            </TextareaAutosize>
            {linkImage?.length > 0 && (
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
              initial={{ opacity: 0, scale: 0.8, display: "block" }}
              transition={{ type: "spring", duration: 0.3 }}
              animate={{
                opacity: paletteOpen ? 1 : 0,
                scale: paletteOpen ? 1 : 0.8,
                display: paletteOpen ? "" : "none",
              }}
              className="absolute w-auto items-center justify-center grid grid-cols-2 p-2 gap-2 text-gray-800 h-auto z-50 drop-shadow-xl hover:scale-125 duration-150 bg-white rounded-2xl top-12 right-10"
            >
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`bg-red-400 rounded-2xl ${
                    color == "#FFFFFF" ? "border" : "border-none"
                  } hover:scale-125 active:scale-100 h-4 w-4 duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </motion.div>
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
      ) : (
        <div
          style={{
            pointerEvents: "none",
          }}
          className="h-full border-none items-center rounded-2xl shadow-none justify-start w-full flex flex-col bg-[rgba(255,255,255,0)]"
        >
          <Spotify
            wide={false}
            className="rounded-2xl h-[90%] w-full absolute z-0"
            link={item.link}
          ></Spotify>
          <button className="w-auto h-auto opacity-0 duration-200">
            <TbTrash
              onClick={() => {
                handleDeleteItem(item);
              }}
              className="absolute text-gray-800 w-7 h-7 active:scale-90 z-50 pointer-events-auto drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-2 right-2 p-1"
            />
          </button>
          <button className="opacity-0 duration-150 z-50 ">
            <TbAspectRatio className="absolute bg-white z-50 text-gray-800 w-7 h-7 rounded-full bottom-2 right-2 p-1" />
          </button>
          <style>
            {`
        .hover-trigger:hover button {
          opacity: 1;
        }
      `}
          </style>
        </div>
      )}
    </div>
  );
}

export default LinkItem;
