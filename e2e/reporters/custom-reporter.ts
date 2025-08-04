import { Reporter, TestCase, TestResult, TestStep, TestError } from '@playwright/test/reporter';
import * as winston from 'winston';

const consoleTransport = new winston.transports.Console();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/test-info.log', level: 'info' }),
    consoleTransport,
  ],
});

export default class CustomReporter implements Reporter {

  onTestBegin(test: TestCase): void {
    logger.info({ event: 'Test Started', title: test.title });
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info({ event: 'Test Finished', title: test.title, status: result.status });
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === 'test.step') {
      logger.info({ event: 'Step Started', title: step.title });
    }
  }

  onError(error: TestError): void {
    logger.error({ event: 'Error', message: error.message });
  }
}
