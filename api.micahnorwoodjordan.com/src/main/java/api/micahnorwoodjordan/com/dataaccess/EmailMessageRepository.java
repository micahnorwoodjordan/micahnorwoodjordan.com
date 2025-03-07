package api.micahnorwoodjordan.com.dataaccess;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;

@Repository
public interface EmailMessageRepository extends CrudRepository<EmailMessage, Long> {

    // https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html
    // here's some good news -- a snippet from the docs:

    // "By default, methods inherited from CrudRepository inherit the transactional configuration from SimpleJpaRepository.
    // For read operations, the transaction configuration readOnly flag is set to true.""

    List<EmailMessage> findBySenderEmailAddress(String senderEmailAddress);

    EmailMessage findById(long id);
}
