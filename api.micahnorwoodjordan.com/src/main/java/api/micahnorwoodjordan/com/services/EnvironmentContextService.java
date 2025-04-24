package api.micahnorwoodjordan.com.services;

import java.util.Arrays;

import org.springframework.context.ApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertySource;

import api.micahnorwoodjordan.com.services.enums.LogLevel;


public class EnvironmentContextService {
        private EnvironmentContextService() { }

        private static LogService logger = new LogService(EnvironmentContextService.class.getName());

        public static void evaluateApplicationContextAndLogInformation(ApplicationContext ctx) {
		Environment env = ctx.getEnvironment();
		String[] activeProfiles = env.getActiveProfiles();

		if (activeProfiles.length == 1 && activeProfiles[0].equals("dev")) {
                        logger.logMessage(LogLevel.DEBUG, "Beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				logger.logMessage(LogLevel.DEBUG, beanName);
			}

                        if (env instanceof ConfigurableEnvironment configurableEnv) {
                                for (PropertySource<?> propertySource : configurableEnv.getPropertySources()) {
                                        if (propertySource instanceof EnumerablePropertySource<?> enumerable) {
                                                for (String name : enumerable.getPropertyNames()) {
                                                        String value = env.getProperty(name);
                                                        logger.logMessage(LogLevel.DEBUG, String.format("%s: %s", name.toUpperCase(), value));
                                                }
                                        }
                                }
                        }

		}

                logger.logMessage(LogLevel.DEBUG, "Active Spring Profile: " + env.getActiveProfiles()[0].toUpperCase());
	}
}
