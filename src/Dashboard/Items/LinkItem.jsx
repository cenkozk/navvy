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
} from "react-icons/tb";
import { nanoid } from "nanoid";
import urlMetadata from "url-metadata";
import { getDomain } from "tldts";

function LinkItem({ item, handleDeleteItem }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [linkName, setLinkName] = useState("Site Name");
  const [linkDescription, setLinkDescription] = useState("Site Description");

  useEffect(() => {
    const fetchAndStoreSiteInfo = async (link) => {
      var urlWithoutProtocol = link.replace(/^https?:\/\//i, "");
      urlWithoutProtocol = await getDomain(urlWithoutProtocol);
      if (!urlWithoutProtocol) return;

      // Fetch site metadata from the API
      urlMetadata(link, {
        requestHeaders: {},
      }).then(
        (metadata) => {
          setSiteInfo(metadata);
          if (metadata["og:site_name"] != "") {
            setLinkName(metadata["og:site_name"]);
          }
          if (metadata["description"] != "") {
            setLinkDescription(metadata["description"]);
          }
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
    <a className="w-full h-full rounded-2xl">
      <div className=" max-h-full flex gap-2 items-start flex-col">
        <div className="flex relative flex-row">
          <div className="flex flex-col gap-2">
            <img
              src={siteIcon}
              className="w-[2.5vw] mt-2 ml-2 h-[2.5vw] relative rounded-md"
            />
            <TextareaAutosize
              value={linkName}
              maxLength={50}
              onClick={stopP}
              className="w-full h-auto bg-transparent z-10 relative overflow-auto text-left p-1 px-3 outline-none rounded-md duration-150 hover:bg-gray-100 text-gray-800 text-md font-bold resize-none"
            ></TextareaAutosize>
          </div>
          <button>Flex</button>
        </div>

        <TextareaAutosize
          value={linkDescription}
          maxLength={50}
          onClick={stopP}
          className="w-full h-full overflow-auto bg-transparent px-3 p-1 text-ellipsis relative text-left outline-none rounded-md duration-150 hover:bg-gray-100 text-gray-800 text-sm font-regular resize-none"
        >
          {linkDescription}
        </TextareaAutosize>
      </div>
      <TbAspectRatio className="absolute text-gray-800 w-7 h-7 bg-white rounded-full bottom-2 right-2 p-1" />
      <button className="w-auto h-auto opacity-0 duration-200">
        <TbTrash
          onClick={() => {
            handleDeleteItem(item);
          }}
          className="absolute text-gray-800 w-7 h-7 active:scale-90 duration-150 bg-white rounded-full top-2 right-2 p-1"
        />
      </button>
      <style>
        {`
        .hover-trigger:hover button {
          opacity: 1;
        }
      `}
      </style>
    </a>
  );
}

export default LinkItem;
