const express = require('express');
const cors = require('cors');
const path = require('path');
//const firebird = require("node-firebird");
const Router = require("./routes/rotas.js");
const verificaAutenticacao = require('./middleware/verificaAuth.js');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(Router);

app.use(express.static('views'));

//middleware para renderizar páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

//Midleware de rotas privadas (não está privada ainda)
app.get("/home", verificaAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});


app.listen(PORT, () =>{
    console.log(`Servidor aberto na porta ${PORT}`);
})