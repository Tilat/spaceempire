package ru.spaceempire.server.model;

import ru.spaceempire.server.model.user.User;

import javax.persistence.*;

/**
 * User: sergey
 * Date: Jun 10, 2011 4:48:44 PM
 */
@MappedSuperclass
public abstract class BaseEntity implements AbstractEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "id_generator")
    protected Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    protected User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
