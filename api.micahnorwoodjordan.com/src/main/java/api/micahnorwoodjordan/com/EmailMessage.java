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
    private String senderFirstName;
    private String senderLastName;
    private String senderEmailAddress;

    protected EmailMessage() {}

    public EmailMessage(String messageBody, String senderFirstName, String senderLastName, String senderEmailAddress) {
        this.messageBody = messageBody;
        this.senderFirstName = senderFirstName;
        this.senderLastName = senderLastName;
        this.senderEmailAddress = senderEmailAddress;
    }

    @Override
    public String toString() {
      return String.format("EmailMessage[id=%d, senderEmailAddress='%s']", id, senderEmailAddress);
    }

    public Long getId() {
        return id;
      }
    
      public String getMessageBody() {
        return messageBody;
      }

      public String getSenderFirstName() {
        return senderFirstName;
      }

      public String getSenderLastName() {
        return senderLastName;
      }

      public String getSenderEmailAddress() {
        return senderEmailAddress;
      }

}
