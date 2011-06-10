package ru.spaceempire.server.model;

import java.io.Serializable;

/**
 * User: sergey
 * Date: Jun 10, 2011 4:45:34 PM
 */
public interface AbstractEntity<PK extends Serializable> extends Serializable {

    PK getId();

    void setId(PK pk);

}
