let quizCards = document.querySelector(".quizCards");
let currentQuestion = 0;
let quizData;

fetch("script.json")
  .then((res) => res.json())
  .then((data) => {
    quizData = data;
    display(quizData);
  });

function display(data) {
  if (currentQuestion < data.length) {
    let card = data[currentQuestion];

    let div = document.createElement("div");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Question No: ${card.id}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Easy</h6>
          <p class="card-text">${card.question}</p>
          <form onsubmit="submitBtn(event)">
            <div class="mb-3">
              <label class="form-label">Select an option:</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option1" value="${card.option1}" data-target="${card.correctOption}">
              <label class="form-check-label" for="option1">${card.option1}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option2" value="${card.option2}" data-target="${card.correctOption}">
              <label class="form-check-label" for="option2">${card.option2}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option3" value="${card.option3}" data-target="${card.correctOption}">
              <label class="form-check-label" for="option3">${card.option3}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option4" value="${card.option4}" data-target="${card.correctOption}">
              <label class="form-check-label" for="option4">${card.option4}</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>`;
    quizCards.appendChild(div);
  } else {
    quizCards.innerHTML = "<p>Quiz completed! Thank you.</p>";
  }
}

function submitBtn(event) {
  event.preventDefault();
  const selectedOption = document.querySelector(
    'input[name="quizOption"]:checked'
  );

  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = selectedOption.getAttribute("data-target");

    if (userAnswer === correctAnswer) {
      alert("Correct! Well done!");
    } else {
      const explanation = quizData[currentQuestion].Explanation;

      alert(
        `Incorrect. The correct answer is: ${correctAnswer}\n\nExplanation: ${explanation}`
      );
    }
    setTimeout(() => {
      currentQuestion++;
      quizCards.innerHTML = "";
      display(quizData);
    }, 5000);
  } else {
    alert("Please select an option.");
  }
}
