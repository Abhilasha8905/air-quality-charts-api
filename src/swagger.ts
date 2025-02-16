import { AirQuality } from './models/air-quality';

export const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Air Quality API',
  },
  basePath: '/api',
  schemes: 'http',
  paths: {
    '/health': {
      get: {
        tags: ['HEALTH'],
        summary: 'check health of the server',
        responses: {
          '200': {
            description: 'server health',
            schema: {
              $ref: '#/definitions/Status',
            },
          },
        },
      },
    },
    '/air-quality-metadata': {
      get: {
        tags: ['Air Quality'],
        summary: 'Get air quality metadata',
        description: 'Returns all metadata',
        responses: {
          '200': {
            description: 'air quality metadata',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'object',
                  description: 'server status',
                  properties: {
                    operation_id: {
                      type: 'string',
                      description: 'request identifier id',
                    },
                    message: {
                      type: 'string',
                      description: 'SUCCESS / ERROR',
                    },
                  },
                },
                data: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
    '/air-quality-data': {
      get: {
        tags: ['Air Quality'],
        summary: 'Get air quality data',
        description: 'Returns all air quality data',
        parameters: [
          {
            in: 'query',
            name: 'from_date_time',
            description: 'from date time of data',
            required: true,
            schema: { type: 'string', example: '2004-03-10T18:00:00.000' },
          },
          {
            in: 'query',
            name: 'to_date_time',
            description: 'to date time of data',
            required: true,
            schema: { type: 'string', example: '2004-04-10T18:00:00.000' },
          },
          {
            in: 'query',
            name: 'field',
            description: 'category whose measurments required',
            type: 'string',
            required: false,
            enum: [
              'co_concentration',
              'co_sensor_value',
              'hydrocarbons_concentration',
              'benzene_concentration',
              'hydrocarbons_sensor_value',
              'no_concentration',
              'nitro_oxides_sensor_value',
              'nitro_oxides_concentration',
              'nitro_dioxide_sensor_value',
              'ozone_sensor_value',
              'temperature',
              'relative_humidity',
              'absolute_humidity',
            ],
          },
        ],
        responses: {
          '200': {
            description: 'A list of measurements data',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'object',
                  description: 'server status',
                  properties: {
                    operation_id: {
                      type: 'string',
                      description: 'request identifier id',
                    },
                    message: {
                      type: 'string',
                      description: 'SUCCESS / ERROR',
                    },
                  },
                },
                data: {
                  type: 'object',
                  schema: {
                    $ref: '#/definitions/AirQuality',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    Status: {
      type: 'object',
      properties: {
        status: {
          type: 'object',
          description: 'server status',
          properties: {
            operation_id: {
              type: 'string',
              description: 'request identifier id',
            },
            message: {
              type: 'string',
              description: 'SUCCESS / ERROR',
            },
          },
        },
      },
    },
    AirQuality: {
      type: 'object',
      properties: {
        date_time: {
          type: 'string',
          description: 'Date Time of measurement',
        },
        co_concentration: {
          type: 'number',
          description:
            'CO(GT) - concentration of carbon monoxide in the air (µg/m³)',
        },
        co_sensor_value: {
          type: 'number',
          description: 'PT08.S1(CO) - sensor value for carbon monoxide',
        },
        hydrocarbons_concentration: {
          type: 'number',
          description:
            'concentration of non-methane hydrocarbons in the air (µg/m³)',
        },
        benzene_concentration: {
          type: 'number',
          description: 'C6H6(GT) - concentration of benzene in the air (µg/m³)',
        },
        hydrocarbons_sensor_value: {
          type: 'number',
          description:
            'PT08.S2(NMHC) - sensor value for non-methane hydrocarbons',
        },
        no_concentration: {
          type: 'number',
          description:
            'NOx(GT) - concentration of nitrogen oxides in the air (µg/m³)',
        },
        nitro_oxides_sensor_value: {
          type: 'number',
          description: 'PT08.S3(NOx) - sensor value for nitrogen oxides',
        },
        nitro_oxides_concentration: {
          type: 'number',
          description:
            'NO2(GT) - concentration of nitrogen dioxide in the air (µg/m³)',
        },
        nitro_dioxide_sensor_value: {
          type: 'number',
          description: 'PT08.S4(NO2) - sensor value for nitrogen dioxide',
        },
        ozone_sensor_value: {
          type: 'number',
          description: 'PT08.S5(O3) - sensor value for ozone',
        },
        temperature: {
          type: 'number',
          description: 'T - temperature at the time of measurement (celsius)',
        },
        relative_humidity: {
          type: 'number',
          description: 'RH - relative humidity in the air (as a percentage)',
        },
        absolute_humidity: {
          type: 'number',
          description: 'AH - absolute humidity (in grams per cubic meter)',
        },
      },
    },
  },
};
