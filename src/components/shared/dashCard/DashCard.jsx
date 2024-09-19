import React, { useState, useEffect } from "react";
import "./DashCard.css";

const DashCard = ({ data }) => {

  return (
    <div className="data-card">
      <div className="data-details">
        <p className="data-number">{data.number}</p>
        <img src={data.logo} alt={data.title} className="data-photo"></img>
      </div>
      <p className="data-name">{data.title}</p>
    </div>
  );
};

export default DashCard;
