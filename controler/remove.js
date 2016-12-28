var {removeNote} = require('../db.js');
module.exports = (req, res) => {
  var {id} = req.body
  removeNote(id, (err, result) => {
    if(err) return res.send(err);
    res.send('Thanh cong');
  })
};
