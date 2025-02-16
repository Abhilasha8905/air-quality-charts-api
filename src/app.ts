import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { swaggerDocument } from './swagger';
import logger from './utils/logger';

declare global {
  namespace Express {
    interface Request {
      operation_id: string;
      session: { user_id: string };
    }
  }
}

class App {
  private app: Application;
  private port: number;

  constructor(appInit: {
    port: number;
    middleWares: any;
    controllers: any;
    exceptionHandlers: any;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.app.use(cors());
    this.middlewares(appInit.middleWares);
    this.swagger();
    this.routes(appInit.controllers);
    this.exceptionHandler(appInit.exceptionHandlers);
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    this.app.use(express.json());
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private swagger() {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }
  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  }

  private exceptionHandler(exceptionHandlers: {
    forEach: (arg0: (errorHandler: any) => void) => void;
  }) {
    exceptionHandlers.forEach((errorHandler) => {
      this.app.use(errorHandler);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.startLog(`App listening on PORT :${this.port}`);
    });
  }
}

export default App;
