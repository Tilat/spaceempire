package ru.spaceempire.server.game.managers.auth;

import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.game.managers.AuthManager;
import ru.spaceempire.server.game.managers.BaseManager;
import ru.spaceempire.server.model.user.User;

/**
 * User: Sergey
 * Date: 13.06.11 19:50
 */
public class AuthManagerImpl extends BaseManager implements AuthManager {
    public User login(String login, String password) throws GameException {
        return new User();
    }
}
