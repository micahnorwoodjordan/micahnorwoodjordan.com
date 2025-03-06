package api.micahnorwoodjordan.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailMessageService {

    private static final String MICAH_EMAIL_ADDRESS = "micahnorwoodjordan@gmail.com";

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
            return true;
        } catch(Exception e) {
            System.out.println(e);
        }
        return false;
    }

    public EmailMessage getEmailMessage(long emailMessageId) {
        return emailMessageRepository.findById(emailMessageId);
    }

    public boolean sendEmailMessage(EmailMessage emailMessage) {
        try {
            send(MICAH_EMAIL_ADDRESS, "Test from Java App", "Disregard; this is a test.");
            emailMessageRepository.save(emailMessage);
            return true;
        } catch(Exception e) {
            System.out.println("there was an error sending email");
        }
        return false;
    }
}
 