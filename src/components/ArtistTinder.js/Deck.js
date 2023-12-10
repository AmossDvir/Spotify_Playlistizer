import React, { useState, useRef, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import "./ArtistCard.css";

const Deck = ({ artists, onSwipeRight }) => {
  const [lastDirection, setLastDirection] = useState();
  const ref = useRef(null);
  const [swipedElIndex, setSwipedElIndex] = useState(-1);
  const [currentCardIndex, setCurrentCardIndex] = useState(artists.length - 1);

  const eliminateCard = (index) => {
    if (ref?.current?.children[index]) {
      ref.current.removeChild(ref.current.children[index]);
    }
  };
  useEffect(() => {
    const swipeTimeout = setTimeout(
      eliminateCard.bind(null, swipedElIndex),
      500
    );
    if (artists[swipedElIndex]) {
      onSwipeRight({ ...artists[swipedElIndex] });
    }
    return () => clearTimeout(swipeTimeout);
  }, [swipedElIndex]);
  const onSwipe = (direction, nameToDelete, index, artist) => {
    console.log(artist)
    setCurrentCardIndex(index - 1);
    if (direction === "right") {
      setSwipedElIndex(index);
      // onSwipeRight({...artists[index]});
    }
    setLastDirection(direction);
  };

  return (
    <div className="cards-container card-shadow" ref={ref}>
      {artists.map((artist, index) => (
        <ArtistCard
          key={index}
          artist={artist}
          index={index}
          currentCardIndex={currentCardIndex}
          onSwipe={(direction, nameToDelete, index) => onSwipe(direction, nameToDelete, index, artist)}
        ></ArtistCard>
      ))}
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
};

export default Deck;
