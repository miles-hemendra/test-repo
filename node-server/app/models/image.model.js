module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      uniqueId: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      }
    });
  
    return Image;
};