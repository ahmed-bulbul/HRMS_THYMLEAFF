package com.basic.app.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public String generate(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "tomal";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);
        return encodedPassword;
    }


}
