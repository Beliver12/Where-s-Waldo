import { useEffect, useState } from "react";
import React from "react";
const workerPath = new URL("../timeWorker", import.meta.url);
const worker = new Worker(workerPath);

export const StopWatch = ({ isActive }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isActive) {
      if(document.querySelector(".play") && document.querySelector(".main-image")) {
      document.querySelector(".play").style.pointerEvents = "auto";

      document.querySelector(".main-image").style.pointerEvents = "auto";

      }
      worker.postMessage("start");
      worker.onmessage = function (e) {
        setTime(e.data);
      };
    }
  }, [isActive]);

  if (isActive) {
    return <h2 className="timer">{time}</h2>;
  }
};

export default React.memo(StopWatch);
