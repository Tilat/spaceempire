package ru.spaceempire.server.game.handlers.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import ru.spaceempire.server.game.handlers.AbstractController;

/**
 * User: Sergey
 * Date: 08.07.11 22:06
 */
@Controller()
public class LoginPage extends AbstractController {

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView processGet(ModelAndView view) {
        System.out.println("processGet");
        return view;
    }


}
