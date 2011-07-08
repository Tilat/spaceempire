package ru.spaceempire.server.web.endpoints;

import ru.spaceempire.server.web.dto.ResponseTO;
import ru.spaceempire.server.web.dto.profile.ProfileTO;
import ru.spaceempire.server.web.dto.space.SolarSystemTO;

/**
 * User: Sergey
 * Date: 25.06.11 14:04
 */
public interface SpaceMapEndpoint {
    public ResponseTO<SolarSystemTO> loadSolarSystemMap(Long solarSystemId);
}
