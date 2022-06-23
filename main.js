//start of timer code
let days = 2; //starting number of days
let hours = 0; // starting number of hours
let minutes = 2; // starting number of minutes
let seconds = 5; // starting number of seconds

// converts all to seconds
let totalSeconds =
  days * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;

//temporary seconds holder
let tempSeconds = totalSeconds;

// calculates number of days, hours, minutes and seconds from a given number of seconds
const convert = (value, inSeconds) => {
  if (value > inSeconds) {
    let x = value % inSeconds;
    tempSeconds = x;
    return (value - x) / inSeconds;
  } else {
    return 0;
  }
};

//sets seconds
const setSeconds = (s) => {
  document.querySelector("#seconds").textContent = s + "s";
};

//sets minutes
const setMinutes = (m) => {
  document.querySelector("#minutes").textContent = m + "m";
};

//sets hours
const setHours = (h) => {
  document.querySelector("#hours").textContent = h + "h";
};

//sets Days
const setDays = (d) => {
  document.querySelector("#days").textContent = d + "d";
};

// Update the count down every 1 second
var x = setInterval(() => {
  //clears countdown when all seconds are counted
  if (totalSeconds <= 0) {
    clearInterval(x);
  }
  setDays(convert(tempSeconds, 24 * 60 * 60));
  setHours(convert(tempSeconds, 60 * 60));
  setMinutes(convert(tempSeconds, 60));
  setSeconds(tempSeconds == 60 ? 59 : tempSeconds);
  totalSeconds--;
  tempSeconds = totalSeconds;
}, 1000);
//end of timer code
// Start of ripple button code
const RippleButton = document.querySelector('.ripple-button');

function mousePositionToCustomProp(event, element) {
  let posX = event.offsetX;
  let posY = event.offsetY;

  element.style.setProperty('--x', posX + 'px');
  element.style.setProperty('--y', posY + 'px');
}

RippleButton.addEventListener('click', (e) => {
  mousePositionToCustomProp(e, RippleButton);
  RippleButton.classList.add('pulse');
  RippleButton.addEventListener('animationend', () => {
    RippleButton.classList.remove('pulse');
  });
})
// End of ripple button code
// Start of alert button code
const AlertButton = document.querySelector('.alert-button');

AlertButton.addEventListener('click', (e) => {
  mousePositionToCustomProp(e, AlertButton);
  AlertButton.classList.add('pulse');
  AlertButton.addEventListener('animationend', () => {
    AlertButton.classList.remove('pulse');
  });
  alert('This is an alert. Just like you asked.');
})
// End of alert button code