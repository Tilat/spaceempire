package ru.spaceempire.server.validation;

/**
 * User: Sergey
 * Date: 25.06.11 14:36
 */
public interface Verdict<K extends Verdict> {
    boolean isPositive();
}
