package com.basic.app.modules.main;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("/systemMain")
public class SystemMainController {

    @Autowired
    private SystemMainService mainService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "view/main/main";
    }

    @RequestMapping(value = "/getFormStructure", method = RequestMethod.GET)
    public ResponseEntity<?> login() {

        Map<String,Object> formStructure =mainService.getFormStructure();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        String jsonString = null;
        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(formStructure);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(jsonString);

        return ResponseEntity.ok(formStructure);
    }

    @RequestMapping(value = "/main",method = RequestMethod.GET)
    public String main(@RequestParam Map<String,String> clientParams){

        if(!clientParams.isEmpty()){
            if(clientParams.containsKey("rEntityName")){
                if (StringUtils.hasLength(clientParams.get("rEntityName"))) {
                    String entityName = clientParams.get("rEntityName");

                    switch (entityName){
                        case "sysResDef":
                            return "view/auth/authCustom/resDef/index";
                        case "role":
                            return "view/main/main";
                    }
                }
            }
        }
        return "view/main/main";
    }
}
