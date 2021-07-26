
function validarProduto(idNomeFuncionario, idCodFuncionario, idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nomeFuncionario = document.getElementById(idNomeFuncionario).value;
    let codFuncionario = document.getElementById(idCodFuncionario).value;
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    let date = new Date();
    const data = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    


    if (nomeFuncionario == "")
        alert("-- ATENÇÃO! -- Preencha todos os campos!");
        else if(codFuncionario == "")
        alert("-- ATENÇÃO! -- Preencha todos os campos!");
        else if(nome == "")
        alert("-- ATENÇÃO! -- Preencha todos os campos!");
        else if(codigo == "")
        alert("-- ATENÇÃO! -- Preencha todos os campos!");
        else if(qtidade == "")
        alert("-- ATENÇÃO! -- Preencha todos os campos!");  
    else cadastrarProduto(nomeFuncionario, codFuncionario, nome, codigo, parseInt(qtidade), data, hora);
}

function cadastrarProduto(funcionario, registro, produto, codig, qtidade, dia, horario) {
    let novoProduto = {nomeFuncionario:funcionario, codFuncionario: registro, nome:produto, codigo:codig, quantidade:qtidade, data:dia, hora:horario};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert(`Foram cadastradas com sucesso ${qtidade} unidades do produto ${produto}`);
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
}


function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}

function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
}



function listarEstoque() {
    

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null){
        document.write(`
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="./img/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="./img/favicon-16x16.png">
                <link rel="stylesheet" href="./css/style.css" />
                <title>Fast Stock</title>
            </head>
            
            <header> 
                <div class="logo">
                <a href="./index.html"><span>Fast Stock</span></a>
                </div>
                <div class="login">
                    <ul>
                    <li>Logar</li>
                    <li>Sair</li>
                    </ul>
                </div>
            </header>

            <h1>Nenhuma entrada cadastrada no momento!</h1>
       
        `)
        }
        else {
            
            produtos = JSON.parse(produtos);
            document.write(`
            
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="./img/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="./img/favicon-16x16.png">
                <link rel="stylesheet" href="./css/style.css" />
                <title>Fast Stock</title>
            </head>

            <header> 
                <div class="logo">
                    <a href="./index.html"><span>Fast Stock</span></a> 
                </div>
                <div class="login">
                    <ul>
                    <li>Logar</li>
                    <li>Sair</li>
                    </ul>
                </div>
            </header>

            <div class="btn__store">
                <button onclick="limparEntradas()">Limpar histórico</button>
            </div>
            

            <h1>Histórico de Entradas</h1>

            <table class="store">
                <tr>
                    <th>Nome do funcionário:</th>
                    <th>Registro do funcionário:</th>
                    <th>Nome do produto:</th>
                    <th>Código do produto:</th>
                    <th>Volume cadastrado:</th> 
                    <th>Data do cadastro:</th> 
                    <th>Horario do cadastro:</th> 
                </tr> 
                `);
                produtos.forEach(produto  => {
                document.write(`                    
                <tr>
                    <td>${produto.nomeFuncionario}</td>
                    <td>${produto.codFuncionario}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.codigo}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.data}</td>
                    <td>${produto.hora}</td>
                </tr> 
             `)
            });
        }
    } 
}

function limparEntradas(){
    setTimeout(function(){localStorage.clear();}, 1000);
    alert('Histórico limpo com sucesso!');
    location.reload();
}