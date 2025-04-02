import { useEffect, useState } from "react";
//const workerPath = new URL("../timeWorker", import.meta.url);
//const worker = new Worker(workerPath);

export const StopWatch = ({ isActive }) => {
  const [time, setTime] = useState(0);

 /* useEffect(() => {
    if (isActive) {
      worker.postMessage("start");
      worker.onmessage = function (e) {
        // console.log('Counter from worker:', e.data);
        setTime(e.data);
      };
    }
  }, [isActive]);*/

  if (isActive) {
    return <h2>{time}</h2>;
  }
};

export default StopWatch