const firebird = require('node-firebird');
const dbOptions = require('../config/database.js');

function listUsers(req,res){
    firebird.attach(dbOptions, function(err, db) {
 
        if (err){
            return res.status(400).json(err);
        }
            

        db.query('SELECT * FROM USUARIOS', function(err, result) {

            db.detach();

            if(err){
                return res.status(400).json(err)
            } 
            else {
                return res.status(200).json(result);
            } 
        });
     
    });
}

 function postUsers(req, res) {
         firebird.attach(dbOptions, function(err, db) {

             const comando = 'INSERT INTO USUARIOS (NOME, SENHA, EMAIL) VALUES (?,?,?)'

            db.query(comando, [req.body.nome, req.body.senha, req.body.email], function(err, result){

                db.detach();

                if (err){
                    return res.status(400).json({error: 'Erro ao executar query', details: err });
                }
                else {
                    return res.status(201).json({message: 'Usuário inserido com sucesso!', userId: result});
                }
            })
                     
             
        },

    )}; 


    // function updateUsers(req, res){
    //     firebird.attach(dbOptions, function(err, db){
    //         const update = 'UPDATE FROM USUARIOS SET '
    //     }
    // )};
    
    function deleteUser(req, res){
        firebird.attach(dbOptions, function(err, db){
            let id = req.params.id;
            const apagar = `DELETE FROM USUARIOS WHERE ID = ${id}`

            db.query(apagar, function(err, result){
                if (err){
                    return res.status(400).json({error: 'Erro ao executar query', details: err });
                }
                else {
                    return res.status(200).json({message: 'Usuário deletado com sucesso!', userId: result});
                }
            })
        })
    }

module.exports = { postUsers, listUsers, deleteUser };




