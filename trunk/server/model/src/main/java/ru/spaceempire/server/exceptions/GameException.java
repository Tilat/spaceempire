package ru.spaceempire.server.exceptions;

/**
 * User: Sergey
 * Date: 13.06.11 19:41
 */
public class GameException extends Throwable {

    private ErrorCode code;

    public GameException() {
    }

    public GameException(String message, Throwable cause) {
        super(message, cause);
    }

    public ErrorCode getCode() {
        return code;
    }

    public void setCode(ErrorCode code) {
        this.code = code;
    }
}
