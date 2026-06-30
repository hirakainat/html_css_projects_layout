const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale ", correct: true },
            { text: "elephant", correct: false },
            { text: "giraffe", correct: false }
        ]
    },

    {
        question: "which is the smallest continent in the world?",
        answers: [
            { text: "asia", correct: false },
            { text: "australia ", correct: true },
            { text: "arctic", correct: false },
            { text: "africa", correct: false }
        ]
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
            { text: "vatican city", correct: true },
            { text: "bhutan ", correct: true },
            { text: "nepal", correct: false },
            { text: "shri lanka", correct: false }
        ]
    },
    {
        question: "which is the largest desert in the world?",
        answers: [
            { text: "kalahari", correct: false },
            { text: "gobi ", correct: true },
            { text: "sahara", correct: false },
            { text: "antarctica", correct: false }
        ]
    }

]

const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-btn");
const nextbutton = document.getElementById("next-btn");
let currentquestionindex = 0;
let score = 0;
function startquiz() {
    resetState();
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
}
function showquestion() {
    resetState();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionElement.innerHTML = questionno + "." + currentquestion.question;
    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetState() {
    nextbutton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}
function showscore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;

    nextbutton.innerHTML = "play again";
    nextbutton.style.display = "block";
}
function handlenextbutton() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
        showquestion();
    }
    else {
        showscore();
    }
}
nextbutton.addEventListener("click", handlenextbutton);
startquiz();
