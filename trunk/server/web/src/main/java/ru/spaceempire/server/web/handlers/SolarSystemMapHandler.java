package ru.spaceempire.server.web.handlers;

import ru.spaceempire.server.web.dto.profile.ProfileTO;
import ru.spaceempire.server.web.dto.space.SolarSystemTO;

/**
 * User: Sergey
 * Date: 25.06.11 16:01
 */
public interface SolarSystemMapHandler {
    SolarSystemTO loadSolarSystemMap(Long solarSystemId);
}
