let btnStartElement = document.getElementById("btnStart");
let btnStopElement = document.getElementById("btnStop");
let btnResetElement = document.getElementById("btnReset");
let watchElement = document.getElementById("divWatch");

let interval;
let startTime;
let counter = 0;

btnStartElement.onclick = () => {
  btnStartElement.disabled = true;
  btnStopElement.disabled = false;
  startTime = Date.now() - counter;

  interval = setInterval(() => {
    counter = Date.now() - startTime
    setWatch(counter);
  }, 25);
};

btnStopElement.onclick = () => {
  btnStartElement.disabled = false;
  btnStopElement.disabled = true;
  clearInterval(interval);
}

btnResetElement.onclick = () => {
  startTime = Date.now();
  counter = 0;
  setWatch(counter);
};

function setWatch(millisTotal) {
  let minutes = Math.floor(millisTotal / 60000);
  let seconds = Math.floor(millisTotal / 1000) % 60;
  let milliseconds = millisTotal % 1000;
  
  let minutesFormattet = minutes.toString().padStart(2, '0');
  let secondsFormattet = seconds.toString().padStart(2, '0');
  let millisecondsFormattet = milliseconds.toString().padStart(3, '0');

  watchElement.innerText = minutesFormattet + ":" + secondsFormattet + ":" + millisecondsFormattet;
}

btnStopElement.disabled = true;
setWatch(0);