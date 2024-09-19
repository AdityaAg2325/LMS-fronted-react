import React from "react";
import'./BookCard.css'
import { useNavigate } from "react-router-dom";

const BookCard = ({ data }) => {

  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/books')
  }

  return (
    <div className="book-data-card" onClick={handleCardClick}>
      <div className="book-data-details">
        <img src={data.image} alt={data.title} className="book-data-photo"></img>
      </div>
      <p className="book-data-name">{data.title}</p>
      <p className="data-author">{data.author}</p>
    </div>
  );
};

export default BookCard;