package ru.spaceempire.server.model.user;

import ru.spaceempire.server.model.AbstractEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * User: sergey
 * Date: Jun 10, 2011 4:53:09 PM
 */
@Entity
@Table(name = "users")
public class User implements Serializable, AbstractEntity<String> {

    @Id
    @Column(name = "uid")
    private String uid;

    @Column(name = "password")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getId() {
        return uid;
    }

    public void setId(String uid) {
        this.uid = uid;
    }
}
