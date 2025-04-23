import { useEffect, useState, useRef } from "react";

const workerPath = new URL("../timeWorker", import.meta.url);
const worker = new Worker(workerPath);

export const Start = ({ setIsActive, start, setImage, setPlaces, setLoad, load }) => {
  const [seletcionImage, setSelectionImage] = useState();
  const [selectedImageId, setSelectedImageId] = useState();
  const [username, setUsername] = useState("");
  const [error, setError] = useState();

  //const workerRef = useRef(null);

  if(!load) {
    fetch("http://localhost:3000/image")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response)
      setSelectionImage(response.image);
      response.image.forEach((img) => {
        if(img.selected === 'true') {
          setImage(img)
        }
       
      })
    });
    setLoad(true)
  }

  if (!start) {

    

      const selectImage = (e) => {
        debugger
        e.preventDefault()
        document
        .querySelector(".loading")
        .classList.add("active");

        document
        .querySelector(".start").disabled = true;
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

          setTimeout(() => {
            document
            .querySelector(".loading")
            .classList.remove("active");

            document
        .querySelector(".start").disabled = false;
          }, 2000);
      }

      const startTheGame = async (event) => {
        worker.postMessage("start");
        event.preventDefault();
        document
        .querySelector(".loading")
        .classList.add("active");

        document
        .querySelector(".play").style.pointerEvents = 'none';
        
        document
        .querySelector(".main-image").style.pointerEvents = 'none';
        document
            .querySelector(".intro-modal").style.pointerEvents = 'none';
       

        const data = {
          username: username
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        fetch("http://localhost:3000/cordinates", options)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setPlaces(data.cordinates)
            localStorage.setItem('num', data.num)
            localStorage.setItem('user', username)
            
            if(!data.error) {
              setIsActive(true)
            }
  
            if(data.error) {
              setError(data.error)
            }
          })
          setTimeout(() => {
            document
            .querySelector(".intro-modal").style.pointerEvents = 'auto';

            document
        .querySelector(".loading")
        .classList.remove("active");
         
          }, 3000);
         
      }

    return (
      <div role="intro-modal" className="intro-modal">
        <div className="loading">
          <div className="loader"></div>
          </div>
      <div> {seletcionImage === undefined? <h2 className="loader"></h2>:
        
          seletcionImage.map((img) => {
            return (
               img.selected === 'true' ?
              <img
                key={img.id}
                id={img.id}
                onClick={selectImage}
                className="image"
                src={img.url}
                tabIndex="0"
                alt=""
                style={{ borderWidth: 4, borderColor: "green", borderStyle: "solid" }}
              /> : 
              <img
               tabIndex="0"
              key={img.id}
              id={img.id}   
              className="image"  
              onClick={selectImage}
              src={img.url}
              alt=""
            /> 
            );
          })}
</div> 
        {seletcionImage === undefined ? "" :
         <form onSubmit={startTheGame} method="POST">
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
        <button className="start" type="submit" >start</button>
        </form>
      }
      </div>
    );
  }
  return;
};

export default Start