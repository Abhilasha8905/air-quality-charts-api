import { Router, NextFunction, Request, Response } from 'express';
import IControllerBase from '../interface/IControllerBase.interface';
import AirQualityService from '../services/air-quality-service';
import logger from '../utils/logger';
import { ServerResponseType } from '../utils/constants';
import { readAirQualityCsvData } from '../utils/file-utility';
import { AirQuality, AirQualityFilters } from '../models/air-quality';
import { validateAirQualityRequestFilters } from '../utils/common-utility';

export default class AirQualityController implements IControllerBase {
  public router = Router();
  private _air_quality_service: AirQualityService;

  constructor(air_quality_service: AirQualityService) {
    this.initRoutes();
    this._air_quality_service = air_quality_service;
  }

  public initRoutes(): void {
    this.router.post('/air-quality-data', this.insertAirQualityCsvData);
    this.router.get('/air-quality-data', this.getAirQualityData);
    this.router.get('/air-quality-metadata', this.getAirQualityMetaData);
  }

  private getAirQualityMetaData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const method = 'AirQualityController/getAirQualityMetaData';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${method} - start`);

    const response = {
      metadata: AirQuality.metadata,
      min_date: '2004-03-10',
      max_date: '2005-04-04',
    };

    logger.info(operation_id, `${method} - end`);
    return res.status(200).send({
      status: { operation_id, message: ServerResponseType.SUCCESS },
      data: response,
    });
  };

  private getAirQualityData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const method = 'AirQualityController/getAirQualityData';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${method} - start`);

    try {
      const filters = req.query as AirQualityFilters;

      logger.info(
        operation_id,
        `${method} - calling CommonUtility/validateAirQualityRequestFilters`,
      );
      const validation_error = validateAirQualityRequestFilters(filters);
      if (validation_error) {
        logger.error(
          operation_id,
          `${method} - validation error`,
          validation_error,
        );
        throw new Error(validation_error);
      }

      logger.info(
        operation_id,
        `${method} - calling AirQualityService/getAirQualityData`,
      );
      const air_quality_data =
        await this._air_quality_service.getAirQualityData(
          operation_id,
          filters,
        );

      logger.info(operation_id, `${method} - end`);

      return res.status(200).send({
        status: { operation_id, message: ServerResponseType.SUCCESS },
        data: {
          list: AirQuality.parseListToResponse(operation_id, air_quality_data),
          filters: req.query,
        },
      });
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      next(error);
    }
  };

  private insertAirQualityCsvData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const path = 'AirQualityController/insertAirQualityData';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${path} - start`);

    try {
      const csv_data = await readAirQualityCsvData(req.operation_id);

      const data = await this._air_quality_service.insertAirQualityCsvData(
        operation_id,
        csv_data.slice(1),
      );
      logger.info(operation_id, `${path} - end`);
      return res.status(200).send({
        status: { operation_id, message: ServerResponseType.SUCCESS },
        data,
      });
    } catch (error) {
      logger.error(operation_id, `${path} - error`, error);
      next(error);
    }
  };
}
