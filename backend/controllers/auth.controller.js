import { User } from "../models/user.model.js";
export const signup = async (req, res, next) => {
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
  const newUser=await User.create({
    fullName,
    username,
    email,
    password,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });
    res.status(200).json({ newUser });
};


export const login = () => {
  console.log("login");
};
export const logout = () => {
  console.log("logout");
};
