import { useState } from 'react'
import { Link} from 'react-router';
import './App.css'

export const App = () => {

  return (
    <>
     <div>
      <button><Link to="start">Start-Game</Link></button>
      <button>LeaderBoard</button>
     </div>
    </>
  )
}

export default App
