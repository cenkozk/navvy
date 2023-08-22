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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
  TbTrash,
} from "react-icons/tb";
import { nanoid } from "nanoid";
import LinkItem from "./Items/LinkItem";
import TextItem from "./Items/TextItem";
import ImageItem from "./Items/ImageItem";
import MapItem from "./Items/MapItem";

const DraggableGrid = forwardRef(({}, ref) => {
  const initialLayout = [
    {
      i: "profile",
      x: 0,
      y: 0,
      w: 3,
      h: 5,
      minH: 5,
      minW: 2,
      maxW: 5,
      maxH: 6,
      static: false,
    },
  ];

  const [layout, setLayout] = useState(initialLayout);

  useImperativeHandle(ref, () => ({
    handleAddItem: (width, height, type, link) => {
      // Calculate the new x and y positions for the new item
      const newX = Math.max(...layout.map((item) => item.x + item.w));

      // Generate a new item with a unique key
      const newItem = {
        i: nanoid(3),
        x: newX,
        y: Infinity,
        w: width,
        h: height,
        minW: 2,
        maxW: 4,
        minH: 2,
        maxH: 4,
        type: type,
        link: link,
        isDraggable: true,
      };

      // Update the layout state by adding the new item
      setLayout((prevLayout) => [...prevLayout, newItem]);
    },
    handleAddTextItem: (width, height, type) => {
      // Calculate the new x and y positions for the new item
      const newX = Math.max(...layout.map((item) => item.x + item.w));

      // Generate a new item with a unique key
      const newItem = {
        i: nanoid(3),
        x: newX,
        y: Infinity,
        w: width,
        h: height,
        minW: 1,
        maxW: 4,
        minH: 1,
        maxH: 4,
        type: type,
        isDraggable: true,
      };

      // Update the layout state by adding the new item
      setLayout((prevLayout) => [...prevLayout, newItem]);
    },
    handleAddImageItem: (width, height, type, image) => {
      // Calculate the new x and y positions for the new item
      const newX = Math.max(...layout.map((item) => item.x + item.w));

      // Generate a new item with a unique key
      const newItem = {
        i: nanoid(3),
        x: newX,
        y: Infinity,
        w: width,
        h: height,
        minW: 1,
        maxW: 4,
        minH: 2,
        maxH: 4,
        type: type,
        image: image,
        isDraggable: true,
      };

      // Update the layout state by adding the new item
      setLayout((prevLayout) => [...prevLayout, newItem]);
    },
    handleAddMapItem: (width, height, type) => {
      // Calculate the new x and y positions for the new item
      const newX = Math.max(...layout.map((item) => item.x + item.w));

      // Generate a new item with a unique key
      const newItem = {
        i: nanoid(3),
        x: newX,
        y: Infinity,
        w: width,
        h: height,
        minW: 1,
        maxW: 4,
        minH: 2,
        maxH: 4,
        type: type,
        isDraggable: true,
      };

      // Update the layout state by adding the new item
      setLayout((prevLayout) => [...prevLayout, newItem]);
    },
  }));

  const handleLayoutChange = (newLayout) => {
    // Update the layout state while preserving additional properties like 'type'
    const updatedLayout = newLayout.map((newItem) => {
      const existingItem = layout.find((item) => item.i === newItem.i);
      return {
        ...existingItem,
        ...newItem,
      };
    });

    setLayout(updatedLayout);
  };

  const handleDeleteItem = (itemToRemove) => {
    // Filter out the item to remove from the layout
    const newLayout = layout.filter((item) => item.i !== itemToRemove.i);

    // Update the layout state without the removed item
    setLayout(newLayout);
  };

  function updatePointerEventsEnabled(itemId) {
    // Find the layout item by itemId and update its pointerEventsEnabled property
    setLayout((prevLayout) =>
      prevLayout.map((item) =>
        item.i === itemId ? { ...item, isDraggable: !item.isDraggable } : item
      )
    );
  }

  const parentRef = useRef(null); // Create a ref for the parent element
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Get the initial width of the parent element
    if (parentRef.current) {
      setContainerWidth(parentRef.current.offsetWidth);
    }

    // Add event listener for resize
    const handleResize = () => {
      if (parentRef.current) {
        setContainerWidth(parentRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function GridItemHandler(item, handleDeleteItem, updatePointerEventsEnabled) {
    switch (item.type) {
      case "link":
        return <LinkItem item={item} handleDeleteItem={handleDeleteItem} />;
      case "text":
        return <TextItem item={item} handleDeleteItem={handleDeleteItem} />;
      case "image":
        return <ImageItem item={item} handleDeleteItem={handleDeleteItem} />;
      case "map":
        return (
          <MapItem
            item={item}
            handleDeleteItem={handleDeleteItem}
            updatePointerEventsEnabled={updatePointerEventsEnabled}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div
      ref={parentRef} // Assign the ref to the parent element
      className="container w-full mx-auto"
    >
      <div className="w-full ">
        <GridLayout
          className="layout grid"
          layout={layout}
          cols={9}
          width={containerWidth}
          rowHeight={75}
          onLayoutChange={handleLayoutChange}
          margin={[30, 30]}
          isBounded={false}
          useCSSTransform={true}
          compactType={"vertical"}
        >
          {layout.map((item) => {
            return item.i !== "profile" ? (
              <motion.div
                key={item.i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 1 }}
                style={{
                  boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.10)",
                }}
                className={`cursor-grab bg-white active:cursor-grabbing hover-trigger border text-white rounded-2xl`}
              >
                {GridItemHandler(
                  item,
                  handleDeleteItem,
                  updatePointerEventsEnabled
                )}
              </motion.div>
            ) : (
              <div
                key={item.i}
                className="relative hover-trigger cursor-grab active:cursor-grabbing w-full h-full rounded-2xl bg-white hover:bg-gray-100 active:bg-gray-100 active:shadow-2xl hover:shadow-2xl"
              >
                <div className="rounded-2xl max-h-full relative flex ml-auto bg-tranparent flex-col items-center justify-start py-8">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://i1.sndcdn.com/artworks-tIkXzn6bIfFuy1IW-1DCyAg-t500x500.jpg"
                      className="rounded-full w-[12vw] mb-8"
                    ></img>
                    <TextareaAutosize
                      type="text"
                      required
                      className="w-full mb-2 overflow-y-auto bg-transparent text-center text-ellipsis px-6 leading-snug text-gray-800 text-5xl font-extrabold outline-none resize-none"
                      placeholder="Your name"
                      maxLength={12}
                    />
                  </div>

                  <TextareaAutosize
                    required
                    className="w-full px-6 relative bg-transparent overflow-y-hidden text-center text-gray-700 text-xl font-regular outline-none resize-none"
                    placeholder="Your bio..."
                  />
                </div>
                <TbAspectRatio className="absolute text-gray-800 w-7 h-7 rounded-full bottom-2 right-2 p-1" />
                <style>
                  {`
        .hover-trigger:hover button {
          opacity: 1;
        }
      `}
                </style>
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
});

export default DraggableGrid;
