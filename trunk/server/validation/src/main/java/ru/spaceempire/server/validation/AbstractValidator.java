package ru.spaceempire.server.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * User: Sergey
 * Date: 25.06.11 14:51
 */
@Component
public abstract class AbstractValidator<T extends IncomingData, K extends Verdict> implements Validator<T, K> {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    protected abstract K doValidate(T t);

    @Override
    @SuppressWarnings("unchecked")
    public K validate(T data) {
        logger.debug("Validate {}", data.getClass().getSimpleName());
        return doValidate(data);
    }

}
