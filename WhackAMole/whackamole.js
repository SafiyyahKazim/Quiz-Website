// getting all the div from html 
const holes = document.querySelectorAll(".hole"); 
const scoreBoard = document.querySelector(".score"); 
const mole = document.querySelectorAll(".mole"); 
const timer = document.querySelector(".time");
const missed = document.querySelector(".missed"); 
const amounthole = document.querySelector(".amountmole"); 
const holeUp = [];
let lastHole; // let are variables.
let timeUp;
let score = 0;
let timeCount;
let timeAmount = 60000;
var play = false;
let missedcounter = 0
let amountmolecounter = 0


// random gen for the time the mole will stay up and how much mole.
function randomGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// decide which hole the mole will pop up from
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length); // gets the index of the hole
  const hole = holes[idx]; // store the index in hole
  // if the hole picked it like the pervious hole, run the randomhole hole again to pick another hole.
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole; // store the hole in lasthole so we can test the if statment above
  amountmolecounter++ // amount of mole counter will increment
  amounthole.textContent = amountmolecounter // the amount will display on the game each time
  return hole; // return the hole back to peep so it can do the pop up.
}

// peep function controls the game
function peep() {
  let hole;
  // call randGen function to generate an amount of hole and time.
  const time = randomGen(800, 1500); // can change number to mess with visiable time
  const holeAmount = randomGen(1,3); // can change number to mess with hole amount,
                                     // it have to be within the range of holes.length.
  for(let i =0; i < holeAmount; i++) { // for loop for the amount of hole.
    hole = randomHole(holes); // decide which hole will pop up
    holeUp[i] = hole; // store the hole in an array for the timeout function below
    hole.classList.add("up"); // creating a class list on hole and added up to it. 
                              // it will trigger the up css.
  }
  // when the time is up, the lines inside will run
  setTimeout(() => {
    for(let i =0; i < holeUp.length; i++) { 
      hole = holeUp[i]; // i will go through all the index of hole that were up
      hole.classList.remove("up"); // remove the css up so the mole will go down again
      missedcounter++ // increment the miss counter
      missed.textContent = missedcounter; // display the amount of missed on the screen
    }
    if (!timeUp) peep(); // if the time is not up, call the peep function again (Recursive)
    if (timeUp) { // when the time is up
      play = false; // set play back to false so we can use the button again
    } // When the time is up, play will turn back to false.
  }, time); // the amount of time that was passed to this function. duration of the game
}

// the function that run first when the play button is clicked on
function startGame() {
  if(play == true) { // if the button is press on again, it will check if play is true
    // This is the prvent the game from being play again when current game is running.
    console.log("You are playing the game right now!");
  }
  if(play == false) { // if there are no current game playing, this lines in this if statement 
    tick(); // call the tick function to start a timer
    timeCount = timeAmount / 1000; // does the math to convert millisec to sec
    play = true; // set play as true to prevent another game
    scoreBoard.textContent = 0; // the score board will be 0 then increase as you hit.
    timeUp = false; // time is set to false if the time is up.
    peep(); // run the peep function to start the mole from peeping up the hole.
    setTimeout(() => (timeUp = true), timeAmount); // timeUp will turn true when the timeAmount is reach.
  }
}

// the bonk function will add the score when you hit a mole
function bonk() {
  score = score + 10; // the score will increase by 10 for each hit
  this.parentNode.classList.remove("up"); // the up from css will be removed so 
                                          // that mole will go back into the hole
  scoreBoard.textContent = score; // display the current score on the screen
}

// tick function controls the timer. 
// the reason i have this is because the original timer, 
// i created was control by the mole popping back down.
// So if a mole visiable time is 8 milisec, the timer will still drop
function tick() {
  setTimeout(() => {
    if(timeCount > 0){ // if the timer is greater than 0
    timeCount--; // sub the timer by 1
    timer.textContent = timeCount; // display the time left
    tick();
    }
    else { // else if timer is not greater than 0, it stop
      clearTimeout(); // cancel/stop the timeout
    }    
  },1000)
}

// a for each loop that will run through all the mole to find a click by the mouse
// when a click is detected, it will run the bonk function
mole.forEach((mole) => mole.addEventListener("click", bonk));
