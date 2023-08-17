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

const DraggableGrid = forwardRef(({}, ref) => {
  const initialLayout = [
    { i: "dummy", x: 0, y: Infinity, w: 1, h: 1, maxW: 1, maxH: 1 },
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
        minW: 1,
        maxW: 3,
        minH: 1,
        maxH: 3,
        type: type,
        link: link,
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

  return (
    <div
      ref={parentRef} // Assign the ref to the parent element
      className="container w-full mx-auto"
    >
      <div className="w-full ">
        <GridLayout
          className="layout grid"
          layout={layout}
          cols={4}
          width={containerWidth}
          rowHeight={150}
          onLayoutChange={handleLayoutChange}
          margin={[30, 30]}
          isBounded={false}
          useCSSTransform={true}
          compactType={"vertical"}
        >
          {layout.map((item) => {
            return item.i !== "dummy" ? (
              <motion.div
                key={item.i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 1 }}
                maxH={2}
                maxW={2}
                className={`cursor-grab bg-white active:cursor-grabbing hover-trigger relative bg-cover border drop-shadow-xl text-white rounded-2xl p-4`}
              >
                <LinkItem handleDeleteItem={handleDeleteItem} item={item} />
              </motion.div>
            ) : (
              <div key={item.i} className="hidden opacity-0"></div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
});

export default DraggableGrid;
