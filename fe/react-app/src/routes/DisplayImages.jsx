import { Link } from "react-router";
import React from "react";
import { useEffect, useState } from "react";

export const DisplayImages = ({
  isClicked,
  positionX,
  positionY,
  width,
  height,
  places,
  setPlaces,
  setIsClicked,
  setStatus,
}) => {
  const intX = (17.507368421052634 * width) / 100;
  const intY = (13.907368421052634 * height) / 100;
  const play = document.getElementById("play");
  const targetX = positionX;
  const targetY = positionY;
  let percentageX;
  if (play) {
    percentageX = ((positionX + play.scrollLeft) / width) * 100;
  }
  if (percentageX > 80) {
    positionX = positionX - intX;
  } else {
    positionX = positionX - 5;
  }

  const percentageY = (positionY / height) * 100;
  if (percentageY > 80) {
    positionY = positionY - intY;
  } else {
    positionY = positionY + 40;
  }

 
  const checkCords = (e) => {
    e.preventDefault();
    document.querySelector(".play").style.pointerEvents = "none";

    document.querySelector(".main-image").style.pointerEvents = "none";
    const num = localStorage.getItem("num");
    const username = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const time = localStorage.getItem("time");

    const data = {
      id: e.target.id,
      x: percentageX,
      y: percentageY,
      num: num,
      username: username,
      userId: userId,
      time: time
    };
    setPlaces();
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      withCredentials: true,

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("https://postgres-project.up.railway.app/cordinates/check", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaces(data.cordinates);
        if (data.message === "guess") {
          document
            .querySelector(".guess-modal")
            .classList.add("active-correct");
        } else {
          document
            .querySelector(".guess-modal2")
            .classList.add("active-incorrect");
        }
        if (data.message === "Game Over") {
          setStatus("Game Over");
        }
        setIsClicked(true);
        setTimeout(() => {
          document
            .querySelector(".guess-modal")
            .classList.remove("active-correct");
          document
            .querySelector(".guess-modal2")
            .classList.remove("active-incorrect");
          document;
        }, 3000);
        document.querySelector(".play").style.pointerEvents = "auto";

        document.querySelector(".main-image").style.pointerEvents = "auto";
      });
      
  };

  if (isClicked) {
    return (
      <>
        <div
          className="target"
          style={{ top: targetY - 20, left: targetX - 20 }}
        ></div>

        <div
          role="modal"
          className="modal"
          style={{ top: positionY, left: positionX }}
        >
          {places === undefined ? (
             <div className="loader-parent">
             <label>Loading</label>
             <h2 className="loader"></h2>
             </div>
          ) : (
            places.map((place) => {
              return place.found === "true" ? (
                <img
                loading="lazy"
                  key={place.id}
                  id={place.id}
                  src="/src/assets/check.png"
                  style={{
                    borderWidth: 6,
                    borderColor: "green",
                    borderStyle: "solid",
                  }}
                  alt="image"
                />
              ) : (
                <img
                loading="lazy"
                  key={place.id}
                  id={place.id}
                  onClick={checkCords}
                  src={place.url}
                  alt="image"
                />
              );
            })
          )}
        </div>
      </>
    );
  }
  return;
};

export default React.memo(DisplayImages);
