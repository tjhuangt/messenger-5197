const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  //flag indicate if the message is read
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Message;
