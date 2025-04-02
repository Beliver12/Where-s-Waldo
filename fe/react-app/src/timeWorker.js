let counter = 0;

onmessage = function (e) {
  if (e.data === "start") {
    // Simulate setInterval
    setInterval(() => {
      counter++;
      postMessage(counter); // Send counter value back to main thread
    }, 1000);
  }
};
