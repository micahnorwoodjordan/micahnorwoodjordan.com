package api.micahnorwoodjordan.com;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import api.micahnorwoodjordan.com.services.EnvironmentContextService;


@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> EnvironmentContextService.evaluateApplicationContextAndLogInformation(ctx);
	}

	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		ApplicationContext ctx = event.getApplicationContext();
		EnvironmentContextService.evaluateApplicationContextAndLogInformation(ctx);
	}
}
