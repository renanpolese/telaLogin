const authController = require('../controllers/AuthController.js');

const verificaAutenticacao = (req, res, next) => {
   authController.verificaToken(req, res, (err) => {
      if (err) {
         return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      next();
   });
};

module.exports = verificaAutenticacao;