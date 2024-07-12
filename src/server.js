const express = require('express');
const cors = require('cors');
const path = require('path');
//const firebird = require("node-firebird");
const Router = require("./routes/rotas.js");
const authController = require('./controllers/AuthController.js');
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

//app.use("*", verificaAutenticacao);

app.get("/home", authController.verificaToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
    console.log("Usuario ID " + req.userId + " conectou-se")  
});


app.listen(PORT, () =>{
    console.log(`Servidor aberto na porta ${PORT}`);
})