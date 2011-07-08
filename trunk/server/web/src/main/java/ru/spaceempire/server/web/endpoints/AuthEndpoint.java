package ru.spaceempire.server.web.endpoints;

import ru.spaceempire.server.web.dto.ResponseTO;
import ru.spaceempire.server.web.dto.profile.ProfileTO;

/**
 * User: sergey
 * Date: Jun 10, 2011 5:29:10 PM
 */
public interface AuthEndpoint {
    public ResponseTO<ProfileTO> login(String login, String password);
}
