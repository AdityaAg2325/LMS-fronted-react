import React from "react";
import './Home.css'
import Login from "../login/Login";

const Home = () => {
  return (
    <div className="home-parent">
      <div className="home-container">
        <Login />
      </div>
    </div>
  );
};

export default Home;
