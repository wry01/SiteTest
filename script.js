document.addEventListener("DOMContentLoaded", () => {
  const qaForm = document.getElementById("qa-form");
  const qaList = document.getElementById("qa-list");

  qaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    const response = await fetch('/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer })
    });

    if (response.ok) {
      document.getElementById("question").value = '';
      document.getElementById("answer").value = '';
      loadQuestions();
    }
  });

  async function loadQuestions() {
    const response = await fetch('/questions');
    const questions = await response.json();

    qaList.innerHTML = '';

    questions.forEach(qa => {
      const qaItem = document.createElement('div');
      qaItem.classList.add('qa-item');
      qaItem.innerHTML = `<p><strong>Pergunta:</strong> ${qa.question}</p><p><strong>Resposta:</strong> ${qa.answer}</p>`;
      qaList.appendChild(qaItem);
    });
  }

  loadQuestions();
});
