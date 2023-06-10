// Start of ripple button code
const RippleButton = document.querySelector(".ripple-button");

function mousePositionToCustomProp(event, element) {
  let posX = event.offsetX;
  let posY = event.offsetY;

  element.style.setProperty("--x", posX + "px");
  element.style.setProperty("--y", posY + "px");
}

RippleButton.addEventListener("click", (e) => {
  mousePositionToCustomProp(e, RippleButton);
  RippleButton.classList.add("pulse");
  RippleButton.addEventListener("animationend", () => {
    RippleButton.classList.remove("pulse");
  });
});
// End of ripple button code
// Start of alert button code
const AlertButton = document.querySelector(".alert-button");

AlertButton.addEventListener("click", (e) => {
  mousePositionToCustomProp(e, AlertButton);
  AlertButton.classList.add("pulse");
  AlertButton.addEventListener("animationend", () => {
    AlertButton.classList.remove("pulse");
  });
  alert("This is an alert. Just like you asked.");
});
// End of alert button code
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navbarResponsiveness() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
