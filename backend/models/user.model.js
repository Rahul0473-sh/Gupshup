import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required:true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: "string",
      default: "",
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password, 10); // this is pointing to schema model
});
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(this.password, password)
}

export const User = mongoose.model("User", userSchema);