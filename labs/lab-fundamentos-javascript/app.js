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
        return "Orçamento estourado!";
    } else {
        return "Dentro do orçamento";
    }
}

function atualizarListaTela() {
    const listaTela = document.getElementById("lista");
    const statusListaTela = document.getElementById("status-orcamento");
    const descontoTela = document.getElementById("desconto");

    listaTela.innerHTML = "";

    itens.forEach((item) => {
        const itemListaTela = document.createElement("li");
        itemListaTela.textContent = item.nome + " - " + item.quantidade + "x R$ " + item.preco.toFixed(2) + " (Subtotal: R$ " + item.getSubtotal().toFixed(2) + ")";
        listaTela.appendChild(itemListaTela);
    });

    const total = calcularTotal();

    document.getElementById("qtd-itens").textContent = itens.length;
    document.getElementById("total").textContent = "R$ " + total.toFixed(2);
    document.getElementById("saldo").textContent = "R$ " + (LIMITE - total).toFixed(2);
    statusListaTela.textContent = verificarOrcamento(total);

    if (total > LIMITE) {
        statusListaTela.classList.add("alerta");
    } else {
        statusListaTela.classList.remove("alerta");
    }

    if (total > 150) {
        const totalComDesconto = total * 0.9;
        descontoTela.textContent = "Desconto de 10% aplicado! Total final: R$ " + totalComDesconto.toFixed(2);
    } else {
        descontoTela.textContent = "";
    }
}

document.getElementById("btn-adicionar").addEventListener("click", () => {
    const inputNome = document.getElementById("nome");
    const inputPreco = document.getElementById("preco");
    const inputQtd = document.getElementById("quantidade");
    const mensagemTela = document.getElementById("mensagem");

    const nome = inputNome.value.trim();
    const preco = parseFloat(inputPreco.value);
    const quantidade = parseInt(inputQtd.value);

    if (nome === "") {
        mensagemTela.textContent = "Informe o nome do item.";
        return;
    }

    if (isNaN(preco) || preco <= 0) {
        mensagemTela.textContent = "Informe um preço válido maior que zero.";
        return;
    }

    if (isNaN(quantidade) || quantidade < 1) {
        mensagemTela.textContent = "Informe uma quantidade válida (mínimo 1).";
        return;
    }

    mensagemTela.textContent = "";
    adicionarItem(nome, preco, quantidade);

    inputNome.value = "";
    inputPreco.value = "";
    inputQtd.value = "";
});

document.getElementById("btn-desfazer").addEventListener("click", desfazerUltimo);
document.getElementById("btn-limpar").addEventListener("click", limparLista);
