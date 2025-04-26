package api.micahnorwoodjordan.com.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


@RequestMapping("/")
@RestController
public class BaseController {
    private LogService logger = new LogService(BaseController.class.getName());

    @GetMapping("ping")
	public ResponseEntity<APIResponse<Map<String, Object>>> ping() {
        try {
            logger.logMessage(LogLevel.INFO, "200: PONG");  // to help verify DigitalOcean health checks
            return ResponseEntity.ok(APIResponse.success("PONG", null));
        } catch (Exception e) {
            logger.logMessage(LogLevel.ERROR, "ERROR AT ping: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error("an unknown error occurred", null));
        }
	}
}
