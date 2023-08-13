import { useState } from "react";
import "./App.css";
import Hero from "./SaasPage/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./SaasPage/Login";
import Dashboard from "./SaasPage/Dashboard";

function App() {
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
        {/*<Route path="/:userId" element={<userPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
