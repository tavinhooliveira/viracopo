let numeroPremiado; // Variável para armazenar o número premiado
let numeroEscolhido; // Variável para armazenar o número escolhido pelo jogador
let audioElement = new Audio('audio/acertou.mp3');

// Função para sortear um número aleatório entre 0 e 50
function sortearNumero() {
  const numeroSorteado = Math.floor(Math.random() * 51);
  console.log('Numero sorteado:', numeroSorteado);
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

// Função para jogar o jogo
function jogar() {
  resetarJogo();
  stopAudio();
  document.getElementById('numberButtons').style.display = 'block';
  // Adicionar evento de clique para cada botão numérico
  const numberButtons = document.getElementsByClassName('numberBtn');
  for (let i = 0; i < numberButtons.length; i++) {
    const button = numberButtons[i];
    button.addEventListener('click', function() {
      verificarEscolha(button);
      var audio = new Audio('audio/click001.mp3');
      audio.play();
      audioElement.pause();
      audioElement.currentTime = 0;
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

function verificarEscolha(button) {
  numeroEscolhido = parseInt(button.innerText);

  const numberButtons = document.getElementsByClassName('numberBtn');

  if (numeroEscolhido < numeroPremiado) {
    // Desativar os números inferiores ao número escolhido ou até o 00
    if (numeroEscolhido < numeroPremiado) {
      for (let i = 0; i <= numeroEscolhido ; i++) {
        const button = numberButtons[i];
        button.style.backgroundColor = '#939292'; // Tornar o botão vermelho
        button.disabled = true;
      }
    } else {
      for (let i = 0; i <= 50; i++) {
        const button = numberButtons[i];
        button.style.backgroundColor = '#939292'; // Tornar o botão vermelho
        button.disabled = true;
      }
    }
  }


  if (numeroEscolhido > numeroPremiado) {
      // Desativar os números superiores ao número escolhido ou até o 50
    if (numeroEscolhido > numeroPremiado) {
      for (let i = numeroEscolhido; i <= 50; i++) {
        const button = numberButtons[i];
        button.style.backgroundColor = '#939292'; // Tornar o botão vermelho
        button.disabled = true;
      }
    } else {
      for (let i = numeroPremiado + 1; i <= 50; i++) {
        const button = numberButtons[i];
        button.style.backgroundColor = '#939292'; // Tornar o botão vermelho
        button.disabled = true;
      }
    }
  }

  // Verificar se o número escolhido é o número premiado
  if (numeroEscolhido === numeroPremiado) {
    playAudio();
    document.getElementById('result').innerText = 'Acertou Mizeravi...  N⍛' + numeroEscolhido;
    button.style.backgroundColor = '#00cc00'; // Tornar o botão verde
    document.getElementById('numberButtons').style.display = 'none';
    document.getElementById('choppImg').classList.remove('hidden');

    // Desabilitar os demais botões
    for (let i = 0; i < numberButtons.length; i++) {
      const button = numberButtons[i];
      button.disabled = true;
    }
  }
}

function playAudio() {
    audioElement.play();
}

function stopAudio() {
    audioElement.pause();
    audioElement.currentTime = 0;
}

// Associar a função jogar ao botão de jogar
document.getElementById('playBtn').addEventListener('click', jogar);
