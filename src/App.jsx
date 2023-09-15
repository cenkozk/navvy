import React, { useState } from "react";
import "./App.css";
import Hero from "./SaasPage/Hero";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
import Login from "./SaasPage/Login";
import Dashboard from "./SaasPage/Dashboard";
import { AnimatePresence } from "framer-motion";
import UserPage from "./Dashboard/UserPage";

function App() {
  const [userIdToSet, setUserIdToSet] = useState(null);
  const [session, setSession] = useState({});
  const [user, setUser] = useState({
    user_metadata: {
      avatar_url: "",
      email: "",
      email_verified: null,
      full_name: "",
      iss: "",
      name: "",
      picture: "",
      provider_id: "",
      sub: "",
    },
  });

  const element = useRoutes([
    {
      path: "/",
      element: <Hero setUserIdToSet={setUserIdToSet} />,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} userIdToSet={userIdToSet} />,
    },
    {
      path: "/dashboard",
      element: (
        <Dashboard user={user} setUser={setUser} userIdToSet={userIdToSet} />
      ),
    },
    {
      path: "/:userIdToSet",
      element: <UserPage />,
    },
  ]);

  if (!element) return null;

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default App;
