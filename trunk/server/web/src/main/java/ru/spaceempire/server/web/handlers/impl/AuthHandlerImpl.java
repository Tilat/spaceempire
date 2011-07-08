package ru.spaceempire.server.web.handlers.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.validation.data.LoginAndPasswordVO;
import ru.spaceempire.server.validation.impl.LoginAndPasswordValidator;
import ru.spaceempire.server.web.dto.profile.ProfileTO;
import ru.spaceempire.server.web.handlers.AuthHandler;
import ru.spaceempire.server.web.handlers.BaseHandler;

/**
 * User: Sergey
 * Date: 13.06.11 19:47
 */
@Component
public class AuthHandlerImpl extends BaseHandler implements AuthHandler {
    @Autowired
    private LoginAndPasswordValidator loginAndPasswordValidator;

    public ProfileTO login(String login, String password) throws GameException {
        if (loginAndPasswordValidator.validate(new LoginAndPasswordVO(login, password)).isPositive()) {
            return new ProfileTO();
        } else {
            throw new GameException();
        }
    }
}
