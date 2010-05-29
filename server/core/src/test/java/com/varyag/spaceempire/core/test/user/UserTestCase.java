package com.varyag.spaceempire.core.test.user;

import com.varyag.spaceempire.core.model.user.BaseUser;
import com.varyag.spaceempire.core.model.user.Visitor;
import com.varyag.spaceempire.core.test.BaseCoreTestCase;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.Set;

/**
 * User: Sergey
 * Date: 29.05.2010 19:56:32
 */
public class UserTestCase extends BaseCoreTestCase {

    public void testUser() {
        BaseUser user1 = new Visitor();
        BaseUser user2 = new Visitor();

        user1.setId(2);
        logger.debug(user1.hashCode());
        Assert.isTrue(!user1.equals(user2));

        user1.setId(null);
        logger.debug(user1.hashCode());
        Assert.isTrue(user1.equals(user2));

        user2.setId(null);
        logger.debug(user2.hashCode());
        Assert.isTrue(user1.equals(user2));

        user1.setId(2);
        logger.debug(user1.hashCode());
        user2.setId(2);
        logger.debug(user2.hashCode());
        Assert.isTrue(user1.equals(user2));

        Set<BaseUser> set = new HashSet<BaseUser>();
        set.add(user1);
        user2.setId(1);
        set.add(user2);

        for (BaseUser user : set){
            logger.debug(user);
        }
    }
}
