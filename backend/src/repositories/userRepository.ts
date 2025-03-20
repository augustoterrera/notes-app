import mongoose, { Schema, Model } from "mongoose";
import { User } from "../models/user.js";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel: Model<User> = mongoose.model("User", userSchema);