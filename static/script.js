// let score = 0;
// let timeLeft = 5;
// let wordsGuessed = [];
// let highestScoreDiv = $(`<div></div>`);
// highestScoreDiv.attr("id", "highestScore");
// let scorediv = $(`<div></div>)`);
// scorediv.attr("id", "score");
// scorediv.text(`your score is ${score}`);
// $("body").append(scorediv);

// const form = document.querySelector("form");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   sendGuess(getGuess());
// });

// function getGuess() {
//   let guess = document.querySelector("#guess");
//   return guess.value;
// }

// async function sendGuess(guess) {
//   const response = await axios.post("http://127.0.0.1:5000/handle", guess, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   console.log(`the word is ${guess}`);
//   console.log(response.data.result);
//   if (response.data.result == "ok") {
//     alert(`Yessir, you scored ${guess.length}`);
//     score += guess.length;
//     scorediv.text(`${guess.length} Points Added! Your score is ${score}`);
//   }
//   if (response.data.result == "not-a-word") {
//     alert(`${guess} is not a word in my dictionary`);
//   }
//   if (response.data.result == "not-on-board") {
//     alert(`${guess} is a word, but it's not on the table `);
//   }
// }
// function disableGuess() {
//   $("button").prop("disabled", true);
//   alert("Time's up! Game over.");
// }

// function updateTimer() {
//   document.getElementById("timer").textContent = timeLeft;
// }
// updateTimer();

// const timerInterval = setInterval(function () {
//   timeLeft--;
//   updateTimer();

//   if (timeLeft <= 0) {
//     clearInterval(timerInterval);
//     disableGuess();
//     sendScoreNHandleHighScore(score);
//   }
// }, 1000);

// async function sendScoreNHandleHighScore(score) {
//   const response = await axios.post(
//     "http://127.0.0.1:5000/handle_highscore",
//     score,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   console.log(response.data);
//   let highestScore = response.data;

//   highestScoreDiv.text(`Your highest score is ${highestScore}`);
//   $("body").append(highestScoreDiv);
// }

// Object oriented approach

// boggle.js

class BoggleGame {
  constructor() {
    this.score = 0;
    this.timeLeft = 60;
    this.highestScoreDiv = $("#highestScore");
    this.wordsUsed = [];
    this.highestScore = 0;
    this.scoreDiv = $("#score");
    this.form = $("form");
    this.timerInterval = null;
  }

  init() {
    this.scoreDiv.attr("id", "score");
    this.scoreDiv.text(`Your score is ${this.score}`);
    this.highestScoreDiv.attr("id", "highestScore");
    $("body").append(this.scoreDiv);

    this.form.on("submit", (e) => {
      e.preventDefault();
      if (this.checkWord(this.getGuess()) == false) {
        this.sendGuess(this.getGuess());
      } else {
        alert("word aleardy Used!!!");
      }
    });

    this.updateTimer();
    this.startTimer();
  }

  getGuess() {
    return $("#guess").val();
  }

  async sendGuess(guess) {
    const response = await axios.post("http://127.0.0.1:5000/handle", guess, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`The word is ${guess}`);
    console.log(response.data.result);

    if (response.data.result === "ok") {
      alert(`Yessir, you scored ${guess.length}`);
      this.score += guess.length;
      this.updateScore();
    } else if (response.data.result === "not-a-word") {
      alert(`${guess} is not a word in my dictionary`);
    } else if (response.data.result === "not-on-board") {
      alert(`${guess} is a word, but it's not on the table`);
    }
    this.wordsUsed.push(guess);
  }

  checkWord(word) {
    if (this.wordsUsed.indexOf(word) != -1) return true;
    else {
      return false;
    }
  }

  updateScore() {
    this.scoreDiv.text(
      `${guess.length} Points Added! Your score is ${this.score}`
    );
  }

  disableGuess() {
    $("button").prop("disabled", true);
    alert("Time's up! Game over.");
  }

  updateTimer() {
    $("#timer").text(this.timeLeft);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.disableGuess();
        this.sendScoreNHandleHighScore();
      }
    }, 1000);
  }

  async sendScoreNHandleHighScore() {
    const response = await axios.post(
      "http://127.0.0.1:5000/handle_highscore",
      this.score,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const highestScore = response.data;
    this.highestScoreDiv.text(`Your highest score is ${highestScore}`);
    console.log("appending to body ");
    $("body").append(this.highestScoreDiv);
  }
}

const game = new BoggleGame();
game.init();
