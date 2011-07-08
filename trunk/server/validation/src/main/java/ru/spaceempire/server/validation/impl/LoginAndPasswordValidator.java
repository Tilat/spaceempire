package ru.spaceempire.server.validation.impl;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import ru.spaceempire.server.validation.*;
import ru.spaceempire.server.validation.data.LoginAndPasswordVO;

/**
 * User: Sergey
 * Date: 25.06.11 14:33
 */
@Component
public class LoginAndPasswordValidator extends AbstractValidator<LoginAndPasswordVO, BaseVerdict> {

    protected BaseVerdict doValidate(LoginAndPasswordVO data) {
        if (StringUtils.hasText(data.getLogin()) && StringUtils.hasText(data.getPassword())) {
            return new BaseVerdict();
        } else {
            return new BaseVerdict(false);
        }

    }
}
