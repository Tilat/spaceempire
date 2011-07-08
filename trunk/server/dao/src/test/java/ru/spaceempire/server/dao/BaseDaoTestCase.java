package ru.spaceempire.server.dao;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * User: Sergey
 * Date: 14.06.11 21:46
 */
public abstract class BaseDaoTestCase {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:/conf/daoContext.xml");
    }
}
