package api.micahnorwoodjordan.com.services;

import java.util.Arrays;

import org.springframework.context.ApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertySource;

public class EnvironmentContextService {
        private EnvironmentContextService() { }

        public static void evaluateApplicationContextAndPrintInformation(ApplicationContext ctx) {
		Environment env = ctx.getEnvironment();
		String[] activeProfiles = env.getActiveProfiles();

		if (activeProfiles.length == 1 && activeProfiles[0].equals("dev")) {
			System.out.println("Beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}

                        if (env instanceof ConfigurableEnvironment configurableEnv) {
                                for (PropertySource<?> propertySource : configurableEnv.getPropertySources()) {
                                        if (propertySource instanceof EnumerablePropertySource<?> enumerable) {
                                                for (String name : enumerable.getPropertyNames()) {
                                                        String value = env.getProperty(name);
                                                        System.out.printf("%s: %s%n", name.toUpperCase(), value);
                                                }
                                        }
                                }
                        }

		}

                System.out.println("Active Spring Profile: " + env.getActiveProfiles()[0].toUpperCase());
	}
}
