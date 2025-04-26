package api.micahnorwoodjordan.com.services;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import api.micahnorwoodjordan.com.services.enums.LogLevel;


@Component
public class RequestService implements Filter {
    private LogService logger = new LogService(RequestService.class.getName());

    // TODO: log requests or save them to db
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest http = (HttpServletRequest) request;
        String origin = http.getHeader("Origin");
        logger.logMessage(LogLevel.INFO, "Incoming request from Origin: " + origin + "--" + "host: " + http.getRemoteHost());
        chain.doFilter(request, response);
    }
}
