package com.basic.app.acl.security.filter;

import com.basic.app.acl.auth.domain.RequestUrl;
import com.basic.app.acl.auth.repository.RequestUrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import java.util.*;


@Component
public class MyFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

    @Autowired
    RequestUrlRepository requestUrlRepository;
    // by Me@Al-Mamun2020-10-09
    public ArrayList<String> getAttributesByURL(String url){

        ArrayList<String> attributes = new ArrayList<>();
        Optional<RequestUrl> entityOptional= this.requestUrlRepository.getByUrl(url);
        if(entityOptional.isPresent()){
            RequestUrl requestUrl = entityOptional.get();
            String configAttribute = requestUrl.getConfigAttribute();
            if(configAttribute != null && !configAttribute.equals("")){
                ArrayList<String> elephantList = new ArrayList<>(Arrays.asList(configAttribute.split(",")));
                for (String thisAttribute : elephantList) {
                    System.out.println(thisAttribute);
                    attributes.add(thisAttribute.trim());
                }
            } else {
                attributes.add("ROLE_USER");
            }
        }

        else {
            attributes.add("ROLE_USER");
            // url ফাকা হলে আমি যে যে রোল এর ইউজার কে ডুকতে দিব সেই ইউজার গুলাকে এট্রিবিঊট এ অ্যাড করব ------
            attributes.add("ROLE_SUPER_ADMIN");
            attributes.add("ROLE_ADMIN");
        }


        return attributes;
    }



    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        FilterInvocation fi = (FilterInvocation) object;
        String url = fi.getRequestUrl();

        // TODO ignore url, please put it here for filtering and release
        if ( "/login".equals(url) || "/register".equals(url) || "/login?error".equals(url)  || url.contains("logout") ) {
            return null;
        }


        // List<ConfigAttribute> attributes = new ArrayList<ConfigAttribute>();
        ArrayList<String> attributes;
        attributes = this.getAttributesByURL(url); //Here Goes Code

        System.out.println("I am dynamic url permission............chk-1");
        System.out.println("User Request URL:------------------" + url);
        System.out.println("Required attributes for access:----" + attributes);
        System.out.println("I am dynamic url permission............chk-2");

//        return SecurityConfig.createList("ROLE_USER");
//        return SecurityConfig.createList(attributes);
        return SecurityConfig.createList(attributes.toArray(new String[attributes.size()]));
//        return attributes;
//        return null;
    }


    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}
