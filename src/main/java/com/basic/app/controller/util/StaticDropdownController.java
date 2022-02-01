package com.basic.app.controller.util;

import com.basic.app.domain.system.SystemMenu;
import com.basic.app.service.system.SystemMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@Controller
public class StaticDropdownController {

    private SystemMenuService service;
    @Autowired
    public void setInjectedBean(SystemMenuService service) {
        this.service = service;
    }


    @ModelAttribute("systemParentMenu")
    public List<SystemMenu> getSystemParentMenu() {
        System.out.println(this.service.getAll());
        return this.service.getAll();
    }


}
