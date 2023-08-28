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
import ProfileItem from "./Items/ProfileItem";
import { supabase } from "../Supabase";

const DraggableGrid = forwardRef(({ user, userIdToSet }, ref) => {
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
  console.log(userIdToSet);

  const [uploading, setUploading] = useState(false);
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
        maxH: 5,
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
    handleUpload: async () => {
      try {
        setUploading(true);
        const navvlyId = userIdToSet; // Get navvly_id from userIdToSet

        // Update navvly_id in users_navvly table
        const { data: updateUserData, error: updateUserError } = await supabase
          .from("users_navvly")
          .upsert([
            {
              id: user.id,
              navvly_id: navvlyId,
            },
          ]);

        if (updateUserError) {
          console.error("Error updating user data:", updateUserError);
        } else {
          console.log("User data updated successfully:", updateUserData);
        }

        // Upload data to profiles_navvly table
        const { data: uploadData, error: uploadError } = await supabase
          .from("profiles_navvly")
          .upsert([
            {
              navvly_id: navvlyId,
              navvly_json: layout,
            },
          ]);

        if (uploadError) {
          console.error("Error uploading data:", uploadError);
        } else {
          console.log("Data uploaded successfully:", uploadData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setUploading(false);
      }
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
        return (
          <LinkItem
            item={item}
            handleDeleteItem={handleDeleteItem}
            setLayout={setLayout}
          />
        );
      case "text":
        return (
          <TextItem
            item={item}
            handleDeleteItem={handleDeleteItem}
            setLayout={setLayout}
          />
        );
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

  console.log(layout);

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
              <motion.div
                key={item.i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 1 }}
                className="hover-trigger cursor-grab active:cursor-grabbing rounded-2xl bg-white hover:bg-gray-100 active:bg-gray-100 active:shadow-2xl hover:shadow-2xl"
              >
                <ProfileItem item={item} setLayout={setLayout} />
              </motion.div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
});

export default DraggableGrid;
