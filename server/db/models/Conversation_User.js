const Sequelize = require("sequelize");
const db = require("../db");

const Conversation_User = db.define("conversation_user", {});

module.exports = Conversation_User;