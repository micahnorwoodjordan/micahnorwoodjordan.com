package api.micahnorwoodjordan.com.services;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import api.micahnorwoodjordan.com.services.enums.LogLevel;


public class LogService {
        private Log logger;

        private LogService() { }

        public LogService(String className) {
            this.setLogger(LogFactory.getLog(className));
        }

        private void setLogger(Log logger) {
                this.logger = logger;
        }

        public void logMessage(LogLevel logLevel, Object message) {
                switch (logLevel) {
                        case FATAL:
                                this.logger.fatal(message);
                                break;
                        case ERROR:
                                this.logger.error(message);
                                break;
                        case WARN:
                                this.logger.warn(message);
                                break;
                        case INFO:
                                logger.info(message);
                                break;
                        case DEBUG:
                                this.logger.debug(message);
                                break;
                        case TRACE:
                                this.logger.trace(message);
                                break;
                        default:
                                this.logger.info(message);
                }
        }
}
