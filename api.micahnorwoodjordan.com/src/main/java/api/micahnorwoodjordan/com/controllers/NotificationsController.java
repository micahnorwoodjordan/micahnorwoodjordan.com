package api.micahnorwoodjordan.com.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.EmailMessageService;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


@RestController
@RequestMapping("/notifications")
public class NotificationsController {
        private LogService logger = new LogService(NotificationsController.class.getName());

        @Autowired
        private EmailMessageService emailMessageService;

        @PostMapping(path = "/email/send")
        public ResponseEntity<APIResponse<Map<String, Object>>> sendEmailMessage(@RequestBody EmailMessage emailMessage) {
                try {
                        EmailMessage email = new EmailMessage(
                                emailMessage.getMessageBody(),
                                emailMessage.getSenderFirstName(),
                                emailMessage.getSenderLastName(),
                                emailMessage.getSenderEmailAddress()
                        );
                        emailMessageService.sendEmailMessage(email);
                        return ResponseEntity.ok(APIResponse.success("Success", null));
                } catch (Exception e) {
                        logger.logMessage(LogLevel.DEBUG, "exception occurred: " + e);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error("an unknown error occurred", null));
                }
        }
}
