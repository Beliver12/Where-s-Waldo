import { useState } from "react";
import { Link } from "react-router";
import "./App.css";

export const App = () => {
  const [stop, setStop] = useState(false);
  const [seletcionImage, setSelectionImage] = useState();

  if (!stop) {
    fetch("https://captivating-art-where-is-waldo.up.railway.app/image", {  credentials: "include",})
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

  return (
    <>
      <button>
        <Link to="play">Start-Game</Link>
      </button>
      <div className="homepage">
        {seletcionImage === undefined ? (
          <h2 className="loader"></h2>
        ) : (
          seletcionImage.map((img) => {
            return (
              <div key={img.id}>
                {" "}
                <img
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
            );
          })
        )}
      </div>
      <a
        href="https://www.flaticon.com/free-icons/foursquare-check-in"
        title="foursquare check in icons"
      >
        Foursquare check in icons created by hqrloveq - Flaticon
      </a>
    </>
  );
};

export default App;
