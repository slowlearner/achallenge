// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const level = process.env.LOG_LEVEL || 'INFO';
export enum LoggerEvent {
  MONGO_QUERY = 'MONGO_QUERY',
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const logger = require('pino')({
  level: level.toLowerCase(),
});
