import { useState } from "react";
import { Link } from "react-router";
import "../App.css";

export const Start = () => {
  const [username, setUsername] = useState("");
  return (
    <>
      <button>
        <Link to="/">Home</Link>
      </button>
      <form action="">
        <label htmlFor="username">Username</label>
        <input
          placeholder="username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button>
          <Link to="play">Play</Link>
        </button>
      </form>
      <div>Rules:</div>
    </>
  );
};

export default Start;
