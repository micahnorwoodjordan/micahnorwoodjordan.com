package api.micahnorwoodjordan.com.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.EmailMessageService;
import api.micahnorwoodjordan.com.dataaccess.models.Project;
import api.micahnorwoodjordan.com.services.ProjectService;
import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;
import api.micahnorwoodjordan.com.services.TechnicalSkillTagService;

import api.micahnorwoodjordan.com.exceptions.TechnicalSkillTagServiceException;
import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


// TODO: use standardized API responses
// TODO: implement error handling
// TODO: implement logging
@RequestMapping("/")
@RestController
public class BaseController {
    private LogService logger = new LogService(BaseController.class.getName());

    @GetMapping("ping")
	public ResponseEntity ping() {
        logger.logMessage(LogLevel.INFO, "200: PONG");  // to help verify DigitalOcean health checks
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
