import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, stagger, useCycle } from "framer-motion";
import {
  FigmaLogoIcon,
  FramerLogoIcon,
  SketchLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
  NotionLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  ChevronRightIcon,
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import Footer from "./Footer";
import { MouseParallax } from "react-just-parallax";
import Tilt from "react-parallax-tilt";
import { Spotify } from "react-spotify-embed";
import { supabase } from "../Supabase";

const LOGOS = [
  <FigmaLogoIcon width={24} height={24} className="text-slate-800" />,
  <FramerLogoIcon width={24} height={24} className="text-slate-800" />,
  <SketchLogoIcon width={24} height={24} className=" text-slate-800" />,
  <TwitterLogoIcon width={24} height={24} className="text-slate-800" />,
  <GitHubLogoIcon width={24} height={24} className="text-slate-800" />,
  <VercelLogoIcon width={24} height={24} className="text-slate-800" />,
  <NotionLogoIcon width={24} height={24} className="text-slate-800" />,
  <DiscordLogoIcon width={24} height={24} className="text-slate-800" />,
  <InstagramLogoIcon width={24} height={24} className="text-slate-800" />,
  <LinkedInLogoIcon width={24} height={24} className="text-slate-800" />,
];

const InfiniteSlider = () => {
  return (
    <div className="relative md:w-[600px] w-[70vw] py-6 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[125px] before:bg-[linear-gradient(to_right,rgba(250,252,247,255)_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[125px] after:-scale-x-100 after:bg-[linear-gradient(to_right,rgba(250,252,247,255)_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[150px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

const visible = { opacity: 1, y: 0, transition: { duration: 0.25 } };
const hidden = { opacity: 0, y: 0, transition: { duration: 0.25 } };

function Hero({ setUserIdToSet }) {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(
    "https://xsgames.co/randomusers/assets/avatars/female/52.jpg"
  );

  const [userId, setUserId] = useState();
  const [idExists, setIdExists] = useState(null); // Assuming it doesn't exist by default
  const [isSearching, setIsSearching] = useState(false); // Assuming it doesn't exist by default
  const [debouncedUserId, setDebouncedUserId] = useState(null);

  useEffect(() => {
    setIdExists(null);
    setDebouncedUserId(null);
    setIsSearching(true);
    const timerId = setTimeout(() => {
      setDebouncedUserId(userId);
    }, 1000); // Adjust the debounce delay as needed (e.g., 1000ms)

    return () => {
      clearTimeout(timerId);
    };
  }, [userId]);

  useEffect(() => {
    // Fetch data from Supabase to check if the user ID exists
    const fetchData = async () => {
      if (debouncedUserId && debouncedUserId != "" && debouncedUserId != null) {
        setIsSearching(true);
        const { data, error } = await supabase
          .from("users_navvly")
          .select("id")
          .eq("navvly_id", debouncedUserId);

        if (error) {
          console.error("Error fetching user data:", error);
          setIsSearching(false);
          setIdExists(false);
          return;
        }
        setIdExists(data.length > 0);
        setIsSearching(false);
      } else {
        setIdExists(null);
        setIsSearching(false);
      }
    };

    fetchData();
  }, [debouncedUserId]);

  useEffect(() => {
    if (debouncedUserId != null && debouncedUserId != "" && !idExists) {
      setUserIdToSet(debouncedUserId);
    }
  }, [debouncedUserId]);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const Brand = () => (
    <div className="flex items-center justify-between pt-5 md:block">
      <a href="javascript:void(0)">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={50}
          height={50}
        />
      </a>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  function redirectToLogin() {
    navigate("login");
    setUserIdToSet(null);
    setDebouncedUserId(null);
  }

  function redirectToLoginGrab() {
    navigate("login");
  }

  const handleKeyPress = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <motion.div
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="h-[100vh] relative w-full flex lg:flex-row flex-col md:flex-col items-center overflow-x-hidden overflow-y-auto lg:justify-center gap-24"
    >
      <header className="absolute top-0 w-screen z-50">
        <div
          className={`md:hidden relative z-50 ${
            state ? "mx-2 pb-5" : "hidden"
          }`}
        >
          <Brand />
        </div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute top-0 inset-x-0 bg-white border drop-shadow-2xl z-50 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
              : "z-50"
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <Brand />
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              } `}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 mt-5">
                <li>
                  <button
                    onClick={redirectToLogin}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-green-500 hover:bg-green-400 active:bg-green-600 duration-150 rounded-full md:inline-flex"
                  >
                    Log in
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        glareEnable={false}
        trackOnWindow={true}
        transitionSpeed={100}
        gyroscope={true}
        perspective={5000}
        className="flex flex-row items-center justify-center z-20 mt-20 "
      >
        <MouseParallax
          shouldPause={false}
          shouldResetPosition={true}
          strength={0.01}
        >
          <motion.section
            transition={{ duration: 1 }}
            initial={{ y: -25, opacity: 0, filter: "blur(0.5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            className="relative flex h-full flex-col w-auto items-center justify-center"
          >
            <div className="relative flex flex-col w-auto h-[64vh] justify-center items-center z-10 md:py-1 gap-24 text-gray-600 md:px-8">
              <div className="space-y-10 w-auto relative max-w-4xl z-20 text-left md:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.25 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 1, delay: 0.1 }}
                >
                  <span class="animate-text relative w-screen z-30 font-extrabold bg-gradient-to-r text-5xl md:text-9xl from-green-300 via-green-500 text-center to-green-700 bg-clip-text text-transparent">
                    {" "}
                    navvly <br />
                  </span>
                  <h2 className="text-4xl mt-6 relative z-30 text-gray-800 font-bold md:text-6xl">
                    A Connection link. <br />
                    But with Simplicity.
                    <br />
                  </h2>
                </motion.div>

                <div className="relative flex flex-row justify-center w-autoh-auto items-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.25 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 1, delay: 0.25 }}
                    className="relative max-w-xs flex items-center justify-center"
                  >
                    <span className="absolute left-3 w-auto font-medium h-auto">
                      navvly.us.to/
                    </span>
                    <input
                      type="text"
                      placeholder="id"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      onKeyPress={handleKeyPress}
                      maxLength={12}
                      className="w-full pl-[6.55rem] py-3 px-3 text-gray-500 outline-none bg-gray-100 focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    {!idExists ? (
                      <div className="flex items-center justify-center">
                        {!isSearching &&
                          debouncedUserId != null &&
                          idExists != null && (
                            <CheckIcon className="absolute text-gray-500 right-3 w-4 h-4 bg-green-400 rounded-full" />
                          )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {!isSearching &&
                          debouncedUserId != null &&
                          idExists != null && (
                            <Cross2Icon className="absolute text-white right-3 w-4 h-4 bg-red-400 rounded-full" />
                          )}
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                      {isSearching && (
                        <div
                          class="absolute right-3 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  <ChevronRightIcon className="w-20 h-8 mx-auto my-[0.5rem]" />
                  <div className=" items-start justify-start gap-2 ml-auto relative flex flex-col md:justify-center gap-x-3 sm:flex">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.25 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", duration: 1, delay: 0.4 }}
                      onClick={redirectToLoginGrab}
                      disabled={idExists == null ? true : idExists}
                      className={`block relative z-50 py-3 px-5 text-white font-medium text-lg duration-150 rounded-lg shadow-lg hover:shadow-none ${
                        (idExists == null ? false : !idExists)
                          ? " bg-gray-800 active:bg-green hover:bg-gray-600 shadow-lg active:bg-gray-800"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Grab your naavly
                    </motion.button>
                  </div>
                </div>
              </div>
              <InfiniteSlider />
            </div>

            <div className="hidden z-20 absolute md:block"></div>

            <MouseParallax
              shouldPause={false}
              shouldResetPosition={true}
              isAbsolutelyPositioned={true}
              strength={0.15}
            >
              <div
                className="absolute z-0 inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
                style={{
                  background:
                    "linear-gradient(106.89deg, rgba(74, 222, 128) 15.73%, rgba(74 ,222, 128, 0.41) 15.74%, rgba(34 ,197, 94, 0.26) 56.49%, rgba(34, 197, 94, 0.4) 115.91%)",
                }}
              ></div>
            </MouseParallax>
          </motion.section>
        </MouseParallax>
        <Tilt
          glareEnable={false}
          trackOnWindow={true}
          transitionSpeed={2000}
          gyroscope={true}
          perspective={200}
          className="flex flex-row items-center justify-center z-20"
        ></Tilt>
      </Tilt>
      <Tilt
        glareEnable={false}
        trackOnWindow={true}
        tiltAngleYInitial={-150}
        tiltAngleXInitial={-10}
        transitionSpeed={2000}
        perspective={5000}
        tiltReverse={true}
        className="flex-col relative items-center justify-center z-20 p-12 hidden md:flex"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          style={{
            backgroundImage: `url('https://e0.pxfuel.com/wallpapers/452/952/desktop-wallpaper-sage-green-iphone-green-minimalist-in-2022-minimalist-iphone-green-abstract-iphone-green-minimalist-aesthetic-thumbnail.jpg')`,
          }}
          className="w-[32vh] brightness-125 h-[64vh] rounded-3xl drop-shadow-2xl"
        ></motion.div>

        <motion.img
          initial={{ opacity: 0, y: 150, transform: "translateZ(0px)" }}
          animate={{ opacity: 1, y: 0, transform: "translateZ(15px)" }}
          transition={{ duration: 0.4, type: "spring", delay: 1 }}
          style={{ perspective: "6000px", transform: "translateZ(15px)" }}
          src={avatar}
          className="w-[9vh] h-[9vh] absolute z-10 top-[13%] drop-shadow-md bg-white rounded-full"
        />
        <motion.p
          initial={{ opacity: 0, y: 150, transform: "translateZ(0px)" }}
          animate={{ opacity: 1, y: 0, transform: "translateZ(15px)" }}
          transition={{ duration: 0.4, type: "spring", delay: 1.1 }}
          style={{ perspective: "6000px", transform: "translateZ(15px)" }}
          className="w-auto text-center h-auto absolute z-10 top-[27%] font-bold text-gray-800 rounded-full"
        >
          Meghan S.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 150, transform: "translateZ(0px)" }}
          animate={{ opacity: 1, y: 0, transform: "translateZ(15px)" }}
          transition={{ duration: 0.4, type: "spring", delay: 1.2 }}
          style={{ perspective: "6000px", transform: "translateZ(15px)" }}
          className="w-auto text-center h-auto absolute z-10 top-[30%] font-regular text-gray-800 rounded-full"
        >
          Indie Music Artist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 150, transform: "translateZ(0px)" }}
          animate={{ opacity: 1, y: 0, transform: "translateZ(40px)" }}
          transition={{ duration: 0.7, type: "spring", delay: 1.5 }}
          style={{ perspective: "6000px", transform: "translateZ(40px)" }}
          className="w-[30vh] h-[5vh] items-center flex justify-center absolute z-10 top-[65%] bg-white rounded-3xl drop-shadow-lg"
        >
          <label class="text-sm font-bold text-gray-800 tracking-wide">
            🎵 My latest hit | Check it out!
          </label>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            width: "30vh",
            y: 150,
            transform: "translateZ(0px)",
          }}
          animate={{
            opacity: 1,
            width: "30vh",
            y: 0,
            transform: "translateZ(55px)",
          }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{ perspective: "6000px", transform: "translateZ(55px)" }}
          className=" items-center flex justify-center h-[8vh] absolute z-10 top-[76%] bg-white rounded-3xl drop-shadow-lg"
        >
          <label class="text-sm font-bold flex flex-row items-center gap-2 text-gray-800 tracking-wide">
            <img
              className=" h-6 w-6 gap-6"
              src="https://cdn.icon-icons.com/icons2/195/PNG/256/YouTube_23392.png"
            />{" "}
            My Youtube!
            <button className="px-4 py-2 text-white border bg-red-500 rounded-full duration-150 hover:bg-red-400 active:shadow-lg">
              Follow
            </button>
          </label>
        </motion.div>
        <motion.div
          className="absolute z-10 top-[38%] drop-shadow-lg "
          initial={{ opacity: 0, transform: "translateZ(0px)" }}
          animate={{ opacity: 1, transform: "translateZ(70px)" }}
          transition={{ type: "spring", duration: 1.2, delay: 1.3 }}
          style={{ perspective: "6000px", transform: "translateZ(70px)" }}
        >
          <Spotify
            className="w-[35vh] h-[20vh] relative z-10"
            link="https://open.spotify.com/track/4dGVnHlEbLLfPRCXM5Wor3?si=c64136a7feaf4d11"
          />
        </motion.div>
      </Tilt>
    </motion.div>
  );
}

export default Hero;
