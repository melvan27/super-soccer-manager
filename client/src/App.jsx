import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./views/MainPage";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { state } = useContext(AuthContext);
  const { isLoggedIn, isLoading } = state;

  console.log("isLoggedIn:", isLoggedIn); // Add this line to log the value of isLoggedIn
  console.log("isLoading:", isLoading); // Add this line to log the value of isLoading

  return (
    <>
      <Navbar />
      <div className="container h-screen">
        {isLoading ? (
          // Render a loading indicator here
          <p>Loading...</p>
        ) : (
          // Render the content when authentication check is complete
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
