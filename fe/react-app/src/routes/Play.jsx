import { useEffect, useState } from "react";
import { Link } from "react-router";

import "../App.css";
import Image from "../assets/2687263 (1).jpg";
import DisplayImages from "./DisplayImages";
import Start from "./StartGame";
import StopWatch from "./StopWatch";





const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

export const Play = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [places, setPlaces] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(false);
   
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    if (window.scrollY) {
      setX(e.clientX);
      setY(e.clientY + window.scrollY);
      setWidth(e.target.clientWidth);
      setHeight(e.target.clientHeight);
    }
     else {
      setX(e.clientX);
      
      setY(e.clientY);
      setWidth(e.target.clientWidth);
      setHeight(e.target.clientHeight); 
    }
   console.log(window.scrollX)
    console.log("y" ,(y / height) * 100)
    console.log("x", (x / e.target.clientWidth) * 100);
  };

  const position = useMousePosition();
  return (
    <>
      <nav>
     
        {" "}
        <StopWatch isActive={isActive} />
        <button>
          <Link to="/">Home</Link>{" "}
        </button>
      </nav>
      <Start start={isActive} setIsActive={setIsActive} setImage={setImage} setPlaces={setPlaces} />
      <div onClick={() => setIsClicked(!isClicked)} id="play">
        <DisplayImages
          isClicked={isClicked}
          positionX={x}
          positionY={y}
          width={width}
          height={height}
          places={places}
          setPlaces={setPlaces}
          setIsClicked={setIsClicked}
        />
        <img
          id={image ? image.id : null}
          className="main-image"
          onClick={handleClick}
          src={image ? image.url : null}
          alt=""
        />
      </div>
    </>
  );
};

export default Play;
