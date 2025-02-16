import logger from './logger';

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
export const handleUncaughtErrors = (): void => {
  process.on('unhandledRejection', (err: { message: string }) => {
    logger.error(null, `Unhandled Rejection - ${err.message}`);
  });

  process.on('uncaughtException', (err: { message: string }) => {
    logger.error(null, `Unhandled Exception - ${err.message}`);
  });
};
