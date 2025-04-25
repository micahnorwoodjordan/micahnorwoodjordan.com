package api.micahnorwoodjordan.com.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.EmailMessageService;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


// TODO: use standardized API responses
// TODO: implement error handling
// TODO: implement logging
@RestController
@RequestMapping("/notifications")
public class NotificationsController {
        private LogService logger = new LogService(NotificationsController.class.getName());

        @Autowired
        private EmailMessageService emailMessageService;

        @PostMapping(path = "/email/send")
        public ResponseEntity<String> sendEmailMessage(@RequestBody EmailMessage emailMessage) {
                boolean isSuccess = false;
                try {
                        EmailMessage email = new EmailMessage(
                                        emailMessage.getMessageBody(),
                                        emailMessage.getSenderFirstName(),
                                        emailMessage.getSenderLastName(),
                                        emailMessage.getSenderEmailAddress());
                        isSuccess = emailMessageService.sendEmailMessage(email);
                } catch (Exception e) {
                        logger.logMessage(LogLevel.DEBUG, "exception occurred: " + e);
                }

                if (isSuccess) {
                        return new ResponseEntity<>(HttpStatus.OK);
                }

                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
