import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Supabase";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

import { motion, motionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MouseParallax } from "react-just-parallax";
import Tilt from "react-parallax-tilt";

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

function LoginComponent({ setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Please provide both email and password.");
      return;
    }
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login successful:", user);
        window.location.href = `${window.location.origin}/dashboard`; // Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center h-[100v]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-full max-w-md space-y-8 bg-white text-gray-600 sm:px-0"
      >
        <div className="">
          <div className="space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-4xl">
              Log In
            </h3>
          </div>
        </div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
          >
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-4 px-3 py-2 text-gray-500 outline-none bg-gray-100 focus:border-gray-600 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.15 }}
            className="mt-4"
          >
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-4 px-3 py-2 text-gray-500 outline-none bg-gray-100 focus:border-gray-600 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={handleLogin}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="w-full px-4 mt-10 py-2 text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-800 rounded-lg duration-150"
          >
            Log in
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function SignUp({ setSignUp, userIdToSet }) {
  return (
    <div className="flex-1 flex items-center justify-center h-[100v]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-full max-w-md space-y-8 bg-white text-gray-600 sm:px-0"
      >
        <div className="">
          <img
            src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
            width={150}
            className="lg:hidden"
          />
          <div className="space-y-2">
            {userIdToSet != null ? (
              <h3 className="text-gray-800 text-2xl font-bold sm:text-4xl">
                First, Let's get you signed up{" "}
                <span className="font-extrabold">{userIdToSet}</span>.
                <hr className="mt-16" />
              </h3>
            ) : (
              <></>
            )}
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Sign Up
            </h3>
            <p className="">
              Do you have an account?{" "}
              <button
                onClick={() => {
                  setSignUp((prev) => !prev);
                }}
                className="font-medium text-green-500 hover:text-green-400"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
          >
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-4 px-3 py-2 text-gray-500  outline-none bg-gray-100 focus:border-gray-600 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.15 }}
            className="mt-4"
          >
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-4 px-3 py-2 text-gray-500  outline-none bg-gray-100 focus:border-gray-600 shadow-sm rounded-lg"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="w-full px-4 mt-10 py-2 text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-800 rounded-lg duration-150"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const visible = { opacity: 1, y: 0, transition: { duration: 0.25 } };
const hidden = { opacity: 0, y: 0, transition: { duration: 0.25 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

function Login({ userIdToSet }) {
  const navigate = useNavigate();
  const [sideImage, setSideImage] = useState(
    "https://res.cloudinary.com/dewy2csvc/image/upload/v1692035680/leaves_xac8px.png"
  );
  const signUpBool = userIdToSet == null ? false : true;
  console.log(signUpBool);
  const [signUp, setSignUp] = useState(signUpBool);

  useEffect(() => {
    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
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
    <motion.div
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="w-full h-[100vh] flex flex-row"
    >
      {sideImage && (
        <main className="w-full flex">
          {signUp ? (
            <SignUp userIdToSet={userIdToSet} setSignUp={setSignUp} />
          ) : (
            <LoginComponent setSignUp={setSignUp} />
          )}
          <div className="relative hidden lg:flex">
            <img src={sideImage} className="h-screen" />
            <div className="absolute bg-white p-3 px-5 text-gray-800 font-bold rounded-full right-3 bottom-3">
              <a href="https://pixabay.com/users/jozefm84-10215106/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6824098">
                ?
              </a>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
            width={100}
            className="absolute left-12 top-12"
          />
        </main>
      )}
    </motion.div>
  );
}

export default Login;

/*<motion.main
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="relative w-full z-30 h-screen flex flex-col items-center over justify-center px-4 overflow-x-hidden"
    >
      <div className="max-w-sm w-full z-20 text-gray-600 ">
        <div className="text-center pb-8">
          <img
            src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
            width={100}
            className="mx-auto"
          />
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl mt-5">
            <span class="animate-text  bg-gradient-to-r from-green-300 via-green-500 text-center to-green-700 bg-clip-text text-transparent">
              Log In
            </span>
          </h3>
        </div>
        <div className="p-12 rounded-2xl shadow-lg outline-none bg-white">
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
        strength={0.3}
      >
        <div
          className="absolute scale-125 z-0 inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(74, 222, 128) 15.73%, rgba(74 ,222, 128, 0.41) 15.74%, rgba(34 ,197, 94, 0.26) 56.49%, rgba(34, 197, 94, 0.4) 115.91%)",
          }}
        ></div>
      </MouseParallax>
        </motion.main>*/
