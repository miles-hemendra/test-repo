module.exports = (sequelize, Sequelize) => {
    const Dvr = sequelize.define("dvrs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Dvr;
};