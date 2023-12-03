// Fechar e abrir o menu //

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
let closeMenu = document.querySelector('.closeMenu');

openShopping.addEventListener('click', () => {

    body.classList.remove('disable');
    body.classList.add('active');

});

closeShopping.addEventListener('click', () =>{

    body.classList.remove('active');
    body.classList.add('disable');

});

closeMenu.addEventListener('click', () =>{

    body.classList.remove('active');
    body.classList.add('disable');

});

// ----------------------------------------- //

listaItens = []

document.addEventListener("DOMContentLoaded", carregarSacola);

document.addEventListener("DOMContentLoaded", atualizarValor);

document.addEventListener("DOMContentLoaded", mudarQuantidade);

// --------------------------------------- //

function mudarQuantidade() {

    var quantidadeSacola = document.getElementsByClassName("quantidadeSacola")[0]

    quantidadeSacola.innerHTML = listaItens.length

};

function addItem(n) {

    var produto = document.getElementById(n);

    var objeto = {

        image: produto.getElementsByClassName('imagem')[0].src,
        name: produto.getElementsByClassName('nome')[0].textContent,
        value: (produto.getElementsByClassName('valor')[0].textContent).replace("R$ ", ""),

    };
    
    var i = 0;
    var existe = false;

    for (i ; i < listaItens.length; i += 1) {

        if (listaItens[i].name == objeto.name) {

            existe = true;
            indice = i;
            break;

        };

    };

    if (existe) {

        listaItens[indice].quantity += 1;

    }

    else {

        objeto.quantity = 1;
        listaItens.unshift(objeto);

    };

    localStorage.setItem('listaItens', JSON.stringify(listaItens));

    var itensSalvos = JSON.parse(localStorage.getItem('listaItens'));

    listaItens = itensSalvos;

    limparCarrinho();

    adicionarVisual();

    atualizarValor();

    mudarQuantidade();

};

function limparCarrinho() {

    var carrinho = document.getElementsByClassName('listCard')[0];

    carrinho.innerHTML = "";
    
};

function adicionarVisual() {

    var carrinho = document.getElementsByClassName("listCard")[0];
    carrinho.innerHTML = "";

    var i = 0;

    for (i; i < listaItens.length; i += 1) {

        var item = listaItens[i];
        var div = document.createElement("div")
        var li = document.createElement("li");
        var img = document.createElement("img");
        var name = document.createElement("span");
        var value = document.createElement("span");
        var quantity = document.createElement("input");

        div.className = "Itens";
        
        img.src = item.image;
        img.className = "imagem";

        name.textContent = item.name;
        name.className = "nome";

        value.textContent = "R$ " + item.value;
        value.className = "valor";

        quantity.setAttribute("type", "number");
        quantity.setAttribute("onchange", "interfaceAtualizarValor()");
        quantity.setAttribute("class", "quantidade");
        quantity.setAttribute("value", item.quantity);

        li.appendChild(img);
        li.appendChild(name);
        li.appendChild(value);
        li.appendChild(quantity);
        div.appendChild(li);
        carrinho.appendChild(div);

    };

};

function atualizarValor() {

    i = 0;

    valor = 0;

    var txt = document.getElementsByClassName("valorFinal")[0];

    for (i; i < listaItens.length; i += 1) {

        var quantidade = Number(listaItens[i].quantity);

        var preco = Number(listaItens[i].value);

        valor += (quantidade * preco);

    }

    localStorage.setItem('valorFinal', JSON.stringify(valor));
    var localValorNumber = JSON.parse(localStorage.getItem('valorFinal'));

    txt.innerHTML = "R$ " + localValorNumber;

};

function interfaceAtualizarValor() {

    i = 0;

    for (i ; i < listaItens.length; i += 1) {

        var quantidadeAtual = Number(document.getElementsByClassName("quantidade")[i].value);

        listaItens[i].quantity = quantidadeAtual

        // ver sobre o comando filter()

        listaItens = listaItens.filter(item => item.quantity !==0)

        console.log(listaItens)

    };

    localStorage.setItem('listaItens', JSON.stringify(listaItens));

    var itensSalvos = JSON.parse(localStorage.getItem('listaItens'));

    listaItens = itensSalvos;

    atualizarValor();

    adicionarVisual();

    mudarQuantidade();

    if (listaItens.length == 0) {

        body.classList.remove('active');
        body.classList.add('disable');

    }

};

function limpar() {

    listaItens = [];

    localStorage.clear();

    limparValor();

    limparCarrinho();

    mudarQuantidade();

    body.classList.remove('active');
    body.classList.add('disable');

};

function limparValor() {

    var txt = document.getElementsByClassName("valorFinal")[0];

    txt.innerHTML = "R$ " + 0;

};

function carregarSacola() {

    if (localStorage.getItem('listaItens')) {

        var itensSalvos = JSON.parse(localStorage.getItem('listaItens'));

        listaItens = itensSalvos;

        adicionarVisual();

    }

};