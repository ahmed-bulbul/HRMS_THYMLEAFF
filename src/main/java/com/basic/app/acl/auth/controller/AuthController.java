package com.basic.app.acl.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AuthController {

    @GetMapping("login")
    public String getLoginView(){
        return "/auth/login";
    }

    @GetMapping("register")
    public String getRegisterView(){
        return "/auth/register";
    }

    @GetMapping("403")
    public String error403(){
        return  "/auth/403";
    }

    @GetMapping("404")
    public String error404(){
        return  "/auth/404";
    }


}
