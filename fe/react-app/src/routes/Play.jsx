import { useEffect, useState } from 'react'
import { Link} from 'react-router';


import '../App.css'
import Image from '../assets/2687263 (1).jpg'
import Image1 from '../assets/Screenshot from 2025-03-24 10-35-04.png'
import Image2 from '../assets/Screenshot from 2025-03-24 10-35-13.png'
import Image3 from '../assets/Screenshot from 2025-03-24 10-35-21.png'

export const DisplayImages = ({isClicked, positionX, positionY}) => {
    const intX = 300;
    const intY = 150;
    if(positionX > 1563) {
        positionX = positionX - intX;
    }

  if(positionY > 788) {
    positionY = positionY - intY;
  }
    if(isClicked) {
        const position = useMousePosition();
        return <div className='modal'style={{top: positionY , left: positionX}}>
            <img src={Image1} alt="" /> 
            <img src={Image2} alt="" /> 
            <img src={Image3} alt="" />
        
            </div>
           
    }
    return;
}

export const Start =  ({setIsActive}) => {
    const [start, setStart] = useState(false)
    const handleStart = () => {
        setStart(true)
    }
    if(!start) {
    return <div className='intro-modal'>
         <button onMouseDown={() => setIsActive(true)} onClick={handleStart}>start</button>
    </div>
    } 
    return;
}

export const StopWatch = ({isActive}) => {
    const [time, setTime] = useState(0);

  
    useEffect(() => {
        let interval;
        if(isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
    }, [isActive])

    if(isActive) {
      
        return <h2>{(  Math.floor((time/ 1000) % 3600))}</h2>
    }
   
   
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
    const [isActive, setIsActive] = useState(false)

    

    const position = useMousePosition();
    //const ref = useRef(); 

      const handleClick = (e) => {
        debugger
        e.preventDefault();
        setIsClicked(false)
        console.log("y", y)
        console.log("position.y", position.y)
       
        if(window.scrollY) {
           setX(position.x);
            setY(position.y + window.scrollY);
          } else {

         setX(position.x);
         setY(position.y);
          }
         console.log("scroll",window.scrollY)
       
      }


    
    
  return (
    <>
    
    
      <nav> <StopWatch isActive={isActive}/>
      <button><Link to="/">Home</Link> {position.x} {position.y}</button></nav> 
      <Start setIsActive={setIsActive}/>
      <div  onClick={() => setIsClicked(!isClicked)}
      
     id='play'
  
     >
        
     <DisplayImages isClicked={isClicked} positionX={x} positionY={y}/>
     <img className='main-image' onClick={handleClick}  src={Image} alt="" />
     </div>
    </>
  )
}

export default Play
