import jwt from "jsonwebtoken";

import User from "../models/User";
import { AuthPayload } from "../generated/graphql";
import { IUser } from "../models/User";

const secret = process.env.JWT_SECRET || "secret";

type Token = {
  _id?: string;
};

export const createToken = (user: IUser): AuthPayload => {
  const token = jwt.sign(
    {
      _id: user._id
    },
    secret
  );
  return {
    token,
    expiresIn: null
  };
};

export const getUser = async (authToken: string) => {
  if (authToken) {
    const token = authToken.replace("Bearer ", "");
    const obj = jwt.verify(token, secret) as Token;
    if (obj?._id) {
      return await User.findById(obj._id);
    }
  }
  return null;
};
