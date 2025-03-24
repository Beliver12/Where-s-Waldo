import { useEffect, useState } from 'react'
import { Link} from 'react-router';
import { useRef } from "react";

import '../App.css'
import Image from '../assets/2687263 (1).jpg'
import Image1 from '../assets/Screenshot from 2025-03-24 10-35-04.png'
import Image2 from '../assets/Screenshot from 2025-03-24 10-35-13.png'
import Image3 from '../assets/Screenshot from 2025-03-24 10-35-21.png'

export const DisplayImages = ({isClicked, positionX, positionY}) => {
    const intX = 300;
    const intY = 100;
    if(positionX > 1563) {
        positionX = positionX - intX;
    }
    
    if(isClicked) {
        return <div className='modal'style={{top: positionY , left: positionX}}>
             <p>{positionX} {positionY}</p>
            <img src={Image1} alt="" /> 
            <img src={Image2} alt="" /> 
            <img src={Image3} alt="" />
        
            </div>
           
    }
    return;
}

const useMousePosition = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    
    useEffect(() => {
        
        const setFromEvent = e => setPosition({x: e.clientX, 
            y: e.clientY
        });
     window.addEventListener("mousemove", setFromEvent);
     return () => {
        window.removeEventListener("mousemove", setFromEvent)
     }
    }, [])

    return position;
}
export const Play = () => {
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [isClicked, setIsClicked] = useState(false)

    

    const position = useMousePosition();
    //const ref = useRef(); 

      const handleClick = (e) => {
        debugger
        e.preventDefault();
        setIsClicked(false)
         setX(position.x);
         setY(position.y);
         
         console.log(x, y)
      }
    
   
    
  return (
    <>
     <div  onClick={() => setIsClicked(!isClicked)}
     id='play'
  
     >
        <p>{position.x} {position.y}</p>
        
     <button><Link to="/">Home</Link></button>
     <DisplayImages isClicked={isClicked} positionX={x} positionY={y}/>
     <img className='main-image' onClick={handleClick}  src={Image} alt="" />
     
     </div>
    </>
  )
}

export default Play
