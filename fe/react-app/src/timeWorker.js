let counter = 0;
let intervalId = null;

onmessage = function (e) {
  if (e.data === "start") {
    if (intervalId) {
      clearInterval(intervalId);
    }
    counter = 0;
    intervalId = setInterval(() => {
      counter++;
      postMessage(counter); // Send counter value back to main thread
    }, 1000);
  }

  if (e.data === "stop") {
    clearInterval(intervalId);
    intervalId = null;
  }
};
