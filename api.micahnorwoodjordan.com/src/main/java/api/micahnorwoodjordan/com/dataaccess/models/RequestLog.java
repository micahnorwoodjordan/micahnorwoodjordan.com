package api.micahnorwoodjordan.com.dataaccess.models;

import java.util.Map;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class RequestLog {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String url;
        private String method;
        private String userAgent;

        @Column(columnDefinition = "json")
        private String headers;

        @Column(name = "created_at", nullable = false, updatable = false)
        private Instant createdAt;

        @PrePersist
        protected void onCreate() {
                this.createdAt = Instant.now();
        }

        protected RequestLog() {
        }

        public RequestLog(String url, String method, String headers, String userAgent) {
                this.url = url;
                this.method = method;
                this.headers = headers;
                this.userAgent = userAgent;
        }

        @Override
        public String toString() {
                return String.format("RequestLog[id=%d, url='%s']", id, url);
        }

        public Long getId() {
                return id;
        }

        public String getUrl() {
                return url;
        }

        public String getMethod() {
                return method;
        }

        public String getHeaders() {
                return headers;
        }

        public String getUserAgent() {
                return userAgent;
        }

        public Instant getCreatedAt() {
                return createdAt;
        }
}
