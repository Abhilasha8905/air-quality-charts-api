import { Request, Response, NextFunction } from "express";

const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // perform authentication here
  // for sake of assignmnt, marking user_id as always 10001
  req.session = { user_id: "10001" };
  return next();
};

export default AuthMiddleware;
