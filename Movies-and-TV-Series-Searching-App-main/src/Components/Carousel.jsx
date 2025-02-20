import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  img_300,
  noPicture,
} from "../Services/config"

const handleDragStart = (e) => e.preventDefault();



const Gallery = ({media_type, id}) => {
  const [cast, setCast]= useState([]);

  
  const items = cast?.map((c) => (
    <div className="flex flex-col items-center py-3 w-full">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="rounded-xl mb-2 w-20 shadow-md"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 5,
    },
  };
  const fetchCastInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US`
    );
    const data = await response.json();
    setCast(data.cast);
  }
  useEffect(() => {
    fetchCastInfo();
  }, []);


  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      items={items}
      autoPlay
      responsive={responsive}
    />
  );
}

export default Gallery;