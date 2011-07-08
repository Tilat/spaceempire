package ru.spaceempire.server.game.managers;

import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.model.user.User;

/**
 * User: Sergey
 * Date: 13.06.11 19:48
 */
public interface AuthManager {
    public User login(String login, String password) throws GameException;
}
