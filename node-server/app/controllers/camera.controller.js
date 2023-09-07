const db = require("../models");
const Camera = db.camera;

const Op = db.Sequelize.Op;

exports.allCamera = (req, res) => {
  Camera.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(cameras => {
    return res.status(200).send(cameras);
  });
}