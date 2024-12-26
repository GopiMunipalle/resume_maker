import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing react-icons

const StarRating = ({ totalStars = 5, initialRating = 0, onRate }: any) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (rating: number) => {
    setRating(rating);
    // if (onRate) onRate(rating); // Optional callback to notify the parent
  };

  const renderStar = (index: number) => {
    const isFilled = rating >= index; // Check if the current index is filled
    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        style={{ cursor: "pointer", margin: "0 5px" }}
      >
        {isFilled ? (
          <FaStar className="text-yellow-500" size={30} /> // Filled star
        ) : (
          <FaRegStar className="text-gray-500" size={30} /> // Empty star
        )}
      </span>
    );
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => renderStar(index + 1))}
      <div>
        {rating} / {totalStars}
      </div>
    </div>
  );
};

export default StarRating;
