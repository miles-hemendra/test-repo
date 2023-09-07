const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if(user) {
      user.getRole().then(role => {
        if (role.name === "admin") {
          next();
          return;
        }

        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
};

isSI = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if(user) {
      user.getRole().then(role => {
        if (role.name === "si") {
          next();
          return;
        }
  
        res.status(403).send({
          message: "Require SI Role!"
        });
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
};

isSubAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if(user) {
      user.getRole().then(role => {
        if (role.name === "subadmin") {
          next();
          return;
        }
  
        res.status(403).send({
          message: "Require Subadmin Role!"
        });
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
};

isAdminOrSubAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if(user) {
      user.getRole().then(role => {
        if (role.name === "admin" || role.name === 'subadmin') {
          next();
          return;
        }
  
        res.status(403).send({
          message: "Require Admin or Subadmin Role!"
        });
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
};

isAdminOrSubAdminOrSI = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if(user) {
      user.getRole().then(role => {
        if (role.name === "admin" || role.name === 'subadmin' || role.name === 'si') {
          next();
          return;
        }
  
        res.status(403).send({
          message: "Require SI or Subadmin or Admin Role!"
        });
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isSI: isSI,
  isSubAdmin: isSubAdmin,
  isAdminOrSubAdmin: isAdminOrSubAdmin,
  isAdminOrSubAdminOrSI: isAdminOrSubAdminOrSI
};
module.exports = authJwt;
