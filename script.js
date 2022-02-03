const makeRequest = async (
  first,
  second,
  third,
  fourth,
  fifth,
  present,
  absent
) => {
  const response = await fetch(
    `/find/${first},${second},${third},${fourth},${fifth},${present},${absent}`
  );
  return await response.json();
};

window.addEventListener('DOMContentLoaded', (_e) => {
  const submitButton = document.getElementById('submit-btn');
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstLetter = document.getElementById('firstLetter').value;
    const secondLetter = document.getElementById('secondLetter').value;
    const thirdLetter = document.getElementById('thirdLetter').value;
    const fourthLetter = document.getElementById('fourthLetter').value;
    const fifthLetter = document.getElementById('fifthLetter').value;
    const presentLetters = document.getElementById('presentLetters').value;
    const absentLetters = document.getElementById('absentLetters').value;

    const data = await makeRequest(
      firstLetter,
      secondLetter,
      thirdLetter,
      fourthLetter,
      fifthLetter,
      presentLetters,
      absentLetters
    );
    console.log(data.result);
    const resultDiv = document.getElementById('answers');
    resultDiv.innerHTML = data.result;

    console.log(
      firstLetter,
      secondLetter,
      thirdLetter,
      fourthLetter,
      fifthLetter,
      presentLetters,
      absentLetters
    );
  });
});
