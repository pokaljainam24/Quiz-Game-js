const quizQuestions = [
    {
        question: "What is the correct syntax to print a message to the console?",
        options: ["console.log('Hello')", "print('Hello')", "echo('Hello')", "System.out.println('Hello')"],
        answer: "console.log('Hello')"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Float"],
        answer: "Float"
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["let varName;", "variable varName;", "declare varName;", "var varName;"],
        answer: "let varName;"
    },
    {
        question: "What is the output of typeof NaN in JavaScript?",
        options: ["number", "NaN", "undefined", "string"],
        answer: "number"
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        options: [".push()", ".pop()", ".shift()", ".unshift()"],
        answer: ".push()"
    },
    {
        question: "What will 2 + '2' evaluate to in JavaScript?",
        options: ["4", "'22'", "undefined", "NaN"],
        answer: "'22'"
    },
    {
        question: "Which of the following is the correct way to create an object?",
        options: [
            "let obj = { key: 'value' };",
            "let obj = (key = 'value');",
            "let obj = [key: 'value'];",
            "let obj = key: 'value';"
        ],
        answer: "let obj = { key: 'value' };"
    },
    {
        question: "What will setTimeout return in JavaScript?",
        options: ["The delay time", "An ID that can be used to clear the timeout", "Undefined", "A Promise"],
        answer: "An ID that can be used to clear the timeout"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["/*", "//", "#", "<!--"],
        answer: "//"
    },
    {
        question: "How can you convert a string to an integer in JavaScript?",
        options: ["parseInt()", "toInteger()", "Number()", "All of the above"],
        answer: "parseInt()"
    }
];


/****************************************************** Logic Part Area ****************************************/

const quizContainer = document.getElementById("quiz-container");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const startButton = document.getElementById("start-btn");

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 15;
let currentTimer = null;


function startQuiz() {
    startButton.style.display = 'none';

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(quizQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function showQuestion(question) {
    quizContainer.innerHTML = "";
    timerDisplay.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    quizContainer.appendChild(questionElement);

    const optionsList = document.createElement("ul");`<hr>`
    

    question.options.forEach((option, index) => {

        const optionItem = document.createElement("li");
        const radioButton = document.createElement("input");
        radioButton.style.cursor = "pointer";

        radioButton.type = "radio";
        radioButton.name = "quiz-option";
        radioButton.value = option;
        radioButton.id = `option-${index}`;

        const label = document.createElement("label");

        label.htmlFor = `option-${index}`;
        label.textContent = option;

        optionItem.style.marginBottom = '10px';
        optionItem.appendChild(radioButton);
        optionItem.appendChild(label);
        optionsList.appendChild(optionItem);
    });

    quizContainer.appendChild(optionsList); 

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Answer";
    submitButton.style.marginTop = "20px";
    submitButton.onclick = function () {

        const selectedOption = document.querySelector('input[name="quiz-option"]:checked');

        if (selectedOption) {
            handleAnswer(selectedOption.value);
        } else {
            alert("Please select an answer before submitting.");
        }
    };

    optionsList.appendChild(submitButton);


    // Start timer
    let timeLeft = timeLimit;
    timerDisplay.textContent = `Time Remaining: ${timeLeft}s`;
    currentTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Remaining: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            currentTimer = null;
            handleAnswer(-1);
        }
    }, 1000);
}

function handleAnswer(selectedOption) {
    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }

    const question = quizQuestions[currentQuestionIndex];
    const userAnswer = selectedOption;

    if (userAnswer === question.answer) {
        score++;
    }
    
    currentQuestionIndex++;
    startQuiz();
}

function endQuiz() {
    quizContainer.innerHTML = "";
    timerDisplay.innerHTML = "";
    resultDisplay.innerHTML = `Quiz over! Your final score is: ${score}/${quizQuestions.length}`;
}

startButton.addEventListener("click", startQuiz);
