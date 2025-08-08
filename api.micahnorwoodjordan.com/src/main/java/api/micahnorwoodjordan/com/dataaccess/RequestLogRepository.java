package api.micahnorwoodjordan.com.dataaccess;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import api.micahnorwoodjordan.com.dataaccess.models.RequestLog;

@Repository
public interface RequestLogRepository extends CrudRepository<RequestLog, Long> {
        List<RequestLog> findByPath(String path);

        List<RequestLog> findByMethod(String method);

        List<RequestLog> findByUserAgent(String userAgent);

        List<RequestLog> findByOrigin(String origin);
    
        List<RequestLog> findAll();

        RequestLog findById(long id);
}
