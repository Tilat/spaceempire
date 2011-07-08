package ru.spaceempire.server.web.endpoints.impl;

import org.springframework.stereotype.Service;
import ru.spaceempire.server.web.dto.ResponseTO;
import ru.spaceempire.server.web.dto.space.SolarSystemTO;
import ru.spaceempire.server.web.endpoints.BaseEndpoint;
import ru.spaceempire.server.web.endpoints.SpaceMapEndpoint;

import javax.jws.WebMethod;

/**
 * User: Sergey
 * Date: 25.06.11 14:04
 */
@Service
public class SpaceMapEndpointImpl extends BaseEndpoint implements SpaceMapEndpoint {

    @WebMethod
    public ResponseTO<SolarSystemTO> loadSolarSystemMap(Long solarSystemId) {
        logger.info("loadSolarSystemMap; solarSystemId={} ", solarSystemId);
        try {
            return new ResponseTO<SolarSystemTO>(solarSystemMapHandler.loadSolarSystemMap(solarSystemId));
        } catch (Throwable e) {
            return processError(e);
        }

    }
}
