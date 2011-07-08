package ru.spaceempire.server.web.dto;

import ru.spaceempire.server.exceptions.ErrorCode;

import java.io.Serializable;

/**
 * User: Sergey
 * Date: 12.06.11
 * Time: 9:06
 */
public class ResponseTO<T> implements Serializable {

    public boolean successful = true;
    public String errorCode;
    public String errorDescription;
    public T result;

    public ResponseTO() {
    }

    public ResponseTO(ErrorCode errorCode, String errDesc) {
        this.successful = false;
        this.errorCode = errorCode == null ? "" : errorCode.name();
        this.errorDescription = errDesc;
    }

    public ResponseTO(T result) {
        this.result = result;
    }
}
