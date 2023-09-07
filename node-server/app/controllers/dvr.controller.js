const db = require("../models");
const Dvr = db.dvr;

const Op = db.Sequelize.Op;

exports.allDvr = (req, res) => {
  Dvr.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(dvrs => {
    return res.status(200).send(dvrs);
  });
}