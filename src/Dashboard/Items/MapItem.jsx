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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./CustomMapItem.css";

function LocationPicker({ onSaveLocation, pointer }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Handle click events on the map to select a location
  const handleMapClick = (event) => {
    setSelectedLocation(event.latlng);
  };

  // Handle saving the selected location
  const handleSaveLocation = () => {
    if (selectedLocation) {
      onSaveLocation(selectedLocation);
    }
  };

  return (
    <div
      className={`h-full w-full relative rounded-2xl pointer-events-${
        !pointer ? "auto" : "none"
      }`}
    >
      <MapContainer
        center={[51.505, -0.09]}
        className=" h-full w-full z-0 rounded-2xl"
        zoom={13}
        onClick={handleMapClick}
      >
        <TileLayer
          className=" h-full w-full z-0 rounded-2xl"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Display the selected location as a marker */}
        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>Your selected location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Button to save the selected location */}
    </div>
  );
}

function MapItem({ item, handleDeleteItem, updatePointerEventsEnabled }) {
  const [bgColor, setBgColor] = useState("#ffffff");
  console.log(item);

  function stopP(event) {
    event.stopPropagation();
  }

  const togglePointerEvents = () => {
    // Toggle the pointerEventsEnabled property
    updatePointerEventsEnabled(item.i);
  };

  const [savedLocations, setSavedLocations] = useState([]);

  // Callback to save a location
  const handleSaveLocation = (location) => {
    // You can save the location to your state or perform other actions here
    setSavedLocations([...savedLocations, location]);
  };

  return (
    <div
      style={{ backgroundColor: `${bgColor}10` }}
      className={`w-full h-full border rounded-2xl ${
        !item.isDraggable ? "border-black border-2" : "border-none"
      }`}
    >
      {/* Render the LocationPicker and pass the callback */}
      <LocationPicker
        onSaveLocation={handleSaveLocation}
        pointer={item.isDraggable}
      />
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
    </div>
  );
}

export default MapItem;
