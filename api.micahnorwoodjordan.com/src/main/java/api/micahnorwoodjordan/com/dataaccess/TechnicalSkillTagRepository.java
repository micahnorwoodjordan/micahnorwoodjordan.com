package api.micahnorwoodjordan.com.dataaccess;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;

@Repository
public interface TechnicalSkillTagRepository extends CrudRepository<TechnicalSkillTag, Long> {

    // https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html
    // here's some good news -- a snippet from the docs:

    // "By default, methods inherited from CrudRepository inherit the transactional configuration from SimpleJpaRepository.
    // For read operations, the transaction configuration readOnly flag is set to true.""

    List<TechnicalSkillTag> findBytitle(String title);

    List<TechnicalSkillTag> findBytype(String type);
    
    List<TechnicalSkillTag> findAll();

    TechnicalSkillTag findById(long id);
}
