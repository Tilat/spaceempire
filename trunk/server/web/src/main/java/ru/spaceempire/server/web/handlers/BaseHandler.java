package ru.spaceempire.server.web.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import ru.spaceempire.server.game.managers.SolarSystemMapManager;

/**
 * User: Sergey
 * Date: 13.06.11 19:44
 */
public abstract class BaseHandler {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    protected SolarSystemMapManager mapManager;
}
