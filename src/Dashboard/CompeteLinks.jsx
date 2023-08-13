import { motion } from "framer-motion";
import { useState } from "react";
import { MouseParallax } from "react-just-parallax";
import Tilt from "react-parallax-tilt";
import { useInView } from "react-intersection-observer";
import { supabase } from "../Supabase";

function IconTick(props) {
  const [ref, inView] = useInView({});
  return (
    <motion.div
      ref={ref}
      animate={inView ? { rotate: [0, 360], scale: 2.3 } : {}}
      transition={{
        type: "spring",
        stiffness: 50,
      }}
    >
      <Tilt
        trackOnWindow={true}
        glareEnable={true}
        glareMaxOpacity={0.5}
        glarePosition="all"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-36 h-36 animate-text drop-shadow-xl"
          {...props}
        >
          <path
            d="M16.972 6.251a1.999 1.999 0 00-2.72.777l-3.713 6.682-2.125-2.125a2 2 0 10-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 001.471-1.009l5-9a2 2 0 00-.776-2.72"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3FB878" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </Tilt>
    </motion.div>
  );
}

function CompleteLinks({
  handleNextStep,
  handlePrevStep,
  uploading,
  handleUpload,
}) {
  return (
    <div className="overflow-y-auto overflow-x-hidden sm:max-w-xl flex flex-col h-[40rem] justify-between items-center max-w-screen-md md:h-[40rem] w-auto p-12 bg-white rounded-xl z-30 shadow-xl mt-6 m-6 overflow-auto">
      <div className="max-w-screen-md">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={75}
          className="mx-auto mb-6"
        />
        <div class="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            <span class="animate-text bg-gradient-to-r from-green-300 via-green-500 text-center to-green-700 bg-clip-text text-transparent">
              You're all set!
            </span>{" "}
            🎉
          </h2>
        </div>
      </div>
      <IconTick />
      <div className="flex flex-row md:gap-20 gap-6">
        <button
          onClick={handlePrevStep}
          disabled={uploading}
          class={`my-5 md:w-20 w-full flex justify-center  text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold active:bg-green duration-150 ${
            !uploading
              ? " bg-green-500 active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleUpload}
          disabled={uploading}
          class={`my-5 md:w-40 w-full flex justify-center  text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold active:bg-green duration-150 ${
            !uploading
              ? " bg-green-500 active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Complete!
        </button>
      </div>
    </div>
  );
}

export default CompleteLinks;
