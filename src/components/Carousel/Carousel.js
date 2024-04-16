import { useSwipeable } from "react-swipeable";
import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({
  content,
  itemsPerSlide,
  title,
  maxWidth,
  maxHeight,
  style,
  autoSlideTimer,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [animation, setAnimation] = useState("");

  const endIndex = Math.min(startIndex + itemsPerSlide, content.length);

  useEffect(() => {
    if (animation) {
      const timer = setTimeout(() => {
        setAnimation("");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [animation]);

  useEffect(() => {
    if (autoSlideTimer && content.length) {
      const timer = setInterval(() => {
        setAnimation("slide-left");
        setStartIndex((current) => (current + itemsPerSlide) % content.length);
      }, [autoSlideTimer]);

      return () => clearInterval(timer);
    }
  }, [autoSlideTimer, content]);

  const nextSlide = () => {
    setAnimation("slide-left");

    setStartIndex(endIndex >= content.length ? 0 : endIndex);
  };

  const prevSlide = () => {
    setAnimation("slide-right");

    setStartIndex(
      startIndex === 0
        ? content.length - (content.length % itemsPerSlide)
        : startIndex - itemsPerSlide
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="Carousel-container" style={style}>
      {title && <h1 className="Carousel-title">{title}</h1>}
      <button className="Carousel-button left" onClick={prevSlide}>
        Prev
      </button>
      <div className={`Carousel-content ${animation}`} {...handlers}>
        {content.slice(startIndex, endIndex).map((item, index) => (
          <div key={index} className="Carousel-item">
            {React.cloneElement(item, { style: { maxWidth, maxHeight } })}
          </div>
        ))}
      </div>
      <button className="Carousel-button right" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
