const palavras = [

    "javascript",
    "computador",
    "programacao",
    "internet",
    "frontend",
    "backend",
    "html",
    "css",
    "python",
    "react",
    "angular",
    "servidor",
    "monitor",
    "teclado",
    "algoritmo"

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