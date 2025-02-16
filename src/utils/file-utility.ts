import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import logger from './logger';

export interface AirQualityCsvData {
  Date: string;
  Time: string;
  'CO(GT)': string;
  'PT08.S1(CO)': string;
  'NMHC(GT)': string;
  'C6H6(GT)': string;
  'PT08.S2(NMHC)': string;
  'NOx(GT)': string;
  'PT08.S3(NOx)': string;
  'NO2(GT)': string;
  'PT08.S4(NO2)': string;
  'PT08.S5(O3)': string;
  T: string;
  RH: string;
  AH: string;
}

export const readAirQualityCsvData = async (
  operation_id: string,
): Promise<AirQualityCsvData[]> => {
  const method = 'FileUtility/readAirQualityCsvData';
  logger.info(operation_id, `${method} - start`);

  try {
    const headers = [
      'Date',
      'Time',
      'CO(GT)',
      'PT08.S1(CO)',
      'NMHC(GT)',
      'C6H6(GT)',
      'PT08.S2(NMHC)',
      'NOx(GT)',
      'PT08.S3(NOx)',
      'NO2(GT)',
      'PT08.S4(NO2)',
      'PT08.S5(O3)',
      'T',
      'RH',
      'AH',
      '',
      '',
    ];

    const csvFilePath = path.resolve(__dirname, '../../AirQualityUCI.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
      parse(
        fileContent,
        {
          delimiter: ';',
          columns: headers,
        },
        (error, result: any[]) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        },
      );
    });
  } catch (error) {
    logger.error(operation_id, `${method} - error`, error);
    throw error;
  }
};
