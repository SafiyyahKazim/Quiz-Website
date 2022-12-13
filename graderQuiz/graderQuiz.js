
function starting() {
    var gradechoice = document.getElementById("grade").value
    const quiz = document.getElementById('quiz')
    const question = document.getElementById('question')
    const answereh = document.querySelectorAll('.answer')
    const texta = document.getElementById('texta')
    const textb = document.getElementById('textb')
    const textc = document.getElementById('textc')
    const textd = document.getElementById('textd')
    const submitButton = document.getElementById('submit')
    
    // set variable
    let currentQuestion = 0
    let score = 0
    let percent = 0
    
    //---------------------------------------------------------------Grade 3-----------------------------------------------------------
    if(gradechoice == 3) {
        document.querySelector('.contentbox').style.display = 'none'
        const graderQuiz = [
            {
                question: "What is 1 + 3?",
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
        // Start of the program
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // Will remove the selected choice from last question.
            deselectAnswer()

            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers
            question.innerText = currentQuestionData.question
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
                if(answer == graderQuiz[currentQuestion].correct){
                    score++
                }

                currentQuestion++ 

                if(currentQuestion < graderQuiz.length) {
                    loadQuestion()
                } 
                else {
                    percent = (score / graderQuiz.length) * 100
                    quiz.innerHTML = `<h2> You answered ${score}/${graderQuiz.length} questions correct!</h2>
                    <h2> Your grade is ${percent} percent.</h2>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
            }  
        })
    }




//---------------------------------------------------------------Grade 4-----------------------------------------------------------
    if(gradechoice == 4) {
        document.querySelector('.contentbox').style.display = 'none';
        const graderQuiz = [
            {
                question: "What is 1 + 4?",
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
        // Start of the program
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // Will remove the selected choice from last question.
            deselectAnswer()

            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers
            question.innerText = currentQuestionData.question
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
                if(answer == graderQuiz[currentQuestion].correct){
                    score++
                }

                currentQuestion++ 

                if(currentQuestion < graderQuiz.length) {
                    loadQuestion()
                } 
                else {
                    percent = (score / graderQuiz.length) * 100
                    quiz.innerHTML = `<h2> You answered ${score}/${graderQuiz.length} questions correct!</h2>
                    <h2> Your grade is ${percent} percent.</h2>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
            }  
        })
    }


//---------------------------------------------------------------Grade 5-----------------------------------------------------------
    if(gradechoice == 5) {
        document.querySelector('.contentbox').style.display = 'none';
        const graderQuiz = [
            {
                question: "What is 1 + 5?",
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
        // Start of the program
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // Will remove the selected choice from last question.
            deselectAnswer()

            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers
            question.innerText = currentQuestionData.question
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
                if(answer == graderQuiz[currentQuestion].correct){
                    score++
                }

                currentQuestion++ 

                if(currentQuestion < graderQuiz.length) {
                    loadQuestion()
                } 
                else {
                    percent = (score / graderQuiz.length) * 100
                    quiz.innerHTML = `<h2> You answered ${score}/${graderQuiz.length} questions correct!</h2>
                    <h2> Your grade is ${percent} percent.</h2>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
            }  
        })
    }  
}
























// Holds the question and answers
/*const careerQuiz = [
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
    
    
];*/

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answereh = document.querySelectorAll('.answer')
const texta = document.getElementById('texta')
const textb = document.getElementById('textb')
const textc = document.getElementById('textc')
const textd = document.getElementById('textd')
const submitButton = document.getElementById('submit')

// set variable
let currentQuestion = 0
let score = 0
let percent = 0


