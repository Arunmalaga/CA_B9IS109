import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";

const Carousel = ({ items, autoPlayInterval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
    }, autoPlayInterval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [currentIndex, items.length, autoPlayInterval]);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
    },
    onSwipedRight: () => {
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
    },
  });

  return (
    <div className="carousel-container" {...handlers}>
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <Button
          onClick={() =>
            handleSlideChange(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
          }
        >
          <KeyboardArrowLeft />
        </Button>
        <Button onClick={() => handleSlideChange((currentIndex + 1) % items.length)}>
          <KeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
