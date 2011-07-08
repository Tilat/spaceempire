package ru.spaceempire.server.web.dto.profile;

import ru.spaceempire.server.web.dto.BaseTO;
import ru.spaceempire.server.web.dto.space.SolarSystemTO;
import ru.spaceempire.server.web.dto.space.SpaceSectorTO;

/**
 * User: Sergey
 * Date: 25.06.11 14:16
 */
public class ProfileTO extends BaseTO {
    public String name;
    public SpaceSectorTO defaultSector;
    public SolarSystemTO defaultSolarSystem;
}
