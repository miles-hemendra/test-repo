module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plans", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Plan;
};