package api.micahnorwoodjordan.com;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.EmailMessageService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Controller {

    @Autowired
    private EmailMessageService emailMessageService;

    @GetMapping("/ping")
	public ResponseEntity index() {
		return new ResponseEntity<>(HttpStatus.OK);
	}

    @PostMapping(path="/notifications/email/send")
    public ResponseEntity sendEmailMessage(@RequestBody EmailMessage emailMessage) {
        EmailMessage email = new EmailMessage(
            emailMessage.getMessageBody(),
            emailMessage.getSenderFirstName(),
            emailMessage.getSenderLastName(),
            emailMessage.getSenderEmailAddress()
        );
        boolean success = emailMessageService.sendEmailMessage(email);

        if (success) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/notifications/email")
	public ResponseEntity<EmailMessage> getEmailMessage(@RequestParam(name = "id", required = true) long emailMessageId) {
		return new ResponseEntity<>(emailMessageService.getEmailMessage(emailMessageId), HttpStatus.OK);
	}
}
