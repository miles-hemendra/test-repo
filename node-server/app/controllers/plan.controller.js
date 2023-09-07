const db = require("../models");
const Plan = db.plan;

const Op = db.Sequelize.Op;

exports.allPlan = (req, res) => {
  Plan.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(plans => {
    return res.status(200).send(plans);
  });
}