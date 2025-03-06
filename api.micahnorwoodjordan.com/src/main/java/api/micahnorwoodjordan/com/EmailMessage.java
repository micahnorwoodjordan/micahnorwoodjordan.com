package api.micahnorwoodjordan.com;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmailMessage {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    private String messageBody;
    private String sender;  // not to be a string, but fk to User model

    protected EmailMessage() {}

    public EmailMessage(String messageBody, String sender) {
        this.messageBody = messageBody;
        this.sender = sender;
    }

    @Override
    public String toString() {
      return String.format("EmailMessage[id=%d, sender='%s']", id, sender);
    }

    public Long getId() {
        return id;
      }
    
      public String getMessageBody() {
        return messageBody;
      }
    
      public String getSender() {
        return sender;
      }

}
