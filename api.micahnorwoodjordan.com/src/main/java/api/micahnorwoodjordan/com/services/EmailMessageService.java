package api.micahnorwoodjordan.com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import api.micahnorwoodjordan.com.dataaccess.EmailMessageRepository;
import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;


@Service
public class EmailMessageService {

    private static final String DEFAULT_RECIPIENT_EMAIL_ADDRESS = "api.micahnorwoodjordan.com@gmail.com";
    private static final String DEFAULT_EMAIL_SUBJECT = "Message from MICAHNORWOODJORDAN.COM frontend:";

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
        String senderEmailAddress = emailMessage.getSenderEmailAddress();
        String rawMessageBody = emailMessage.getMessageBody();
        String messageBody = String.format("%s has reached out to you. Here's what they have to say:%n%n%s%n%n reply to: %s", fullName,  rawMessageBody, senderEmailAddress);

        try {
            send(DEFAULT_RECIPIENT_EMAIL_ADDRESS, DEFAULT_EMAIL_SUBJECT, messageBody);
            emailMessageRepository.save(emailMessage);
        } catch(Exception e) {
            e.printStackTrace();
            // report exception
            // log
            // email (but if the above smtp call failed...)
        }
        return true;
    }
}
 