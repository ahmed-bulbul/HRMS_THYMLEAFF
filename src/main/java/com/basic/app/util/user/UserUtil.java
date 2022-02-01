package com.basic.app.util.user;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserUtil {

    public static String getLoginUser(){
        String loginUser = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // String loginUsername = authentication.getName();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
//            UserDetails userPrincipal = (UserDetails)authentication.getPrincipal();
//            loginUser = userPrincipal.getUsername();
            loginUser = authentication.getName();
        }
        return loginUser;
    }


    public static ArrayList<String> getLoginUserAuthorities(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ArrayList<String> attributes = new ArrayList<>();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                attributes.add(authority.getAuthority());
            }
        }
        return attributes;

    }



}
