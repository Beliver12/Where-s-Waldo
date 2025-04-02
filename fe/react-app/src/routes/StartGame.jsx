import { useEffect, useState } from "react";

export const Start = ({ setIsActive, start, setImage }) => {
  const [seletcionImage, setSelectionImage] = useState();
  if (!start) {
    fetch("http://localhost:3000/image")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        //console.log(response)
        setSelectionImage(response.image);
      });

    return (
      <div className="intro-modal">
        {seletcionImage !== undefined &&
          seletcionImage.map((img) => {
            return (
              <img
                key={img.id}
                id={img.id}
                tabIndex="0"
                onClick={() => setImage(img)}
                src={img.url}
                alt=""
              />
            );
          })}

        <button onClick={() => setIsActive(true)}>start</button>
      </div>
    );
  }
  return;
};

export default Start