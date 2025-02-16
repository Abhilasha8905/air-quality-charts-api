import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from '../interface/IControllerBase.interface';
import { ServerResponseType } from '../utils/constants';

export default class HealthController implements IControllerBase {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/health', this._health);
  }

  private _health = (req: Request, res: Response): any =>
    res.status(200).json({
      status: {
        operation_id: req.operation_id,
        message: ServerResponseType.SUCCESS,
      },
    });
}
