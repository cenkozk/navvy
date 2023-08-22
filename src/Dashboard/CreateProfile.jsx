import {
  Cross1Icon,
  PlusIcon,
  TextAlignJustifyIcon,
  ThickArrowUpIcon,
  IdCardIcon,
  GlobeIcon,
  CheckIcon,
  ChevronRightIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { MouseParallax } from "react-just-parallax";
import BasicInfo from "../Dashboard/BasicInfo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";
import Links from "../Dashboard/Links";
import CompleteLinks from "../Dashboard/CompeteLinks";
import Tilt from "react-parallax-tilt";
import { supabase } from "../Supabase";
import CreateNavvly from "./CreateNavvly";

function CreateProfile({ user, userIdToSet }) {
  const [activeStep, setActiveStep] = useState(0); // Initialize with the desired initial step
  const components = [BasicInfo, Links, CompleteLinks];
  const visible = { opacity: 1, y: 0, transition: { duration: 0.25 } };
  const hidden = { opacity: 0, y: 0, transition: { duration: 0.25 } };
  const [uploading, setUploading] = useState(false);

  const steps = [
    {
      icon: <IdCardIcon className="w-5 h-5" />,
      completedIcon: <CheckIcon className="w-6 h-6" />,
    },
    {
      icon: <GlobeIcon className="w-5 h-5" />,
      completedIcon: <CheckIcon className="w-6 h-6" />,
    },
    {
      icon: <CheckIcon className="w-6 h-6" />,
      completedIcon: <CheckIcon className="w-6 h-6" />,
    },
  ];

  const handleNextStep = () => {
    setActiveStep((prevStep) => (prevStep + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) =>
      prevStep === 0 ? steps.length - 1 : prevStep - 1
    );
  };

  const [basicInfo, setBasicInfo] = useState({}); // Initialize empty
  const [links, setLinks] = useState({}); // Initialize empty

  const uplaodJson = {
    basicInfo,
    links,
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const navvlyId = uplaodJson.basicInfo.userId; // Get navvly_id from basicInfo.userId

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
            navvly_json: uplaodJson,
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
  };

  return (
    <motion.div
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      class="relative flex flex-col items-center justify-center w-full h-[100vh] overflow-x-hidden"
    >
      <CreateNavvly userIdToSet={userIdToSet} />
      {/* <ol className="md:flex hidden z-10 mt-6 items-center justify-center w-max">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex w-full flex-row items-center ${
              index < activeStep ? "text-green-600" : "text-gray-500"
            } after:content-['']  ${
              index < activeStep
                ? "after:border-green-100"
                : "after:border-gray-100"
            }`}
          >
            <span
              className={`flex items-center justify-center w-15 h-10 ${
                index > activeStep ? "" : " bg-green-200"
              }  rounded-full shadow-md h-12 w-12 ${
                index < activeStep ? "" : "bg-white"
              }`}
            >
              {index < activeStep ? step.completedIcon : step.icon}
            </span>
            {index + 2 <= steps.length ? (
              <ChevronRightIcon className="w-4 h-4 mx-6 text-black" />
            ) : (
              <></>
            )}
          </li>
        ))}
      </ol>
      {components.map((Component, index) => (
        <motion.div
          className={`z-20 ${index === activeStep ? "block" : "hidden"}`}
          key={index}
          initial={{ opacity: 0 }} // Start with opacity 0 for non-active components
          animate={{
            opacity: index === activeStep ? 1 : 0, // Animate opacity to 1 for active component, and 0.5 for others
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          custom={activeStep}
        >
          <Component
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            setBasicInfo={setBasicInfo}
            setLinks={setLinks}
            handleUpload={handleUpload}
            uploading={uploading}
          />
        </motion.div>
      ))}

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
        </MouseParallax>*/}
    </motion.div>
  );
}

export default CreateProfile;
