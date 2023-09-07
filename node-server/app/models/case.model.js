module.exports = (sequelize, Sequelize) => {
    const Case = sequelize.define("cases", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Case;
};