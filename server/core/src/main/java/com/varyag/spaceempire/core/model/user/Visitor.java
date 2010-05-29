package com.varyag.spaceempire.core.model.user;

/**
 * User: Sergey
 * Date: 29.05.2010 19:30:49
 */
public class Visitor extends BaseUser {

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Visitor) {
            if (this == obj) {
                return true;
            } else {
                Visitor user = (Visitor) obj;
                if ((null == this.id)) {
                    return (this.id == user.getId());
                } else {
                    return this.id.equals(user.getId());
                }
            }
        } else {
            return super.equals(obj);
        }
    }

    @Override
    public int hashCode() {
        if (null == id) {
            return super.hashCode();
        } else {
            return id.hashCode() * 19 + id;
        }
    }
}
