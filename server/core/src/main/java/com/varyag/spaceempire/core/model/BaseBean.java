package com.varyag.spaceempire.core.model;

import java.io.Serializable;

/**
 * User: Sergey
 * Date: 29.05.2010 19:21:24
 */
public class BaseBean implements Serializable {
    protected Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
