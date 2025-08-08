package api.micahnorwoodjordan.com.services;

import java.util.Map;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import api.micahnorwoodjordan.com.dataaccess.models.RequestLog;
import api.micahnorwoodjordan.com.dataaccess.RequestLogRepository;
import api.micahnorwoodjordan.com.services.enums.LogLevel;


@Component
public class RequestService implements Filter {
    private LogService logger = new LogService(RequestService.class.getName());

    @Autowired
    private RequestLogRepository requestLogRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest http = (HttpServletRequest) request;
        String url = http.getRequestURL().toString() + (http.getQueryString() != null ? "?" + http.getQueryString() : "");  // include query parameters
        String path = http.getRequestURI();
        String method = http.getMethod();
        Map<String, String> headers = Collections.list(http.getHeaderNames()).stream()
            .collect(Collectors.toMap(
                name -> name, http::getHeader
            )
        );
        String userAgent = http.getHeader("User-Agent");
        String origin = http.getHeader("Origin");

        logger.logMessage(LogLevel.INFO, "Incoming request from Origin: " + origin + "--" + "host: " + http.getRemoteHost());

        try {
            RequestLog loggedRequest = new RequestLog(url, path, method, headers, userAgent, origin);
            this.requestLogRepository.save(loggedRequest);
        } catch (Exception e) {
            logger.logMessage(LogLevel.ERROR, "Error saving request data" + e);
        }
        chain.doFilter(request, response);
    }
}
