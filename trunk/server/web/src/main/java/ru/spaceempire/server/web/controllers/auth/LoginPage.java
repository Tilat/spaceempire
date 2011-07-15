package ru.spaceempire.server.web.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import ru.spaceempire.server.exceptions.GameException;
import ru.spaceempire.server.web.controllers.AbstractPage;
import ru.spaceempire.server.web.dto.profile.ProfileTO;
import ru.spaceempire.server.web.handlers.AuthHandler;

/**
 * User: Sergey
 * Date: 10.07.11 13:25
 */
@Controller()
public class LoginPage extends AbstractPage {

    @Autowired
    private AuthHandler authHandler;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView processGet(ModelAndView view) {
        System.out.println("processGet");
        return view;
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ModelAndView processPost(ModelAndView view, String login, String password) {
        try {
            ProfileTO profileTO = authHandler.login(login, password);
            view.addObject("profile", profileTO);
        } catch (Throwable e) {
            view.addObject("error", e.getMessage());
            logger.error(e.getMessage(), e);
        }
        return view;
    }


}
