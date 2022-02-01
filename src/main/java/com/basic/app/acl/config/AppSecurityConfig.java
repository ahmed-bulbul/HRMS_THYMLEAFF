package com.basic.app.acl.config;

import com.basic.app.acl.security.UserDetailsServiceImpl;
import com.basic.app.acl.security.filter.MyAuthenticationSuccessHandler;
import com.basic.app.acl.security.filter.MyAccessDecisionManager;
import com.basic.app.acl.security.filter.MyFilterInvocationSecurityMetadataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// src
// https://www.codejava.net/frameworks/spring-boot/spring-boot-security-role-based-authorization-tutorial
// https://docs.spring.io/spring-security/site/docs/4.2.2.RELEASE/reference/htmlsingle/
// https://docs.spring.io/spring-security/site/docs/4.2.12.RELEASE/apidocs/org/springframework/security/web/authentication/logout/LogoutHandler.html

//@EnableGlobalMethodSecurity(securedEnabled = true)
@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

/*
    // Authentication : User --> Roles
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance())
                .withUser("user1").password("secret1").roles("USER")
                .and()
                .withUser("admin1").password("secret1").roles("USER", "ADMIN");
    }

    // Authorization : Role -> Access
//    protected void configure(HttpSecurity http) throws Exception {
//        http.httpBasic().and().authorizeRequests().antMatchers("/students/**")
//                .hasRole("USER").antMatchers("/**").hasRole("ADMIN").and()
//                .csrf().disable().headers().frameOptions().disable();
//    }
*/

    @Autowired
    private MyAuthenticationSuccessHandler successHandler;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }



    // dynamic url permission from db start ----------------------------------------------------------------------------
    @Bean
    public FilterInvocationSecurityMetadataSource mySecurityMetadataSource() {
        MyFilterInvocationSecurityMetadataSource securityMetadataSource;
        securityMetadataSource = new MyFilterInvocationSecurityMetadataSource();
        return securityMetadataSource;
    }
    @Bean
    public AccessDecisionManager myAccessDecisionManager() {
        return new MyAccessDecisionManager();
    }
    // dynamic url permission from db end ------------------------------------------------------------------------------



    // Authentication : User --> Roles
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }


    // Authorization : Role -> Access
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
//                    .antMatchers(HttpMethod.GET, "/index").hasRole("USER")
////                    .antMatchers(HttpMethod.GET, "/index").hasRole("ADMIN")
////                    .antMatchers(HttpMethod.GET, "/user/index").hasRole("ADMIN")
////                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .defaultSuccessUrl("/", true)
                    .successHandler(successHandler)
                    .and()
                .rememberMe() // default two week
                .and()
                .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessHandler(successHandler)
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                    .clearAuthentication(true)
                    .invalidateHttpSession(true)
                    .logoutSuccessUrl("/login")
                .and()
                .exceptionHandling().accessDeniedPage("/403")
                ;


        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry =
                http.antMatcher("/**").authorizeRequests();
        registry.withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
            public <O extends FilterSecurityInterceptor> O postProcess( O fsi ) {
                fsi.setSecurityMetadataSource(mySecurityMetadataSource());
                fsi.setAccessDecisionManager(myAccessDecisionManager());
                return fsi;
            }
        });
        registry.antMatchers("/login").permitAll();
        // All other requests require authentication
        registry.anyRequest().authenticated();

    }


    // by me
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(HttpMethod.GET,
                "/favicon.ico",
                "/*.html",
                "/**/*.png",
                "/**/*.PNG",
                "/**/*.jpg",
                "/**/*.woff2",
                "/**/*.css.map",
                "/**/*.js.map",
                "/**/*.css",
                "/**/*.js");
    }




}
