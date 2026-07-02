import winston from 'winston';

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const customFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const formattedLevel = capitalizeFirstLetter(level);
  const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  return `${timestamp} [${formattedLevel}] : ${message} ${metaString}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true }), customFormat),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
    }),

    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});
