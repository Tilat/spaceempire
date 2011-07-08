package ru.spaceempire.server.validation.data;

import ru.spaceempire.server.validation.IncomingData;

/**
 * User: Sergey
 * Date: 25.06.11 15:07
 */
public class LoginAndPasswordVO implements IncomingData{
    private String login;
    private String password;

    public LoginAndPasswordVO(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
