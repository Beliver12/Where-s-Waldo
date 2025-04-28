import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import "../App.css";
const DisplayImages = React.lazy(() => import('./DisplayImages'));
const Start = React.lazy(() => import('./StartGame'));
const StopWatch = React.lazy(() => import('./StopWatch'));
const GameOver = React.lazy(() => import('./GameOver'));


export const Play = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [places, setPlaces] = useState();
  const  [placesForDropDownMenu, setPlacesForDropDownMenu] = useState();
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(false);

    if (window.scrollY) {
      setX(e.clientX);
      setY(e.clientY + window.scrollY);
      setWidth(e.target.clientWidth);
      setHeight(e.target.clientHeight);
    } else {
      setX(e.clientX);

      setY(e.clientY);
      setWidth(e.target.clientWidth);
      setHeight(e.target.clientHeight);
    }
   
    console.log("y", (y / e.target.clientHeight) * 100);

    console.log("x", (x / e.target.clientWidth) * 100);
  };

const dropdown = (e) => {
  e.preventDefault()

  const dropdown = document.querySelector(".dropdown");
  if(dropdown.classList.contains("show")) {
    document.querySelector(".dropdown").classList.remove("show");
  } else {
  document.querySelector(".dropdown").classList.add("show");
  }
}

  return (
    <>
      <nav>
        {" "}
        <StopWatch isActive={isActive} />
        <div className="dropdown-parent">
        <button onClick={dropdown}>
         toggle
        </button>
        <div className="dropdown show">
        { placesForDropDownMenu === undefined? (
           <h2 className="loader"></h2>
        ):
        placesForDropDownMenu.map((place) => {
          return (
            <img
            loading="lazy"
                  key={place.id}
                  id={place.id}
                  src={place.url}
                  alt="image"
                />
          )
        })}
        </div>
        </div>
      </nav>
      <Start
        gameStarted={isActive}
        setIsActive={setIsActive}
        setImage={setImage}
        setPlaces={setPlaces}
        setLoad={setLoad}
        setPlacesForDropDownMenu={setPlacesForDropDownMenu}
        load={load}
      />

      <div className="play" onClick={() => setIsClicked(!isClicked)} id="play">
        <img
        loading="lazy"
          id={image ? image.id : null}
          className="main-image"
          onClick={handleClick}
          src={image ? image.url : null}
          alt=""
        />
        <div className="guess-modal">Correct</div>
        <div className="guess-modal2">Incorrect</div>
      </div>

      <DisplayImages
        isClicked={isClicked}
        positionX={x}
        positionY={y}
        width={width}
        height={height}
        places={places}
        setPlaces={setPlaces}
        setIsClicked={setIsClicked}
        setStatus={setStatus}
      />

      <GameOver status={status} />
    </>
  );
};

export default React.memo(Play);
