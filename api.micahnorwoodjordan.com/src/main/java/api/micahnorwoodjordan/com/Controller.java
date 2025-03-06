package api.micahnorwoodjordan.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @Autowired
    private EmailMessageService emailMessageService;

    @GetMapping("/ping")
	public @ResponseBody String index() {
		return "PONG";
	}

    @PostMapping(path="/notifications/email/send")
    public @ResponseBody String sendEmailMessage(@RequestBody EmailMessage emailMessage) {
        EmailMessage email = new EmailMessage(emailMessage.getMessageBody(), emailMessage.getSender());
        boolean success = emailMessageService.sendEmailMessage(email);

        if (success) {
            return "Email sent";
        }

        return "Error sending email";
    }

    @GetMapping("/notifications/email")
	public @ResponseBody EmailMessage getEmailMessage(@RequestParam(name = "id", required = true) long emailMessageId) {
		return emailMessageService.getEmailMessage(emailMessageId);
	}
}
