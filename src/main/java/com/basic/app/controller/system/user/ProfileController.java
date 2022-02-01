package com.basic.app.controller.system.user;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.acl.auth.service.UserService;
import com.basic.app.service.system.user.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Controller
public class ProfileController {

    Boolean sysDebug = false;

    private UserService service;
    private ProfileService profileService;
    private UserRepository repository;
//    private UserRoleRepository userRoleRepository;
    public Map<String, String> clientParams;

    @Autowired
    public void setInjectedBean(UserService service,
                                UserRepository repository,
                                ProfileService profileService
    ) {
        this.service = service;
        this.repository = repository;
        this.profileService = profileService;
    }



    // @RequestMapping(path = "/user/profile") // for single
    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    @RequestMapping(path = {"/user/profile", "/user/profile/{id}"})
    public String userProfile( Model model, @PathVariable("id") Optional<Long> id ) throws Exception {

        Long userId = null;

        if (id.isPresent()) {
            User entity = this.service.getById(id.get());
            model.addAttribute("user", entity);
            userId = id.get();
        } else {
            model.addAttribute("user", new User());
        }

        if(this.sysDebug) System.out.println( this.profileService.getLoginUserId());
        this.profileService.setProfileId(userId);
        /*BigDecimal totalOrderRcv = this.profileService.getTotalOrderReceive();
        BigDecimal totalOrderCmp = this.profileService.getTotalOrderComplete();
        BigDecimal totalOrderPnd = this.profileService.getTotalOrderPending();
        BigDecimal comChargeAmt = this.profileService.getCompanyChargeAmount();

        // today
        BigDecimal tdTotalOrderRcv = this.profileService.getTodayTotalOrderReceive();
        BigDecimal tdTotalOrderCmp = this.profileService.getTodayTotalOrderComplete();
        BigDecimal tdTotalOrderPnd = this.profileService.getTodayTotalOrderPending();

        DecimalFormat df2 = new DecimalFormat("#.##");
        String comChargeAmtStr = "0.00";
        if(comChargeAmt != null) comChargeAmtStr = df2.format(comChargeAmt);

        model.addAttribute("totalOrderRcv", totalOrderRcv);
        model.addAttribute("totalOrderCmp", totalOrderCmp);
        model.addAttribute("totalOrderPnd", totalOrderPnd);
        model.addAttribute("comChargeAmt", comChargeAmtStr);

        model.addAttribute("tdTotalOrderRcv", tdTotalOrderRcv);
        model.addAttribute("tdTotalOrderCmp", tdTotalOrderCmp);
        model.addAttribute("tdTotalOrderPnd", tdTotalOrderPnd);*/

        model.addAttribute("timestamp", Instant.now());
        return "view/user/profile";

    }


    @RequestMapping(path = "/user/profile/update", method = RequestMethod.POST)
    public String userProfileUpdate( User tnxUser, RedirectAttributes redirAttrs ) {

        Optional<User> entityOptional = this.repository.findById(tnxUser.getId());
        if(entityOptional.isPresent()) {

            User editUser = entityOptional.get();
            editUser.setDisplayName(tnxUser.getDisplayName());
            editUser.setPhoneNumber(tnxUser.getPhoneNumber());
            editUser.setEmail(tnxUser.getEmail());
            editUser.setEnabled(tnxUser.isEnabled());
            // this.repository.save(editUser);

         //   List<UserRole> userRoleList = this.userRoleRepository.getAllByUser(editUser);
            this.repository.save(editUser);

            // after save-push roles again
//            for (UserRole userRole : userRoleList) {
//                UserRole userRole1 = new UserRole();
//                userRole1.setRole(userRole.getRole());
//                userRole1.setUser(userRole.getUser());
//                this.userRoleRepository.save(userRole1);
//            }

        }

        redirAttrs.addFlashAttribute("successMgs", "Successfully update profile");
        return "redirect:/user/profile/" + tnxUser.getId();

    }






}
