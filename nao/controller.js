var mysql = require('mysql');
var sql = require('../config/config').mysql;
module.exports = {
  postNao
};

const pool = mysql.createPool({
    connectionLimit : 100, //the number of pre-load connection.
    host     : sql.host, // host of your mySql.
    user     : sql.user, // user of your mySql.
    password : sql.passwd, // Password of your mySql.
    port : sql.port, // Port of your mySql.
    database : sql.db, // Name of yout database in mySql.
    debug    :  false
});

function postNao(req, res, next) {
  var self = this;
  pool.getConnection((err,connection) => {
      if(err) {
          self.stop(err);
      } else {
        let query = '';
        if(req.body.data) {
          query = createRequest(req.body.from, req.body.data);
        } else {
          query = createRequest(req.body.from);
        }
        console.log(query);
        connection.query(query, (err,rows) => {
            if(err) {
              return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
              console.log(rows);
              return res.json(rows);
            }
        });
      }
  });
}

function createRequest(from, data) {
  let query = 'SELECT pos FROM ?? WHERE title=?';
  var table = [from, data];
  query = mysql.format(query, table);
  return query;
}

function createRequest(from) {
  let query = 'SELECT title FROM ??';
  var table = [from];
  query = mysql.format(query, table);
  return query;
}
