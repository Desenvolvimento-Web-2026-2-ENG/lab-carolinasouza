const LIMITE = 100;
let itens = [];

class Item {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    getSubtotal() {
        return this.preco * this.quantidade;
    }
}

function adicionarItem(nome, preco, quantidade) {
    itens.push(new Item(nome, preco, quantidade));
    atualizarListaTela();
}

function desfazerUltimo() {
    itens.pop();
    atualizarListaTela();
}

function limparLista() {
    itens = [];
    atualizarListaTela();
}

function calcularTotal() {
    let soma = 0;

    for (const item of itens) {
        soma += item.getSubtotal();
    }

    return soma;
}

function verificarOrcamento(total) {
    if (total > LIMITE) {
        return "Excede o limite.";
    } else {
        return "Dentro do orçamento.";
    }
}

function atualizarListaTela() {
    const listaTela = document.getElementById("lista");
    const statusListaTela = document.getElementById("status-orcamento");

    listaTela.innerHTML = "";

    itens.forEach((item) => {
    const itemListaTela = document.createElement("li");
    itemListaTela.textContent = `${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)}`;
    listaTela.appendChild(itemListaTela);
});

    const total = calcularTotal();

    document.getElementById("qtd-itens").textContent = itens.length;
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById("saldo").textContent = `R$ ${(LIMITE - total).toFixed(2)}`;
    statusListaTela.textContent = verificarOrcamento(total);

    if (total > LIMITE) {
        statusListaTela.classList.add("alerta");
    } else {
        statusListaTela.classList.remove("alerta");
    }
}

document.getElementById("btn-adicionar").addEventListener("click", () => {
    const inputNome = document.getElementById("nome");
    const inputPreco = document.getElementById("preco");
    const inputQtd = document.getElementById("quantidade");

    adicionarItem(inputNome.value,parseFloat(inputPreco.value),parseInt(inputQtd.value));

    inputNome.value = "";
    inputPreco.value = "";
    inputQtd.value = "";
});

document.getElementById("btn-desfazer").addEventListener("click", desfazerUltimo);
document.getElementById("btn-limpar").addEventListener("click", limparLista);
