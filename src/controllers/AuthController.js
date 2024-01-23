// authController.js
const firebird = require('node-firebird');
const dbOptions = require('../config/database');
const JWT = require('jsonwebtoken');
const JwtSecret = '5ac1fdd7e855e7607c710cd3558177c8223ebe026e2f34cdd2d3c15b7166301f152af6';

const authController = {};

authController.login = (req, res, next) => {
   const nome = req.body.usuario;
   const senha = req.body.senha;

   if (!nome || !senha) {
      return res.status(400).json({ error: 'Faltam dados para verificar' });
   }

   firebird.attach(dbOptions, function (err, db) {
      const busca = 'SELECT ID FROM USUARIOS WHERE NOME = ? and SENHA = ?';
      const params = [nome, senha];

      if (err) {
         throw err;
      }

      db.query(busca, params, function (err, result) {
         if (err) {
            return res.status(500).json({ error: 'Erro ao realizar busca pelo usuário', details: err });
         }

         if (result.length === 0) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
         } else {
            const maxAge = 4 * 60 * 60; // 4 horas em seg
            const token = JWT.sign(
               { id: result[0].ID, username: nome }, // Pega o ID do primeiro resultado
               JwtSecret,
               { expiresIn: maxAge }
            );

            res.cookie('JWT', token, {
               httpOnly: true,
               maxAge: maxAge * 1000, // 4 horas em ms
            });
            console.log("id: ", result[0].ID, " | ", nome, token);
            res.redirect('/home');
         }
      });

      db.detach();
   });
};

authController.verificaToken = (req, res, next) => {
   const token = req.cookies.JWT;

   if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
   }

   JWT.verify(token, JwtSecret, (err, decoded) => {
      if (err) {
         return res.status(401).json({ error: 'Token inválido' });
      }

      req.usuario = decoded;
      next();
   });
};

module.exports = authController;
