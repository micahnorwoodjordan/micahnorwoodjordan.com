package api.micahnorwoodjordan.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailMessageService {

    private static final String MICAH_EMAIL_ADDRESS = "micahnorwoodjordan@gmail.com";
    private static final String DEFAULT_EMAIL_SUBJECT = "api.micahnorwoodjordan.com says:";

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailMessageRepository emailMessageRepository;

    private boolean send(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public EmailMessage getEmailMessage(long emailMessageId) {
        return emailMessageRepository.findById(emailMessageId);
    }

    public boolean sendEmailMessage(EmailMessage emailMessage) {
        String fullName = emailMessage.getSenderFirstName() + " " + emailMessage.getSenderLastName();
        String senderEmailAddress = String.format("(%s)", emailMessage.getSenderEmailAddress());
        String rawMessageBody = emailMessage.getMessageBody();
        String messageBody = String.format("%s %s has reached out to you. Here's what they have to say:%n%s", fullName, senderEmailAddress,  rawMessageBody);
        System.out.println(messageBody);

        try {
            send(MICAH_EMAIL_ADDRESS, DEFAULT_EMAIL_SUBJECT, messageBody);
            emailMessageRepository.save(emailMessage);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return true;
    }
}
 