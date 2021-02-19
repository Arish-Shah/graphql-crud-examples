import mongoose, { Schema, Document } from "mongoose";
import { ITodo } from "./Todo";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  todos: ITodo["_id"][];
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String!,
    required: true
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

export default mongoose.model<IUser>("User", userSchema);
