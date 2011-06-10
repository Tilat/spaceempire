package ru.spaceempire.server.model;

import ru.spaceempire.server.model.user.User;

import javax.persistence.*;

/**
 * User: sergey
 * Date: Jun 10, 2011 4:48:44 PM
 */
@MappedSuperclass
public abstract class BaseEntity implements AbstractEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    protected Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    protected User user;

}
