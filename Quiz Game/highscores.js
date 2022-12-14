const highScoresList = document.querySelector('#highScoresList')
const highScores=JSON.parse(localStorage.getItem('highScores')) ||[]
//highscores for an empty array


highScoresList.innerHTML=
highScores.map(score =>{
    return`<li class="high-score">${score.name}-${score.score}</li>`
}).join('')
//iteratoring through new array 
//score that you see and what ever you type in at the end of the quiz it will fill in 