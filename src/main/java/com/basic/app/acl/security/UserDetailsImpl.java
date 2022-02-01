package com.basic.app.acl.security;

import com.basic.app.acl.auth.domain.Role;
import com.basic.app.acl.auth.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

// https://programming.vip/docs/spring-security-dynamic-url-permission-control.html
// https://www.codejava.net/frameworks/spring-boot/spring-boot-security-role-based-authorization-tutorial

public class UserDetailsImpl implements UserDetails {
//    /**
//     * Current login user
//     */
//    private transient User currentUser;
//    /**
//     * role
//     */
//    private transient List<Role> roles;


    private User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    /*@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<Role> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        return authorities;
    }*/

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Role> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        return authorities;
    }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !user.isAccountExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !user.isAccountLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !user.isPasswordExpired();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}
