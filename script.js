// Script para adicionar perguntas e respostas localmente (sem backend)

document.addEventListener("DOMContentLoaded", function() {
  // Referências aos elementos
  const perguntaForm = document.getElementById('perguntaForm');
  const listaPerguntas = document.getElementById('listaPerguntas');
  const perguntaInput = document.getElementById('pergunta');

  // Armazenar perguntas no localStorage para persistência simples
  if (!localStorage.getItem('perguntas')) {
    localStorage.setItem('perguntas', JSON.stringify([]));
  }

  // Função para renderizar perguntas na tela
  function renderizarPerguntas() {
    const perguntas = JSON.parse(localStorage.getItem('perguntas'));
    listaPerguntas.innerHTML = '';
    perguntas.forEach((pergunta, index) => {
      const perguntaDiv = document.createElement('div');
      perguntaDiv.classList.add('pergunta');
      perguntaDiv.innerHTML = `
        <h3>${pergunta.pergunta}</h3>
        <div class="resposta">
          <input type="text" placeholder="Digite sua resposta..." id="resposta${index}">
          <button onclick="adicionarResposta(${index})">Responder</button>
          <div id="respostas${index}"></div>
        </div>
      `;
      listaPerguntas.appendChild(perguntaDiv);

      // Exibir respostas já postadas
      pergunta.respostas.forEach(resposta => {
        const respostaDiv = document.createElement('p');
        respostaDiv.textContent = resposta;
        document.getElementById(`respostas${index}`).appendChild(respostaDiv);
      });
    });
  }

  // Função para adicionar uma nova pergunta
  perguntaForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const pergunta = perguntaInput.value;
    if (pergunta.trim()) {
      const perguntas = JSON.parse(localStorage.getItem('perguntas'));
      perguntas.push({ pergunta, respostas: [] });
      localStorage.setItem('perguntas', JSON.stringify(perguntas));
      perguntaInput.value = '';
      renderizarPerguntas();
    }
  });

  // Função para adicionar uma resposta
  window.adicionarResposta = function(index) {
    const respostaInput = document.getElementById(`resposta${index}`);
    const resposta = respostaInput.value;
    if (resposta.trim()) {
      const perguntas = JSON.parse(localStorage.getItem('perguntas'));
      perguntas[index].respostas.push(resposta);
      localStorage.setItem('perguntas', JSON.stringify(perguntas));
      respostaInput.value = '';
      renderizarPerguntas();
    }
  };

  renderizarPerguntas();
});
