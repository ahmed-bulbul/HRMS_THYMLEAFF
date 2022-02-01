package com.basic.app.modules.main;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SystemMainService {

    public Map<String,Object> getFormStructure(){


        Map<String, Object> mapStructure = new HashMap<String, Object>();
        Map<String, Object> attribute1 = new HashMap<String, Object>();
        attribute1.put("fielddesc", "Code");
        attribute1.put("MandatoryInUI", true);
        attribute1.put("HtmlType", "textarea");
        attribute1.put("HTMLSize", "280");

        mapStructure.put("code", attribute1);


        Map<String, Object> attribute2 = new HashMap<String, Object>();
        attribute2.put("fielddesc", "Title");
        attribute2.put("MandatoryInUI", true);
        attribute2.put("HtmlType", "textarea");
        attribute2.put("HTMLSize", "280");

        mapStructure.put("title", attribute2);



        return mapStructure;
    }


}
