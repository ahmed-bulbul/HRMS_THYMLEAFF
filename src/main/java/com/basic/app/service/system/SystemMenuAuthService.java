package com.basic.app.service.system;

import com.basic.app.acl.auth.domain.RequestUrl;
import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.RequestUrlRepository;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.util.user.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Service
public class SystemMenuAuthService {

    String loginUser;
    User loginUserInst;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    RequestUrlRepository requestUrlRepository;

    SystemMenuAuthService(){
//        this.loginUser = UserUtil.getLoginUser();
//        this.loginUserInst = this.userRepository.getUserByUsername(this.loginUser);
//        System.out.println(this.loginUserInst);
    }


    public ArrayList<String> getUrlAccessConfigAttributes(String url){

        ArrayList<String> attributes = new ArrayList<>();
        Optional<RequestUrl> entityOptional= this.requestUrlRepository.getByUrl(url);
        System.out.println("From repository getByUrl : "+entityOptional.isPresent()+" and url is "+url);
        if(entityOptional.isPresent()){
            RequestUrl requestUrl = entityOptional.get();
            String configAttribute = requestUrl.getConfigAttribute();
            if(configAttribute != null && !configAttribute.equals("")){
                ArrayList<String> elephantList = new ArrayList<>(Arrays.asList(configAttribute.split(",")));
                for (String thisAttribute : elephantList) {
                    attributes.add(thisAttribute.trim());
                }
            }
        }

        return attributes;
    }


    public boolean isAuthorized(String menuCode, String menuUrl){

        ArrayList<String> urlConfigAttributes = this.getUrlAccessConfigAttributes(menuUrl);
        System.out.println("-----> Menu Rendering ********************************************************************");
        System.out.println("-----> urlConfigAttributes");
        System.out.println(urlConfigAttributes);
        ArrayList<String> userAuthorities = UserUtil.getLoginUserAuthorities();
        System.out.println("-----> userAuthorities");
        System.out.println(userAuthorities);


        for (String needRole : urlConfigAttributes) {
            needRole = needRole.trim();

            for (String userAuthority : userAuthorities) {
                userAuthority = userAuthority.trim();

                if(userAuthority.equals(needRole)){
                    return true;
                }

            }

        }

        return false;
    }




}
