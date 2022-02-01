package com.basic.app;

import com.basic.app.acl.auth.domain.RequestUrl;
import com.basic.app.acl.auth.domain.Role;
import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.service.UserService;
import com.basic.app.domain.system.SystemMenu;
import com.basic.app.acl.auth.repository.RequestUrlRepository;
import com.basic.app.acl.auth.repository.RoleRepository;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.repository.comn.NotificationRepository;
import com.basic.app.repository.system.SystemMenuRepository;
import com.basic.app.util.NotificationMgrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

//    @Autowired
//    UserRoleRepository userRoleRepository;

    @Autowired
    SystemMenuRepository systemMenuRepository;

    @Autowired
    RequestUrlRepository requestUrlRepository;

   // @Autowired
  //  UserLocationRepository userLocationRepository;

    @Autowired
    UserService userService;

    @Autowired
    NotificationRepository notificationRepository;

    // Create Roles -----------------------------------------------
    public void createAppBasicRoles(){

        Role chkRoleExist = this.roleRepository.getRoleByAuthority("ROLE_SUPER_ADMIN");
        if(chkRoleExist == null){
            Role roleInst1 = new Role(null, "ROLE_SUPER_ADMIN", "Super Admin", new Date(), "SYSTEM", null, null);
            this.roleRepository.save(roleInst1);
        }

        chkRoleExist = this.roleRepository.getRoleByAuthority("ROLE_ADMIN");
        if(chkRoleExist == null){
            Role roleInst2 = new Role(null, "ROLE_ADMIN", "Admin", new Date(), "SYSTEM", null, null);
            this.roleRepository.save(roleInst2);
        }

        chkRoleExist = this.roleRepository.getRoleByAuthority("ROLE_USER");
        if(chkRoleExist == null){
            Role roleInst3 = new Role(null, "ROLE_USER", "User", new Date(), "SYSTEM", null, null);
            this.roleRepository.save(roleInst3);
        }

        chkRoleExist = this.roleRepository.getRoleByAuthority("ROLE_MANAGER");
        if(chkRoleExist == null){
            Role roleInst4 = new Role(null, "ROLE_MANAGER", "Manager", new Date(), "SYSTEM", null, null);
            this.roleRepository.save(roleInst4);
        }

        chkRoleExist = this.roleRepository.getRoleByAuthority("ROLE_WORKER");
        if(chkRoleExist == null){
            Role roleInst5 = new Role(null, "ROLE_WORKER", "Worker", new Date(), "SYSTEM", null, null);
            this.roleRepository.save(roleInst5);
        }

    }


    // Create User -----------------------------------------------
    public void createAppBasicUsers() {

        // Super Admin User
        User userSuperAdmin = this.userRepository.getUserByUsername("mamun");
        if (userSuperAdmin == null) {
            userSuperAdmin = new User();
            userSuperAdmin.setUsername("mamun");
            userSuperAdmin.setPassword(new BCryptPasswordEncoder().encode("1234567"));
            userSuperAdmin.setDisplayName("Al-Mamun");
            userSuperAdmin.setPhoneNumber("01779282181");
            userSuperAdmin.setEmail("mamun@gmail.com");
            userSuperAdmin.setEnabled(true);
            userSuperAdmin.setUserType("AdminGroup");

            Role roleSuperAdmin = this.roleRepository.getRoleByAuthority("ROLE_SUPER_ADMIN");
            if (roleSuperAdmin != null) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleSuperAdmin);
                userSuperAdmin.setRoles(roles);
            } else {
                System.out.println("Role Super Admin Not Found");
            }
            this.userRepository.save(userSuperAdmin);
        }




        // Admin User
        User userAdmin = this.userRepository.getUserByUsername("admin");
        if (userAdmin == null) {
            userAdmin = new User();
            userAdmin.setUsername("admin");
            userAdmin.setPassword(new BCryptPasswordEncoder().encode("1234567"));
            userAdmin.setDisplayName("Admin");
            userAdmin.setPhoneNumber("01779282183");
            userAdmin.setUserType("Admin");
            userAdmin.setEnabled(true);
            userAdmin.setEmail("admin@admin.com");
            Role roleAdmin = this.roleRepository.getRoleByAuthority("ROLE_ADMIN");
            if (roleAdmin != null) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleAdmin);
                userAdmin.setRoles(roles);
            }
            this.userRepository.save(userAdmin);
        }




        // General User
        User userGeneral = this.userRepository.getUserByUsername("user");
        if (userGeneral == null) {
            userGeneral = new User();
            userGeneral.setUsername("user");
            userGeneral.setPassword(new BCryptPasswordEncoder().encode("1234567"));
            userGeneral.setDisplayName("User");
            userGeneral.setPhoneNumber("01779282184");
            userGeneral.setUserType("Admin");
            userGeneral.setEmail("user@user.com");
            userGeneral.setEnabled(true);
            Role roleGeneral = this.roleRepository.getRoleByAuthority("ROLE_USER");
            if (roleGeneral != null) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleGeneral);
                userGeneral.setRoles(roles);


            }
            this.userRepository.save(userGeneral);
        }


    }

    // Tag User - Roles ------------------------------------------
    public void tagBasicUsersRole(){

    }



    // Tag User - Roles ------------------------------------------
    public void createSystemMenu(){

        // SYSTEM  Generate // -----------------------------------------------------------------------------------------
        SystemMenu menuInst_System;
        boolean exist = systemMenuRepository.existsByCode("SYSTEM");
        if(!exist){
            menuInst_System = new SystemMenu("SYSTEM", "System", "/systemRootMenu#", "<i class=\"nav-icon fab fa-windows\"></i>", true, 100);
            menuInst_System = systemMenuRepository.save(menuInst_System);
        } else {
            menuInst_System = systemMenuRepository.getByCode("SYSTEM");
        }
        // Set to Request URL Map
        RequestUrl requestUrlInst = requestUrlRepository.getByUrlPath("/systemRootMenu#");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/systemRootMenu#", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


        SystemMenu menuInst_User = systemMenuRepository.getByCode("AUTH_USER");
        if(menuInst_User == null){
            SystemMenu menuInst_user = new SystemMenu("AUTH_USER", "User", "/user/index", "", true, 110);
            menuInst_user = systemMenuRepository.save(menuInst_user);
            menuInst_user.setParentMenu(menuInst_System);
            systemMenuRepository.save(menuInst_user);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/user/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/user/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


        SystemMenu menuInst_Role = systemMenuRepository.getByCode("AUTH_ROLE");
        if(menuInst_Role == null){
            SystemMenu menuInst_role= new SystemMenu("AUTH_ROLE", "Role", "/role/index", "", true, 120);
            menuInst_role = systemMenuRepository.save(menuInst_role);
            menuInst_role.setParentMenu(menuInst_System);
            systemMenuRepository.save(menuInst_role);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/role/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/role/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }



        SystemMenu menuInst_RequestMapChk = systemMenuRepository.getByCode("AUTH_REQUEST_MAP");
        if(menuInst_RequestMapChk == null){
            SystemMenu menuInst_RequestMap= new SystemMenu("AUTH_REQUEST_MAP", "Request Map", "/requesturl/index", "", true, 140);
            menuInst_RequestMap = systemMenuRepository.save(menuInst_RequestMap);
            menuInst_RequestMap.setParentMenu(menuInst_System);
            systemMenuRepository.save(menuInst_RequestMap);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/requesturl/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/requesturl/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


        SystemMenu menuInst_MenuDefChk = systemMenuRepository.getByCode("SYS_MENU_DEF");
        if(menuInst_MenuDefChk == null){
            SystemMenu menuInst_MenuDef= new SystemMenu("SYS_MENU_DEF", "Menu Definition", "/menu/index", "", true, 150);
            menuInst_MenuDef = systemMenuRepository.save(menuInst_MenuDef);
            menuInst_MenuDef.setParentMenu(menuInst_System);
            systemMenuRepository.save(menuInst_MenuDef);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/menu/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/menu/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


        SystemMenu menuInst_VisitorsLogChk = systemMenuRepository.getByCode("SYS_VISITORS_LOG");
        if(menuInst_VisitorsLogChk == null){
            SystemMenu menuInst_VisitorsLog= new SystemMenu("SYS_VISITORS_LOG", "Visitors Log", "/visitorslog/index", "", true, 160);
            menuInst_VisitorsLog = systemMenuRepository.save(menuInst_VisitorsLog);
            menuInst_VisitorsLog.setParentMenu(menuInst_System);
            systemMenuRepository.save(menuInst_VisitorsLog);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/visitorslog/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/visitorslog/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }



        // SERVICE Generate // -----------------------------------------------------------------------------------------
//        SystemMenu menuInst_Service;
//        exist = systemMenuRepository.existsByCode("SERVICE");
//        if(!exist){
//            menuInst_Service = new SystemMenu("SERVICE", "Service", "/serviceRootMenu#", "<i class=\"nav-icon fas fa-hands-helping\"></i>", true, 200);
//            menuInst_Service = systemMenuRepository.save(menuInst_Service);
//        } else {
//            menuInst_Service = systemMenuRepository.getByCode("SERVICE");
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/serviceRootMenu#");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/serviceRootMenu#", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_ServiceItemChk = systemMenuRepository.getByCode("SERVICE_ITEM");
//        if(menuInst_ServiceItemChk == null){
//            SystemMenu menuInst_ServiceItem= new SystemMenu("SERVICE_ITEM", "Service Item", "/serviceitem/index", "", true, 210);
//            menuInst_ServiceItem = systemMenuRepository.save(menuInst_ServiceItem);
//            menuInst_ServiceItem.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_ServiceItem);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/serviceitem/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/serviceitem/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_ServiceOrder = systemMenuRepository.getByCode("SERVICE_ORDER");
//        if(menuInst_ServiceOrder == null){
//            menuInst_ServiceOrder= new SystemMenu("SERVICE_ORDER", "Service Order", "/serviceorder/index", "", true, 220);
//            menuInst_ServiceOrder = systemMenuRepository.save(menuInst_ServiceOrder);
//            menuInst_ServiceOrder.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_ServiceOrder);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/serviceorder/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/serviceorder/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//
//        SystemMenu menuInst_ServiceTech = systemMenuRepository.getByCode("SERVICE_TECHNICIAN");
//        if(menuInst_ServiceTech == null){
//            menuInst_ServiceTech= new SystemMenu("SERVICE_TECHNICIAN", "Service Technician", "/techuser/index", "", true, 222);
//            menuInst_ServiceTech = systemMenuRepository.save(menuInst_ServiceTech);
//            menuInst_ServiceTech.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_ServiceTech);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/techuser/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/techuser/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_companyCharge = systemMenuRepository.getByCode("COMPANY_CHARGE");
//        if(menuInst_companyCharge == null){
//            menuInst_companyCharge= new SystemMenu("COMPANY_CHARGE", "Company Charge List", "/companyCharge/index", "", true, 225);
//            menuInst_companyCharge = systemMenuRepository.save(menuInst_companyCharge);
//            menuInst_companyCharge.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_companyCharge);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/companyCharge/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/companyCharge/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_serviceCenterTml = systemMenuRepository.getByCode("SERVICE_CENTER_TML");
//        if(menuInst_serviceCenterTml == null){
//            menuInst_serviceCenterTml= new SystemMenu("SERVICE_CENTER_TML", "Service Center Terminal", "/serviceCenterTml/index", "", true, 226);
//            menuInst_serviceCenterTml = systemMenuRepository.save(menuInst_serviceCenterTml);
//            menuInst_serviceCenterTml.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_serviceCenterTml);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/serviceCenterTml/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/serviceCenterTml/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_ServicePrice = systemMenuRepository.getByCode("SERVICE_PRICE_BY_TECH_RATING");
//        if(menuInst_ServicePrice == null){
//            menuInst_ServicePrice= new SystemMenu("SERVICE_PRICE_BY_TECH_RATING", "Service Price by Technician Rating", "/prodserviceprice/index", "", true, 240);
//            menuInst_ServicePrice = systemMenuRepository.save(menuInst_ServicePrice);
//            menuInst_ServicePrice.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_ServicePrice);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/prodserviceprice/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/prodserviceprice/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }
//
//
//        SystemMenu menuInst_OfferPromos = systemMenuRepository.getByCode("OFFER_N_PROMOS");
//        if(menuInst_OfferPromos == null){
//            menuInst_OfferPromos= new SystemMenu("OFFER_N_PROMOS", "Offer and Promos", "/offerpromos/index", "", true, 250);
//            menuInst_OfferPromos = systemMenuRepository.save(menuInst_OfferPromos);
//            menuInst_OfferPromos.setParentMenu(menuInst_Service);
//            systemMenuRepository.save(menuInst_OfferPromos);
//        }
//        // Set to Request URL Map
//        requestUrlInst = requestUrlRepository.getByUrlPath("/offerpromos/index");
//        if(requestUrlInst == null){
//            requestUrlInst = new RequestUrl("/offerpromos/index", "ROLE_USER", null, new Date(), "SYSTEM");
//            requestUrlRepository.save(requestUrlInst);
//        }



        // SALES Generate // -----------------------------------------------------------------------------------------
//        SystemMenu menuInst_Sales;
//        exist = systemMenuRepository.existsByCode("SALES");
//        if(!exist){
//            menuInst_Service = new SystemMenu("SALES", "Sales", "/salesRootMenu#", "<i class=\"nav-icon fas fa-file-invoice-dollar\"></i>", true, 300);
//            menuInst_Service = systemMenuRepository.save(menuInst_Service);
//        } else {
//            menuInst_Service = systemMenuRepository.getByCode("SALES");
//        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/salesRootMenu#");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/salesRootMenu#", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }



        // NOTIFICATION Generate // ------------------------------------------------------------------------------------
        SystemMenu menuInst_Notification = systemMenuRepository.getByCode("NOTIFICATION");
        if(menuInst_Notification == null){
            menuInst_Notification= new SystemMenu("NOTIFICATION", "Notification", "/notification/index", "<i class=\"nav-icon far fa-bell-slash\"></i>", true, 400);
            menuInst_Notification = systemMenuRepository.save(menuInst_Notification);
            menuInst_Notification.setParentMenu(null);
            systemMenuRepository.save(menuInst_Notification);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/notification/index");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/notification/index", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


        // USERLOCATION Generate // ------------------------------------------------------------------------------------
        SystemMenu menuInst_UserLocation = systemMenuRepository.getByCode("USER_LOCATION");
        if(menuInst_UserLocation == null){
            menuInst_UserLocation= new SystemMenu("USER_LOCATION", "User Location", "/userlocation", "<i class=\"nav-icon fas fa-map-marker-alt\"></i>", true, 500);
            menuInst_UserLocation = systemMenuRepository.save(menuInst_UserLocation);
            menuInst_UserLocation.setParentMenu(null);
            systemMenuRepository.save(menuInst_UserLocation);
        }
        // Set to Request URL Map
        requestUrlInst = requestUrlRepository.getByUrlPath("/userlocation");
        if(requestUrlInst == null){
            requestUrlInst = new RequestUrl("/userlocation", "ROLE_USER", null, new Date(), "SYSTEM");
            requestUrlRepository.save(requestUrlInst);
        }


    }




//    public void createTestNativeSql(){
//
//        System.out.println(this.userLocationRepository.loadUsersLocation("load"));
//        System.out.println(this.userLocationRepository.loadUsersLocation2("load"));
//
//        /*
//        // Prep work
//        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
//        Session session = sessionFactory.getCurrentSession();
//        */
//
//    }



    public void testNotification(){

        // Send message notification by thread Start ---------------------------------------------------------------
        NotificationRepository notR = this.notificationRepository;
        UserService userS = this.userService;
        UserRepository userR = this.userRepository;


        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {

                Map<String, Object> params = new HashMap<>();
                params.put("title", "title123");
                params.put("message", "message");
                params.put("orderCode", "orderCode");
                params.put("user", 47);
                params.put("userName", "userName");
                params.put("status", 1);
                params.put("isPromotional", true);
                params.put("timestamp", new Date().getTime() );

                String deviceToken = "";
                User user = userR.getUserByUsername("01779282132");
                if(user != null) deviceToken = user.getDeviceToken();

                try {
                    NotificationMgrService nInst = new NotificationMgrService(notR, userS, userR);
                    nInst.sendNotification( nInst.prepareMgsParams(params), deviceToken);

                } catch (Exception e){
                   System.out.println(e.toString());
                }

            }
        });
        t.start();
        // Send message notification by thread End -----------------------------------------------------------------

    }



    @Override
    public void run(String... args) throws Exception {
        System.out.println("---CommandLineAppStartupRunner");
//        User admin = new User(firstName);
//        userRepository.save(admin);

        this.createAppBasicRoles();
        this.createAppBasicUsers();
        this.tagBasicUsersRole();

        this.createSystemMenu();
     //   this.createTestNativeSql();

//        this.testNotification();

    }



}
