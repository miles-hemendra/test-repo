const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Op = db.Sequelize.Op;

checkDuplicateContactOrEmail = (req, res, next) => {
  // Contact
  User.findOne({
    where: {
      contact: req.body.contact
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Contact is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
      id: {
        [Op.not]: req.userId
      }
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};

checkDuplicateContact = (req, res, next) => {
  // Contact
  User.findOne({
    where: {
      contact: req.body.contact,
      id: {
        [Op.not]: req.userId
      }
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Contact is already in use!"
      });
      return;
    }

    next();
  });
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }
  
//   next();
// };

const verifySignUp = {
  checkDuplicateContactOrEmail: checkDuplicateContactOrEmail,
  checkDuplicateEmail: checkDuplicateEmail,
  checkDuplicateContact: checkDuplicateContact
  // checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
