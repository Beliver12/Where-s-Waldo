import { useEffect, useState, useRef, use } from "react";
import React from "react";

const workerPath = new URL("../timeWorker", import.meta.url);
const worker = new Worker(workerPath);

export const Start = ({
  setIsActive,
  gameStarted,
  setImage,
  setPlaces,
  setLoad,
  load,
  setPlacesForDropDownMenu,
}) => {
  const [seletcionImage, setSelectionImage] = useState();
  const [selectedImageId, setSelectedImageId] = useState();
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  
useEffect(() => {

  if (!load) {
    fetch("https://captivating-art-where-is-waldo.up.railway.app/image")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        setSelectionImage(response.image);
        response.image.forEach((img) => {
          if (img.selected === "true") {
            setImage(img);
          }
        });
        setLoad(true)
      });  
  }
})

  if (!gameStarted) {
    const selectImage = (e) => {
      debugger;
      e.preventDefault();
      document.querySelector(".loading").classList.add("active");

      document.querySelector(".start").disabled = true;
      document.querySelector(".play").style.pointerEvents = "none";

      document.querySelector(".main-image").style.pointerEvents = "none";
      document.querySelector(".intro-modal").style.pointerEvents = "none";
      const id = Number(e.target.id);

      setSelectedImageId(id);
      seletcionImage.forEach((image) => {
        if (image.id === id) {
          setImage(image);
        }
      });

      const data = {
        id: id,
      };

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

      fetch("https://captivating-art-where-is-waldo.up.railway.app/image/selected", options)
        .then((res) => res.json())
        .then((data) => {
          setSelectionImage(data.image);
        });

      setTimeout(() => {
        document.querySelector(".loading").classList.remove("active");
        document.querySelector(".intro-modal").style.pointerEvents = "auto";

        document.querySelector(".start").disabled = false;
      }, 2000);
    };

    const startTheGame = async (event) => {
      worker.postMessage("start");
      event.preventDefault();
      document.querySelector(".loading").classList.add("active");

      document.querySelector(".play").style.pointerEvents = "none";

      document.querySelector(".main-image").style.pointerEvents = "none";
      document.querySelector(".intro-modal").style.pointerEvents = "none";

      const data = {
        username: username,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("https://captivating-art-where-is-waldo.up.railway.app/cordinates", options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPlaces(data.cordinates);
          setPlacesForDropDownMenu(data.cordinates)
          sessionStorage.setItem("num", data.num);
          sessionStorage.setItem("user", username);
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("time", data.time);
          sessionStorage.setItem("leaderBoardId", data.leaderBoardId)

          if (!data.error) {
            setIsActive(true);
          }

          if (data.error) {
            setError(data.error);
          }
        });
      setTimeout(() => {
        document.querySelector(".intro-modal").style.pointerEvents = "auto";

        document.querySelector(".loading").classList.remove("active");
      }, 10000);
    };

    return (
      <div role="intro-modal" className="intro-modal">
        <div className="loading">
        <label>Loading</label>
          <div className="loader"></div>
        </div>
        <div className="homepage">
          {" "}
          {seletcionImage === undefined ? (
            <div className="loader-parent">
            <label>Loading</label>
            <h2 className="loader"></h2>
            </div>
          ) : (
            seletcionImage.map((img) => {
              return img.selected === "true" ? (
              <div  key={img.id}>  <img
              loading="lazy"
                  key={img.id}
                  id={img.id}
                  onClick={selectImage}
                  className="image"
                  src={img.url}
                  tabIndex="0"
                  alt=""
                  style={{
                    borderWidth: 4,
                    borderColor: "green",
                    borderStyle: "solid",
                  }}
                 
                />
                 {img.difficulty === "Hard" ? 
                <h2  style={{ color: 'red' }} >{img.difficulty}</h2> :
                img.difficulty === "Medium" ? 
                <h2  style={{ color: 'yellow' }} >{img.difficulty}</h2> :
                <h2  style={{ color: 'green' }} >{img.difficulty}</h2>
              }
                </div>
              ) : (
               <div  key={img.id}> <img
               loading="lazy"
                  tabIndex="0"
                  key={img.id}
                  id={img.id}
                  className="image"
                  onClick={selectImage}
                  src={img.url}
                  alt=""
                />
                {img.difficulty === "Hard" ? 
                <h2  style={{ color: 'red' }} >{img.difficulty}</h2> :
                img.difficulty === "Medium" ? 
                <h2  style={{ color: 'yellow' }} >{img.difficulty}</h2> :
                <h2  style={{ color: 'green' }} >{img.difficulty}</h2>
              }
                
                </div>
              );
            })
          )}
        
           {seletcionImage === undefined ? (
          ""
        ) : (
          <form className="startForm" onSubmit={startTheGame} method="POST">
            <label htmlFor="username">Username</label>
            <p>{error}</p>
            <input
              placeholder="username"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button className="start" type="submit">
              start
            </button>
          </form>
        )}
        </div>
       
      </div>
    );
  }
  return;
};

export default React.memo(Start);
