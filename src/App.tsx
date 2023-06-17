import "./App.css";
import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ReactDOM from "react-dom/client";

// export const UserContext = createContext(userData.data);

const App: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch("https://mock-api.arikmpt.com/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData((userData) => (userData = data));
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* <UserContext.Provider value={userData}> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* </UserContext.Provider> */}
      </Routes>
    </Router>
  );
};

export default App;
