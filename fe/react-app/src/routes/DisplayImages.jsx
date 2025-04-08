

export const DisplayImages = ({ isClicked, positionX, positionY, width, height, places, setPlaces, setIsClicked }) => {
  const intX = (16.907368421052634 * width) / 100;
  const intY = 150;
  const percentageX = (positionX / width) * 100;
  const percentageY = (positionY / height) * 100;
 
  if (percentageX > 80 && width > 1500) {
    positionX = positionX - intX;
    positionY = positionY + 10;
  }
  if (percentageX > 80 && width < 1500 && width > 1000) {
    positionX = positionX - (intX + 20);
    positionY = positionY + 10;
  }
  if (percentageX > 80 && width < 1000 && width > 800) {
    positionX = positionX - (intX + 35);
    positionY = positionY + 10;
  }
  if (percentageX > 80 && width < 800 && width > 600) {
    positionX = positionX - (intX + 45);
    positionY = positionY + 10;
  }
  if (percentageX > 80 && width < 600 && width > 475) {
    positionX = positionX - (intX + 50);
    positionY = positionY + 10;
  }
  if (percentageX > 65 && width < 475 ) {
    positionX = positionX - (intX + 60)
    positionY = positionY + 10;
  }
  

  if (percentageY > 80 && width > 1700) {
    positionY = positionY - intY;
  }

  if (percentageY > 80 && width < 1700 && width > 1400) {
    positionY = positionY - (intY - 20);
  }

  if (percentageY > 80 && width < 1400 && width > 1250 ) {
    positionY = positionY - (intY - 30);
  }


  if (percentageY > 80 && width < 1250 && width > 1100 ) {
    positionY = positionY - (intY - 40);
  }

  if (percentageY > 80 && width < 1100 && width > 950 ) {
    positionY = positionY - (intY - 50);
  }

  if (percentageY > 80 && width < 950 && width > 800 ) {
    positionY = positionY - (intY - 60);
  }

  if (percentageY > 80 && width < 800 && width > 650) {
    positionY = positionY - (intY - 70);
  }

  if (percentageY > 80 && width < 650 && width > 500) {
    positionY = positionY - (intY - 80);
  }

  if (percentageY > 80 && width < 500 && width > 350) {
    positionY = positionY - (intY - 90);
  }

  if (percentageY > 80 && width < 350) {
    positionY = positionY - (intY - 100);
  }


const checkCords = (e) => {
  e.preventDefault()
  const num = localStorage.getItem("num")
  const data = {
    id: e.target.id,
    x: percentageX,
    y: percentageY,
    num: num
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

  fetch("http://localhost:3000/cordinates/check", options)
    .then((res) => res.json())
    .then((data) => {
    setPlaces(data.cordinates)
    setIsClicked(true)
    })
}

 

  if (isClicked) {
   
    return (
      <div className="modal" style={{ top: positionY, left: positionX }}>
        {places.map((place) => {
          return(
            place.found === 'true' ?
            <img
            key={place.id}
            id={place.id}     
            onClick={checkCords}
            src={place.url}
            style={{ borderWidth: 6, borderColor: "green", borderStyle: "solid" }}
            alt=""
          /> :
          <img
          key={place.id}
          id={place.id}     
          onClick={checkCords}
          src={place.url}
          alt=""
        /> 
          )
        })}
      </div>
    );
  }
  return;
};

export default DisplayImages