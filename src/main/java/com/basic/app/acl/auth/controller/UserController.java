package com.basic.app.acl.auth.controller;

import com.basic.app.acl.auth.domain.Role;
import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.service.RoleService;
import com.basic.app.acl.auth.service.UserService;
import com.basic.app.util.PaginationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {


    public Map<String, String> clientParams;
    // @Autowired
    // UserService service;
    private UserService service;
    private RoleService roleService;


    @Autowired
    public void setInjectedBean(UserService service, RoleService roleService) {
        this.service = service;
        this.roleService = roleService;
    }

    @RequestMapping("/index7")
    public String getAll(Model model)
    {
        List<User> list = service.getAll();

        model.addAttribute("users", list);
        return "view/user/index";
    }

    // @Secured("ROLE_ADMIN")
    @Secured({ "ROLE_EDITOR", "ROLE_ADMIN" })
    @RequestMapping("/index")
    public String getAllPaginated(HttpServletRequest request, Model model,@RequestParam Map<String,String> clientParams)
    {

        SecurityContext securityContext = SecurityContextHolder.getContext();
        System.out.println(securityContext.getAuthentication().getName());
        System.out.println(securityContext.getAuthentication().getAuthorities());
        System.out.println(securityContext.getAuthentication().getPrincipal());
        System.out.println(securityContext.getAuthentication().getDetails());

        int pageNum = 1;   //default page number is 0 (yes it is weird)
        int pageSize = 5;  //default page size is 10
        String sortField = "id";
        String sortDir = "desc";

        if (request.getParameter("pageNum") != null && !request.getParameter("pageNum").isEmpty()) pageNum = Integer.parseInt(request.getParameter("pageNum"));
        if (request.getParameter("pageSize") != null && !request.getParameter("pageSize").isEmpty()) pageSize = Integer.parseInt(request.getParameter("pageSize"));
        if (request.getParameter("sortField") != null && !request.getParameter("sortField").isEmpty()) sortField = request.getParameter("sortField");
        if (request.getParameter("sortDir") != null && !request.getParameter("sortDir").isEmpty()) sortDir = request.getParameter("sortDir");


        //Search Operation;
        this.clientParams = clientParams;
        PaginationHelper pHelper = new PaginationHelper(request);
        Page<User> page = service.getAllPaginated(clientParams, pHelper.pageNum, pHelper.pageSize, pHelper.sortField, pHelper.sortDir);
        List< User > list = page.getContent();
        //End Search Operation;


        model.addAttribute("currentPage", pageNum);
        model.addAttribute("totalPages", page.getTotalPages());
        model.addAttribute("totalItems", page.getTotalElements());

        model.addAttribute("sortField", sortField);
        model.addAttribute("sortDir", sortDir);
        model.addAttribute("reverseSortDir", sortDir.equals("asc") ? "desc" : "asc");

        model.addAttribute("users", list);
        model.addAttribute("objectList", list);

        return "view/user/index";
    }

    //    @RequestMapping(path = {"/edit", "/edit/{id}"})
//    public String edit(Model model, @PathVariable("id") Optional<Long> id) throws Exception
    @GetMapping(value = "/show/{id}")
    public String show(Model model, @PathVariable long id)
    {
        User user = null;
        try {
            user = service.findById(id);
        } catch (Exception ex) {
            model.addAttribute("errorMessage", "Entity not found");
        }
        model.addAttribute("object", user);
        return "view/user/show";
    }

    @RequestMapping(path = "/create")
    public String create(Model model)
    {
        model.addAttribute("ROLES",this.roleService.getAll());
        model.addAttribute("user", new User());
        return "view/user/create";
    }

    @RequestMapping(path = "/save", method = RequestMethod.POST)
    public String save(@Valid User user, BindingResult result, Model model, RedirectAttributes redirAttrs)
    {
        if (result.hasErrors()) {
            model.addAttribute("warningMgs", ""+result.getFieldError());
            return "view/user/create";
        }
        user = service.createOrUpdate(user);
        model.addAttribute("object", user);
        redirAttrs.addFlashAttribute("successMgs", "Successfully save transaction");

        // return "redirect:/user/index";
        return "redirect:/user/show/" + user.getId();
    }

    @RequestMapping(path = {"/edit", "/edit/{id}"})
    public String edit(Model model, @PathVariable("id") Optional<Long> id) throws Exception
    {
        if (id.isPresent()) {
            User entity = service.getById(id.get());
            model.addAttribute("ROLES",this.roleService.getAll());
            model.addAttribute("user", entity);
        } else {
            model.addAttribute("user", new User());
        }
        return "view/user/edit";
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public String update(User user, RedirectAttributes redirAttrs)
    {
        user = service.createOrUpdate(user);
        redirAttrs.addFlashAttribute("successMgs", "Successfully update transaction");
        // return "redirect:/user/index";
        return "redirect:/user/show/" + user.getId();
    }

    @RequestMapping(path = "/delete/{id}")
    public String deleteById(@PathVariable("id") Long id, RedirectAttributes redirAttrs) throws Exception
    {
        service.deleteById(id);
        redirAttrs.addFlashAttribute("warningMgs", "Successfully delete transaction");
        return "redirect:/user/index";
    }





}
