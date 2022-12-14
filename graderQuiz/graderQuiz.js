
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
        document.querySelector('.container').style.backgroundImage = "url('background/hello-third-grade-background-inspirational-quotes-typography-lettering-design-first-day-school_557783-209.webp')";
        const graderQuiz = [
            {
                question: "What is 10 x 3?",
                a: "100",
                b: "30",
                c: "1000",
                d: "11,000",
                correct: "b",
            },
            {
                question: "What is the largest planet in the solar system?",
                a: "Saturn",
                b: "Jupiter",
                c: "Mercury",
                d: "Earth",
                correct: "b",
            }, 
            {
                question: "Which animal is the fastest land animal?",
                a: "Lion",
                b: "Tiger",
                c: "Cheetah",
                d: "Panda",
                correct: "c",
            }, 
            {
                question: "12 - 6 = ?",
                a: "6",
                b: "5",
                c: "7",
                d: "10",
                correct: "a",
            }, 
            {
                question: "How much hour is one day on Earth?",
                a: "24 hours",
                b: "12 hours",
                c: "48 hours",
                d: "25 hours",
                correct: "a",
            },  
        ];

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
        document.querySelector('.container').style.backgroundImage = "url('background/hello-fourth-grade-background-inspirational-quotes-typography-lettering-design-first-day-school_557783-200.webp')";
        const graderQuiz = [
            {
                question: "How many days does it take for the Earth to go around the sun 360 degree?",
                a: "365 days",
                b: "2 years",
                c: "100 days",
                d: "1 day",
                correct: "a",
            },
            {
                question: "What is the force that keeps us on Earth?",
                a: "Weight",
                b: "Oxygen",
                c: "Electricity",
                d: "Gravity",
                correct: "d",
            },
            {
                question: "In what state of matter is water when it is frozen into ice?",
                a: "Gas",
                b: "Energy",
                c: "Liquid",
                d: "Solid",
                correct: "d",
            },
            {
                question: "What is (14 + 5) - (5 - 2)?",
                a: "16",
                b: "13",
                c: "12",
                d: "23",
                correct: "a",
            },
            {
                question: "9 x n = 45. What is n?",
                a: "6",
                b: "3",
                c: "5",
                d: "7",
                correct: "c",
            },
        ];

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
        document.querySelector('.container').style.backgroundImage = "url('background/hello-fifth-grade-background-inspirational-quotes-typography-lettering-design-first-day-school_557783-197.webp')";
        const graderQuiz = [
            {
                question: "What unit of measurement is abbreviated oz?",
                a: "Ounces",
                b: "Pounds",
                c: "Liters",
                d: "Gallon",
                correct: "a",
            },
            {
                question: "Which continent is the least populated?",
                a: "Asia",
                b: "Antarctica",
                c: "Australia",
                d: "Europe",
                correct: "b",
            },   
            {
                question: "Which planet in our solar system is known for its beautiful ring?",
                a: "Mars",
                b: "Saturn",
                c: "Jupiter",
                d: "Earth",
                correct: "b",
            },   
            {
                question: "How many sides does a quadrangle have?",
                a: "3",
                b: "5",
                c: "10",
                d: "4",
                correct: "d",
            },   
            {
                question: "Numbers: 42, 23, 1, 25, 454, which number is the medium?",
                a: "25",
                b: "1",
                c: "23",
                d: "42",
                correct: "a",
            },   
        ];

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



















