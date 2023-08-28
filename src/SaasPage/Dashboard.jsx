import {
  Cross1Icon,
  PlusIcon,
  TextAlignJustifyIcon,
  ThickArrowUpIcon,
  IdCardIcon,
  GlobeIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";
import { AnimatePresence, motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import CreateProfile from "../Dashboard/CreateProfile";
import { supabase } from "../Supabase";
import CreateNavvly from "../Dashboard/CreateNavvly";

function Dashboard({ userIdToSet }) {
  const [user, setUser] = useState(null);
  const [profileCreated, setProfileCreated] = useState(null);

  //Get the session and then set the user.
  useEffect(() => {
    const session = supabase.auth.getSession();

    session.then(
      function (value) {
        setUser(value.data.session.user);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  //Check if a user exists, and if not, insert the user's data
  useEffect(() => {
    if (user == null) {
      return;
    }
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (regexExp.test(user.id)) {
      checkAndInsertUser(user.id);
    } else {
      console.log("Error, wrong type of userId: ", user.id);
    }
  }, [user]);

  // Function to check if a user exists, and if not, insert the user's data
  async function checkAndInsertUser(userId) {
    // Check if the user exists based on navvly_id
    const { data, error } = await supabase
      .from("users_navvly")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    // If user doesn't exist, insert the user's data
    if (!data || data.length === 0) {
      setProfileCreated(false);
      const { data: insertedData, error: insertError } = await supabase
        .from("users_navvly")
        .insert([{ id: userId, navvly_id: "", paid_plan: "" }]);

      if (insertError) {
        console.error("Error inserting user:", insertError.message);
        return;
      }

      console.log("User inserted:", userId);
    } else {
      console.log("User already exists:", data[0]);
      if (data[0].navvly_id != "") {
        setProfileCreated(true);
      }
    }
  }

  return (
    <div>
      {!profileCreated ? (
        <CreateNavvly user={user} userIdToSet={userIdToSet} />
      ) : (
        <CreateNavvly user={user} userIdToSet={userIdToSet} />
      )}
    </div>
  );
}

export default Dashboard;
