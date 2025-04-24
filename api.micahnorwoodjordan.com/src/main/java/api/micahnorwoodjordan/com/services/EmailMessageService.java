package api.micahnorwoodjordan.com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import org.springframework.mail.MailAuthenticationException;

import api.micahnorwoodjordan.com.dataaccess.EmailMessageRepository;
import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


@Service
public class EmailMessageService {

    private static final String DEFAULT_RECIPIENT_EMAIL_ADDRESS = "api.micahnorwoodjordan.com@gmail.com";
    private static final String DEFAULT_EMAIL_SUBJECT = "Message from MICAHNORWOODJORDAN.COM frontend:";

    private LogService logger = new LogService(EmailMessageService.class.getName());

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailMessageRepository emailMessageRepository;

    private boolean send(String to, String subject, String body) {
        boolean success = true;
        SimpleMailMessage message = new SimpleMailMessage();
        String logErrorMessagePrefix = "ERROR AT send: ";

        try {
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch(MailAuthenticationException authException) {
            success = false;
            logger.logMessage(LogLevel.DEBUG, logErrorMessagePrefix + authException.getMessage());
        } catch(Exception exception) {
            success = false;
            logger.logMessage(LogLevel.DEBUG, logErrorMessagePrefix + exception.getMessage());
        }
        return success;
    }

    public EmailMessage getEmailMessage(long emailMessageId) {
        return emailMessageRepository.findById(emailMessageId);
    }

    public boolean sendEmailMessage(EmailMessage emailMessage) {
        String fullName = emailMessage.getSenderFirstName() + " " + emailMessage.getSenderLastName();
        String senderEmailAddress = emailMessage.getSenderEmailAddress();
        String rawMessageBody = emailMessage.getMessageBody();
        String messageBody = String.format("%s has reached out to you. Here's what they have to say:%n%n%s%n%n reply to: %s", fullName,  rawMessageBody, senderEmailAddress);
        boolean emailSent = send(DEFAULT_RECIPIENT_EMAIL_ADDRESS, DEFAULT_EMAIL_SUBJECT, messageBody);
        boolean isSuccess = true;

        if (emailSent) {
            emailMessageRepository.save(emailMessage);
        } else {
            isSuccess = false;
        }
        return isSuccess;
    }
}
 