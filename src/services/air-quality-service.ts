import { AirQuality, AirQualityFilters } from '../models/air-quality';
import AirQualityDBEntity from '../models/db/air-quality-entity';
import { getAirQualityRequestCacheKey } from '../utils/common-utility';
import { AirQualityCsvData } from '../utils/file-utility';
import logger from '../utils/logger';
import CacheService from './cache-service';

export default class AirQualityService {
  private cache_service: CacheService;

  constructor(cache_service: CacheService) {
    this.cache_service = cache_service;
  }

  insertAirQualityCsvData = async (
    operation_id: string,
    csv_json_data: AirQualityCsvData[],
  ): Promise<{ response: string }> => {
    const method = 'AirQualityService/insertAirQualityCsvData';
    logger.info(operation_id, `${method} - start`);

    try {
      logger.info(
        operation_id,
        `${method} - calling AirQuality/parseCsvDataToAirQuality`,
      );

      const data = csv_json_data
        .filter((json_data) => !!json_data.Date)
        .map((json_data) =>
          AirQuality.parseCsvDataToAirQuality(operation_id, json_data),
        );

      const existing_data = await AirQualityDBEntity.find({});
      if (existing_data?.length) {
        logger.info(
          operation_id,
          `${method} - data already inserted, do not insert now`,
        );
        return { response: 'Already inserted records before' };
      }

      logger.info(
        operation_id,
        `${method} - calling AirQualityDBEntity/insertMany`,
      );
      await AirQualityDBEntity.insertMany(data);
      logger.info(operation_id, `${method} - end`);
      return { response: 'Records inserted' };
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };

  getAirQualityData = async (
    operation_id: string,
    filters: AirQualityFilters,
  ): Promise<AirQuality[]> => {
    const method = 'AirQualityService/getAirQualityData';
    logger.info(operation_id, `${method} - start`);

    try {
      const { from_date_time, to_date_time, field } = filters;

      // check if request already cached
      const cache_key = getAirQualityRequestCacheKey(filters);
      const cached_response = this.cache_service.get(operation_id, cache_key);
      if (cached_response) {
        logger.info(operation_id, `${method} - returning cached response, end`);
        return JSON.parse(cached_response);
      }

      let query = {};
      if (from_date_time || to_date_time) {
        query = {
          date_time: {
            ...(from_date_time ? { $gte: from_date_time } : {}),
            ...(to_date_time ? { $lte: to_date_time } : {}),
          },
        };
      }

      const project_fields = field ? { date_time: 1, [field]: 1 } : {};

      logger.debug(operation_id, `${method} - query & project to get data`, {
        query,
        project_fields,
      });

      const air_quality_data = (
        await AirQualityDBEntity.find(query, project_fields)
      ).map((data) => data.toObject());

      // set response to cache
      this.cache_service.set(
        operation_id,
        cache_key,
        JSON.stringify(air_quality_data),
      );

      logger.info(operation_id, `${method} - end`);
      return air_quality_data as any as AirQuality[];
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };
}
