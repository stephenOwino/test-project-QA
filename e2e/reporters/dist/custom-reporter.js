"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var consoleTransport = new winston.transports.Console();
var logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'logs/test-info.log', level: 'info' }),
        consoleTransport,
    ],
});
var CustomReporter = /** @class */ (function () {
    function CustomReporter() {
    }
    CustomReporter.prototype.onTestBegin = function (test) {
        logger.info({ event: 'Test Started', title: test.title });
    };
    CustomReporter.prototype.onTestEnd = function (test, result) {
        logger.info({ event: 'Test Finished', title: test.title, status: result.status });
    };
    CustomReporter.prototype.onStepBegin = function (test, result, step) {
        if (step.category === 'test.step') {
            logger.info({ event: 'Step Started', title: step.title });
        }
    };
    CustomReporter.prototype.onError = function (error) {
        logger.error({ event: 'Error', message: error.message });
    };
    return CustomReporter;
}());
exports.default = CustomReporter;
