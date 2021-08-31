const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, readed: false });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      readed: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

//update all messages flag to be read, id indicate conversation id
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const conversationId = Number(req.params.id);

    if(await Conversation.count({
      where: {
        [Op.and]: {
          id: conversationId,
          [Op.or]: {
            user1Id: senderId,
            user2Id: senderId
          }
        }
      }
    }) <= 0) {
      res.sendStatus(400);
    };

    if(!Number.isNaN(conversationId) && Math.ceil(conversationId) === conversationId) {
      const updateNumber = await Message.update( {readed : true}, {where : { conversationId : conversationId}});
      return res.json({updateNumber});
    }else {
      return res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
