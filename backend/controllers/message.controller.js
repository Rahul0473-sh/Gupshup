import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/messages.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: reciverId } = req.params;
  const senderId = req.user._id;
  const user1 = await User.findById(reciverId);
  console.log(user1);

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
export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: usertoChat } = req.params;
    const username1 = await User.findById(usertoChat);
    console.log(req.user.username, username1.username);

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, usertoChat],
      },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json(new ApiResponse(200, "success", []));
    }
    const messages = conversation.messages;
    res.status(200).json(new ApiResponse(200, "success", messages));
  } catch (error) {
    console.log(error.message);
    throw res
      .status(500)
      .json(new ApiError(500, "something wrong in getmessages"), error.message);
  }
};
