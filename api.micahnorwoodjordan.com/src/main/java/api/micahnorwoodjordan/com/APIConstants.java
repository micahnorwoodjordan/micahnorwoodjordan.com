package api.micahnorwoodjordan.com;

public class APIConstants {
        private APIConstants () {}

        public static final String apiV2HeaderName = "useapiv2";  // header name comes across the wire all lowercase
        public static final String corsRoutesMatch = "/**";

        public static final String DELETE = "DELETE";
        public static final String PUT = "PUT";
        public static final String PATCH = "PATCH";
        public static final String OPTIONS = "OPTIONS";
        public static final String GET = "GET";
        public static final String POST = "POST";

        public static final String[] allowedOrigins = {
                "http://192.168.0.136",  // home LAN network
                "https://micahnorwoodjordan.com"
        };
}
