package api.micahnorwoodjordan.com;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.dataaccess.models.Project;
import api.micahnorwoodjordan.com.services.EmailMessageService;
import api.micahnorwoodjordan.com.services.ProjectService;

@RestController
@CrossOrigin(origins = {"http://192.168.0.136:4200", "http://localhost:4200", "https://micahnorwoodjordan.com"})
public class Controller {

    @Autowired
    private EmailMessageService emailMessageService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/ping")
	public ResponseEntity index() {
		return new ResponseEntity<>(HttpStatus.OK);
	}

    @PostMapping(path="/notifications/email/send")
    public ResponseEntity<String> sendEmailMessage(@RequestBody EmailMessage emailMessage) {
        boolean isSuccess = false;

        try {
            EmailMessage email = new EmailMessage(
                emailMessage.getMessageBody(),
                emailMessage.getSenderFirstName(),
                emailMessage.getSenderLastName(),
                emailMessage.getSenderEmailAddress()
            );
            isSuccess = emailMessageService.sendEmailMessage(email);
        } catch(Exception e) {
            System.out.println("exception occurred: " + e);  // Log this
        }

        if (isSuccess) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/notifications/email")
	public ResponseEntity<EmailMessage> getEmailMessage(@RequestParam(name = "id", required = true) long emailMessageId) {
		return new ResponseEntity<>(emailMessageService.getEmailMessage(emailMessageId), HttpStatus.OK);
	}

    @GetMapping("/projects")
	public ResponseEntity<List<Project>> getProjects() {
		return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
	}
}
