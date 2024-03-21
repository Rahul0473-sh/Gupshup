import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).json({ message: "token is not valid" });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      res.status(401).json({ message: "decoded token is not valid" });
    }
    
    const user = await User.findById(decodedToken._id);

    if (!user) {
      res.status(403).json({ message: "Unauthorize request" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Servor Error at protect Route", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
