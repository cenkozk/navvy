import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Supabase";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MouseParallax } from "react-just-parallax";

const ScrollAnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }} // Adjust animation duration as needed
    >
      {children}
    </motion.div>
  );
};

function Login(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
          console.log("Signed in:", session.user);
          props.setUser(session.user);
          navigate("/dashboard");
        }
      }
    );

    // Clean up the listener when the component is unmounted
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollAnimatedComponent>
      <main className="relative w-full z-30 h-screen flex flex-col items-center justify-center px-4 overflow-x-hidden">
        <div className="max-w-sm w-full z-20 text-gray-600 ">
          <div className="text-center pb-8">
            <img
              src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
              width={150}
              className="mx-auto"
            />
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl m-5">
              <span class="animate-text bg-gradient-to-r from-green-300 via-green-500 text-center to-green-700 bg-clip-text text-transparent">
                Log In
              </span>
            </h3>
          </div>
          <div className="p-12 rounded-2xl outline-none bg-white">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: { color: "black" },
                },
                className: {
                  anchor: "",
                  button: "supalogin_button",
                },
                variables: {
                  default: {
                    colors: {
                      brand: "transparent",
                      brandAccent: "rgb(74, 222, 128)",
                    },
                  },
                },
              }}
              redirectTo="https://digidish.vercel.app/dashboard"
              providers={[]}
            />
          </div>
        </div>
        <MouseParallax
          shouldPause={false}
          shouldResetPosition={true}
          isAbsolutelyPositioned={true}
          strength={0.5}
        >
          <div
            className="absolute z-0 inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
            style={{
              background:
                "linear-gradient(106.89deg, rgba(74, 222, 128) 15.73%, rgba(74 ,222, 128, 0.41) 15.74%, rgba(34 ,197, 94, 0.26) 56.49%, rgba(34, 197, 94, 0.4) 115.91%)",
            }}
          ></div>
        </MouseParallax>
      </main>
    </ScrollAnimatedComponent>
  );
}

export default Login;
