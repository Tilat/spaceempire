package ru.spaceempire.server.validation;

/**
 * User: Sergey
 * Date: 25.06.11 15:10
 */
public class BaseVerdict<BaseVerdict> implements Verdict {
    private boolean isValid = true;

    @Override
    public boolean isPositive() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public BaseVerdict(boolean valid) {
        isValid = valid;
    }

    public BaseVerdict() {
    }
}
