let stepX = 2;
let stepY = 2;
let stepRacket = 0;
let id = 0;
let aiScore = 0;
let playerScore = 0;


function move() {
  let circle = document.querySelector("circle");
  let svg = document.querySelector("svg");
  let cx = parseInt(circle.getAttribute("cx"));
  let cy = parseInt(circle.getAttribute("cy"));
  let radius = parseInt(circle.getAttribute("r"));
  let width = parseInt(svg.getAttribute("width"));
  let height = parseInt(svg.getAttribute("height"));
  
  let aiRacket = document.querySelector("#aiRacket");
  let aiHeight = parseInt(aiRacket.getAttribute("height"));
  let aiWidth = parseInt(aiRacket.getAttribute("width"));
  let aiX = parseInt(aiRacket.getAttribute("x"));
  let aiY = parseInt(aiRacket.getAttribute("y"));
  
  let userRacket = document.querySelector("#racket");
  let userHeight = parseInt(userRacket.getAttribute("height"));
  let userWidth = parseInt(userRacket.getAttribute("width"));
  let userX = parseInt(userRacket.getAttribute("x"));
  let userY = parseInt(userRacket.getAttribute("y"));
  
  cx = cx + stepX;
  cy = cy + stepY;
  
  let collisionUser = cx + radius > userX && cy >= userY && cy <= userY + userHeight;
  let collisionAi = cx - radius < aiX + aiWidth && cy > aiY && cy < aiY + aiHeight;
  let collisionBorder = cy + radius >= height || cy - radius <= 0;

  if (collisionUser) {
    stepX = -stepX;
    cx = userX - radius;
  }
  
  if (collisionAi) {
    stepX = -stepX;
  }

  if (collisionBorder) {
    stepY = -stepY;
  }
  
  if(cx - radius <= 0) {
    playerScore += 1;
    cx = width/2;
    document.querySelector("#playerScore").innerHTML = playerScore;
  }
  
  if(cx + radius >= width) {
    aiScore += 1;
    cx = width/2;
    document.querySelector("#aiScore").innerHTML = aiScore;
  }
  
  
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  
  aiRacket.setAttribute("y", cy - aiHeight/2);

}

function moveRacket() {
  let racket = document.querySelector("#racket");
  let y = parseInt(racket.getAttribute("y"));
  
  racket.setAttribute("y", y + stepRacket);

}

setInterval(move, 10);
setInterval(moveRacket, 10);


document.addEventListener("keydown", function(event) {
  if (event.keyCode == 38) {
    stepRacket = -5;
  } else if (event.keyCode == 40) {
    stepRacket = 5;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 38 || event.keyCode == 40) {
    stepRacket = 0;
  }
});

