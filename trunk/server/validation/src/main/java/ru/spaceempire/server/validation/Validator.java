package ru.spaceempire.server.validation;

/**
 * User: Sergey
 * Date: 25.06.11 14:32
 */
public interface Validator<T extends IncomingData, K extends Verdict> {
    Verdict<K> validate(T data);
}
