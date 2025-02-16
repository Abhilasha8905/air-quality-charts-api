import mongoose from 'mongoose';

const AirQualitySchema = new mongoose.Schema(
  {
    date_time: { type: Date, required: true },
    co_concentration: { type: Number },
    co_sensor_value: { type: Number },
    hydrocarbons_concentration: { type: Number },
    hydrocarbons_sensor_value: { type: Number },
    benzene_concentration: { type: Number },
    no_concentration: { type: Number },
    nitro_oxides_sensor_value: { type: Number },
    nitro_oxides_concentration: { type: Number },
    nitro_dioxide_sensor_value: { type: Number },
    ozone_sensor_value: { type: Number },
    temperature: { type: Number },
    relative_humidity: { type: Number },
    absolute_humidity: { type: Number },
  },
  {
    timestamps: true,
  },
);

const AirQualityDBEntity = mongoose.model('AirQuality', AirQualitySchema);

export default AirQualityDBEntity;
