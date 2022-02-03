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

    const firstLetter = document
      .getElementById('firstLetter')
      .value.toLocaleLowerCase();
    const secondLetter = document
      .getElementById('secondLetter')
      .value.toLocaleLowerCase();
    const thirdLetter = document
      .getElementById('thirdLetter')
      .value.toLocaleLowerCase();
    const fourthLetter = document
      .getElementById('fourthLetter')
      .value.toLocaleLowerCase();
    const fifthLetter = document
      .getElementById('fifthLetter')
      .value.toLocaleLowerCase();
    const presentLetters = document
      .getElementById('presentLetters')
      .value.toLocaleLowerCase();
    const absentLetters = document
      .getElementById('absentLetters')
      .value.toLocaleLowerCase();

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
