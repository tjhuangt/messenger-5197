const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Conversation_User = require("./Conversation_User");

// associations

User.hasMany(Conversation_User);
Conversation.hasMany(Conversation_User);
Conversation_User.belongsTo(User);
Conversation_User.belongsTo(Conversation);
Message.belongsTo(Conversation_User);
Conversation_User.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Conversation_User,
  Message
};
