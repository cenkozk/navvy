import {
  Cross1Icon,
  PlusIcon,
  TextAlignJustifyIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";
import BasicInfo from "../Dashboard/BasicInfo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";
import { useInView } from "react-intersection-observer";

const DraggableList = ({ items, setSelectedItems, onReorder }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  // Function to handle item deletion
  const handleDeleteItem = (itemId) => {
    console.log("Delete");
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  // Function to handle updating URL
  const handleUpdateUrl = (itemId, newUrl) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, url: newUrl } : item
      )
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="draggable-list" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-none p-0 select-none"
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${item.id}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="p-4 md:w-80 w-auto border bg-white rounded-lg mb-4"
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-center items-center gap-2">
                          <img className=" h-6 w-6" src={item.icon} />
                          <p className="w-auto">{item.name}</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-6">
                          <div
                            onClick={() => {
                              handleDeleteItem(item.id);
                            }}
                            className="hover:bg-red-400 cursor-pointer active:bg-red-500 duration-150 rounded-md p-1"
                          >
                            <Cross1Icon />
                          </div>
                          <TextAlignJustifyIcon className="my-1" />
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">
                          Link
                        </label>
                        <input
                          class=" border border-gray-200 shadow-sm rounded-md w-auto text-sm p-3 px-3 borderfocus:outline-none focus:border-green-400"
                          type=""
                          placeholder="Link"
                          onChange={(e) =>
                            handleUpdateUrl(item.id, e.target.value)
                          }
                        />
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

function Links({ handleNextStep, handlePrevStep, setLinks }) {
  const [selectedItems, setSelectedItems] = useState([]);
  // You can use any api to generate list of countries
  const menuItems = [
    {
      id: 1,
      name: "Personal Website",
      url: "",
      icon: "https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg",
    },
    {
      id: 2,
      name: "X",
      url: "",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1024px-X_logo_2023.svg.png",
    },
    {
      id: 3,
      name: "Favourite Song | Spotify",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/836/PNG/512/Spotify_icon-icons.com_66783.png",
    },
    {
      id: 4,
      name: "Spotify Profile",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/836/PNG/512/Spotify_icon-icons.com_66783.png",
    },
    {
      id: 5,
      name: "Instagram",
      url: "",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png",
    },
    {
      id: 6,
      name: "LinkedIn",
      url: "",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    },
    {
      id: 7,
      name: "GitHub",
      url: "",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1024px-GitHub_Invertocat_Logo.svg.png",
    },
    {
      id: 8,
      name: "Medium",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/2997/PNG/512/medium_logo_icon_187624.png",
    },
    {
      id: 9,
      name: "YouTube",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/195/PNG/256/YouTube_23392.png",
    },
    {
      id: 10,
      name: "Facebook",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png",
    },
    {
      id: 11,
      name: "TikTok",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/2037/PNG/512/media_social_tiktok_icon_124256.png",
    },
    {
      id: 12,
      name: "Pinterest",
      url: "",
      icon: "https://cdn.icon-icons.com/icons2/114/PNG/512/pinterest_19134.png",
    },

    // Add more sites as needed
  ];
  const [state, setState] = useState(false);

  const handleSearch = (e) => {
    const menuEls = document.querySelectorAll(".menu-el-js");
    const searchVal = e.target.value.toLocaleLowerCase();

    menuEls.forEach((el) => {
      el.classList.remove("hidden");
      if (!el.textContent.toLocaleLowerCase().includes(searchVal)) {
        el.classList.add("hidden");
      }
    });
  };

  const handleReorder = (startIndex, endIndex) => {
    const reorderedItems = [...selectedItems];
    const [removed] = reorderedItems.splice(startIndex, 1);
    reorderedItems.splice(endIndex, 0, removed);
    setSelectedItems(reorderedItems);
  };

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { duration: 1, bounce: 0, ease: "easeInOut" },
          opacity: { duration: 0.01 },
        },
      };
    },
  };
  const [ref, inView] = useInView({});

  const isFormValid = () => {
    if (selectedItems.length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLinks(selectedItems);
  }, [selectedItems]);

  return (
    <div class="overflow-y-auto sm:max-w-xl flex flex-col h-[40rem] justify-between md:w-auto max-w-screen-md md:h-[40rem] w-auto p-12 bg-white rounded-xl z-30 shadow-xl mt-6 m-6 overflow-auto">
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={75}
          className="mx-auto mb-6"
        />
        <div class="text-center">
          <h2 class="mt-5 text-3xl font-bold text-gray-800">Edit Links</h2>
        </div>
        <div className="relative flex flex-col bg-white border rounded-lg mb-4 mx-auto mt-4 w-full">
          <button
            className="flex flex-row items-center content-between justify-between w-auto p-3 text-gray-500 cursor-pointer rounded-md shadow-sm outline-none focus:border-green-500"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setState(!state)}
          >
            <PlusIcon className="mr-1" />
            {"Add a Link"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 ml-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </button>
          {state ? (
            <div className="relative w-auto">
              <ul
                className="absolute w-full mt-3 bg-white border rounded-md shadow-2xl"
                role="listbox"
              >
                <div className="shadow flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 text-gray-500 w-full rounded-md outline-none"
                    onInput={handleSearch}
                  />
                </div>
                <div className="max-h-64 mt-2 overflow-y-auto">
                  {menuItems.map((el, idx) => (
                    <li
                      key={idx}
                      role="option"
                      onClick={() => {
                        const newItem = {
                          id: el.id,
                          name: el.name,
                          url: el.url,
                          icon: el.icon,
                        };

                        setSelectedItems((prevItems) => [
                          ...prevItems,
                          newItem,
                        ]);
                        setState(false);
                      }}
                      className="menu-el-js flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-green-600 hover:bg-green-50"
                    >
                      <div className="flex flex-row justify-center items-center">
                        <img width={20} className=" my-2 mx-2" src={el.icon} />
                        {el.name}
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        {selectedItems.length > 0 ? (
          <label class="text-sm underline-offset-2 underline mb-4 font-bold text-gray-500 tracking-wide">
            Drag and drop to order links.
          </label>
        ) : (
          <></>
        )}
        <div className="flex flex-col items-center justify-center w-full">
          {selectedItems.length === 0 ? (
            <div className="text-center">
              <motion.svg
                ref={ref}
                className="w-24 h-24 mr-20 text-green-500"
                viewBox="0 0 162 119"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate={inView ? "visible" : {}}
              >
                <motion.path
                  d="M0.913757 114.53C13.9807 116.216 32.3056 122.378 43.7012 113.083C51.0025 107.128 57.0714 99.6064 62.6869 92.0921C73.647 77.4257 81.4769 57.0014 83.9262 38.9656C86.7749 17.9886 65.2558 22.4197 58.3958 36.6239C48.6178 56.8698 53.4826 94.2165 79.0133 100.444C108.309 107.591 123.562 71.7844 130.096 49.9154C134.773 34.2631 153.849 -9.9389 143.644 2.81731C137.309 10.736 128.12 15.6577 122.008 23.6058C118.81 27.7641 121.911 27.9558 125.382 25.0963C131.067 20.4118 136.477 14.6482 140.667 8.60318C141.379 7.57589 145.275 0.763508 146.837 3.12604C151.902 10.7886 153.525 20.5514 158.568 28.4832"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  variants={draw}
                  custom={1}
                ></motion.path>
                <motion.path
                  d="M132.848 24.4348C141.945 26.8851 150.961 28.4036 160.05 30.4235C162.841 31.0437 159.046 30.7305 158.171 30.7851"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  variants={draw}
                  custom={2}
                ></motion.path>
              </motion.svg>
            </div>
          ) : (
            <></>
          )}
        </div>
        <DraggableList
          items={selectedItems}
          setSelectedItems={setSelectedItems}
          onReorder={handleReorder}
        />
      </div>

      <div className="flex flex-row md:gap-20 gap-20">
        <button
          onClick={handlePrevStep}
          class="my-5 md:w-20 w-full flex justify-center bg-green-500 text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150"
        >
          Prev
        </button>
        <button
          onClick={handleNextStep}
          class={`my-5 md:w-40 w-full flex justify-center  text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold active:bg-green duration-150 ${
            isFormValid()
              ? " bg-green-500 active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Links;
