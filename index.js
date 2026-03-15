import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let listaClientes = [];
let listaFornecedores = [];
let usuarioLogado = null;

/* ================= HOME ================= */

app.get("/", (req, res) => {
    res.send(`
    <html>
    <head>
        <title>GreenUp</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body style="background: linear-gradient(135deg,#388E3C,#b3b2af); height:100vh; display:flex; justify-content:center; align-items:center;">

        <div style="text-align:center">

            <img src="/img/icon-greenup.png" style="height:120px">

            <h1 style="color:white;margin-top:20px;">GreenUp</h1>

            <br>

            <a href="/cadastro" class="btn btn-success">Cadastrar Cliente</a>
            <a href="/fornecedor" class="btn btn-light">Cadastrar Fornecedor</a>
            <a href="/listaClientes" class="btn btn-dark">Lista Clientes</a>

        </div>

    </body>
    </html>
    `);
});


/* ================= CADASTRO CLIENTE ================= */

app.get("/cadastro", (req, res) => {
    res.send(`
    <html>

    <head>
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body style="background: linear-gradient(135deg,#388E3C,#b3b2af);">

        <div class="container mt-5">

            <h2 style="color:white">Cadastro Cliente</h2>

            <form method="POST">

                <input class="form-control mb-2" name="nome" placeholder="Nome">

                <input class="form-control mb-2" name="email" placeholder="Email">

                <input type="password" class="form-control mb-2" name="senha" placeholder="Senha">

                <button class="btn btn-success">Cadastrar</button>

            </form>

        </div>

    </body>
    </html>
    `);
});

app.post("/cadastro", (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.send(`<script>alert("Preencha todos os campos");window.location="/cadastro"</script>`);
        return;
    }

    listaClientes.push({ nome, email, senha });

    res.redirect("/listaClientes");

});


/* ================= LISTA CLIENTES ================= */

app.get("/listaClientes", (req, res) => {

    let linhas = "";

    listaClientes.forEach(c => {
        linhas += `
        <tr>
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.senha}</td>
        </tr>
        `;
    });

    res.send(`
    <html>

    <head>
        <title>Lista Clientes</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body class="container">

        <h2 class="mt-4">Clientes</h2>

        <table class="table">

            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
            </tr>

            ${linhas}

        </table>

        <a href="/" class="btn btn-success">Voltar</a>

    </body>

    </html>
    `);

});


/* ================= FORNECEDOR ================= */

app.get("/fornecedor", (req, res) => {

    res.send(`
    <html>

    <head>
        <title>Fornecedor</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body class="container">

        <h2 class="mt-4">Cadastrar Fornecedor</h2>

        <form method="POST">

            <input class="form-control mb-2" name="nomeFantasia" placeholder="Nome Fantasia">

            <input class="form-control mb-2" name="email" placeholder="Email">

            <button class="btn btn-success">Cadastrar</button>

        </form>

    </body>

    </html>
    `);

});

app.post("/fornecedor", (req, res) => {

    const fornecedor = req.body;

    listaFornecedores.push(fornecedor);

    res.send(`<script>alert("Fornecedor cadastrado");window.location="/"</script>`);

});


/* ================= LOGIN ================= */

app.get("/login", (req, res) => {

    res.send(`
    <html>

    <body class="container">

        <h2>Login</h2>

        <form method="POST">

            <input name="usuario" class="form-control mb-2" placeholder="Email">

            <input name="senha" type="password" class="form-control mb-2" placeholder="Senha">

            <button class="btn btn-success">Entrar</button>

        </form>

    </body>

    </html>
    `);

});


app.post("/login", (req, res) => {

    const { usuario, senha } = req.body;

    const cliente = listaClientes.find(c => c.email === usuario && c.senha === senha);

    if (cliente) {
        usuarioLogado = cliente.nome;
        res.send(`<script>alert("Bem vindo ${cliente.nome}");window.location="/"</script>`);
    } else {
        res.send(`<script>alert("Login inválido");window.location="/login"</script>`);
    }

});


/* ================= LOGOUT ================= */

app.get("/logout", (req, res) => {

    usuarioLogado = null;

    res.redirect("/");

});


/* ================= EXPORTAÇÃO PARA VERCEL ================= */

export default app;
