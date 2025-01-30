let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  
  let isAutoPlaying = false;
  let intervalId;
  
  //const autoPlay = () => {
  
  //};
  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
        document.querySelector('.auto-play-button').innerHTML = "Stop AutoPlay";
      }, 2000);
      isAutoPlaying = true;
  
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.auto-play-button').innerHTML = "AutoPlay";
    }
  }
  
  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
    });
  
  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
    });
  
  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
    });
  
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    }
  });
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
  
    let result = '';
  
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'YOU LOSE';
      } else if (computerMove === 'paper') {
        result = 'YOU WIN';
      } else if (computerMove === 'scissors') {
        result = 'TIE';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'YOU WIN';
      } else if (computerMove === 'paper') {
        result = 'TIE';
      } else if (computerMove === 'scissors') {
        result = 'YOU LOSE';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'TIE';
      } else if (computerMove === 'paper') {
        result = 'YOU LOSE';
      } else if (computerMove === 'scissors') {
        result = 'YOU WIN';
      }
    }
  
    if (result === 'YOU WIN') {
      score.wins += 1,  document.querySelector('.js-result').style.color = "green";
    } else if (result === 'YOU LOSE') {
      score.losses += 1,  document.querySelector('.js-result').style.color = "red";
    } else if (result === 'TIE') {
      score.ties += 1,  document.querySelector('.js-result').style.color = "yellow";
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = `RESULT:  ${result}`;
  
    document.querySelector('.js-moves').innerHTML = `Your Move
  <img src="images/${playerMove}.png" class="move-icon">
  <img src="images/${computerMove}.png" class="move-icon">
  Computer Move`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }