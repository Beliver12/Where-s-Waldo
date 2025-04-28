import { useState } from "react";
import React from "react";
import { Link } from "react-router";
import "../App.css";

export const GameOver = ({ status }) => {
  const [stop, setStop] = useState(false);
  const [seletcionImage, setSelectionImage] = useState();

  if (!stop) {
    fetch("https://postgres-project.up.railway.app/image")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        setSelectionImage(response.image);

        setStop(true);
      });
  }

  const selectLeaderBoard = (e) => {
    e.preventDefault();
    const id = Number(e.target.id);
    localStorage.setItem("leaderBoard", id);
  };

  if (status === "Game Over") {
    return (
      <div role="outro-modal" className="outro-modal">
      
       <div className="homepage">
        {seletcionImage === undefined ? (
          <h2 className="loader"></h2>
        ) :
        (
          seletcionImage.map((img) => {
            return (
              <div key={img.id}>
                {" "}
                <img
                loading="lazy"
                  key={img.id}
                  id={img.id}
                  className="image"
                  src={img.url}
                  tabIndex="0"
                  alt=""
                />
                <button onClick={selectLeaderBoard}>
                  <Link id={img.id} to="leaderBoard">
                    LeaderBoard
                  </Link>
                </button>
              </div>
          
        )
      })
      )}
      </div>
      </div>
    );
  }
  return;
};

export default React.memo(GameOver);
