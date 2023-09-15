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
import axios from "axios";

const DraggableGrid = forwardRef(({ userIdToSet, isEditable, user }, ref) => {
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

  const [uploading, setUploading] = useState(false);
  const [layout, setLayout] = useState(initialLayout);

  const [userNotFound, setUserNotFound] = useState(false);
  const [navvly_json, setNavvly_json] = useState(null);

  useEffect(() => {
    console.log(userIdToSet);
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles_navvly")
          .select("navvly_json")
          .eq("navvly_id", userIdToSet)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
        }

        if (data && data.navvly_json) {
          setNavvly_json(data.navvly_json);
        } else {
          console.log("User not found.");
          setUserNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userIdToSet]);

  useEffect(() => {
    if (navvly_json) {
      setLayout(navvly_json);
    }
  }, [navvly_json]);

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
        maxW: 5,
        minH: 1,
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
        maxW: 9,
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
        minW: 2,
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
      // Replace 'YOUR_CLIENT_API_KEY' with your imgbb API key
      const API_KEY = import.meta.env.VITE_IMGBB_KEY;

      // Function to convert a data URL to a File object
      function dataURLtoFile(dataUrl, filename) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        // Create a File object
        return new File([u8arr], filename, { type: mime });
      }

      const uploadImagesToImgbox = async (layoutData) => {
        try {
          const updatedLayoutData = await Promise.all(
            layoutData.map(async (item) => {
              if (
                (item.type === "image" || item.i == "profile") &&
                item.image &&
                item.image.startsWith("data:image/jpeg;base64")
              ) {
                // Upload the image to imgbb
                //const imgbbUrl = await uploadImageToImgbb(item.image);

                async function uploadImage() {
                  let body = new FormData();
                  body.set("key", API_KEY);
                  body.append("image", dataURLtoFile(item.image, item.i));

                  return await axios({
                    method: "post",
                    url: "https://api.imgbb.com/1/upload",
                    data: body,
                  });
                }

                item.image = (await uploadImage()).data.data.url;
                console.log(item.i + " uploaded successfully.");
              }

              return item;
            })
          );

          return updatedLayoutData;
        } catch (error) {
          console.error("Error uploading images to Imgbox:", error.message);
          // Handle the error appropriately, e.g., by returning an error object or re-throwing the error.
          throw error;
        }
      };

      uploadImagesToImgbox(layout)
        .then(async (updatedLayoutData) => {
          // Now, updatedLayoutData contains the layout data with updated image links
          try {
            setUploading(true);
            const navvlyId = userIdToSet; // Get navvly_id from userIdToSet

            // Update navvly_id in users_navvly table
            const { data: updateUserData, error: updateUserError } =
              await supabase.from("users_navvly").upsert([
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
                  navvly_json: updatedLayoutData,
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
          // Here you can save updatedLayoutData to your database
        })
        .catch((error) => {
          console.error("Error uploading images to Imgbox:", error);
        });
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

  useEffect(() => {
    if (!isEditable) {
      setLayout((prevLayout) => {
        const updatedLayout = prevLayout.map((layoutItem) => {
          return {
            ...layoutItem,
            static: !isEditable,
            isDraggable: isEditable,
            isResizable: isEditable,
          };
        });
        return updatedLayout;
      });
    }
  }, [navvly_json]);

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
            setLayout={setLayout}
            isEditable={isEditable}
          />
        );
      default:
        return null;
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
        delayChildren: 1,
        duration: 1,
      },
    },
  };

  return (
    <div
      ref={parentRef} // Assign the ref to the parent element
      className="container w-full mx-auto"
    >
      <div className="w-full ">
        <GridLayout
          className="layout grid select-none"
          layout={layout}
          cols={9}
          width={containerWidth}
          rowHeight={(containerWidth - (9 - 1) * 30) / 9 / 1.25}
          onLayoutChange={handleLayoutChange}
          margin={[30, 30]}
          useCSSTransform={true}
          compactType={"vertical"}
        >
          {layout.map((item) => {
            return item.i !== "profile" ? (
              <motion.a
                key={item.i}
                href={item.link && item.static ? item.link : null}
                target={item.link && item.static ? "_blank" : null}
                rel="noopener noreferrer"
                variants={container}
                initial="hidden"
                animate="show"
                style={{
                  boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.10)",
                }}
                className={`cursor-${
                  !item.static ? "grab" : "auto"
                } bg-white active:cursor-grabbing ${
                  !item.static ? "hover-trigger" : ""
                } border text-white rounded-2xl`}
              >
                {GridItemHandler(
                  item,
                  handleDeleteItem,
                  updatePointerEventsEnabled
                )}
              </motion.a>
            ) : (
              <motion.a
                key={item.i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`${!item.static ? "hover-trigger" : ""} ${
                  !item.static
                    ? "cursor-grab  hover:bg-gray-100 active:bg-gray-100 active:shadow-2xl hover:shadow-2xl active:cursor-grabbing"
                    : ""
                } rounded-2xl bg-white`}
              >
                <ProfileItem item={item} setLayout={setLayout} />
              </motion.a>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
});

export default DraggableGrid;
