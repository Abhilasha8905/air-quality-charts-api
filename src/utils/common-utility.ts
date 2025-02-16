import { AirQuality, AirQualityFilters } from '../models/air-quality';

export const convertCommaToDecimal = (value: string): number => {
  const _value = value ? value?.replace(',', '.') : 0;
  return Number(_value);
};

export const combineDateTime = (dateStr: string, timeStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(
    year,
    month - 1,
    day,
    ...timeStr.split('.').map(Number),
  );
  return date;
};

export const validateAirQualityRequestFilters = (
  filters: AirQualityFilters,
): string | null => {
  const { from_date_time, to_date_time, field } = filters;

  if (!from_date_time || !to_date_time) {
    return 'Missing required query parameters: from_date_time, to_date_time';
  }

  const fromDate = new Date(from_date_time);
  const toDate = new Date(to_date_time);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return 'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)';
  }

  const is_valid_field =
    !field || AirQuality.metadata.some(({ db_column }) => db_column === field);
  if (!is_valid_field) {
    return 'field must be valid';
  }

  return null;
};

export const getAirQualityRequestCacheKey = (
  filters: AirQualityFilters,
): string => {
  const { from_date_time, to_date_time, field } = filters;
  return `${from_date_time}_${to_date_time}${field ? `_${field}` : ''}`;
};
