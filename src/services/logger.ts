import winston from 'winston'
import morgan from 'morgan'

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
}

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
)

const transports = [new winston.transports.Console()]

const Logger = winston.createLogger({
	level: 'debug',
	levels,
	format,
	transports,
})

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms')

export { Logger, morganMiddleware }
