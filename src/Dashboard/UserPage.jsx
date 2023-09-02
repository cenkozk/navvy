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
import imageCompression from "browser-image-compression";
import "./custom-resizeble-styles.css";
import "./custom-grid-styles.css";
import {
  TbAspectRatio,
  TbLink,
  TbAbc,
  TbPhoto,
  TbMapPin,
  TbClipboardText,
  TbCloudCheck,
} from "react-icons/tb";
import DraggableGrid from "./DraggableGrid";
import urlMetadata from "url-metadata";
import extractUrls from "extract-urls";
import { useParams } from "react-router-dom";
import { supabase } from "../Supabase";

function UserPage() {
  const [selectedItem, setSelectedItem] = useState(0);
  const gridRef = useRef(null);
  const { userIdToSet } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", duration: 1.5 }}
      className="h-full relative w-screen flex justify-center items-center pl-16"
    >
      <div className="flex justify-center w-20 h-screen items-center relative flex-col gap-6">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          className="absolute top-10 w-24 h-auto"
        />
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
          <DraggableGrid
            userIdToSet={userIdToSet}
            isEditable={false}
            ref={gridRef}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UserPage;
