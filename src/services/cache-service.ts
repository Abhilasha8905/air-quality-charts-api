import ICacheBase from '../interface/ICache.interface';
import logger from '../utils/logger';

export default class CacheService implements ICacheBase {
  private cache_map = new Map();

  set = (operation_id: string, key: string, value: string): void => {
    const method = 'CacheService/set';
    logger.info(operation_id, `${method} - start`);

    this.cache_map.set(key, value);
    logger.info(operation_id, `${method} - end`);
  };

  get = (operation_id: string, key: string): string => {
    const method = 'CacheService/get';
    logger.info(operation_id, `${method} - start`);

    const value = this.cache_map.get(key);

    logger.info(operation_id, `${method} - end`);
    return value;
  };
}
