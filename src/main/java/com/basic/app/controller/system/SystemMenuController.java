package com.basic.app.controller.system;

import com.basic.app.domain.system.SystemMenu;
import com.basic.app.service.system.MenuRenderService;
import com.basic.app.service.system.SystemMenuService;
import com.basic.app.util.PaginationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping("/menu")
public class SystemMenuController {

    private SystemMenuService service;
    private MenuRenderService menuRenderService;
    @Autowired
    public void setInjectedBean(SystemMenuService service,MenuRenderService menuRenderService) {
        this.service = service;
        this.menuRenderService =menuRenderService;
    }


    @RequestMapping("/index1")
    public String getAll(Model model)
    {
        List<SystemMenu> list = service.getAll();
        model.addAttribute("objectList", list);
        return "view/system/menu/index";
    }

    @Secured({"ROLE_EDITOR", "ROLE_ADMIN"})
    @RequestMapping("/index")
    public String getAllPaginated(HttpServletRequest request, Model model) {

        PaginationHelper pHelper = new PaginationHelper(request);
        pHelper.setDefaultSortDir("sequence", "asc");
        Page<SystemMenu> page = service.getAllPaginated(pHelper.pageNum, pHelper.pageSize, pHelper.sortField, pHelper.sortDir);
        List< SystemMenu > list = page.getContent();

        model.addAttribute("currentPage", pHelper.pageNum);
        model.addAttribute("totalPages", page.getTotalPages());
        model.addAttribute("totalItems", page.getTotalElements());

        model.addAttribute("sortField", pHelper.sortField);
        model.addAttribute("sortDir", pHelper.sortDir);
        model.addAttribute("reverseSortDir", pHelper.sortDir.equals("asc") ? "desc" : "asc");

        model.addAttribute("objectList", list);

        return "view/system/menu/index";
    }


    @GetMapping(value = "/show/{id}")
    public String show(Model model, @PathVariable long id)
    {
        SystemMenu object = null;
        try {
            object = service.findById(id);
        } catch (Exception ex) {
            model.addAttribute("errorMessage", "Entity not found");
        }
        model.addAttribute("object", object);
        return "view/system/menu/show";
    }

    @RequestMapping(path = "/create")
    public String create(Model model)
    {
        model.addAttribute("systemParentMenu", service.getMapAllParentMenus());
        model.addAttribute("object", new SystemMenu());
        return "view/system/menu/create";
    }

    @RequestMapping(path = "/save", method = RequestMethod.POST)
    public String save(@Valid SystemMenu postObjInst, BindingResult result, Model model, RedirectAttributes redirAttrs)
    {
        if (result.hasErrors()) {
            return "view/system/menu/create";
        }
        postObjInst = service.createOrUpdate(postObjInst);
        model.addAttribute("object", postObjInst);
        redirAttrs.addFlashAttribute("successMgs", "Successfully save transaction");

        return "redirect:/menu/show/" + postObjInst.getId();
    }

    @RequestMapping(path = {"/edit", "/edit/{id}"})
    public String edit(Model model, @PathVariable("id") Optional<Long> id) throws Exception
    {
        if (id.isPresent()) {
            SystemMenu entity = service.getById(id.get());
            model.addAttribute("object", entity);
        } else {
            model.addAttribute("object", new SystemMenu());
        }
        model.addAttribute("systemParentMenu", service.getMapAllParentMenus());
        return "view/system/menu/edit";
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public String update(SystemMenu postObjInst, RedirectAttributes redirAttrs)
    {
        postObjInst = service.createOrUpdate(postObjInst);
        redirAttrs.addFlashAttribute("successMgs", "Successfully update transaction");
        return "redirect:/menu/show/" + postObjInst.getId();
    }

    @RequestMapping(path = "/delete/{id}")
    public String deleteById(@PathVariable("id") Long id, RedirectAttributes redirAttrs) throws Exception
    {
        service.deleteById(id);
        redirAttrs.addFlashAttribute("warningMgs", "Successfully delete transaction");
        return "redirect:/menu/index";
    }

    @RequestMapping("/loadMenu")
    public ResponseEntity<?> getMenu(){
        StringBuilder sb = new StringBuilder();
        sb = MenuRenderService.printLeftSideMenu("From dashboard --- View HTML");
        return new ResponseEntity<>(sb, HttpStatus.OK);
    }



}