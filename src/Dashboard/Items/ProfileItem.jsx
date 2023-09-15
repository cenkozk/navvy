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
  TbPhotoEdit,
} from "react-icons/tb";
import { nanoid } from "nanoid";
import urlMetadata from "url-metadata";
import { getDomain } from "tldts";
import hexToRgba from "hex-to-rgba";
import { Spotify } from "react-spotify-embed";
import Avatar from "react-avatar";
import imageCompression from "browser-image-compression";

function ProfileItem({ item, setLayout }) {
  function stopP(event) {
    event.stopPropagation();
  }

  const [name, setName] = useState(item.name ? item.name : ""); // Initialize with existing name if available
  const [picture, setPicture] = useState(
    item.image
      ? item.image
      : `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
  ); // Initialize with existing picture if available
  const [bio, setBio] = useState(item.bio ? item.bio : ""); // Initialize with existing bio if available
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (value, type) => {
    if (picture.includes("dicebear")) {
      setPicture(`https://api.dicebear.com/6.x/initials/svg?seed=${name}`);
    }

    var nameT = name;
    var bioT = bio;

    if (type == "name") {
      nameT = value;
      setName(value);
    } else {
      bioT = value;
      setBio(value);
    }

    // Update the layout state with the new data
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((layoutItem) => {
        if (layoutItem.i === item.i) {
          return { ...layoutItem, image: picture, name: nameT, bio: bioT };
        }
        return layoutItem;
      });
      return updatedLayout;
    });
  };

  useEffect(() => {
    if (name == "") {
      setName(item.name ? item.name : "");
    }
    setPicture(
      item.image
        ? item.image
        : `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
    );
    if (bio == "") {
      setBio(item.bio ? item.bio : "");
    }
  }, [item]);

  useEffect(() => {
    handleSave();
  }, [picture]);

  const handleInputChangeImage = async (e) => {
    var file = e.target.files[0];
    file = await resizeAndCompressImage(file);
    if (file) {
      setPicture(file, handleSave());
    }
  };

  async function resizeAndCompressImage(file) {
    // Define the desired width and height for the resized image
    const maxWidth = 768;
    const maxHeight = 768;

    // Compress the image using imageCompression library
    const compressedImage = await imageCompression(file, {
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      useWebWorker: true,
    });

    // Create a temporary image element
    const img = new Image();

    // Create a Promise to handle the image loading
    const imageLoaded = new Promise((resolve) => {
      img.onload = resolve;
    });

    // Set the source of the image to the compressed image data URL
    img.src = URL.createObjectURL(compressedImage);

    // Wait for the image to finish loading
    await imageLoaded;

    // Calculate the target width and height for the resized image while maintaining the aspect ratio
    let targetWidth, targetHeight;
    if (img.width > img.height) {
      targetWidth = maxWidth;
      targetHeight = (maxWidth * img.height) / img.width;
    } else {
      targetWidth = (maxHeight * img.width) / img.height;
      targetHeight = maxHeight;
    }

    // Create a canvas element to draw the resized image
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Get the 2D context of the canvas
    const ctx = canvas.getContext("2d");

    // Draw the resized image on the canvas
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // Get the data URL of the resized image
    const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.8); // Adjust the image quality as needed (0.8 is a recommended value)

    // Return the resized image data URL
    console.log("Resizing and compressing completed.");
    return resizedImageUrl;
  }

  const fileInputRef = useRef(null);

  const handlePhotoButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  return (
    <div
      className={`w-full h-full ${
        item.static ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div className="rounded-2xl w-full hover-img h-full max-h-full relative flex ml-auto bg-tranparent flex-col items-center justify-start py-8">
        <div className="flex flex-col items-center">
          <div className="rounded-full active:scale-95 duration-200 relative items-center flex justify-center w-[12vw] h-[12vw] mb-8">
            <img
              src={picture}
              className="w-full p-2 object-cover h-full rounded-full duration-200"
            />
            {!picture.includes("dicebear") && (
              <button className="w-full absolute h-full flex justify-end opacity-0 duration-200">
                <TbTrash
                  onClick={() => {
                    setPicture(
                      `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
                    );
                  }}
                  className=" text-white w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-gray-800 rounded-full p-1"
                />
              </button>
            )}
            <button
              onClick={() => {
                handlePhotoButtonClick();
              }}
              className="w-full absolute h-full flex items-center justify-center opacity-0 duration-200"
            >
              <TbPhotoEdit className="text-white w-10 h-10 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-200 rounded-full p-1" />
            </button>
          </div>
          <TextareaAutosize
            readOnly={false}
            type="text"
            className="w-full mb-2 overflow-y-auto bg-transparent text-center text-ellipsis px-6 leading-snug text-gray-800 text-5xl font-extrabold outline-none resize-none"
            placeholder="Your name"
            value={name}
            onChange={(e) => handleSave(e.target.value, "name")}
            maxLength={12}
          />
        </div>

        <TextareaAutosize
          readOnly={false}
          type="text"
          value={bio}
          className="w-full px-6 relative bg-transparent overflow-y-hidden text-center text-gray-700 text-xl font-regular outline-none resize-none"
          onChange={(e) => handleSave(e.target.value, "bio")}
          placeholder="Your bio..."
        />
      </div>
      {!item.static && (
        <TbAspectRatio className="absolute text-gray-800 w-7 h-7 rounded-full bottom-2 right-2 p-1" />
      )}
      <style>
        {`
        .hover-trigger:hover button {
          opacity: 1;
        }
      `}
      </style>
      <style>
        {`
       .hover-img:hover img{
        filter: brightness(0.6);
      }
      `}
      </style>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // Specify accepted file types (e.g., images)
        style={{ display: "none" }}
        onChange={handleInputChangeImage}
      />
    </div>
  );
}

export default ProfileItem;
