let numeroPremiado; // Variável para armazenar o número premiado
let numeroEscolhido; // Variável para armazenar o número escolhido pelo jogador

// Função para sortear um número aleatório entre 0 e 50
function sortearNumero() {
  const numeroSorteado = Math.floor(Math.random() * 51);
  console.log('Número sorteado:', numeroSorteado);
  return numeroSorteado;
}

// Função para resetar o jogo
function resetarJogo() {
  numeroPremiado = sortearNumero();
  document.getElementById('result').innerText = '';
  numeroEscolhido = null; // Limpar o número escolhido pelo jogador
  const numberButtons = document.getElementsByClassName('numberBtn');
  for (let i = 0; i < numberButtons.length; i++) {
    const button = numberButtons[i];
    button.disabled = false;
    button.style.backgroundColor = '#ffcc00';
  }
}

// Função para verificar o número escolhido
function verificarEscolha(button) {
  numeroEscolhido = parseInt(button.innerText);

  // Verificar se o número escolhido é o número premiado
  if (numeroEscolhido === numeroPremiado) {
    document.getElementById('result').innerText = 'Acertou Mizeravi...  ' + numeroPremiado;
    button.style.backgroundColor = '#00cc00'; // Tornar o botão verde
    document.getElementById('numberButtons').style.display = 'none';
    document.getElementById('choppImg').classList.remove('hidden');

    // Desabilitar os demais botões
    const numberButtons = document.getElementsByClassName('numberBtn');
    for (let i = 0; i < numberButtons.length; i++) {
      const button = numberButtons[i];
      button.disabled = true;
    }
  } else {
    console.log('errou!' + numeroEscolhido);
    button.style.backgroundColor = '#ff0000'; // Tornar o botão vermelho
    button.disabled = true; // Desabilitar o botão errado

    // Desabilitar os números no intervalo do número escolhido anterior ou superior ao número sorteado
    const numberButtons = document.getElementsByClassName('numberBtn');
    for (let i = 0; i < numberButtons.length; i++) {
      const button = numberButtons[i];
      const numeroBotao = parseInt(button.innerText);
      if ((numeroEscolhido < numeroSorteado && numeroBotao >= numeroEscolhido && numeroBotao <= numeroSorteado) ||
          (numeroEscolhido > numeroSorteado && numeroBotao <= numeroEscolhido && numeroBotao >= numeroSorteado)) {
        button.disabled = true;
      }
    }
  }
}

// Função para jogar o jogo
function jogar() {
  resetarJogo();
  document.getElementById('numberButtons').style.display = 'block';
  // Adicionar evento de clique para cada botão numérico
  const numberButtons = document.getElementsByClassName('numberBtn');
  for (let i = 0; i < numberButtons.length; i++) {
    const button = numberButtons[i];
    button.addEventListener('click', function() {
      verificarEscolha(button);
    });
  }
  document.getElementById('choppImg').classList.add('hidden');
}

// Função para gerar os botões numéricos
function generateNumberButtons() {
  const numberButtonsContainer = document.getElementById('numberButtons');
  for (let i = 0; i <= 50; i++) {
    const button = document.createElement('button');
    button.classList.add('numberBtn');
    button.innerText = i.toString().padStart(2, '0'); // Adiciona um zero à esquerda se o número for menor que 10
    numberButtonsContainer.appendChild(button);
  }
}

// Associar a função jogar ao botão de jogar
document.getElementById('playBtn').addEventListener('click', jogar);
