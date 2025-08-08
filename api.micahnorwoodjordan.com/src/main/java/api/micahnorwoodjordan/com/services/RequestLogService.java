package api.micahnorwoodjordan.com.services;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;


import api.micahnorwoodjordan.com.APIConstants;
import api.micahnorwoodjordan.com.dataaccess.RequestLogRepository;
import api.micahnorwoodjordan.com.dataaccess.models.RequestLog;
import api.micahnorwoodjordan.com.records.HttpRequestContext;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

@Component
public class RequestLogService {
        @Autowired
        private CacheService cacheService;

        @Autowired
        private RequestLogRepository requestLogRepository;

        private LogService logger = new LogService(RequestService.class.getName());

        private HttpRequestContext getHttpRequestContext(ServletRequest request) {
                HttpServletRequest http = (HttpServletRequest) request;
                String url = http.getRequestURL().toString() + (http.getQueryString() != null ? "?" + http.getQueryString() : "");  // include query parameters
                String path = http.getRequestURI();
                String method = http.getMethod();
                Map<String, String> headers = Collections.list(http.getHeaderNames()).stream()
                        .collect(Collectors.toMap(name -> name, http::getHeader)
                );
                String userAgent = http.getHeader("User-Agent");
                String origin = http.getHeader("Origin");
                String host = http.getRemoteHost();
                return new HttpRequestContext(url, path, method, headers, userAgent, origin, host);
        }

        private boolean requestAlreadyCached(String userAgent, String path) {
                return cacheService.getFromCache(userAgent, path);
        }

        private boolean shouldRecordRequestToDatabase(String userAgent, String path) { // this should be called for any stateless, routine request
                if (path.equals(APIConstants.healthCheckPath)) {
                        if (this.requestAlreadyCached(userAgent, path)) {
                                return false;
                        }
                        return true;
                }
                return true;
        }

        private boolean recordRequestLog(String url, String path, String  method, Map<String, String> headers, String userAgent, String origin, String host) {
                boolean success = false;
                if (this.shouldRecordRequestToDatabase(userAgent, path)) {
                        try {
                                this.requestLogRepository.save(new RequestLog(url, path, method, headers, userAgent, origin));
                                cacheService.putInCache(userAgent, path, host);
                                logger.logMessage(LogLevel.INFO, "RequestService.doFilter: shouldRecordRequestToDatabase true");
                                success = true;
                        } catch (Exception e) {
                                logger.logMessage(LogLevel.ERROR, "RequestService.doFilter: shouldRecordRequestToDatabase true with ERROR");
                        }       
                }
                return success;
        }

        public boolean recordRequestLogPublic(ServletRequest request) {
                HttpRequestContext context = this.getHttpRequestContext(request);
                String url = context.url();
                String path = context.path();
                String method = context.method();
                Map<String, String> headers = context.headers();
                String userAgent = context.userAgent();
                String origin = context.origin();
                String host = context.host();
                return this.recordRequestLog(url, path, method, headers, userAgent, origin, host);
        }
}
