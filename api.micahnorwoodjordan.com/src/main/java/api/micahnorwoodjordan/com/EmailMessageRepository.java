package api.micahnorwoodjordan.com;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EmailMessageRepository extends CrudRepository<EmailMessage, Long> {

    List<EmailMessage> findBySender(String sender);

    EmailMessage findById(long id);
}
