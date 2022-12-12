// Holds the question and answers
const careerQuiz = [
    {
        question: "What is 1 + 1?",
        a: "3",
        b: "2",
        c: "10",
        d: "1",
        correct: "b",
    },
    {
        question: "What is 1 + 1?",
        a: "32",
        b: "42",
        c: "10",
        d: "2",
        correct: "d",
    },
    
    
];

const quiz = document.getElementById('quiz')
const questioneh = document.getElementById('question')
const answereh = document.querySelectorAll('.answer')
const texta = document.getElementById('texta')
const textb = document.getElementById('textb')
const textc = document.getElementById('textc')
const textd = document.getElementById('textd')
const submitButton = document.getElementById('submit')

// set variable
let currentQuestion = 0
let score = 0

// Start of the program
loadQuestion()

// Loads the question
function loadQuestion() {
    // Will remove the selected choice from last question.
    deselectAnswer()

    const currentQuestionData = careerQuiz[currentQuestion]
    // Display the current question and answers
    questioneh.innerText = currentQuestionData.question
    texta.innerText  = currentQuestionData.a
    textb.innerText  = currentQuestionData.b
    textc.innerText  = currentQuestionData.c
    textd.innerText  = currentQuestionData.d
}

function deselectAnswer() {
    answereh.forEach(answereh => answereh.checked = false)
}

function getChoice() {
    let answer 
    answereh.forEach(answereh => {
        if(answereh.checked) {
            answer = answereh.id
        }
    })
    return answer
}

//event when button is clicked on
submitButton.addEventListener('click', () => {
    const answer = getChoice()
    if(answer) {
        if(answer == careerQuiz[currentQuestion].correct){
            score++
        }

        currentQuestion++ 

        if(currentQuestion < careerQuiz.length) {
            loadQuestion()
        } 
        else {
            quiz.innerHTML = `<h2> You answered ${score}/${careerQuiz.length} questions correct!</h2>
            <button onclick = "location.reload()">Retry</button>
            `
        }
    }  
})



