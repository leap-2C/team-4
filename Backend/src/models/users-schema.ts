import { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String },
  timestamps: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profileId: { type: Number },
});
export default userSchema;
