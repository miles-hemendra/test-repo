module.exports = (sequelize, Sequelize) => {
    const Camera = sequelize.define("cameras", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Camera;
};