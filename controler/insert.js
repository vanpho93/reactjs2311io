var {insertNote} = require('../db.js');
module.exports = (req, res) => {
  var {sub, note} = req.body;
  insertNote(sub, note, (err, result) => {
    if(err){
      return res.send(err);
    }
    res.send(result.rows[0]);
  });
};
