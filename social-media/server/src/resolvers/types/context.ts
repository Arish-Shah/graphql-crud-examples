import { Request, Response } from "express";

import { createUserLoader } from "../../util/createUserLoader";

export interface Context {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
}
