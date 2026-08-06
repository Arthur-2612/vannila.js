const palavras = [

    // Linguagens de Programação
    "javascript",
    "python",
    "java",
    "typescript",
    "kotlin",
    "swift",
    "golang",
    "rust",
    "csharp",
    "ruby",
    "php",
    "scala",
    "perl",
    "haskell",
    "dart",
    "elixir",
    "clojure",
    "assembly",
    "cobol",
    "fortran",

    // Web / Frontend / Backend
    "html",
    "css",
    "react",
    "angular",
    "vuejs",
    "nextjs",
    "nodejs",
    "express",
    "graphql",
    "restapi",
    "websocket",
    "webpack",
    "vite",
    "sass",
    "bootstrap",
    "tailwind",
    "frontend",
    "backend",
    "fullstack",
    "middleware",

    // Banco de Dados
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "sqlite",
    "oracle",
    "cassandra",
    "firebase",
    "mariadb",
    "elasticsearch",

    // DevOps / Infraestrutura
    "docker",
    "kubernetes",
    "terraform",
    "ansible",
    "jenkins",
    "gitlab",
    "github",
    "cicd",
    "pipeline",
    "servidor",
    "nginx",
    "apache",
    "linux",
    "ubuntu",
    "debian",
    "cloudwatch",
    "lambda",
    "serverless",
    "microservico",
    "monolito",

    // Cloud
    "amazonaws",
    "azure",
    "googlecloud",
    "heroku",
    "digitalocean",
    "cloudflare",

    // Conceitos de TI
    "algoritmo",
    "estrutura",
    "recursividade",
    "polimorfismo",
    "encapsulamento",
    "heranca",
    "interface",
    "framework",
    "biblioteca",
    "internet",
    "protocolo",
    "compilador",
    "interpretador",
    "depuracao",
    "refatoracao",
    "programacao",
    "variavel",
    "funcional",

    // Hardware
    "computador",
    "processador",
    "memoria",
    "monitor",
    "teclado",
    "placacomando",
    "armazenamento",
    "processamento",
    "bluetooth",
    "firmware",

    // Segurança / Outros
    "criptografia",
    "autenticacao",
    "firewall",
    "vulnerabilidade",
    "blockchain",
    "inteligencia",
    "machinelearning",
    "deeplearning",
    "metadados",
    "virtualização"

];

let palavra = "";
let exibicao = [];
let letrasErradas = [];
let tentativas = 6;

const palavraDiv = document.getElementById("palavra");
const erradasDiv = document.getElementById("erradas");
const tentativasDiv = document.getElementById("tentativas");
const mensagem = document.getElementById("mensagem");
const input = document.getElementById("letra");

function iniciarJogo(){

    palavra = palavras[Math.floor(Math.random()*palavras.length)];

    exibicao = [];

    letrasErradas = [];

    tentativas = 6;

    mensagem.innerHTML="";

    for(let letra of palavra){

        exibicao.push("_");
    }

    atualizarTela();

}

function atualizarTela(){

    palavraDiv.innerHTML = exibicao.join(" ");

    erradasDiv.innerHTML = letrasErradas.join(" ");

    tentativasDiv.innerHTML = tentativas;

}

function jogar(){

    let letra = input.value.toLowerCase();

    input.value="";

    if(letra==""){

        return;
    }

    if(exibicao.includes(letra)){

        return;
    }

    if(letrasErradas.includes(letra)){

        return;
    }

    if(palavra.includes(letra)){

        for(let i=0;i<palavra.length;i++){

            if(palavra[i]==letra){

                exibicao[i]=letra;
            }

        }

    }else{

        letrasErradas.push(letra);

        tentativas--;

    }

    atualizarTela();

    verificarFim();

}

function verificarFim(){

    if(!exibicao.includes("_")){

        mensagem.innerHTML="🏆 Você venceu!";

        input.disabled=true;

    }

    if(tentativas==0){

        mensagem.innerHTML="💀 Você perdeu! A palavra era: "+palavra;

        palavraDiv.innerHTML=palavra;

        input.disabled=true;

    }

}

document.getElementById("btn").addEventListener("click",jogar);

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        jogar();

    }

});

document.getElementById("novo").addEventListener("click",function(){

    input.disabled=false;

    iniciarJogo();

});

iniciarJogo();