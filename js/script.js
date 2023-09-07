const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
    imgSrc: "assets/france.png",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
    imgSrc: "assets/planets.png",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
    imgSrc: "assets/romeo-and-juliet.png",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
    imgSrc: "assets/animal.png",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
    imgSrc: "assets/plants.png",
  },
];


const gameEndInfo = [
  {
    scoreHead: "Perfect, You nailed it",
    scoreImage: 'assets/perfect.gif'
  },
  {
    scoreHead: "Congartulations, you did it!",
    scoreImage: 'assets/congrats.gif'
  },
  {
    scoreHead: "Better Luck next time!",
    scoreImage: 'assets/betterLuck.gif'
  }
]

//Game Card
const cardHolderDiv = document.querySelector(".card-holder");
const imageHolderImg = document.querySelector(".image-holder img");
const questionHeadH = document.querySelector(".question-Head");
const choicesListLi = document.querySelector(".choices-list");
const timerDiv = document.querySelector("#timer");
const questionNumTagDiv = document.querySelector(".question-num-tag");
//Score Card
const gameEndCardDiv = document.querySelector(".gameEndCard");
const gameEndScoreH = document.querySelector(".gameEndScore");
const gameEndMessageP = document.querySelector(".gameEndMessage");
const gameEndImageImg = document.querySelector(".gameEndImage img");


let gameScore = 0;
let questionsIndex = 0;

game();

function game() {
  renderQuestion(quizData[questionsIndex], questionsIndex + 1);
  handleGame();
}

function renderQuestion(questionObj, index) {
  questionNumTagDiv.textContent = `${index}/${quizData.length}`;
  imageHolderImg.setAttribute("src", questionObj.imgSrc);
  questionHeadH.textContent = questionObj.question;

  for (let i = 0; i < questionObj.options.length; i++) {
    choicesListLi.children[i].textContent = questionObj.options[i];
  }

  timerDiv.children[1].textContent = questionObj.timeLimit;
}


function handleGame() {
  let time = timerDiv.children[1].textContent;

  let timeInterval = setInterval(function () {
    if (time != 0) {
      time--;
      timerDiv.children[1].textContent = time;
    } else {
      if (questionsIndex < quizData.length - 1) {
        questionsIndex++;
        renderQuestion(quizData[questionsIndex], questionsIndex + 1);
        time = timerDiv.children[1].textContent;
      } else {
        endGame();
        clearInterval(timeInterval);
      }
    }
  }, 1000);

  choicesListLi.addEventListener("click", function (e) {
    if (e.target.classList.contains("answer-choice")) {
      if (e.target.textContent === quizData[questionsIndex].correctAnswer) {
        handleScore(true, time);
      }
      if (questionsIndex < quizData.length - 1) {
        questionsIndex++;
        renderQuestion(quizData[questionsIndex], questionsIndex + 1);
        time = timerDiv.children[1].textContent;
      } else {
        endGame();
        clearInterval(timeInterval);
      }
    }
  });
}


function handleScore(isCorrectAnswer, remainingTime) {
  if (isCorrectAnswer) {
    gameScore++;
  }
  if (remainingTime > 10) {
    gameScore += 2;
  } else if (remainingTime > 5) {
    gameScore += 1;
  }
}


function endGame(){
  cardHolderDiv.classList.add("d-none");
  gameEndCardDiv.classList.remove("d-none");
  gameEndScoreH.textContent = gameScore;
  if(gameScore > 10){
    gameEndMessageP.textContent = gameEndInfo[0].scoreHead;
    gameEndImageImg.setAttribute("src", gameEndInfo[0].scoreImage)
  }else if(gameScore > 4){
    gameEndMessageP.textContent = gameEndInfo[1].scoreHead;
    gameEndImageImg.setAttribute("src", gameEndInfo[1].scoreImage)
  }else{
    gameEndMessageP.textContent = gameEndInfo[2].scoreHead;
    gameEndImageImg.setAttribute("src", gameEndInfo[2].scoreImage)
  }
}
