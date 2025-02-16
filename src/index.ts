import App from './app';
import { PORT } from './config';

// providers
import connectToDatabase from './providers/database';

// middlewares
import AuthMiddleware from './middlewares/authentication';
import LoggerMiddleware from './middlewares/req-logger';
import RouteNotFoundMiddleware from './middlewares/not-found';
import ExceptionHandlerMiddleware from './middlewares/exception-handler';

// controllers
import HealthController from './controllers/health-controller';

// servies
import AirQualityService from './services/air-quality-service';

// fatal handlers
import { handleUncaughtErrors } from './utils/fatal';
import AirQualityController from './controllers/air-quality-controller';
import CacheService from './services/cache-service';
handleUncaughtErrors();

connectToDatabase();

const app = new App({
  controllers: [
    new HealthController(),
    new AirQualityController(new AirQualityService(new CacheService())),
  ],
  middleWares: [AuthMiddleware, LoggerMiddleware],
  exceptionHandlers: [RouteNotFoundMiddleware, ExceptionHandlerMiddleware],
  port: Number(PORT),
});

app.listen();
