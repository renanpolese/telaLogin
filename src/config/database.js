const firebird = require('node-firebird');

 const dbOptions = {
 
    host: '127.0.0.1',
    port: 3050,
    database: 'C:\\Users\\SUPORTE PC04\\Desktop\\pasta\\SISTEMASOMA.FDB',
    user: 'sysdba',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 8192,        // default when creating database
    lowercase_keys: false
 }

 module.exports = dbOptions;
