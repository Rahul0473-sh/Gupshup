import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/messages.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: reciverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, reciverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, reciverId],
    });
  }
  const newMessage = await Message.create({
    senderId,
    reciverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await conversation.save();

  res.json(new ApiResponse(200, "success"));
};
