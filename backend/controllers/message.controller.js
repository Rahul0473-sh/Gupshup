import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/messages.model.js";
export const sendMessage = async (req, res) => {
  const { message } = req.body;
  console.log(req.cookies);
  const { id: reciverId } = req.params;
  const senderId = req.user._id;

  let conversation = Conversation.findOne({
    participants: {
      $all: [senderId, reciverId],
    },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, reciverId], 
    });
  }

  const newMessage = new Message({
    senderId,
    reciverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await conversation.save();
  await newMessage.save();

  res.status(200).json({ newMessage });
};
