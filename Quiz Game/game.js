const question = document.querySelector('#question');
const choices =Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[]

let questions=[
    {
        question:"_______ is the process of finding errors and fixing them within a program.",
        choice1:"compiling",
        choice2:"debugging",
        choice3:"executing",
        choice4:"scanning",
        answer: 2,
    },
    {
        question:"A loop that never end is referred to as a(n)",
        choice1:"infinite loop",
        choice2:"while loop",
        choice3:"for loop",
        choice4:"recursive loop",
        answer: 1,
    },
    {
        question:"During program development, software requirements specify",
        choice1:"How the program will accomplish the task",
        choice2:"How to divide the task into subtask",
        choice3:"How to test the prohram when it is done",
        choice4:"What the task is that program msut perform",
        answer: 4,
    },
    {
        question:"Jennie has just constructed her first for loop. Which of the following is not a required part of a for loop?",
        choice1:"Initialization",
        choice2:"Condition",
        choice3:"Increment",
        choice4:"Variable",
        answer: 4,
    }
]

const SCORE_POINTS= 25
const MAX_QUESTIONS = 4

startGame= () => {
    questionCounter = 0
    score=0
    availableQuestions=[...questions]//array spread operator, get values from questions
    getNewQuestion()
}

getNewQuestion= () => {
    if(availableQuestions.length===0||questionCounter>MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
    
    return window.location.assign('/end.html')//keeps track of score
}
   questionCounter++
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` 
   progressBarFull.style.width =`${(questionCounter/MAX_QUESTIONS) *100}%`

   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   currentQuestion = availableQuestions[questionsIndex]
   question.innerText = currentQuestion.question

   choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice'+ number]
   })

   availableQuestions.splice(questionsIndex,1)

   acceptingAnswers = true

}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return 
        
            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer= selectedChoice.dataset['number']
            
            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
            'incorrect'
            
            if(classToApply === 'correct'){
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply)
            
            setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        } ,1000)

    })
            
})

    incrementScore = num => { 
        score +=num
        scoreText.innerText = score
    }
  startGame()  
