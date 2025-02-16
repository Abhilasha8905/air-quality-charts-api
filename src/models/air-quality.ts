import moment from 'moment';
import {
  combineDateTime,
  convertCommaToDecimal,
} from '../utils/common-utility';
import { AirQualityCsvData } from '../utils/file-utility';

export type AirQualityFilters = {
  from_date_time: string;
  to_date_time: string;
  field: string;
};

export type AirQualityMetadata = {
  db_column: string;
  slug: string;
  info: string;
};

export class AirQuality {
  static metadata: AirQualityMetadata[] = [
    {
      db_column: 'co_concentration',
      slug: 'CO(GT)',
      info: 'concentration of carbon monoxide in the air (µg/m³)',
    },
    {
      db_column: 'co_sensor_value',
      slug: 'PT08.S1(CO)',
      info: 'sensor value for carbon monoxide',
    },
    {
      db_column: 'hydrocarbons_concentration',
      slug: 'NMHC(GT)',
      info: 'concentration of non-methane hydrocarbons in the air (µg/m³)',
    },
    {
      db_column: 'benzene_concentration',
      slug: 'C6H6(GT)',
      info: 'concentration of benzene in the air (µg/m³)',
    },

    {
      db_column: 'hydrocarbons_sensor_value',
      slug: 'PT08.S2(NMHC)',
      info: 'sensor value for non-methane hydrocarbons',
    },

    {
      db_column: 'no_concentration',
      slug: 'NOx(GT)',
      info: 'concentration of nitrogen oxides in the air (µg/m³)',
    },
    {
      db_column: 'nitro_oxides_sensor_value',
      slug: 'PT08.S3(NOx)',
      info: 'sensor value for nitrogen oxides',
    },
    {
      db_column: 'nitro_oxides_concentration',
      slug: 'NO2(GT)',
      info: 'concentration of nitrogen dioxide in the air (µg/m³)',
    },
    {
      db_column: 'nitro_dioxide_sensor_value',
      slug: 'PT08.S4(NO2)',
      info: 'sensor value for nitrogen dioxide',
    },
    {
      db_column: 'ozone_sensor_value',
      slug: 'PT08.S5(O3)',
      info: 'sensor value for ozone',
    },
    {
      db_column: 'temperature',
      slug: 'T',
      info: 'temperature at the time of measurement (celsius)',
    },
    {
      db_column: 'relative_humidity',
      slug: 'RH',
      info: 'relative humidity in the air (as a percentage)',
    },
    {
      db_column: 'absolute_humidity',
      slug: 'AH',
      info: 'absolute humidity (in grams per cubic meter)',
    },
  ];

  date_time: string;
  co_concentration: number;
  co_sensor_value: number;
  hydrocarbons_concentration: number;
  hydrocarbons_sensor_value: number;
  benzene_concentration: number;
  no_concentration: number;
  nitro_oxides_sensor_value: number;
  nitro_oxides_concentration: number;
  nitro_dioxide_sensor_value: number;
  ozone_sensor_value: number;
  temperature: number;
  relative_humidity: number;
  absolute_humidity: number;

  constructor(
    date_time: string,
    co_concentration: number,
    co_sensor_value: number,
    hydrocarbons_concentration: number,
    hydrocarbons_sensor_value: number,
    benzene_concentration: number,
    no_concentration: number,
    nitro_oxides_sensor_value: number,
    nitro_oxides_concentration: number,
    nitro_dioxide_sensor_value: number,
    ozone_sensor_value: number,
    temperature: number,
    relative_humidity: number,
    absolute_humidity: number,
  ) {
    this.date_time = date_time;
    this.co_concentration = co_concentration;
    this.co_sensor_value = co_sensor_value;
    this.hydrocarbons_concentration = hydrocarbons_concentration;
    this.hydrocarbons_sensor_value = hydrocarbons_sensor_value;
    this.benzene_concentration = benzene_concentration;
    this.no_concentration = no_concentration;
    this.nitro_oxides_sensor_value = nitro_oxides_sensor_value;
    this.nitro_oxides_concentration = nitro_oxides_concentration;
    this.nitro_dioxide_sensor_value = nitro_dioxide_sensor_value;
    this.ozone_sensor_value = ozone_sensor_value;
    this.temperature = temperature;
    this.relative_humidity = relative_humidity;
    this.absolute_humidity = absolute_humidity;
  }

  static parseCsvDataToAirQuality(
    operation_id: string,
    csv_data: AirQualityCsvData,
  ): AirQuality {
    const date_time = combineDateTime(csv_data.Date, csv_data.Time);
    const co_concentration = convertCommaToDecimal(csv_data['CO(GT)']);
    const co_sensor_value = convertCommaToDecimal(csv_data['PT08.S1(CO)']);
    const hydrocarbons_concentration = convertCommaToDecimal(
      csv_data['NMHC(GT)'],
    );
    const hydrocarbons_sensor_value = convertCommaToDecimal(
      csv_data['PT08.S2(NMHC)'],
    );
    const benzene_concentration = convertCommaToDecimal(csv_data['C6H6(GT)']);
    const no_concentration = convertCommaToDecimal(csv_data['NOx(GT)']);
    const nitro_oxides_sensor_value = convertCommaToDecimal(
      csv_data['PT08.S3(NOx)'],
    );
    const nitro_oxides_concentration = convertCommaToDecimal(
      csv_data['NO2(GT)'],
    );
    const nitro_dioxide_sensor_value = convertCommaToDecimal(
      csv_data['PT08.S4(NO2)'],
    );
    const ozone_sensor_value = convertCommaToDecimal(csv_data['PT08.S5(O3)']);
    const temperature = convertCommaToDecimal(csv_data.T);
    const relative_humidity = convertCommaToDecimal(csv_data.RH);
    const absolute_humidity = convertCommaToDecimal(csv_data.AH);

    return new AirQuality(
      date_time.toISOString(),
      co_concentration,
      co_sensor_value,
      hydrocarbons_concentration,
      hydrocarbons_sensor_value,
      benzene_concentration,
      no_concentration,
      nitro_oxides_sensor_value,
      nitro_oxides_concentration,
      nitro_dioxide_sensor_value,
      ozone_sensor_value,
      temperature,
      relative_humidity,
      absolute_humidity,
    );
  }

  static parseListToResponse(
    operation_id: string,
    data: AirQuality[],
  ): AirQuality[] {
    return data?.map((air_quality) => ({
      ...air_quality,
      date_time: moment(air_quality.date_time).format('YYYY-MM-DD HH:mm'),
    }));
  }
}
