package api.micahnorwoodjordan.com.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

@Component
public class RequestService implements Filter {
    private LogService logger = new LogService(RequestService.class.getName());

    @Autowired
    private RequestLogService requestLogService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        this.requestLogService.recordRequestLogPublic(request);
        chain.doFilter(request, response);
    }
}
