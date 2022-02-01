package com.basic.app.acl.config;

import com.basic.app.acl.security.filter.MyCustomInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

import java.util.concurrent.TimeUnit;

// https://stackoverflow.com/questions/31082981/spring-boot-adding-http-request-interceptors
// https://stackoverflow.com/questions/60661020/intercept-and-redirect-request-in-spring-boot
// File upload
// https://stackoverflow.com/questions/28556300/serving-static-resources-from-file-system-spring-boot-web


@Configuration
@EnableWebMvc
public class AppWebMvcConfigurer implements WebMvcConfigurer {
//public class MyWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {

    @Value("${upload.file.directory}")
    public String multimediaDirectory;


    @Autowired
    MyCustomInterceptor myCustomInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(productServiceInterceptor);
//        registry.addInterceptor(productServiceInterceptor).excludePathPatterns("/admin/**");
//        registry.addInterceptor(productServiceInterceptor).excludePathPatterns("/static/**");
//        registry.addInterceptor(productServiceInterceptor).excludePathPatterns("/vendor/**");

//        registry.addInterceptor(productServiceInterceptor).excludePathPatterns("/vendor/**", "/js/**", "/css/**");
        registry.addInterceptor(myCustomInterceptor).excludePathPatterns("/vendor/**", "/js/**", "/css/**", "/img/**", "/images/**");
    }



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/images/**").addResourceLocations("file:" + multimediaDirectory+"\\");
//        registry.addResourceHandler("/images/**").addResourceLocations("file:///E:/TechServiceProject/localnet_svn/APP_Multimedia/"); // working
//        registry.addResourceHandler("/multimedia/**").addResourceLocations("file:///E:/TechServiceProject/localnet_svn/APP_Multimedia/"); // working
//        registry.addResourceHandler("/multimedia/**").addResourceLocations("file:///"+multimediaDirectory); // working

//        registry.addResourceHandler("/css/**", "/js/**", "/img/**", "/vendor/**", "/multimedia/**")
//                .addResourceLocations("classpath:/static/css/", "classpath:/static/js/", "classpath:/static/img/", "classpath:/static/vendor/", "file:///"+multimediaDirectory); // working

        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/"); // working
        registry.addResourceHandler( "/js/**").addResourceLocations("classpath:/static/js/"); // working
        registry.addResourceHandler( "/img/**").addResourceLocations("classpath:/static/img/"); // working

        registry.addResourceHandler( "/vendor/**").addResourceLocations("classpath:/static/vendor/"); // working
        registry.addResourceHandler( "/multimedia/**").addResourceLocations("file:///"+multimediaDirectory); // working

        // webapp folder: Register resource handler for images from
        registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/")
                .setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());

    }




}
