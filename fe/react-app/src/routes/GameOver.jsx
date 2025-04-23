import { useState,  } from "react";
import { Link } from "react-router";
import "../App.css";

export const GameOver = ({status}) => {

  if(status === 'Game Over') {
  return (
    <div role="outro-modal" className="outro-modal">
     
    <img className="gif" src="/src/assets/Bill Murray Applause GIF by MOODMAN.gif" alt="" />
 
    <button>
        <Link to="leaderBoard">LeaderBoard</Link>
        </button>
    
  </div>
);
  }
  return;
};

export default GameOver;
