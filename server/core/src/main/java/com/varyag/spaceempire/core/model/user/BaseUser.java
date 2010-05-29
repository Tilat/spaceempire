package com.varyag.spaceempire.core.model.user;

import com.varyag.spaceempire.core.model.BaseBean;

/**
 * User: Sergey
 * Date: 29.05.2010 19:22:41
 */
public abstract class BaseUser extends BaseBean {
    protected UserType type = UserType.VISITOR;
    protected String name;
    protected String firstName;
    protected String secondName;
    protected String email;
    protected String password; //dm5 hash

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
