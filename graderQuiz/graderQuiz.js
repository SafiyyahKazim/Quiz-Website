
function starting() {
    var gradechoice = document.getElementById("grade").value // gets the value from grade choice (3,4, or 5)
    const answer = document.querySelectorAll('.answer') // get all the input (bubble / radio)
    // get all the id from the html so we can edit text
    const quiz = document.getElementById('quiz') 
    const question = document.getElementById('question')
    const texta = document.getElementById('texta')
    const textb = document.getElementById('textb')
    const textc = document.getElementById('textc')
    const textd = document.getElementById('textd')
    const submitButton = document.getElementById('submit')
    
    // set variable
    let currentQuestion = 0
    let score = 0
    let percent = 0
    let answerpicked 
    
    //---------------------------------------------------------------Grade 3-----------------------------------------------------------
    if(gradechoice == 3) {
        document.querySelector('.contentbox').style.display = 'none' // remove the content box for asking grade
        // change the background image
        document.querySelector('.container').style.backgroundImage = "url('background/hello-third-grade-background-inspirational-quotes-typography-lettering-design-first-day-school_557783-209.webp')";
        // question and answer holder. Its an array
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
        
        // call the load question function
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // store graderquiz array index data to current question data.
            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers (currentQuestionData )
            question.innerText = currentQuestionData.question
            texta.innerText  = currentQuestionData.a
            textb.innerText  = currentQuestionData.b
            textc.innerText  = currentQuestionData.c
            textd.innerText  = currentQuestionData.d
        }
  
        //event when button is clicked on
        submitButton.addEventListener('click', () => { 
            // Run a for each loop to see if an answer bubble is selected 
            answer.forEach(answer => {
                if(answer.checked) { // if an answer bubble is sleceted
                    answerpicked = answer.id // store the selected bubble id into answer picked
                }
                answer.checked = false; // remove the old check for bubble 
                                        // so it doesnt display on next question
            })
            //if the answer picked matches the correct answer
            if(answerpicked == graderQuiz[currentQuestion].correct){
                score++ // the score increase
            }

            currentQuestion++ // increment the currentquestion so it goes to the next array

            // if currentquestion is less than graderQuiz array length 
            // which means there is more questions left
            if(currentQuestion < graderQuiz.length) { 
                loadQuestion() // load the next question
            } 
            else { // if not less than
                percent = (score / graderQuiz.length) * 100 // calculate the amount right into percent
                if(percent >= 65) { // if percent is greater than 65,
                    // display the percent, you passed message and a button to refresh the web page
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1> 
                    <h1>You passed!!</h1>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
                else { // if not greater than 65
                    // display the percent, you failed message and the button
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1>
                    <h1>You failed!!</h1>
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

        // call the load question function
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // store graderquiz array index data to current question data.
            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers (currentQuestionData )
            question.innerText = currentQuestionData.question
            texta.innerText  = currentQuestionData.a
            textb.innerText  = currentQuestionData.b
            textc.innerText  = currentQuestionData.c
            textd.innerText  = currentQuestionData.d
        }
  
        //event when button is clicked on
        submitButton.addEventListener('click', () => { 
            // Run a for each loop to see if an answer bubble is selected 
            answer.forEach(answer => {
                if(answer.checked) { // if an answer bubble is sleceted
                    answerpicked = answer.id // store the selected bubble id into answer picked
                }
                answer.checked = false; // remove the old check for bubble 
                                        // so it doesnt display on next question
            })
            //if the answer matches the correct answer
            if(answerpicked == graderQuiz[currentQuestion].correct){
                score++ // the score increase
            }

            currentQuestion++ // increment the currentquestion so it goes to the next array

            // if currentquestion is less than graderQuiz array length 
            // which means there is more questions left
            if(currentQuestion < graderQuiz.length) { 
                loadQuestion() // load the next question
            } 
            else { // if not less than
                percent = (score / graderQuiz.length) * 100 // calculate the amount right into percent
                if(percent >= 65) { // if percent is greater than 65,
                    // display the percent, you passed message and a button to refresh the web page
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1> 
                    <h1>You passed!!</h1>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
                else { // if not greater than 65
                    // display the percent, you failed message and the button
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1>
                    <h1>You failed!!</h1>
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

        // call the load question function
        loadQuestion()

        // Loads the question
        function loadQuestion() {
            // store graderquiz array index data to current question data.
            const currentQuestionData = graderQuiz[currentQuestion]
            // Display the current question and answers (currentQuestionData )
            question.innerText = currentQuestionData.question
            texta.innerText  = currentQuestionData.a
            textb.innerText  = currentQuestionData.b
            textc.innerText  = currentQuestionData.c
            textd.innerText  = currentQuestionData.d
        }
  
        //event when button is clicked on
        submitButton.addEventListener('click', () => { 
            // Run a for each loop to see if an answer bubble is selected 
            answer.forEach(answer => {
                if(answer.checked) { // if an answer bubble is sleceted
                    answerpicked = answer.id // store the selected bubble id into answer picked
                }
                answer.checked = false; // remove the old check for bubble 
                                        // so it doesnt display on next question
            })
            //if the answer matches the correct answer
            if(answerpicked == graderQuiz[currentQuestion].correct){
                score++ // the score increase
            }

            currentQuestion++ // increment the currentquestion so it goes to the next array

            // if currentquestion is less than graderQuiz array length 
            // which means there is more questions left
            if(currentQuestion < graderQuiz.length) { 
                loadQuestion() // load the next question
            } 
            else { // if not less than
                percent = (score / graderQuiz.length) * 100 // calculate the amount right into percent
                if(percent >= 65) { // if percent is greater than 65,
                    // display the percent, you passed message and a button to refresh the web page
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1> 
                    <h1>You passed!!</h1>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
                else { // if not greater than 65
                    // display the percent, you failed message and the button
                    quiz.innerHTML = `<h1> Your grade is ${percent} percent.</h1>
                    <h1>You failed!!</h1>
                    <button onclick = "location.reload()">Retry</button>
                    `
                }
            }
             
        })
    }  
}
