onst LIMITE = 100;
let itens = [];

let total = 0;

class Item {
  constructor(nome, preco, quantidade) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }
}

function adicionarItem(nome, preco, quantidade) {
    nomeItem = nome;
    precoItem = preco;
    quantidadeItem = quantidade;


    total += precoItem * quantidadeItem;
}


function verificarOrcamento(total) {
    if (total > LIMITE) {
        return "Excede o limite.";
    } else {
        return "Dentro do orçamento.";
    }
}


btnAdicionar = document.querySelector("#btn-adicionar");


btnAdicionar.addEventListener("click", function () {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    adicionarItem(nome, preco, quantidade);
    const mensagem = verificarOrcamento(total);
    console.log(mensagem);
});
