const createWinstonLogger = require('@kanehara/winston-logger')

const level = process.env.LOG_LEVEL || 'debug'
module.exports = createWinstonLogger(level)
