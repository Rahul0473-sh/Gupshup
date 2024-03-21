import { User } from "../models/user.model.js";
import { genrateTokenandCookie } from "../utils/genrateTokenandCookie.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const signup = async (req, res, next) => {
  try {
    const { fullName, username, password, gender, confirmPassword, email } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(401).json({ error: "password didn't match" });
    }
    const exisiteduser = await User.findOne({
      $or: [{ username } || { email }],
    });
    if (exisiteduser) {
      return res
        .status(400)
        .json({ error: "Email or username should be unique" });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    const token = await genrateTokenandCookie(newUser._id);
    console.log(token);
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ newUser, message: "sucess" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    res.status(401).json(new ApiError(401, "User doesn't exist"));
  }
  // password check
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    res.status(400).json({ messgae: "wrong password" });
  }
  console.log(isPasswordCorrect);

  const token = await genrateTokenandCookie(user._id);
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, "success", user));
};
export const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json(new ApiResponse(200, "Logged out succesfully"));
};
