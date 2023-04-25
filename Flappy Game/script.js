//create variable
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
//animate iteration, run every single time animiation run
hole.addEventListener('animationiteration', () => {
    //random variable, multiple by 300 this is creating the blocks change everytime
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});
//function to make gravity

setInterval(function(){
 //new variable equal to top harcater div  
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    //makes the block go to the left 
    //
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
   //make equal to inverse of the top
    var cTop = -(500-characterTop);
//if the charcater top is bellow the bottom, then the game is iver, then rest top position at 100
//create counter, for every single animation
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game over. Score: "+(counter-1));
        character.style.top = 100 + "px";
        counter=0;
    }
},10);
//
function jump(){
    jumping = 1;
    let jumpCount = 0;
    //runs every ten millisecond
    var jumpInterval = setInterval(function(){
        //counter keeps count, each time interval runs 
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
       //if the top is less than 6 dont keep adding to the top,stop jumping after 
       //the 15 interval so there is five interval
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        //if the jump count about 20 then were going to stop jumping and end it 
        if(jumpCount>20){

            clearInterval(jumpInterval);
            //set jumping back to zero 
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}