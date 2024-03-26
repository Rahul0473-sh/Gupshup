import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app= express();
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./Routes/authRoutes.js";
import messageRoutes from "./Routes/messageRoute.js";
import userRoutes from "./Routes/user.routes.js"
import connectDb from "./Db/connectdb.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  console.log("hey");
  res.status(200).json({ hey: "you got this" });
});

connectDb().then(() => {
  try {
    app.on("error", (error) => {
      console.log("This is Error is stopping us to connect db", error);
    });
    app.listen(process.env.PORT, () => {
      console.log("app is listnening on this port");
    });
  } catch (error) {
    console.log("DB didn't connect", error);
    throw error;
  }
});
