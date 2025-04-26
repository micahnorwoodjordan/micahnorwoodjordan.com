package api.micahnorwoodjordan.com.configuration;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

import api.micahnorwoodjordan.com.APIConstants;


// NOTE: this tag allows Spring Boot to pick up this class and register it as part of the application context
@Configuration
public class CORSConfiguration implements WebMvcConfigurer {
        LogService logger = new LogService(CORSConfiguration.class.getName());

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(APIConstants.corsRoutesMatch)
                        .allowedOrigins(APIConstants.allowedOrigins)
                        .allowedMethods(APIConstants.GET, APIConstants.POST, APIConstants.OPTIONS)
                        .allowedHeaders("*");
                logger.logMessage(LogLevel.INFO, "CORS configuration initialized with allowed origins: " + String.join(", ", APIConstants.allowedOrigins));
        }
}
