let firstLetter = '';
let secondLetter = '';
let thirdLetter = '';
let fourthLetter = '';
let fifthLetter = '';
let presentLetters = '';
let absentLetters = '';

const initialize = () => {
  const evalButton = document.getElementById('evaluate');

  const alreadyCounted = (letter) =>
    letter === firstLetter ||
    letter === secondLetter ||
    letter === thirdLetter ||
    letter === fourthLetter ||
    letter === fifthLetter;

  const actionableLetter = (index, letter, evaluation) => {
    switch (evaluation) {
      case 'correct':
        if (index === 0) {
          firstLetter = letter;
        } else if (index === 1) {
          secondLetter = letter;
        } else if (index === 2) {
          thirdLetter = letter;
        } else if (index === 3) {
          fourthLetter = letter;
        } else if (index === 4) {
          fifthLetter = letter;
        }
        break;
      case 'present':
        if (!alreadyCounted(letter)) presentLetters += letter;
        break;
      case 'absent':
        if (!alreadyCounted(letter)) absentLetters += letter;
        break;
    }
  };

  const evaluate = async (gameState) => {
    const boardState = gameState.boardState;
    const evaluations = gameState.evaluations;

    for (let idx = 0; idx < 6; ++idx) {
      const word = boardState[idx];
      if (word.length <= 0) break;
      const stateEvaluations = evaluations[idx];

      for (let letterIdx = 0; letterIdx < 5; ++letterIdx)
        actionableLetter(
          letterIdx,
          word[letterIdx],
          stateEvaluations[letterIdx]
        );
    }

    // remove duplicates in present letters and absent letters
    presentLetters = Array.from(new Set(presentLetters.split(','))).toString();
    absentLetters = Array.from(new Set(absentLetters.split(','))).toString();

    const backendUrl = `https://wordle-helper-anmol.herokuapp.com/find/${firstLetter},${secondLetter},${thirdLetter},${fourthLetter},${fifthLetter},${presentLetters},${absentLetters}`;
    const response = await fetch(backendUrl);
    const responseJSON = await response.json();
    console.log(presentLetters);
    console.log(absentLetters);

    const content = document.getElementById('content');
    content.innerText = JSON.stringify(responseJSON.result);
  };

  evalButton.addEventListener('click', async (e) => {
    e.preventDefault();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => window.localStorage.getItem('nyt-wordle-state'),
      },
      async (val) => {
        await evaluate(JSON.parse(val[0].result));
      }
    );
  });
};

document.addEventListener('DOMContentLoaded', initialize);
