import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  
  let first = true;
  let lastMessage;
  for(let i = messages.length -1; i >= 0; i--) {
    const message = messages[i];
    if(message.senderId !== userId) {
      lastMessage = message;
      break;
    }
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        let flag = false;
        if((first === true && message.readed === false) || lastMessage === message) {
          flag = true;
          first = false;
        } else {
          flag = false;
        }

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} lastReaded={flag}/>
        );
      })}
    </Box>
  );
};

export default Messages;
