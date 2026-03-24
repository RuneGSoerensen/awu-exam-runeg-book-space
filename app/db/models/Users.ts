import { Schema, model, Types, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/@/, "Invalid email"],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  cover: string;
};

export type UserType = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};

export default model<UserType>("User", userSchema);
