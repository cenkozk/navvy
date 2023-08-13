import {
  Cross1Icon,
  PlusIcon,
  TextAlignJustifyIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { MouseParallax } from "react-just-parallax";
import BasicInfo from "../Dashboard/BasicInfo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import Links from "../Dashboard/Links";

function Dashboard() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[100vh] overflow-x-hidden">
      <Links />
      <MouseParallax
        shouldPause={false}
        shouldResetPosition={true}
        isAbsolutelyPositioned={true}
        strength={0.5}
      >
        <div
          className="absolute scale-150 z-0 inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(74, 222, 128) 15.73%, rgba(74 ,222, 128, 0.41) 15.74%, rgba(34 ,197, 94, 0.26) 56.49%, rgba(34, 197, 94, 0.4) 115.91%)",
          }}
        ></div>
      </MouseParallax>
    </div>
  );
}

export default Dashboard;
