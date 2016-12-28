var {updateNote} = require('../db.js');
module.exports = (req, res) => {
  var {id, content, sub} = req.body;
  updateNote(sub, content, id, (err, result) => {
    if(err) return res.send(err);
    res.send(result.rows[0]);
  });
};
