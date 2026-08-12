// ========================
//  Jogo da Forca — script.js
// ========================

const palavras = [
    // Linguagens de Programação
    "javascript", "python", "java", "typescript", "kotlin",
    "swift", "golang", "rust", "csharp", "ruby", "php",
    "scala", "perl", "haskell", "dart", "elixir", "clojure",
    "assembly", "cobol", "fortran",

    // Web / Frontend / Backend
    "html", "css", "react", "angular", "vuejs", "nextjs",
    "nodejs", "express", "graphql", "restapi", "websocket",
    "webpack", "vite", "sass", "bootstrap", "tailwind",
    "frontend", "backend", "fullstack", "middleware",

    // Banco de Dados
    "mysql", "postgresql", "mongodb", "redis", "sqlite",
    "oracle", "cassandra", "firebase", "mariadb", "elasticsearch",

    // DevOps / Infraestrutura
    "docker", "kubernetes", "terraform", "ansible", "jenkins",
    "gitlab", "github", "cicd", "pipeline", "servidor",
    "nginx", "apache", "linux", "ubuntu", "debian",
    "cloudwatch", "lambda", "serverless", "microservico", "monolito",

    // Cloud
    "amazonaws", "azure", "googlecloud", "heroku",
    "digitalocean", "cloudflare",

    // Conceitos de TI
    "algoritmo", "estrutura", "recursividade", "polimorfismo",
    "encapsulamento", "heranca", "interface", "framework",
    "biblioteca", "internet", "protocolo", "compilador",
    "interpretador", "depuracao", "refatoracao", "programacao",
    "variavel", "funcional",

    // Hardware
    "computador", "processador", "memoria", "monitor",
    "teclado", "armazenamento", "processamento", "bluetooth", "firmware",

    // Segurança / Outros
    "criptografia", "autenticacao", "firewall", "vulnerabilidade",
    "blockchain", "inteligencia", "machinelearning", "deeplearning",
    "metadados"
];

// Partes do boneco em ordem de aparição (6 erros = 6 partes)
const PARTES_CORPO = [
    "body-head",
    "body-trunk",
    "body-arm-l",
    "body-arm-r",
    "body-leg-l",
    "body-leg-r"
];

// --- Estado do jogo ---
let palavra       = "";
let letrasCorretas = [];
let letrasErradas  = [];
let erroCont      = 0;
const MAX_ERROS   = 6;

// --- Elementos do DOM ---
const palavraDiv   = document.getElementById("palavra");
const erradasDiv   = document.getElementById("erradas");
const errosCount   = document.getElementById("erros-count");
const mensagemDiv  = document.getElementById("mensagem");
const input        = document.getElementById("letra");
const btnTentar    = document.getElementById("btn");

// =======================
//   Funções principais
// =======================

function iniciarJogo() {
    // Escolhe palavra aleatória
    palavra        = palavras[Math.floor(Math.random() * palavras.length)];
    letrasCorretas = [];
    letrasErradas  = [];
    erroCont       = 0;

    // Limpa mensagem
    mensagemDiv.className = "mensagem";
    mensagemDiv.innerHTML = "";

    // Limpa erradas
    erradasDiv.innerHTML = "";

    // Reseta boneco
    PARTES_CORPO.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("visible");
    });
    errosCount.textContent = "0";

    // Habilita input e botão
    input.disabled    = false;
    btnTentar.disabled = false;
    input.value       = "";
    input.focus();

    renderizarPalavra();
}

function renderizarPalavra() {
    // Cada letra vira um slot com tracinho ou letra revelada
    // Letras da mesma palavra ficam no mesmo .word-group
    palavraDiv.innerHTML = "";

    const grupo = document.createElement("div");
    grupo.className = "word-group";

    for (let i = 0; i < palavra.length; i++) {
        const letra = palavra[i];
        const revelada = letrasCorretas.includes(letra);

        const slot = document.createElement("div");
        slot.className = "letra-slot" + (revelada ? " revealed" : "");

        const char = document.createElement("span");
        char.className = "letra-char" + (revelada ? " revealed" : "");
        char.textContent = revelada ? letra.toUpperCase() : "";

        const linha = document.createElement("div");
        linha.className = "letra-line";

        slot.appendChild(char);
        slot.appendChild(linha);
        grupo.appendChild(slot);
    }

    palavraDiv.appendChild(grupo);
}

function mostrarPalavraCompleta() {
    palavraDiv.innerHTML = "";
    const grupo = document.createElement("div");
    grupo.className = "word-group";

    for (let i = 0; i < palavra.length; i++) {
        const letra = palavra[i];
        const slot = document.createElement("div");
        slot.className = "letra-slot revealed";

        const char = document.createElement("span");
        char.className = "letra-char revealed";
        char.textContent = letra.toUpperCase();

        const linha = document.createElement("div");
        linha.className = "letra-line";

        slot.appendChild(char);
        slot.appendChild(linha);
        grupo.appendChild(slot);
    }

    palavraDiv.appendChild(grupo);
}

function adicionarLetraErrada(letra) {
    erroCont++;
    letrasErradas.push(letra);

    // Renderiza badge de letra errada
    const badge = document.createElement("span");
    badge.className = "wrong-letter";
    badge.textContent = letra.toUpperCase();
    erradasDiv.appendChild(badge);

    // Atualiza contador de erros
    errosCount.textContent = erroCont;

    // Exibe parte do boneco correspondente ao número de erros
    const parteId = PARTES_CORPO[erroCont - 1];
    if (parteId) {
        const parte = document.getElementById(parteId);
        if (parte) {
            // Pequeno delay para a animação ficar suave
            setTimeout(() => parte.classList.add("visible"), 50);
        }
    }
}

function jogar() {
    let letra = input.value.toLowerCase().trim();
    input.value = "";
    input.focus();

    if (!letra || !/^[a-záéíóúâêîôûãõüçàèìòù]$/i.test(letra)) return;
    if (letrasCorretas.includes(letra)) return;
    if (letrasErradas.includes(letra)) return;

    if (palavra.includes(letra)) {
        letrasCorretas.push(letra);
        renderizarPalavra();
    } else {
        adicionarLetraErrada(letra);
    }

    verificarFim();
}

function explodirBoneco() {
    const container = document.querySelector(".container");
    const wrapper   = document.querySelector(".gallows-wrapper");

    // Ativa classe de explosão (dispara CSS animations)
    container.classList.add("explodindo");

    // Gera partículas coloridas a partir do centro do SVG
    const svg    = document.getElementById("forca-svg");
    const rect   = svg.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    // Posição do centro do boneco relativa ao container
    const originX = rect.left - contRect.left + rect.width  * 0.65; // aprox. x do boneco
    const originY = rect.top  - contRect.top  + rect.height * 0.45; // aprox. y do boneco

    const cores = ["#ff4f6d", "#6c63ff", "#ffd166", "#39d98a", "#ff9f43", "#ee5a24", "#a29bfe"];
    const total = 22;

    for (let i = 0; i < total; i++) {
        const angle  = (360 / total) * i + Math.random() * 20;
        const dist   = 70 + Math.random() * 90;
        const rad    = (angle * Math.PI) / 180;
        const tx     = Math.cos(rad) * dist;
        const ty     = Math.sin(rad) * dist;
        const size   = 6 + Math.random() * 8;
        const delay  = Math.random() * 0.2;
        const color  = cores[Math.floor(Math.random() * cores.length)];

        const p = document.createElement("div");
        p.className = "particle";
        p.style.cssText = `
            left: ${originX}px;
            top:  ${originY}px;
            width:  ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 6px ${color};
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-delay: ${delay}s;
            border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
        `;
        // Relativo ao container
        container.style.position = "relative";
        container.appendChild(p);

        // Remove partícula após animação
        setTimeout(() => p.remove(), (delay + 0.9) * 1000);
    }

    // Após tudo terminar, remove a classe para não interferir com um novo jogo
    setTimeout(() => container.classList.remove("explodindo"), 1500);
}

function verificarFim() {
    const venceu = [...palavra].every(l => letrasCorretas.includes(l));

    if (venceu) {
        mensagemDiv.innerHTML = "🏆 Você venceu! Parabéns!";
        mensagemDiv.className = "mensagem ganhou";
        input.disabled    = true;
        btnTentar.disabled = true;
        return;
    }

    if (erroCont >= MAX_ERROS) {
        mostrarPalavraCompleta();
        // Dispara explosão antes de mostrar mensagem
        explodirBoneco();
        // Pequeno delay para a mensagem aparecer após o flash
        setTimeout(() => {
            mensagemDiv.innerHTML = `💀 Você perdeu! A palavra era: <strong>${palavra.toUpperCase()}</strong>`;
            mensagemDiv.className = "mensagem perdeu";
        }, 400);
        input.disabled     = true;
        btnTentar.disabled = true;
    }
}

// =======================
//   Event Listeners
// =======================

btnTentar.addEventListener("click", jogar);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") jogar();
});

document.getElementById("novo").addEventListener("click", function () {
    iniciarJogo();
});

// Inicia o jogo ao carregar a página
iniciarJogo();