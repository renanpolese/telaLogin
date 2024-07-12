// authController.js
const firebird = require('node-firebird');
const dbOptions = require('../config/database');
const JWT = require('jsonwebtoken');
const JwtSecret = '5ac1fdd7e855e7607c710cd3558177c8223ebe026e2f34cdd2d3c15b7166301f152af6';

//const authController = {};

function login(req, res, next){
   const usuario = req.body.usuario;
   const senha = req.body.senha;

   if (!usuario || !senha) {
      return res.status(400).json({ error: 'Faltam dados para verificar' });
   }

   firebird.attach(dbOptions, function (err, db) {
      const busca = 'SELECT CODUSUARIO FROM USUARIOS WHERE USUARIO = ? and SENHA = ?';
      const params = [usuario, senha];

      if (err) {
         throw err;
      }

      db.query(busca, params, function (err, result) {
         if (err) {
            return res.status(500).json({ error: 'Erro ao realizar busca pelo usuário', details: err });
         }

         if (result.length === 0) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
         } 
         else {
            console.log("Logado com sucesso!")

            let userId = result[0].CODUSUARIO //Define o id do usuário que acessou

            const maxAge = 4 * 60 * 60; // 4 horas em seg
            const token = JWT.sign(
               { id: userId }, // Pega o ID do usuario que logou e usa como payload do JWT
               JwtSecret,
               { expiresIn: maxAge }
            );

            console.log(userId, "|", usuario, "|", token);
            return res.status(200).json({auth: true, id: userId, token: token});
         }
      });

      db.detach();
   });
};

function verificaToken(req, res, next){
   var token = req.headers['x-access-token'];

   if(!token) {
      return res.status(401).json({ error: 'Usuario nao autenticado' });
   }

   JWT.verify(token, JwtSecret, (err, decoded) => {
      if(err) {
         return res.status(401).json({ error: 'Token inválido' });
      }

      req.userId = decoded.id;
      next();
   });
};

module.exports = {login, verificaToken};
