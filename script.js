// ======================================================
// ÁREA DE PERSONALIZAÇÃO
// Para criar outros quizzes, altere apenas esta parte.
// ======================================================

const configuracaoQuiz = {
  paginaInicial: {
    titulo:
      "💰 DESCUBRA COMO CONTROLAR SEUS GASTOS",

    texto:
      "<strong>Você sabe para onde o seu dinheiro está indo?</strong><br><br>Pequenos gastos, compras por impulso e falta de planejamento podem fazer o salário desaparecer antes do fim do mês.<br><br>Responda a <strong>5 perguntas rápidas</strong>, descubra o que mais atrapalha a sua vida financeira e veja como começar a organizar seu dinheiro de maneira simples.<br><br><span class='destaques-inicio'>⏱️ Leva menos de 2 minutos<br>✅ Responda com sinceridade<br>📈 Dê o primeiro passo para uma vida financeira mais organizada</span>",

    imagem: "",

    textoBotao: "COMEÇAR O TESTE AGORA 💰"
  },

  perguntas: [
    {
      pergunta: "O que costuma acontecer com seu dinheiro durante o mês?",
      imagem: "",
      alternativas: [
        "😟 Acaba antes do fim do mês",
        "💳 Uso o cartão para completar as despesas",
        "🤔 Consigo pagar as contas, mas não sei onde gastei",
        "✅ Consigo guardar uma pequena parte"
      ]
    },

    {
      pergunta: "Você anota ou acompanha seus gastos?",
      imagem: "",
      alternativas: [
        "📝 Sim, acompanho todos os gastos",
        "📅 Anoto apenas algumas despesas",
        "🧾 Tento lembrar olhando o extrato",
        "❌ Não acompanho meus gastos"
      ]
    },

    {
      pergunta: "Qual é sua maior dificuldade financeira hoje?",
      imagem: "",
      alternativas: [
        "💸 Gastar por impulso",
        "💳 Dívidas e parcelas acumuladas",
        "📊 Não ter um orçamento organizado",
        "🏦 Não conseguir criar uma reserva"
      ]
    },

    {
      pergunta: "Quando recebe seu dinheiro, você costuma:",
      imagem: "",
      alternativas: [
        "📋 Separar primeiro o valor das contas",
        "🛍️ Comprar o que precisa e organizar depois",
        "💳 Pagar parcelas e usar o limite novamente",
        "🤷 Não fazer nenhum planejamento"
      ]
    },

    {
      pergunta: "O que você mais deseja conquistar ao controlar seus gastos?",
      imagem: "",
      alternativas: [
        "😌 Ter tranquilidade para pagar as contas",
        "🚫 Sair das dívidas",
        "💰 Guardar dinheiro todos os meses",
        "🎯 Realizar um sonho sem desorganizar o orçamento"
      ]
    }
  ],

  resultado: {
    titulo: "📊 SEU DINHEIRO PRECISA DE UM PLANO!",

    texto:
      "Pelas suas respostas, alguns hábitos podem estar dificultando o controle do seu dinheiro.<br><br>A boa notícia é que você não precisa ganhar mais para começar a se organizar. Com um método simples, é possível visualizar os gastos, definir prioridades e tomar decisões mais conscientes.",

    imagem: "",

    tituloProduto:
      "💰 Conheça o Guia Como Controlar Seus Gastos",

    beneficios: [
      "Identificar para onde seu dinheiro está indo",
      "Montar um orçamento mensal simples",
      "Reduzir compras por impulso",
      "Organizar contas, dívidas e prioridades",
      "Começar uma reserva financeira possível"
    ],

    aviso:
      "Organizar sua vida financeira começa com pequenas escolhas. Dê o primeiro passo hoje e construa uma relação mais consciente com o seu dinheiro.",

    textoBotao: "💰 QUERO APRENDER A CONTROLAR MEUS GASTOS",

    // COLE O LINK DO CHECKOUT ENTRE AS ASPAS:
    linkCheckout: "https://pay.cakto.com.br/p289wxb_755646"
  }
};

// ======================================================
// FUNCIONAMENTO DO QUIZ
// Não é necessário alterar esta parte.
// ======================================================

const conteudoQuiz = document.getElementById("conteudo-quiz");
const progressoContainer = document.getElementById("progresso-container");
const barraProgresso = document.getElementById("progresso");
const numeroPergunta = document.getElementById("numero-pergunta");
const porcentagem = document.getElementById("porcentagem");

let perguntaAtual = 0;
let respostas = [];

function criarImagem(caminho, descricao) {
  if (!caminho) {
    return "";
  }

  return `
    <img
      class="imagem-quiz"
      src="${caminho}"
      alt="${descricao}"
      onerror="this.style.display='none'"
    >
  `;
}

function rolarParaTopo() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function mostrarPaginaInicial() {
  progressoContainer.classList.add("oculto");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      configuracaoQuiz.paginaInicial.imagem,
      "Ilustração sobre controle de gastos"
    )}

    <h1 class="titulo">
      ${configuracaoQuiz.paginaInicial.titulo}
    </h1>

    <p class="texto">
      ${configuracaoQuiz.paginaInicial.texto}
    </p>

    <button
      type="button"
      class="botao-principal"
      id="botao-comecar"
    >
      ${configuracaoQuiz.paginaInicial.textoBotao}
    </button>
  `;

  document
    .getElementById("botao-comecar")
    .addEventListener("click", iniciarQuiz);
}

function iniciarQuiz() {
  perguntaAtual = 0;
  respostas = [];
  progressoContainer.classList.remove("oculto");
  mostrarPergunta();
}

function atualizarProgresso() {
  const total = configuracaoQuiz.perguntas.length;
  const percentual = Math.round(
    ((perguntaAtual + 1) / total) * 100
  );

  numeroPergunta.textContent =
    `Pergunta ${perguntaAtual + 1} de ${total}`;

  porcentagem.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;
}

function mostrarPergunta() {
  atualizarProgresso();

  const dados = configuracaoQuiz.perguntas[perguntaAtual];
  const letras = ["A", "B", "C", "D", "E", "F"];

  const botoesAlternativas = dados.alternativas
    .map((alternativa, indice) => {
      const selecionada =
        respostas[perguntaAtual] === indice
          ? "selecionada"
          : "";

      return `
        <button
          type="button"
          class="alternativa ${selecionada}"
          data-indice="${indice}"
        >
          <strong>${letras[indice]})</strong>
          ${alternativa}
        </button>
      `;
    })
    .join("");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      dados.imagem,
      `Ilustração da pergunta ${perguntaAtual + 1}`
    )}

    <h2 class="subtitulo">
      ${dados.pergunta}
    </h2>

    <div class="alternativas">
      ${botoesAlternativas}
    </div>

    ${
      perguntaAtual > 0
        ? `
          <button
            type="button"
            class="botao-voltar"
            id="botao-voltar"
          >
            ← Voltar
          </button>
        `
        : ""
    }
  `;

  document
    .querySelectorAll(".alternativa")
    .forEach((botao) => {
      botao.addEventListener("click", selecionarResposta);
    });

  const botaoVoltar = document.getElementById("botao-voltar");

  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", voltarPergunta);
  }

  rolarParaTopo();
}

function selecionarResposta(evento) {
  const botaoEscolhido = evento.currentTarget;
  const indiceEscolhido = Number(
    botaoEscolhido.dataset.indice
  );

  respostas[perguntaAtual] = indiceEscolhido;

  document
    .querySelectorAll(".alternativa")
    .forEach((botao) => {
      botao.classList.remove("selecionada");
      botao.disabled = true;
    });

  botaoEscolhido.classList.add("selecionada");

  setTimeout(() => {
    const ultimaPergunta =
      perguntaAtual === configuracaoQuiz.perguntas.length - 1;

    if (ultimaPergunta) {
      mostrarCarregamento();
    } else {
      perguntaAtual++;
      mostrarPergunta();
    }
  }, 450);
}

function voltarPergunta() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    mostrarPergunta();
  }
}

function mostrarCarregamento() {
  progressoContainer.classList.add("oculto");

  conteudoQuiz.innerHTML = `
    <h2 class="subtitulo">
      Estamos analisando suas respostas…
    </h2>

    <div class="carregamento"></div>

    <p class="texto" id="texto-analise">
      Preparando seu resultado…
    </p>
  `;

  rolarParaTopo();

  setTimeout(() => {
    mostrarResultado();
  }, 3000);
}

function mostrarResultado() {
  const resultado = configuracaoQuiz.resultado;

  const listaBeneficios = resultado.beneficios
    .map((beneficio) => `<li>${beneficio}</li>`)
    .join("");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      resultado.imagem,
      "Ilustração sobre organização financeira"
    )}

    <h1 class="titulo">
      ${resultado.titulo}
    </h1>

    <p class="texto">
      ${resultado.texto}
    </p>

    <h2 class="subtitulo">
      ${resultado.tituloProduto}
    </h2>

    <ul class="lista-beneficios">
      ${listaBeneficios}
    </ul>

    <p class="aviso">
      <strong>Comece sua mudança financeira:</strong><br>
      ${resultado.aviso}
    </p>

    <button
      type="button"
      class="botao-checkout"
      id="botao-checkout"
    >
      ${resultado.textoBotao}
    </button>

    <button
      type="button"
      class="botao-voltar"
      id="botao-refazer"
    >
      ↻ Refazer o quiz
    </button>
  `;

  document
    .getElementById("botao-checkout")
    .addEventListener("click", abrirCheckout);

  document
    .getElementById("botao-refazer")
    .addEventListener("click", iniciarQuiz);

  rolarParaTopo();
}

function abrirCheckout() {
  const link = configuracaoQuiz.resultado.linkCheckout.trim();

  if (link === "") {
    alert("O link de compra será disponibilizado em breve.");
    return;
  }

  window.open(link, "_blank", "noopener,noreferrer");
}

// Abre o site mostrando a primeira página.
mostrarPaginaInicial();
