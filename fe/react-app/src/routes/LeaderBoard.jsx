import { useEffect, useState } from "react";
import { Link } from "react-router";

export const LeaderBoard = () => {
    const [leaderBoard, setLeaderBoard] = useState();
    const [stop, setStop] = useState(false)
  debugger
  if(!stop) {
    const id = localStorage.getItem("leaderBoard")

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

    fetch("http://localhost:3000/leaderBoard", options)

    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        setLeaderBoard(data.leaderBoard);
    })
    setStop(true)
  }

    return (
      <div className="leaderBoard"> <h1>LeaderBoard</h1>
       <Link to="/">Home</Link>
       <table >
                <thead>
                  <tr >
                    <th>Date</th>
                    <th>Username</th>
                    <th>Time</th>
                  </tr>
                </thead>
         {leaderBoard === undefined ? '':

         leaderBoard.map((leader) => {
            return (
                
                <tbody key={leader.id}>
            <tr>
                <td >
                    {leader.date}
                </td>
                <td >
                    {leader.userName}
                </td>
                <td >
                    {leader.time}
                </td>
            </tr>
            </tbody>
           
         )})
        }
        </table>
      </div> 
    )
}

export default LeaderBoard