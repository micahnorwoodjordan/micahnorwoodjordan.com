package api.micahnorwoodjordan.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailMessageService {
    @Autowired
    private EmailMessageRepository emailMessageRepository;

    public EmailMessage getEmailMessage(long emailMessageId) {
        return emailMessageRepository.findById(emailMessageId);
    }

    public boolean sendEmailMessage(EmailMessage emailMessage) {
        try {
            // TODO: wire up email-sending logic
            // TODO: wrap this sequence within a database transaction
            emailMessageRepository.save(emailMessage);
            return true;
        } catch(Exception e) {
            System.out.println("there was an error sending email");
        }
        return false;
    }
}
 