const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Conversation_User = require("./Conversation_User");

// associations

User.belongsToMany(Conversation, {through: Conversation_User});
Conversation.belongsToMany(User, {through: Conversation_User});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Conversation_User,
  Message
};
