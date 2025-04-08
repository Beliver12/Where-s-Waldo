import { useEffect, useState } from "react";

export const Start = ({ setIsActive, start, setImage, setPlaces }) => {
  const [seletcionImage, setSelectionImage] = useState();
  const [selectedImageId, setSelectedImageId] = useState();


  if (!start) {

    fetch("http://localhost:3000/image")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //console.log(response)
      setSelectionImage(response.image);
      response.image.forEach((img) => {
        if(img.selected === 'true') {
          setImage(img)
        }
      })
    });

      const selectImage = (e) => {
        debugger
        e.preventDefault()
        const id = Number(e.target.id)
        
        setSelectedImageId(id)
         seletcionImage.forEach((image) => {
         if (image.id === id) {
          setImage(image)
         }
        })

        const data = {
          id: id
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
          withCredentials: true,
    
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
    
        fetch("http://localhost:3000/image/selected", options)
          .then((res) => res.json())
          .then((data) => {
            setSelectionImage(data.image)
          })
      }

      const startTheGame = () => {
        setIsActive(true)
debugger
        const data = {
          id: selectedImageId
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
          withCredentials: true,
    
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
    
        fetch("http://localhost:3000/cordinates", options)
          .then((res) => res.json())
          .then((data) => {
            setPlaces(data.cordinates)
            localStorage.setItem('num', data.num)
          })
      }

    return (
      <div className="intro-modal">
        {seletcionImage === undefined? <h2>Loading</h2>:
        
          seletcionImage.map((img) => {
            return (
               img.selected === 'true' ?
              <img
                key={img.id}
                id={img.id}
                onClick={selectImage}
                src={img.url}
                tabIndex="0"
                alt=""
                style={{ borderWidth: 6, borderColor: "green", borderStyle: "solid" }}
              /> : 
              <img
               tabIndex="0"
              key={img.id}
              id={img.id}     
              onClick={selectImage}
              src={img.url}
              alt=""
            /> 
            );
          })}

        <button onClick={startTheGame}>start</button>
      </div>
    );
  }
  return;
};

export default Start