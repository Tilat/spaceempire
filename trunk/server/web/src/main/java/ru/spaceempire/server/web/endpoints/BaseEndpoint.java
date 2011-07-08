package ru.spaceempire.server.web.endpoints;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.web.dto.ResponseTO;
import ru.spaceempire.server.web.handlers.AuthHandler;
import ru.spaceempire.server.web.handlers.SolarSystemMapHandler;

/**
 * User: Sergey
 * Date: 12.06.11 9:12
 */

@Component
public abstract class BaseEndpoint {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected AuthHandler authHandler;
    @Autowired
    protected SolarSystemMapHandler solarSystemMapHandler;

    protected <T> ResponseTO<T> processError(Throwable thr) {
        logger.error("Error:", thr);
        if (thr instanceof GameException) {
            GameException ge = (GameException) thr;
            return new ResponseTO<T>(ge.getCode(), thr.getMessage());
        } else {
            return new ResponseTO<T>(null, thr.getMessage());
        }

    }
}
