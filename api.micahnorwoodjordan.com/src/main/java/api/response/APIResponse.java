package api.response;

import java.io.Serializable;


public class APIResponse<T> implements Serializable {

    private boolean success;
    private String message;
    private T data;

    public APIResponse() {
    }

    public APIResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> APIResponse<T> success(String message, T data) {
        return new APIResponse<>(true, message, data);
    }

    public static <T> APIResponse<T> error(String message, T data) {
        return new APIResponse<>(false, message, data);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
