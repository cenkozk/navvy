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
  TbMapPinCog,
} from "react-icons/tb";
import { nanoid } from "nanoid";
import urlMetadata from "url-metadata";
import { getDomain } from "tldts";
import hexToRgba from "hex-to-rgba";
import { Spotify } from "react-spotify-embed";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./CustomMapItem.css";

function Map({ setSavedLocation, setInitialCenter }) {
  const map = useMap();
  // Handle map moveend event
  const handleMapMoveEnd = () => {
    const updatedCenter = map.getCenter(); // Get the updated center coordinates
    setSavedLocation(updatedCenter); // Call the onSaveLocation callback with the updated coordinates
  };

  useEffect(() => {
    // Save the initial center when the component mounts
    setInitialCenter(map.getCenter());
  }, [map]);

  map.on("dragend", handleMapMoveEnd);

  // Clean up the event listener when the component unmounts
  return () => {
    map.off("dragend", handleMapMoveEnd);
  };

  return null;
}

function LocationPicker({ setSavedLocation, pointer, item }) {
  const [initialCenter, setInitialCenter] = useState(
    item.savedLocation ? item.savedLocation : [51.505, -0.09]
  );

  useEffect(() => {
    console.log(item.savedLocation ? item.savedLocation : [51.505, -0.09]);
    setInitialCenter(item.savedLocation ? item.savedLocation : [51.505, -0.09]);
  }, [item]);

  return (
    <div
      className={` h-full w-full rounded-2xl pointer-events-${
        !pointer && !item.static ? "auto" : "none"
      }`}
    >
      <MapContainer
        center={initialCenter}
        className="h-full w-full z-0 rounded-2xl"
        zoom={10}
      >
        <Map
          setSavedLocation={setSavedLocation}
          setInitialCenter={setInitialCenter}
        />
        <TileLayer
          className=" h-full w-full z-0 rounded-2xl"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      {/* Button to save the selected location */}
    </div>
  );
}

function MapItem({
  item,
  handleDeleteItem,
  updatePointerEventsEnabled,
  setLayout,
  isEditable,
}) {
  const [bgColor, setBgColor] = useState("#ffffff");

  function stopP(event) {
    event.stopPropagation();
  }

  const togglePointerEvents = () => {
    // Toggle the pointerEventsEnabled property
    updatePointerEventsEnabled(item.i);
  };

  const [savedLocation, setSavedLocation] = useState([]);

  // Use an effect to update the item when selectedLocation changes
  useEffect(() => {
    if (savedLocation != [] && isEditable) {
      // Update the item with the selected location
      // Update the text content in the layout state
      setLayout((prevLayout) => {
        const updatedLayout = prevLayout.map((layoutItem) => {
          if (layoutItem.i === item.i) {
            return { ...layoutItem, savedLocation: savedLocation };
          }
          return layoutItem;
        });
        console.log("map set", savedLocation);
        return updatedLayout;
      });
    }
  }, [savedLocation]);

  return (
    <motion.div
      style={{
        backgroundColor: `${bgColor}10`,
      }}
      className={`w-full relative overflow-hidden h-full border-2 rounded-2xl duration-200 ${
        !item.isDraggable && !item.static ? " shadow-2xl border-black" : ""
      }`}
    >
      {/* Render the LocationPicker and pass the callback */}
      <LocationPicker
        setSavedLocation={setSavedLocation}
        pointer={item.isDraggable}
        item={item}
      />
      <div className="w-full h-full absolute flex items-center top-0 pointer-events-none">
        <div className="w-16 drop-shadow-2xl mx-auto flex items-center justify-center relative h-16 rounded-full bg-blue-500/[0.5]">
          <div className="w-8 h-8 flex items-center drop-shadow-xl justify-center reltaive rounded-full bg-white">
            <div className="w-6 h-6 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
      <button className="w-auto h-auto opacity-0 duration-200">
        <TbTrash
          onClick={() => {
            handleDeleteItem(item);
          }}
          className="absolute text-gray-800 w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-2 right-2 p-1"
        />
        <TbMapPinCog
          onClick={() => {
            togglePointerEvents();
          }}
          className="absolute text-gray-800 w-7 h-7 active:scale-90 z-20 drop-shadow-md hover:scale-110 duration-150 bg-white rounded-full top-2 right-10 p-1"
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
    </motion.div>
  );
}

export default MapItem;
