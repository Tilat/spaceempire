package ru.spaceempire.server.web.handlers.impl;

import org.springframework.stereotype.Component;
import ru.spaceempire.server.web.dto.space.SolarSystemTO;
import ru.spaceempire.server.web.handlers.BaseHandler;
import ru.spaceempire.server.web.handlers.SolarSystemMapHandler;

/**
 * User: Sergey
 * Date: 25.06.11 16:01
 */
@Component
public class SolarSystemMapHandlerImpl extends BaseHandler implements SolarSystemMapHandler {

    @Override
    public SolarSystemTO loadSolarSystemMap(Long solarSystemId) {
        final SolarSystemTO solarSystemTO = new SolarSystemTO();
        solarSystemTO.path = mapManager.getMapPathForSolarSystem(solarSystemId);
        return solarSystemTO;
    }
}
