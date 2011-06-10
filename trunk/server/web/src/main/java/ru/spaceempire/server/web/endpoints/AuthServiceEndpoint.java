package ru.spaceempire.server.web.endpoints;

/**
 * User: sergey
 * Date: Jun 10, 2011 5:29:10 PM
 */
public interface AuthServiceEndpoint {
    public boolean login(String login, String password);
}
