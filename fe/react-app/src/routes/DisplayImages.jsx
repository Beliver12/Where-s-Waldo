import Image1 from "../assets/Screenshot from 2025-03-24 10-35-04.png";
import Image2 from "../assets/Screenshot from 2025-03-24 10-35-13.png";
import Image3 from "../assets/Screenshot from 2025-03-24 10-35-21.png";

export const DisplayImages = ({ isClicked, positionX, positionY, width, height }) => {
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




  const handleClick = (e) => {
    e.preventDefault();
  };

  if (isClicked) {
    return (
      <div className="modal" style={{ top: positionY, left: positionX }}>
        <img onClick={handleClick} src={Image1} alt="image1" />
        <img src={Image2} alt="image2" />
        <img src={Image3} alt="image3" />
      </div>
    );
  }
  return;
};

export default DisplayImages