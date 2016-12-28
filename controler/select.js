var {selectNote} = require('../db.js');
module.exports = (req, res) => {
  selectNote((err, result) => {
    if(err) return res.send(err);
    res.send(result.rows);
  })
};
