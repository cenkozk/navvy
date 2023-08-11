import { useCallback, useEffect, useRef, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useCycle } from "framer-motion";
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
} from "@radix-ui/react-icons";
import Footer from "./Footer";
import { MouseParallax } from "react-just-parallax";

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
    <div className="relative m-auto w-[500px] overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[125px] before:bg-[linear-gradient(to_right,rgba(244,252,247,255)_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,rgba(244,252,247,255)_0%,rgba(255,255,255,0)_100%)] after:content-['']">
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

function Hero() {
  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="javascript:void(0)">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={50}
          height={50}
          alt="Float UI logo"
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

  return (
    <div className="h-[100vh] flex flex-col overflow-x-hidden">
      <header>
        <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
          <Brand />
        </div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
              : ""
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <Brand />
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              } `}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                <li>
                  <a
                    href="javascript:void(0)"
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-green-500 hover:bg-green-400 active:bg-green-600 duration-150 rounded-full md:inline-flex"
                  >
                    Get started
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
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <MouseParallax
        shouldPause={false}
        shouldResetPosition={true}
        strength={0.01}
      >
        <section className="relative items-center justify-center scale-90">
          <div className="max-w-screen-xl relative z-10 mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
              <h1 className="text-sm text-green-00 font-medium text-green-500">
                Build products for everyone
              </h1>
              <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                Streamline Your Links, Simplify Your Reach with,
                <span class="animate-text bg-gradient-to-r from-green-300 via-green-500 text-center to-green-700 bg-clip-text text-transparent">
                  {" "}
                  navvy
                </span>
              </h2>
              <p className="max-w-2xl mx-auto">
                Designed to simplify how you share and connect. Effortlessly
                manage and showcase all your important links in one place,
                making navigation a breeze for your audience.
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <a
                  href="javascript:void(0)"
                  className="block py-2 px-4 text-white font-medium bg-green-500 duration-150 hover:bg-green-400 active:bg-green-500 rounded-lg shadow-lg hover:shadow-none"
                >
                  Get started
                </a>
                <a
                  href="javascript:void(0)"
                  className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 hover:bg-white border rounded-lg"
                >
                  About
                </a>
              </div>
            </div>
          </div>

          <MouseParallax
            shouldPause={false}
            shouldResetPosition={true}
            isAbsolutelyPositioned={true}
            strength={0.01}
          >
            <svg
              class="w-10 h-10"
              viewBox="0 0 110 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-0 inset-0 m-auto w-48 sm:max-w-x12 md:max-w-12 right-[60rem] opacity-80 top-[15rem]"
            >
              <path
                d="M108.1 98.0001H0V1.50009C0 0.700092 0.599994 0.100098 1.39999 0.100098C2.19999 0.100098 2.80002 0.700092 2.80002 1.50009V95.3001H108.1C108.9 95.3001 109.5 95.9001 109.5 96.7001C109.5 97.4001 108.9 98.0001 108.1 98.0001Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.1 98.0001H0V1.50009C0 0.700092 0.599994 0.100098 1.39999 0.100098C2.19999 0.100098 2.80002 0.700092 2.80002 1.50009V95.3001H108.1C108.9 95.3001 109.5 95.9001 109.5 96.7001C109.5 97.4001 108.9 98.0001 108.1 98.0001Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M108.1 89.7001H9.2998V1.50009C9.2998 0.700092 9.8998 0.100098 10.6998 0.100098C11.4998 0.100098 12.0998 0.700092 12.0998 1.50009V86.9001H108.1C108.9 86.9001 109.5 87.5001 109.5 88.3001C109.5 89.0001 108.9 89.7001 108.1 89.7001Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.1 89.7001H9.2998V1.50009C9.2998 0.700092 9.8998 0.100098 10.6998 0.100098C11.4998 0.100098 12.0998 0.700092 12.0998 1.50009V86.9001H108.1C108.9 86.9001 109.5 87.5001 109.5 88.3001C109.5 89.0001 108.9 89.7001 108.1 89.7001Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M108.1 81.3H18.7002V1.39999C18.7002 0.599994 19.3002 0 20.1002 0C20.9002 0 21.5002 0.599994 21.5002 1.39999V78.5H108.1C108.9 78.5 109.5 79.1 109.5 79.9C109.5 80.7 108.9 81.3 108.1 81.3Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.1 81.3H18.7002V1.39999C18.7002 0.599994 19.3002 0 20.1002 0C20.9002 0 21.5002 0.599994 21.5002 1.39999V78.5H108.1C108.9 78.5 109.5 79.1 109.5 79.9C109.5 80.7 108.9 81.3 108.1 81.3Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M108.1 73H28.0996V1.39999C28.0996 0.599994 28.6996 0 29.4996 0C30.2996 0 30.8996 0.599994 30.8996 1.39999V70.2H108.1C108.9 70.2 109.5 70.8 109.5 71.6C109.5 72.4 108.9 73 108.1 73Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.1 73H28.0996V1.39999C28.0996 0.599994 28.6996 0 29.4996 0C30.2996 0 30.8996 0.599994 30.8996 1.39999V70.2H108.1C108.9 70.2 109.5 70.8 109.5 71.6C109.5 72.4 108.9 73 108.1 73Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M108.1 64.7001H37.4004V1.50009C37.4004 0.700092 38.0004 0.100098 38.8004 0.100098C39.6004 0.100098 40.2004 0.700092 40.2004 1.50009V61.9001H108.1C108.9 61.9001 109.5 62.5001 109.5 63.3001C109.5 64.1001 108.9 64.7001 108.1 64.7001Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.1 64.7001H37.4004V1.50009C37.4004 0.700092 38.0004 0.100098 38.8004 0.100098C39.6004 0.100098 40.2004 0.700092 40.2004 1.50009V61.9001H108.1C108.9 61.9001 109.5 62.5001 109.5 63.3001C109.5 64.1001 108.9 64.7001 108.1 64.7001Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
            </svg>
          </MouseParallax>
          <MouseParallax
            shouldPause={false}
            shouldResetPosition={true}
            isAbsolutelyPositioned={true}
            strength={0.01}
          >
            <svg
              class="w-10 h-10"
              viewBox="0 0 111 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-0 inset-0 m-auto w-48 sm:max-w-x12 md:max-w-12 -right-[60rem] opacity-80 -top-[25rem]"
            >
              <path
                d="M108.2 50.7C107.4 50.7 106.8 50 106.8 49.3C107.3 34.2 107.3 18.4 107.3 3.10001C71.2996 3.10001 37.1996 3.1 1.49963 2.8C0.699634 2.8 0.0996094 2.20001 0.0996094 1.40001C0.0996094 0.600009 0.699634 0 1.49963 0C37.6996 0.3 72.1996 0.300003 108.7 0.300003H110.1V1.7C110.1 17.4 110.1 33.7 109.6 49.4C109.6 50.1 109 50.7 108.2 50.7Z"
                fill="currentColor"
              ></path>
              <path
                d="M108.2 50.7C107.4 50.7 106.8 50 106.8 49.3C107.3 34.2 107.3 18.4 107.3 3.10001C71.2996 3.10001 37.1996 3.1 1.49963 2.8C0.699634 2.8 0.0996094 2.20001 0.0996094 1.40001C0.0996094 0.600009 0.699634 0 1.49963 0C37.6996 0.3 72.1996 0.300003 108.7 0.300003H110.1V1.7C110.1 17.4 110.1 33.7 109.6 49.4C109.6 50.1 109 50.7 108.2 50.7Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M98.8996 50.5002C98.0996 50.5002 97.4996 49.9002 97.4996 49.1002C97.2996 36.2002 97.2996 23.4002 97.2996 11.0002C65.6996 11.0002 33.1996 11.0002 1.49963 11.0002C0.699634 11.0002 0.0996094 10.4002 0.0996094 9.6002C0.0996094 8.8002 0.699634 8.2002 1.49963 8.2002C33.6996 8.2002 66.6996 8.2002 98.6996 8.2002H100.1V9.6002C100.1 22.4002 100.1 35.6002 100.3 49.0002C100.3 49.8002 99.5996 50.5002 98.8996 50.5002Z"
                fill="currentColor"
              ></path>
              <path
                d="M98.8996 50.5002C98.0996 50.5002 97.4996 49.9002 97.4996 49.1002C97.2996 36.2002 97.2996 23.4002 97.2996 11.0002C65.6996 11.0002 33.1996 11.0002 1.49963 11.0002C0.699634 11.0002 0.0996094 10.4002 0.0996094 9.6002C0.0996094 8.8002 0.699634 8.2002 1.49963 8.2002C33.6996 8.2002 66.6996 8.2002 98.6996 8.2002H100.1V9.6002C100.1 22.4002 100.1 35.6002 100.3 49.0002C100.3 49.8002 99.5996 50.5002 98.8996 50.5002Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M89.4996 50.4998C88.6996 50.4998 88.0996 49.8998 88.0996 49.0998C88.2996 39.1998 88.2996 28.5998 88.2996 19.0998C59.6996 19.0998 30.1996 19.0998 1.49963 19.4998C0.799634 19.4998 0.0996094 18.8998 0.0996094 18.0998C0.0996094 17.2998 0.699634 16.6998 1.49963 16.6998C30.6996 16.2998 60.6996 16.2998 89.6996 16.2998H91.0996V17.6998C91.0996 27.4998 91.0996 38.6998 90.8996 49.1998C90.8996 49.8998 90.2996 50.4998 89.4996 50.4998Z"
                fill="currentColor"
              ></path>
              <path
                d="M89.4996 50.4998C88.6996 50.4998 88.0996 49.8998 88.0996 49.0998C88.2996 39.1998 88.2996 28.5998 88.2996 19.0998C59.6996 19.0998 30.1996 19.0998 1.49963 19.4998C0.799634 19.4998 0.0996094 18.8998 0.0996094 18.0998C0.0996094 17.2998 0.699634 16.6998 1.49963 16.6998C30.6996 16.2998 60.6996 16.2998 89.6996 16.2998H91.0996V17.6998C91.0996 27.4998 91.0996 38.6998 90.8996 49.1998C90.8996 49.8998 90.2996 50.4998 89.4996 50.4998Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M80.2 50.5999C79.5 50.5999 79 50.0999 78.8 49.4999C78 45.2999 78.2 41.1999 78.4 37.1999C78.6 34.1999 78.7 31.1999 78.4 27.9999C53.2 27.9999 27.2 27.9999 1.39996 27.6999C0.599963 27.6999 0 27.0999 0 26.2999C0 25.4999 0.599963 24.8999 1.39996 24.8999C27.6 25.1999 54 25.1999 79.6 25.1999H80.8L81 26.3999C81.5 30.1999 81.3 33.7999 81.1 37.2999C80.9 41.2999 80.7 44.9999 81.5 48.8999C81.6 49.6999 81.2 50.3999 80.4 50.4999C80.4 50.5999 80.2999 50.5999 80.2 50.5999Z"
                fill="currentColor"
              ></path>
              <path
                d="M80.2 50.5999C79.5 50.5999 79 50.0999 78.8 49.4999C78 45.2999 78.2 41.1999 78.4 37.1999C78.6 34.1999 78.7 31.1999 78.4 27.9999C53.2 27.9999 27.2 27.9999 1.39996 27.6999C0.599963 27.6999 0 27.0999 0 26.2999C0 25.4999 0.599963 24.8999 1.39996 24.8999C27.6 25.1999 54 25.1999 79.6 25.1999H80.8L81 26.3999C81.5 30.1999 81.3 33.7999 81.1 37.2999C80.9 41.2999 80.7 44.9999 81.5 48.8999C81.6 49.6999 81.2 50.3999 80.4 50.4999C80.4 50.5999 80.2999 50.5999 80.2 50.5999Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
              <path
                d="M70.8 50.7002C70 50.7002 69.4 50.1002 69.4 49.3002C69.3 45.1002 69.2 40.5002 69.2 36.0002C46.7 36.0002 24.1 36.0002 1.39996 36.0002C0.599963 36.0002 0 35.4002 0 34.6002C0 33.8002 0.599963 33.2002 1.39996 33.2002C24.6 33.2002 47.6 33.2002 70.6 33.2002H72V34.6002C72 39.5002 72 44.6002 72.2 49.2002C72.2999 50.0002 71.7 50.6002 70.8 50.7002C70.9 50.7002 70.9 50.7002 70.8 50.7002Z"
                fill="currentColor"
              ></path>
              <path
                d="M70.8 50.7002C70 50.7002 69.4 50.1002 69.4 49.3002C69.3 45.1002 69.2 40.5002 69.2 36.0002C46.7 36.0002 24.1 36.0002 1.39996 36.0002C0.599963 36.0002 0 35.4002 0 34.6002C0 33.8002 0.599963 33.2002 1.39996 33.2002C24.6 33.2002 47.6 33.2002 70.6 33.2002H72V34.6002C72 39.5002 72 44.6002 72.2 49.2002C72.2999 50.0002 71.7 50.6002 70.8 50.7002C70.9 50.7002 70.9 50.7002 70.8 50.7002Z"
                fill="currentColor"
                fill-opacity="0.2"
              ></path>
            </svg>
          </MouseParallax>

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
          <InfiniteSlider />
        </section>
      </MouseParallax>

      <Footer />
    </div>
  );
}

export default Hero;
