import { Request, Response } from "express";
import mongoose from "mongoose";

import { IUser } from "./models/User";
import { ITodo } from "./models/Todo";

export interface Context {
  req: Request;
  res: Response;
  User: mongoose.Model<IUser>;
  Todo: mongoose.Model<ITodo>;
  user: IUser | null;
}
