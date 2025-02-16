class Logger {
  private static _instance: Logger;
  static getInstance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  private log(
    level: string,
    operation_id: string | null,
    message: string,
    params?: object,
  ) {
    console.log(
      `${new Date().toISOString()} : ${operation_id} - [${level.toUpperCase()}] - ${message} ${
        params ? JSON.stringify(params) : ''
      }`,
    );
  }

  public info(operation_id: string | null, message: string): void {
    this.log('info', operation_id, message);
  }

  public debug(operation_id: string, message: string, params: object): void {
    this.log('log', operation_id, message, params);
  }

  public error(
    operation_id: string | null,
    message: string,
    error?: any,
  ): void {
    this.log('error', operation_id, message, error);
  }

  public startLog(message: string) {
    console.log(`${new Date().toISOString()} : [START UP] - ${message}`);
  }
}

export default Logger.getInstance();
