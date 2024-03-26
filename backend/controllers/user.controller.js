import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUsersForSideBarComponents = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({
      _id: { $ne: loggedInUser },
    });
    res.status(200).json(new ApiResponse(200, "success", users));
  } catch (error) {
    throw new ApiError(500, "Errro in finding users", error.message);
  }
};
