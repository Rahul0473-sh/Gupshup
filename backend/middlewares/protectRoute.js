import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(400).json(new ApiError(400, "Token inn't correct"));
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      res.status(400).json(new ApiError(400, "Unauthorize request"));
    }
    console.log(decodedToken._id);
    const user = await User.findById(decodedToken._id).select(
      "-password -gender -profilePic"
    );

    if (!user) res.status(400).json(new ApiError(400, "User not found"));
    
    req.user = user;

    next();
  } catch (error) {
    res.status(400).json(new ApiError(400, "this is not the error "));
  }
};
