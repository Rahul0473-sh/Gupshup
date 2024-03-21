import jwt from "jsonwebtoken";
export const genrateTokenandCookie = async (userId) => {
  const token =  jwt.sign(
    {
      _id: userId,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "10d",
    }
    );
    return token;
};
