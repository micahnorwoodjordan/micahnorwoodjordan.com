package api.micahnorwoodjordan.com.records;

import java.util.Map;

public record HttpRequestContext(
    String url,
    String path,
    String method,
    Map<String, String> headers,
    String userAgent,
    String origin,
    String host
) {}
