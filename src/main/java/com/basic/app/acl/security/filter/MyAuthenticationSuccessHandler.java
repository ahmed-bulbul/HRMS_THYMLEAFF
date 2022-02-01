package com.basic.app.acl.security.filter;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.service.system.MenuRenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// https://stackoverflow.com/questions/53340787/put-user-in-httpsession-with-spring-security-default-login-and-authenticate/53353324
// https://stackoverflow.com/questions/7806086/adding-user-to-session-spring-security-default-login

@Component
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler, LogoutSuccessHandler {

    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";


    @Autowired
    private UserRepository userRepository;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String loginUser = authentication.getName();
        User user = userRepository.getUserByUsername(loginUser);
        user.setActiveOnline(false);
        userRepository.save(user);

        request.getSession().removeAttribute(USERNAME);
        request.getSession().removeAttribute(PASSWORD);


        response.sendRedirect(request.getContextPath() + "/login" );
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        request.getSession().setAttribute(PASSWORD, request.getParameter(PASSWORD));
        request.getSession().setAttribute(USERNAME, request.getParameter(USERNAME));



        User user;
        user= userRepository.getUserByUsername(request.getParameter(USERNAME));
        if (user==null){
            user=userRepository.getUserByEmail(request.getParameter(USERNAME));
        }
        user.setActiveOnline(true);
        userRepository.save(user);

        response.sendRedirect(request.getContextPath() + "/" );
    }


}
