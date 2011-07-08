package ru.spaceempire.server.web.endpoints.impl;

import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.web.dto.ResponseTO;
import ru.spaceempire.server.web.dto.profile.ProfileTO;
import ru.spaceempire.server.web.endpoints.AuthEndpoint;
import ru.spaceempire.server.web.endpoints.BaseEndpoint;

import javax.jws.WebMethod;

/**
 * User: sergey
 * Date: Jun 10, 2011 5:32:51 PM
 */
@Service
@RemotingDestination
public class AuthEndpointImpl extends BaseEndpoint implements AuthEndpoint {

    @WebMethod
    public ResponseTO<ProfileTO> login(String login, String password) {
        logger.info("login; name={} ", login);
        try {
            return new ResponseTO<ProfileTO>(authHandler.login(login, password));
        } catch (Throwable e) {
            return processError(e);
        }
    }
}
