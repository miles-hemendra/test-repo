const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.plan = require("../models/plan.model.js")(sequelize, Sequelize);
db.camera = require("../models/camera.model.js")(sequelize, Sequelize);
db.dvr = require("../models/dvr.model.js")(sequelize, Sequelize);
db.case = require("../models/case.model.js")(sequelize, Sequelize);
db.image = require("../models/image.model.js")(sequelize, Sequelize);

db.userCases = sequelize.define("user_cases", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM,
    values: ['new', 'open', 'closed']
  },
  siId: {
    type: Sequelize.INTEGER,
    unique: false,
  },
  earnings: Sequelize.STRING
});

db.userCameras = sequelize.define("user_cameras", {
  cameraCount: Sequelize.INTEGER
});

db.userDvrs = sequelize.define("user_dvrs", {
  dvrCount: Sequelize.INTEGER
});

db.role.hasMany(db.user, {
  // through: "user_roles",
  foreignKey: "roleId",
  // otherKey: "userId"
  as: 'users',

});
db.user.belongsTo(db.role, {
  // through: "user_roles",
  foreignKey: "roleId",
  // otherKey: "roleId",
  as: 'role'
});

db.user.hasMany(db.user, {
  // through: 'user_si',
  foreignKey: 'siId',
  // otherKey: 'userId',
  as: 'users'
});
db.user.belongsTo(db.user, {
  // through: 'user_si',
  foreignKey: 'siId',
  // otherKey: 'siId',
  as: 'userSI'
});

db.camera.belongsToMany(db.user, {
  through: db.userCameras,
  foreignKey: 'cameraId',
  otherKey: 'userId',
  as: 'users'
});
db.user.belongsToMany(db.camera, {
  through: db.userCameras,
  foreignKey: 'userId',
  otherKey: 'cameraId',
  as: 'cameras'
});

db.dvr.belongsToMany(db.user, {
  through: db.userDvrs,
  foreignKey: 'dvrId',
  otherKey: 'userId',
  as: 'users'
});
db.user.belongsToMany(db.dvr, {
  through: db.userDvrs,
  foreignKey: 'userId',
  otherKey: 'dvrId',
  as: 'dvrs'
});

db.plan.hasMany(db.user, {
  // through: 'user_plan',
  foreignKey: 'planId',
  // otherKey: 'userId',
  as: 'users'
});
db.user.belongsTo(db.plan, {
  // through: 'user_plan',
  foreignKey: 'planId',
  // otherKey: 'planId',
  as: 'plan'
});

// db.user.hasMany(db.case, {
//   through: db.userCases,
//   as: 'cases'
// });
// db.case.belongsTo(db.user, {
//   through: db.userCases,
//   as: 'users'
// });


db.user.belongsToMany(db.case, { through: { model: db.userCases, unique: false },onDelete:"CASCADE" });
db.case.belongsToMany(db.user, { through: { model: db.userCases, unique: false },onDelete:"CASCADE"} );




db.userCases.belongsToMany(db.image, {
  through: 'case_images',
  foreignKey: 'caseId',
  otherKey: 'imageId',
  as: 'images'
});
db.image.belongsToMany(db.userCases, {
  through: 'case_images',
  foreignKey: 'imageId',
  otherKey: 'caseId',
  as: 'cases'
});


db.ROLES = ["user", "admin", "si", "subadmin"];

db.PLANS = ["3 months", "6 months", "9 months", "12 months"];

db.DVRS = ["Sony", "CP Plus", "samsung"];

db.CAMERAS = ["Sony", "CP Plus", "samsung"];

module.exports = db;
