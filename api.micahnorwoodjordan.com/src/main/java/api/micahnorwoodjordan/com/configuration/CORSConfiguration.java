package api.micahnorwoodjordan.com.configuration;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


// NOTE: this tag allows Spring Boot to pick up this class and register it as part of the application context
@Configuration
public class CORSConfiguration implements WebMvcConfigurer {
        LogService logger = new LogService(CORSConfiguration.class.getName());

        private String DELETE = "DELETE";
        private String PUT = "PUT";
        private String PATCH = "PATCH";
        private String OPTIONS = "OPTIONS";
        private String GET = "GET";
        private String POST = "POST";

        private String[] allowedOrigins = {
                "http://192.168.0.136",  // home LAN network
                "https://micahnorwoodjordan.com"
        };

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Match all endpoints
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods(GET, POST, OPTIONS)
                        .allowedHeaders("*")
                        .allowCredentials(true);
                logger.logMessage(LogLevel.INFO, "CORS configuration initialized with allowed origins: " + String.join(", ", allowedOrigins));
        }
}
