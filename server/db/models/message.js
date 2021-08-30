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
  readed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Message;
