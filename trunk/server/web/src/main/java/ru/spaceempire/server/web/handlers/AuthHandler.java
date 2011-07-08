package ru.spaceempire.server.web.handlers;

import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.web.dto.profile.ProfileTO;

/**
 * User: Sergey
 * Date: 13.06.11 19:45
 */
public interface AuthHandler {

    public ProfileTO login(String login, String password) throws GameException;

}
