import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const app = express();
app.use(express.urlencoded({extended: true}));
var listaClientes = [];
var listaFornecedores = [];
app.use(express.static("public"));

let usuarioLogado = null;

app.get('/', (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>GreenUp</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                    min-height: 100vh;
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .body2 {
                    height: 90vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card-return {
                    background-color: #f8f9fa;
                    padding: 40px;
                    border-radius: 15px;
                    width: 360px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    text-align: center;
                }
                .card-return h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    font-weight: 600;
                    color: #388E3C;
                }
                .logo {
                    width: auto;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .container-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .btn-submit {
                    border: none;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #cccccc);
                    color: white;
                    font-weight: 500;
                    padding: 10px;
                    width: 100%;
                    display: block;
                    text-decoration: none;
                    margin-bottom: 10px;
                }
                .btn-submit:hover {
                    opacity: 0.9;
                    color: white;
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="body2">
            <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                <div class="card-return">
                    <h2>Bem-vindo! </h2>
                    <p style="color:#777; font-size:0.92rem; margin-bottom:20px;">Use o menu acima para navegar.</p>
                    <a href="/cadastro" class="btn-submit"> Cadastrar Cliente</a>
                    <a href="/fornecedor" class="btn-submit"> Cadastrar Fornecedor</a>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.get('/cadastro', (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .body2 {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card-return {
                    background-color: #f8f9fa;
                    padding: 40px;
                    border-radius: 15px;
                    width: 360px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                }
                .card-return h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    font-weight: 600;
                    color: #388E3C;
                }
                .form-control {
                    border-radius: 25px;
                    padding-left: 15px;
                }
                .form-control:focus {
                    border-color: rgb(46, 125, 50);
                    box-shadow: 0 0 0 0.2rem #388E3C;
                }
                .btn-submit {
                    border: none;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #cccccc);
                    color: white;
                    font-weight: 500;
                    padding: 10px;
                    width: 100%;
                }
                .btn-submit:hover {
                    opacity: 0.9;
                }
                .btn-voltar {
                    border-radius: 25px;
                    width: 100%;
                    margin-top: 10px;
                    border: 2px solid #388E3C;
                    color: #388E3C;
                    font-weight: 500;
                }
                .btn-voltar:hover {
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                    border: none;
                }
                .logo {
                    width: auto;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .container-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="body2">
            <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                <div class="card-return">
                    <h2>Cadastrar</h2>
                    <form method="POST" action="/cadastro">
                        <div class="mb-3">
                            <label class="form-label" for="nome">Nome</label>
                            <input type="text" class="form-control" placeholder="Username" maxlength="30" id="nome" name="nome">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input type="email" class="form-control" placeholder="Email" maxlength="30" id="email" name="email">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="senha">Senha</label>
                            <input type="password" class="form-control" placeholder="Senha" maxlength="30" id="senha" name="senha">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="confirmasenha">Confirme a senha</label>
                            <input type="password" class="form-control" placeholder="Confirme a senha" maxlength="30" id="confirmasenha" name="confirmasenha">
                        </div>
                        <button type="submit" class="btn-submit">Cadastrar</button>
                        <button type="button" class="btn btn-voltar" onclick="history.back()">Voltar</button>
                    </form>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.post("/cadastro", (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmasenha = req.body.confirmasenha;

    if (nome == "" || email == "" || senha == "" || senha != confirmasenha) {

        let html = `
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Cliente</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background: linear-gradient(135deg, #388E3C, #b3b2af);
                    }
                    .navbar-greenup {
                        background: linear-gradient(90deg, #388E3C, #2e7d32);
                        padding: 10px 24px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .navbar-greenup a {
                        color: rgba(255,255,255,0.88);
                        text-decoration: none;
                        padding: 6px 14px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                    }
                    .navbar-greenup a:hover {
                        background: rgba(255,255,255,0.18);
                        color: white;
                    }
                    .navbar-logo {
                        height: 38px;
                        width: auto;
                        vertical-align: middle;
                        margin-right: 8px;
                    }
                    .navbar-brand-text {
                        color: white;
                        font-weight: 700;
                        font-size: 1.2rem;
                        text-decoration: none;
                    }
                    .body2 {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .erro-msg {
                        color: #c62828;
                        font-size: 0.82rem;
                        margin-top: 6px;
                        margin-left: 14px;
                    }
                    .card-return {
                        background-color: #f8f9fa;
                        padding: 40px;
                        border-radius: 15px;
                        width: 360px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    }
                    .card-return h2 {
                        text-align: center;
                        margin-bottom: 30px;
                        font-weight: 600;
                        color: #388E3C;
                    }
                    .form-control {
                        border-radius: 25px;
                        padding-left: 15px;
                    }
                    .form-control:focus {
                        border-color: rgb(46, 125, 50);
                        box-shadow: 0 0 0 0.2rem #388E3C;
                    }
                    .btn-submit {
                        border: none;
                        border-radius: 25px;
                        background: linear-gradient(90deg, #388E3C, #cccccc);
                        color: white;
                        font-weight: 500;
                        padding: 10px;
                        width: 100%;
                    }
                    .btn-submit:hover {
                        opacity: 0.9;
                    }
                    .btn-voltar {
                        border-radius: 25px;
                        width: 100%;
                        margin-top: 10px;
                        border: 2px solid #388E3C;
                        color: #388E3C;
                        font-weight: 500;
                    }
                    .btn-voltar:hover {
                        background: linear-gradient(90deg, #388E3C, #b3b2af);
                        color: white;
                        border: none;
                    }
                    .logo {
                        width: auto;
                        height: 100px;
                        margin-bottom: 20px;
                    }
                    .container-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                </style>
            </head>
            <body>
            <div class="navbar-greenup">
                <div>
                    <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                    <a href="/" class="navbar-brand-text">GreenUp</a>
                </div>
                <div>
                    <a href="/">Home</a>
                    <a href="/cadastro">Cliente</a>
                    <a href="/fornecedor">Fornecedor</a>
                    <a href="/listaClientes">Lista Clientes</a>
                    <a href="/listaFornecedores">Lista Fornecedores</a>`;
                    if (usuarioLogado) {
                        html += `<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`;
                        html += `<a href="/logout">Logout</a>`;
                    } else {
                        html += `<a href="/login">Login</a>`;
                    }
                html += `
                </div>
            </div>
            <div class="body2">
                <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                    <div class="card-return">
                        <h2>Cadastrar</h2>
                        <form method="POST" action="/cadastro">
                            <div class="mb-3">
                                <label class="form-label" for="nome">Nome</label>
                                <input type="text" class="form-control" placeholder="Username" maxlength="30" id="nome" name="nome" value="${nome}">`;
                                if (nome == "") {
                                    html += `<div class="erro-msg"> Preencha o campo de nome</div>`;
                                }
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" class="form-control" placeholder="Email" maxlength="30" id="email" name="email" value="${email}">`;
                                if (email == "") {
                                    html += `<div class="erro-msg"> Preencha o campo de email</div>`;
                                }
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label" for="senha">Senha</label>
                                <input type="password" class="form-control" placeholder="Senha" maxlength="30" id="senha" name="senha">`;
                                if (senha == "") {
                                    html += `<div class="erro-msg"> Preencha o campo de senha</div>`;
                                }
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label" for="confirmasenha">Confirme a senha</label>
                                <input type="password" class="form-control" placeholder="Confirme a senha" maxlength="30" id="confirmasenha" name="confirmasenha">`;
                                if (senha != "" && senha != confirmasenha) {
                                    html += `<div class="erro-msg"> As senhas são diferentes</div>`;
                                }
                            html += `</div>
                            <button type="submit" class="btn-submit">Cadastrar</button>
                            <button type="button" class="btn btn-voltar" onclick="history.back()">Voltar</button>
                        </form>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>`;

        res.write(html);
        res.end();
        return;
    }

    listaClientes.push({
        "nome": nome,
        "email": email,
        "senha": senha,
    });

    res.redirect("/listaClientes");
});

app.get("/listaClientes", (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Lista de Clientes</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                    min-height: 100vh;
                    font-family: Arial, sans-serif;
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .card-return {
                    width: 750px;
                    padding: 40px;
                    border-radius: 20px;
                    background: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    margin: 40px auto;
                    animation: fadeIn 0.4s ease-in-out;
                }
                h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    color: #388E3C;
                    font-weight: bold;
                }
                thead {
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                }
                tbody tr:hover {
                    background-color: #f1f1f1;
                    transition: 0.2s;
                }
                .btn-return {
                    margin-top: 20px;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                    font-weight: 500;
                    border: none;
                    padding: 10px 20px;
                    width: 100%;
                }
                .btn-return:hover {
                    opacity: 0.9;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="card-return">
            <h2>Clientes Cadastrados</h2>
            <div class="table-responsive">
                <table class="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
    `);

    if (listaClientes.length === 0) {
        res.write(`
            <tr>
                <td colspan="3" class="text-muted">Nenhum cliente cadastrado ainda.</td>
            </tr>
        `);
    } else {
        for (let i = 0; i < listaClientes.length; i++) {
            const Cliente = listaClientes[i];
            res.write(`
                <tr>
                    <td>${Cliente.nome}</td>
                    <td>${Cliente.email}</td>
                    <td>${Cliente.senha}</td>
                </tr>
            `);
        }
    }

    res.write(`
                    </tbody>
                </table>
            </div>
            <a href="/cadastro" class="btn btn-return text-white">Novo Cadastro</a>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.get('/fornecedor', (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Fornecedor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .body2 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 16px;
                }
                .card-return {
                    background-color: #f8f9fa;
                    padding: 40px;
                    border-radius: 15px;
                    width: 420px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                }
                .card-return h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    font-weight: 600;
                    color: #388E3C;
                }
                .form-control {
                    border-radius: 25px;
                    padding-left: 15px;
                }
                .form-control:focus {
                    border-color: rgb(46, 125, 50);
                    box-shadow: 0 0 0 0.2rem #388E3C;
                }
                .btn-submit {
                    border: none;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #cccccc);
                    color: white;
                    font-weight: 500;
                    padding: 10px;
                    width: 100%;
                }
                .btn-submit:hover {
                    opacity: 0.9;
                }
                .btn-voltar {
                    border-radius: 25px;
                    width: 100%;
                    margin-top: 10px;
                    border: 2px solid #388E3C;
                    color: #388E3C;
                    font-weight: 500;
                }
                .btn-voltar:hover {
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                    border: none;
                }
                .logo {
                    width: auto;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .container-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="body2">
            <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                <div class="card-return">
                    <h2>Cadastrar Fornecedor</h2>
                    <form method="POST" action="/fornecedor">
                        <div class="mb-3">
                            <label class="form-label" for="cnpj">CNPJ</label>
                            <input type="text" class="form-control" placeholder="00.000.000/0000-00" maxlength="18" id="cnpj" name="cnpj">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="razaoSocial">Razão Social</label>
                            <input type="text" class="form-control" placeholder="Moraes & irmãos Ltda" maxlength="60" id="razaoSocial" name="razaoSocial">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="nomeFantasia">Nome Fantasia</label>
                            <input type="text" class="form-control" placeholder="Loja do 1,99" maxlength="60" id="nomeFantasia" name="nomeFantasia">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="endereco">Endereço</label>
                            <input type="text" class="form-control" placeholder="Rua das Flores, 123" maxlength="80" id="endereco" name="endereco">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cidade">Cidade</label>
                            <input type="text" class="form-control" placeholder="São Paulo" maxlength="50" id="cidade" name="cidade">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="uf">UF</label>
                            <input type="text" class="form-control" placeholder="SP" maxlength="2" id="uf" name="uf">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cep">CEP</label>
                            <input type="text" class="form-control" placeholder="00000-000" maxlength="9" id="cep" name="cep">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input type="email" class="form-control" placeholder="contato@empresa.com" maxlength="50" id="email" name="email">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="telefone">Telefone</label>
                            <input type="text" class="form-control" placeholder="(11) 99999-9999" maxlength="15" id="telefone" name="telefone">
                        </div>
                        <button type="submit" class="btn-submit">Cadastrar</button>
                        <button type="button" class="btn btn-voltar" onclick="history.back()">Voltar</button>
                    </form>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.post("/fornecedor", (req, res) => {
    const cnpj = req.body.cnpj;
    const razaoSocial = req.body.razaoSocial;
    const nomeFantasia = req.body.nomeFantasia;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;
    const email = req.body.email;
    const telefone = req.body.telefone;

    if (cnpj == "" || razaoSocial == "" || nomeFantasia == "" || endereco == "" || cidade == "" || uf == "" || cep == "" || email == "" || telefone == "") {

        let html = `
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Fornecedor</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background: linear-gradient(135deg, #388E3C, #b3b2af);
                    }
                    .navbar-greenup {
                        background: linear-gradient(90deg, #388E3C, #2e7d32);
                        padding: 10px 24px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .navbar-greenup a {
                        color: rgba(255,255,255,0.88);
                        text-decoration: none;
                        padding: 6px 14px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                    }
                    .navbar-greenup a:hover {
                        background: rgba(255,255,255,0.18);
                        color: white;
                    }
                    .navbar-logo {
                        height: 38px;
                        width: auto;
                        vertical-align: middle;
                        margin-right: 8px;
                    }
                    .navbar-brand-text {
                        color: white;
                        font-weight: 700;
                        font-size: 1.2rem;
                        text-decoration: none;
                    }
                    .body2 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 40px 16px;
                    }
                    .erro-msg {
                        color: #c62828;
                        font-size: 0.82rem;
                        margin-top: 6px;
                        margin-left: 14px;
                    }
                    .card-return {
                        background-color: #f8f9fa;
                        padding: 40px;
                        border-radius: 15px;
                        width: 420px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    }
                    .card-return h2 {
                        text-align: center;
                        margin-bottom: 30px;
                        font-weight: 600;
                        color: #388E3C;
                    }
                    .form-control {
                        border-radius: 25px;
                        padding-left: 15px;
                    }
                    .form-control:focus {
                        border-color: rgb(46, 125, 50);
                        box-shadow: 0 0 0 0.2rem #388E3C;
                    }
                    .btn-submit {
                        border: none;
                        border-radius: 25px;
                        background: linear-gradient(90deg, #388E3C, #cccccc);
                        color: white;
                        font-weight: 500;
                        padding: 10px;
                        width: 100%;
                    }
                    .btn-submit:hover {
                        opacity: 0.9;
                    }
                    .btn-voltar {
                        border-radius: 25px;
                        width: 100%;
                        margin-top: 10px;
                        border: 2px solid #388E3C;
                        color: #388E3C;
                        font-weight: 500;
                    }
                    .btn-voltar:hover {
                        background: linear-gradient(90deg, #388E3C, #b3b2af);
                        color: white;
                        border: none;
                    }
                    .logo {
                        width: auto;
                        height: 100px;
                        margin-bottom: 20px;
                    }
                    .container-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                </style>
            </head>
            <body>
            <div class="navbar-greenup">
                <div>
                    <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                    <a href="/" class="navbar-brand-text">GreenUp</a>
                </div>
                <div>
                    <a href="/">Home</a>
                    <a href="/cadastro">Cliente</a>
                    <a href="/fornecedor">Fornecedor</a>
                    <a href="/listaClientes">Lista Clientes</a>
                    <a href="/listaFornecedores">Lista Fornecedores</a>`;
                    if (usuarioLogado) {
                        html += `<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`;
                        html += `<a href="/logout">Logout</a>`;
                    } else {
                        html += `<a href="/login">Login</a>`;
                    }
                html += `
                </div>
            </div>
            <div class="body2">
                <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                    <div class="card-return">
                        <h2>Cadastrar Fornecedor</h2>
                        <form method="POST" action="/fornecedor">
                            <div class="mb-3">
                                <label class="form-label">CNPJ</label>
                                <input type="text" class="form-control" placeholder="00.000.000/0000-00" maxlength="18" name="cnpj" value="${cnpj}">`;
                                if (cnpj == "") html += `<div class="erro-msg"> Preencha o CNPJ</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Razão Social</label>
                                <input type="text" class="form-control" placeholder="Moraes & irmãos Ltda" maxlength="60" name="razaoSocial" value="${razaoSocial}">`;
                                if (razaoSocial == "") html += `<div class="erro-msg"> Preencha a Razão Social</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Nome Fantasia</label>
                                <input type="text" class="form-control" placeholder="Loja do 1,99" maxlength="60" name="nomeFantasia" value="${nomeFantasia}">`;
                                if (nomeFantasia == "") html += `<div class="erro-msg"> Preencha o Nome Fantasia</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Endereço</label>
                                <input type="text" class="form-control" placeholder="Rua das Flores, 123" maxlength="80" name="endereco" value="${endereco}">`;
                                if (endereco == "") html += `<div class="erro-msg"> Preencha o Endereço</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Cidade</label>
                                <input type="text" class="form-control" placeholder="São Paulo" maxlength="50" name="cidade" value="${cidade}">`;
                                if (cidade == "") html += `<div class="erro-msg"> Preencha a Cidade</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">UF</label>
                                <input type="text" class="form-control" placeholder="SP" maxlength="2" name="uf" value="${uf}">`;
                                if (uf == "") html += `<div class="erro-msg"> Preencha a UF</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">CEP</label>
                                <input type="text" class="form-control" placeholder="00000-000" maxlength="9" name="cep" value="${cep}">`;
                                if (cep == "") html += `<div class="erro-msg"> Preencha o CEP</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="contato@empresa.com" maxlength="50" name="email" value="${email}">`;
                                if (email == "") html += `<div class="erro-msg"> Preencha o Email</div>`;
                            html += `</div>
                            <div class="mb-3">
                                <label class="form-label">Telefone</label>
                                <input type="text" class="form-control" placeholder="(11) 99999-9999" maxlength="15" name="telefone" value="${telefone}">`;
                                if (telefone == "") html += `<div class="erro-msg"> Preencha o Telefone</div>`;
                            html += `</div>
                            <button type="submit" class="btn-submit">Cadastrar</button>
                            <button type="button" class="btn btn-voltar" onclick="history.back()">Voltar</button>
                        </form>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>`;

        res.write(html);
        res.end();
        return;
    }

    listaFornecedores.push({
        "cnpj": cnpj,
        "razaoSocial": razaoSocial,
        "nomeFantasia": nomeFantasia,
        "endereco": endereco,
        "cidade": cidade,
        "uf": uf,
        "cep": cep,
        "email": email,
        "telefone": telefone,
    });

    res.redirect("/listaFornecedores");
});

app.get("/listaFornecedores", (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Lista de Fornecedores</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                    min-height: 100vh;
                    font-family: Arial, sans-serif;
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .card-return {
                    padding: 40px;
                    border-radius: 20px;
                    background: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    margin: 40px auto;
                    animation: fadeIn 0.4s ease-in-out;
                }
                h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    color: #388E3C;
                    font-weight: bold;
                }
                thead {
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                }
                tbody tr:hover {
                    background-color: #f1f1f1;
                    transition: 0.2s;
                }
                .btn-return {
                    margin-top: 20px;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                    font-weight: 500;
                    border: none;
                    padding: 10px 20px;
                    width: 100%;
                }
                .btn-return:hover {
                    opacity: 0.9;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="container-fluid px-4">
        <div class="card-return">
            <h2>Fornecedores Cadastrados</h2>
            <div class="table-responsive">
                <table class="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>CEP</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
    `);

    if (listaFornecedores.length === 0) {
        res.write(`
            <tr>
                <td colspan="9" class="text-muted">Nenhum fornecedor cadastrado ainda.</td>
            </tr>
        `);
    } else {
        for (let i = 0; i < listaFornecedores.length; i++) {
            const f = listaFornecedores[i];
            res.write(`
                <tr>
                    <td>${f.cnpj}</td>
                    <td>${f.razaoSocial}</td>
                    <td>${f.nomeFantasia}</td>
                    <td>${f.endereco}</td>
                    <td>${f.cidade}</td>
                    <td>${f.uf}</td>
                    <td>${f.cep}</td>
                    <td>${f.email}</td>
                    <td>${f.telefone}</td>
                </tr>
            `);
        }
    }

    res.write(`
                    </tbody>
                </table>
            </div>
            <a href="/fornecedor" class="btn btn-return text-white">Novo Fornecedor</a>
        </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.get('/login', (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #388E3C, #b3b2af);
                }
                .navbar-greenup {
                    background: linear-gradient(90deg, #388E3C, #2e7d32);
                    padding: 10px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .navbar-greenup a {
                    color: rgba(255,255,255,0.88);
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                .navbar-greenup a:hover {
                    background: rgba(255,255,255,0.18);
                    color: white;
                }
                .navbar-logo {
                    height: 38px;
                    width: auto;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .navbar-brand-text {
                    color: white;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .body2 {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card-return {
                    background-color: #f8f9fa;
                    padding: 40px;
                    border-radius: 15px;
                    width: 360px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                }
                .card-return h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    font-weight: 600;
                    color: #388E3C;
                }
                .form-control {
                    border-radius: 25px;
                    padding-left: 15px;
                }
                .form-control:focus {
                    border-color: rgb(46, 125, 50);
                    box-shadow: 0 0 0 0.2rem #388E3C;
                }
                .btn-submit {
                    border: none;
                    border-radius: 25px;
                    background: linear-gradient(90deg, #388E3C, #cccccc);
                    color: white;
                    font-weight: 500;
                    padding: 10px;
                    width: 100%;
                }
                .btn-submit:hover {
                    opacity: 0.9;
                }
                .btn-voltar {
                    border-radius: 25px;
                    width: 100%;
                    margin-top: 10px;
                    border: 2px solid #388E3C;
                    color: #388E3C;
                    font-weight: 500;
                }
                .btn-voltar:hover {
                    background: linear-gradient(90deg, #388E3C, #b3b2af);
                    color: white;
                    border: none;
                }
                .logo {
                    width: auto;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .container-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            </style>
        </head>
        <body>
        <div class="navbar-greenup">
            <div>
                <img src="img/icon-greenup.png" alt="Logo GreenUp" class="navbar-logo">
                <a href="/" class="navbar-brand-text">GreenUp</a>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/cadastro">Cliente</a>
                <a href="/fornecedor">Fornecedor</a>
                <a href="/listaClientes">Lista Clientes</a>
                <a href="/listaFornecedores">Lista Fornecedores</a>
    `);
    if (usuarioLogado) {
        res.write(`<span style="color:white; padding: 6px 14px; font-size:0.9rem;">Olá, <strong>${usuarioLogado}</strong></span>`);
        res.write(`<a href="/logout">Logout</a>`);
    } else {
        res.write(`<a href="/login">Login</a>`);
    }
    res.write(`
            </div>
        </div>
        <div class="body2">
            <div class="container-form">
                <img src="img/icon-greenup.png" alt="Logo_Green_Up" class="logo">
                <div class="card-return">
                    <h2>Login</h2>
                    <form method="POST" action="/login">
                        <div class="mb-3">
                            <label class="form-label" for="usuario">Email</label>
                            <input type="text" class="form-control" placeholder="Email" id="usuario" name="usuario">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="senha">Senha</label>
                            <input type="password" class="form-control" placeholder="Senha" id="senha" name="senha">
                        </div>
                        <button type="submit" class="btn-submit">Entrar</button>
                        <button type="button" class="btn btn-voltar" onclick="history.back()">Voltar</button>
                    </form>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
    res.end();
});

app.post("/login", (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario == "" || senha == "") {
        res.send(`<script>alert("Preencha todos os campos!"); window.location.href="/login";</script>`);
        return;
    }

    for (let i = 0; i < listaClientes.length; i++) {
        if (listaClientes[i].email == usuario && listaClientes[i].senha == senha) {
            usuarioLogado = listaClientes[i].nome;
            res.send(`<script>alert("Login efetuado com sucesso! Bem-vindo, ${listaClientes[i].nome}!"); window.location.href="/";</script>`);
            return;
        }
    }

    res.send(`<script>alert("Usuário ou senha incorretos!"); window.location.href="/login";</script>`);
});

app.get("/logout", (req, res) => {
    usuarioLogado = null;
    res.send(`<script>alert("Logout efetuado com sucesso!"); window.location.href="/";</script>`);
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});
