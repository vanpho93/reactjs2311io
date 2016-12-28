var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  idleTimeoutMillis: 3000,
  max: 100
}
var pool = new pg.Pool(config);

function query(sql, cb){
  pool.connect((err, client, done) => {
    if(err) return cb(err);
    done();
    client.query(sql, (err, result) => {
      if(err) return cb(err);
      return cb(err, result);
    });
  });
}

//insert
//select
//update
//delete

function insertNote(sub, note, cb){
  var sql = `INSERT INTO "Notes"(subject, content) VALUES ('${sub}', '${note}') RETURNING *`;
  query(sql, cb);
}

function selectNote(cb){
  query('SELECT * FROM "Notes"', cb);
}

function removeNote(id, cb){
  var sql = `DELETE FROM "Notes" WHERE id=${id}`;
  query(sql, cb);
}

function updateNote(subject, content, id, cb){
  var sql = `UPDATE "Notes" SET subject='${subject}', content='${content}' WHERE id = ${id} RETURNING *`;
  query(sql, cb);
}

module.exports = {insertNote, selectNote, removeNote, updateNote};
