import { useEffect, useState} from "react";
import React from "react";
import { Link } from "react-router";

export const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState();
  const [stop, setStop] = useState(false);
  debugger;
  if (!stop) {
    const id = localStorage.getItem("leaderBoard");

    const data = {
      id: id,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      withCredentials: true,

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("https://where-s-waldo-tau.vercel.app/leaderBoard", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        

        const formatDate = (date = new Date()) => {
          return new Date().toISOString().split('T')[0];
        };
        for (let i = 0; i < data.leaderBoard.length; i++) {
          data.leaderBoard[i].date = formatDate( data.leaderBoard[i].date);
        }
        setLeaderBoard(data.leaderBoard);
      });
    setStop(true);
  }

  return (
    <div className="leaderBoard">
      {" "}
      <h1>LeaderBoard</h1>
      <Link to="/">Home</Link>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Time</th>
            <th>Rank</th>
          </tr>
        </thead>
        {leaderBoard === undefined
          ? <tbody >
            <tr >
              <td >Checking...</td>
            </tr>
          </tbody>
          : leaderBoard.map((leader, index) => {
              return index === 0 ? (
               
                <tbody key={leader.id}>
                  <tr>
                    <td className="date">{leader.date}</td>
                    <td>{leader.userName}</td>
                    <td className="time">{leader.time}</td>
                
                    <td><img src="/src/assets/medal.png" alt="" /></td>
                  </tr>
                </tbody>
              ) :
              index === 1 ? (
                <tbody key={leader.id}>
                  <tr>                   
                    <td className="date">{leader.date}</td>
                    <td>{leader.userName}</td>
                    <td className="time">{leader.time}</td>
                    <td><img src="/src/assets/medal (1).png" alt="" /></td>
                  </tr>
                </tbody>
              ) :
              index === 2 ? (
                <tbody key={leader.id}>
                  <tr>
                    <td className="date">{leader.date}</td>
                    <td>{leader.userName}</td>
                    <td className="time">{leader.time}</td>
                    <td><img src="/src/assets/medal (2).png" alt="" /></td>
                  </tr>
                </tbody>
              ) :
              <tbody key={leader.id}>
                  <tr>
                    <td className="date">{leader.date}</td>
                    <td>{leader.userName}</td>
                    <td className="time">{leader.time}</td>
                  </tr>
                </tbody>
            })}
      </table>
    </div>
  );
};

export default React.memo(LeaderBoard);
