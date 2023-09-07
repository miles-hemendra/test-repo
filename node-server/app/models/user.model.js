module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pincode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true
    },
    otp: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    temp_contact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telegramUsername: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telegramChatId: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return User;
};
