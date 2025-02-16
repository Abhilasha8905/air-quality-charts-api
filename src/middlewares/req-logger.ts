import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const isEmptyObject = (obj: object) => !obj || Object.keys(obj)?.length == 0;

const fetchRequestData = (req: Request): string => {
  const { params, query, body } = req;
  let log = "";

  if (!isEmptyObject(params)) {
    log += `Req Params: ${JSON.stringify(params)}`;
  }
  if (!isEmptyObject(query)) {
    log += `Req Query: ${JSON.stringify(query)}`;
  }
  if (!isEmptyObject(body)) {
    log += `Req Body: ${JSON.stringify(body)}`;
  }
  return log;
};

export default (req: Request, res: Response, next: NextFunction): void => {
  req.operation_id = uuidv4();
  logger.info(
    req.operation_id,
    `Request Method: ${req.method}, Path: ${req.path}, ${fetchRequestData(req)}`
  );
  next();
};
