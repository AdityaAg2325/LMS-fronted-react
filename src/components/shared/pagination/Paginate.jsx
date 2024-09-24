import React from "react";
import previous from "../../../assets/previous.png";
import next from "../../../assets/next.png";
import "./Paginate.css";

const Paginate = ({ totalPages, currentPage, onPageChange }) => {
  
  const handleNext = () => {
    if (totalPages > currentPage+1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="paginate-parent">
      <div className={`paginate-prev-btn ${currentPage === 0 ? "disabled" : ""}`}
        onClick={currentPage === 0 ? null : handlePrev}>
        <img src={previous} alt="previous" className="paginate-logo" />
        <div className="prev-text">Previous</div>
      </div>
        <div className="paginate-page-num">
            Page {currentPage+1} of {totalPages}
        </div>
      <div className={`paginate-prev-btn ${currentPage + 1 === totalPages ? "disabled" : ""}`}
        onClick={currentPage + 1 === totalPages ? null : handleNext}>
        <div className="prev-text">Next</div>
        <img src={next} alt="next" className="paginate-logo" />
      </div>
    </div>
  );
};

export default Paginate;
