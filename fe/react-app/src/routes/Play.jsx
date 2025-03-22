import { useEffect, useState } from 'react'
import { Link} from 'react-router';
import { useRef } from "react";

import '../App.css'
import Image from '../assets/2687263 (1).jpg'

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
    const [isDown, setIsDown] = useState(false)
    const [startX, setStartX] = useState();
    const [startY, setStartY] = useState();
    const [scrollLeft, setScrollLeft] = useState()
    const [scrollDown, setScrollDown] = useState()

const slider = document.querySelector('.slider')

  const handleMouseDown = (e) => {
    debugger
    setIsDown(true)
   slider.classList.add('active')
   setStartX(e.pageX - slider.offsetLeft) 
   setScrollLeft(slider.scrollLeft)
   setStartY(e.pageY - slider.offsetTop)
   setScrollDown(slider.scrollDown)
   console.log(slider)
  }

  const handleMouseLeave = () => {
    setIsDown(false)
    slider.classList.add('active')
  }
  const handleMouseUp = () => {
    setIsDown(false)
    slider.classList.remove('active')
  }
  const handleMouseMove = (e) => {
    //debugger
    if(!isDown) return;
   e.preventDefault();
   const x = e.pageX - slider.offsetLeft
   const y = e.pageY - slider.offsetTop;
   const walkX = (x - startX);
   const walkY = y - startY;
   slider.scrollLeft = scrollLeft - walkX;
   slider.scrollDown = scrollDown - walkY;
  }

    const position = useMousePosition();
    const ref = useRef(); 

      const handleClick = () => {
        //debugger
         setX(position.x);
         setY(position.y);
      }
  return (
    <>
     <div
     id='play'
     onMouseDown={handleMouseDown}
     onMouseLeave={handleMouseLeave}
     onMouseUp={handleMouseUp}
     onMouseMove={handleMouseMove}
     //className="flex max-w-xl  space-x-3 overflow-x-scroll  scrollbar-hide"
     className='slider'
  
     >
        <p>{position.x} {position.y}</p>
        
     <button><Link to="/">Home</Link></button>
     <img onClick={handleClick} src={Image} alt="" />
     </div>
    </>
  )
}

export default Play
