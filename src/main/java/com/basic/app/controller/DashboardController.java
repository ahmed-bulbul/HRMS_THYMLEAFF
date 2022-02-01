package com.basic.app.controller;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.acl.security.UserDetailsServiceImpl;
import com.basic.app.acl.auth.service.UserService;
import com.basic.app.service.system.MenuRenderService;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@SuppressWarnings("SqlNoDataSourceInspection")
@Controller
@RequestMapping({ "/", "/admin" })
public class DashboardController {

    public Map<String, String> clientParams;

    @Autowired
    ObjectFactory<HttpSession> httpSessionFactory;
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;
    @Autowired
    UserDetailsServiceImpl userDetailsService;



    protected HttpServletRequest request;
    protected HttpServletResponse response;
    @ModelAttribute
    public void bindRequestObject(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    @Autowired
    public void setInjectedBean(

            MenuRenderService menuRenderService) {

//        HttpServletRequest curRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    @Autowired
    private EntityManagerFactory entityManagerFactory;


    public Date getTodayDateOnly() throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date today = new Date();
        return formatter.parse(formatter.format(today));
    }


    @RequestMapping({ "/", "/dashboard" })
    public String dashboard(HttpSession session, Model model, @RequestParam Map<String,String> clientParams){
        this.clientParams = clientParams;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username1 = auth.getName(); //get logged in username
        User user = userRepository.getUserByUsername(username1);
        session.setAttribute("leftSideMenu",MenuRenderService.printLeftSideMenu("Load Menu From Dash Board"));
        session.setAttribute("displayName", user.getDisplayName());
        session.setAttribute("userId", user.getId());

        // load dashboard components and others works ---- Start
        model = this.loadDashboardComponents(model);
        // load dashboard components and others works ---- End


        model.addAttribute("movies", "test");
        return "dashboard";
    }


    @GetMapping("/welcome2")
    public String printHello(){
        return ("<h1> Welcome </h1>");
//        return null;
    }

    // call http://<host>/hello.json
    @RequestMapping(value = "/hello", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String helloRest() {
        return ("hello world");
    }

    @RequestMapping(value = "/hello2", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<?> helloRest2() {
        Map<Integer,String> map = new HashMap<>();
        map.put(1,"one");
        map.put(2,"two");
        map.put(3,"three");
        return ResponseEntity.ok(map);
    }





    // *****************************************************************************************************************
    // ******************************************************** Details Code *******************************************
    public void renderNumberOfUserCard( Model model ){
        String nOfUser = this.getAllUser();
        String HTML_nOfUserStr = "<div class=\"col-12 col-sm-6 col-md-3\">\n" +
                "                <div class=\"info-box mb-3\">\n" +
                "                    <span class=\"info-box-icon bg-warning elevation-1\"><i class=\"fas fa-users\"></i></span>\n" +
                "\n" +
                "                    <div class=\"info-box-content\">\n" +
                "                        <span class=\"info-box-text\">System Users</span>\n" +
                "                        <span class=\"info-box-number\">"+nOfUser+"</span>\n" +
                "                    </div>\n" +
                "                    <!-- /.info-box-content -->\n" +
                "                </div>\n" +
                "                <!-- /.info-box -->\n" +
                "            </div>\n" +
                "            <!-- /.col -->";

        model.addAttribute("HTML_nOfUserStr", HTML_nOfUserStr);
    }

    public void renderOnlineTechUserCard( Model model ){
        String nOfUser = this.getAllOnlineTechUser();
        String HTML_onTechUserStr = "<div class=\"col-12 col-sm-6 col-md-3\">\n" +
                "                <div class=\"info-box mb-3\">\n" +
                "                    <span class=\"info-box-icon bg-danger elevation-1\"><i class=\"fas fa-user-tie\"></i></span>\n" +
                "\n" +
                "                    <div class=\"info-box-content\">\n" +
                "                        <span class=\"info-box-text\">Online Technician</span>\n" +
                "                        <span class=\"info-box-number\">"+nOfUser+"</span>\n" +
                "                    </div>\n" +
                "                    <!-- /.info-box-content -->\n" +
                "                </div>\n" +
                "                <!-- /.info-box -->\n" +
                "            </div>\n" +
                "            <!-- /.col -->";

        model.addAttribute("HTML_onTechUserStr", HTML_onTechUserStr);
    }

//
//    public void renderNumberOfServiceRequestCard( Model model ){
//        String countNum = this.getNumberOfServiceRequest();
//        String HTML_nOfSrvReqStr = "<div class=\"col-12 col-sm-6 col-md-3\">\n" +
//                "                <div class=\"info-box mb-3\">\n" +
//                "                    <span class=\"info-box-icon bg-success elevation-1\"><i class=\"fas fa-allergies\"></i></span>\n" +
//                "\n" +
//                "                    <div class=\"info-box-content\">\n" +
//                "                        <span class=\"info-box-text\">Total Service Request</span>\n" +
//                "                        <span class=\"info-box-number\">"+countNum+"</span>\n" +
//                "                    </div>\n" +
//                "                    <!-- /.info-box-content -->\n" +
//                "                </div>\n" +
//                "                <!-- /.info-box -->\n" +
//                "            </div>\n" +
//                "            <!-- /.col -->";
//
//        model.addAttribute("HTML_nOfSrvReqStr", HTML_nOfSrvReqStr);
//    }



    public void renderUserTrafficCard( Model model ){
        String countNum = this.getNumberOfTrafficRequest();
        String HTML_visitorsLog = "<div class=\"col-12 col-sm-6 col-md-3\">\n" +
                "                <div class=\"info-box\">\n" +
                "                    <span class=\"info-box-icon bg-info elevation-1\"><i class=\"fas fa-cog\"></i></span>\n" +
                "\n" +
                "                    <div class=\"info-box-content\">\n" +
                "                        <span class=\"info-box-text\">Visitors Traffic</span>\n" +
                "                        <span class=\"info-box-number\">\n" +
                "                            "+countNum+"\n" +
                "                            <small></small>\n" +
                "                        </span>\n" +
                "                    </div>\n" +
                "                    <!-- /.info-box-content -->\n" +
                "                </div>\n" +
                "                <!-- /.info-box -->\n" +
                "            </div>";

        model.addAttribute("HTML_visitorsLog", HTML_visitorsLog);
    }


//    public Model loadServiceOrderData( Model model ){
//
//        PaginationHelper pHelper = new PaginationHelper(request);
//      //  Page<ServiceOrders> page = serviceOrdersService.getAllPaginated(this.clientParams, pHelper.pageNum, pHelper.pageSize, pHelper.sortField, pHelper.sortDir);
//        List< ServiceOrders > list = page.getContent();
//
//        model.addAttribute("currentPage", pHelper.pageNum);
//        model.addAttribute("totalPages", page.getTotalPages());
//        model.addAttribute("totalItems", page.getTotalElements());
//
//        model.addAttribute("sortField", pHelper.sortField);
//        model.addAttribute("sortDir", pHelper.sortDir);
//        model.addAttribute("reverseSortDir", pHelper.sortDir.equals("asc") ? "desc" : "asc");
//
//        model.addAttribute("objectList", list);
//
//        return model;
//    }


    public String getAllUser(){

        EntityManager em = this.entityManagerFactory.createEntityManager();
        Long nOfUser;

        try {
            em.getTransaction().begin(); // tnx start

            Query query2 = em.createQuery(
                    "SELECT COUNT(e) FROM User e WHERE e.enabled = true");
            nOfUser = (Long) query2.getSingleResult();

            em.getTransaction().commit(); // tnx end

        } catch (NoResultException e){
            return null;
        } finally {
            em.close();
        }
        return nOfUser.toString();

    }

    public String getAllOnlineTechUser(){

        Long nOfUser;
        EntityManager em = entityManagerFactory.createEntityManager();

        try {
            em.getTransaction().begin(); // tnx start

            Query query2 = em.createQuery(
                    "SELECT COUNT(e) FROM User e WHERE e.activeOnline = true AND e.userType = 'Technician' ");
            nOfUser = (Long) query2.getSingleResult();

            em.getTransaction().commit(); // tnx end

        } catch (NoResultException e){
            return null;
        } finally {
            em.close();
        }
        return nOfUser.toString();

    }


//    public String getNumberOfServiceRequest(){
//
//        EntityManager em = entityManagerFactory.createEntityManager();
//        Long countNum;
//
//        try {
//            em.getTransaction().begin(); // tnx start
//
//            Query query2 = em.createQuery(
//                    "SELECT COUNT(e) FROM ServiceOrders e");
//            countNum = (Long) query2.getSingleResult();
//
//
//            em.getTransaction().commit(); // tnx end
//
//        } catch (NoResultException e){
//            return null;
//        } finally {
//            em.close();
//        }
//        return countNum.toString();
//
//    }


    public String getNumberOfTrafficRequest(){

        EntityManager em = entityManagerFactory.createEntityManager();
        Long countNum;

        try {
            em.getTransaction().begin(); // tnx start

            Date todayDateOnly = this.getTodayDateOnly();
            Query query2 = em.createQuery(
                    "SELECT count( distinct e.ipAddress ) FROM VisitorsLog e WHERE e.creationDateTime > :creationDateTime ");
            // query2.setParameter("creationDateTime", todayDate,TemporalType.DATE);
            // query2.setParameter("creationDateTime", Timestamp.valueOf(LocalDateTime.now().minusSeconds(100000)));
            query2.setParameter("creationDateTime", todayDateOnly);
            countNum = (Long) query2.getSingleResult();

            em.getTransaction().commit(); // tnx end

        } catch (NoResultException | ParseException e){
            return null;
        } finally {
            em.close();
        }
        return countNum.toString();

    }



    @SuppressWarnings({"SqlDialectInspection", "unchecked"})
    @RequestMapping(value = "/api/loadServiceReqChartData", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
    @ResponseBody
    public HashMap<String, Object> loadServiceRequestChartData(){

        EntityManager em = entityManagerFactory.createEntityManager();

        ArrayList<String> months = new ArrayList<>();
        ArrayList<Object> totalReqs = new ArrayList<>();
        HashMap<String, BigDecimal> keyValue = new HashMap<>();

        try {
            em.getTransaction().begin(); // tnx start

//            Query query3 = em.createQuery(
//                    "SELECT COUNT(e.orderCode) AS totalReq, trunc(e.orderPlaceTime) as t FROM ServiceOrders e GROUP BY trunc(e.orderPlaceTime) ORDER BY e.orderPlaceTime ASC");
//            List<Object[]> results = query3.getResultList();

            String cd_fromDate = null;
            String cd_toDate = null;
            if (this.request.getParameter("cd_fromDate") != null && !this.request.getParameter("cd_fromDate").isEmpty()) cd_fromDate = this.request.getParameter("cd_fromDate");
            if (this.request.getParameter("cd_toDate") != null && !this.request.getParameter("cd_toDate").isEmpty()) cd_toDate = this.request.getParameter("cd_toDate");

            String sqlString = "" +
                    "SELECT COUNT(ORDER_CODE)                    AS TOTAL_REQ, \n" +
                    "       TO_CHAR(ORDER_PLACE_TIME, 'Month')   AS ORDER_PLACE_MONTH, \n" +
                    "       EXTRACT(MONTH FROM ORDER_PLACE_TIME) AS ORDER_PLACE_MONTH2 \n" +
                    "FROM   SERVICE_ORDERS \n" +
                    "GROUP  BY TO_CHAR(ORDER_PLACE_TIME, 'Month'), \n" +
                    "          EXTRACT(MONTH FROM ORDER_PLACE_TIME) \n" +
                    "ORDER  BY ORDER_PLACE_MONTH2 ASC";

            if(cd_fromDate != null && cd_toDate != null){
                sqlString = "" +
                        "SELECT COUNT(ORDER_CODE)                    AS TOTAL_REQ, \n" +
                        "       TO_CHAR(ORDER_PLACE_TIME, 'MONTH')   AS ORDER_PLACE_MONTH, \n" +
                        "       EXTRACT(MONTH FROM ORDER_PLACE_TIME) AS ORDER_PLACE_MONTH2 \n" +
                        "FROM   SERVICE_ORDERS \n" +
                        "WHERE  ORDER_PLACE_TIME > TO_DATE('"+cd_fromDate+"', 'YYYY-MM-DD') \n" +
                        "       AND ORDER_PLACE_TIME < TO_DATE('"+cd_toDate+"', 'YYYY-MM-DD') \n" +
                        "GROUP  BY TO_CHAR(ORDER_PLACE_TIME, 'MONTH'), \n" +
                        "          EXTRACT(MONTH FROM ORDER_PLACE_TIME) \n" +
                        "ORDER  BY ORDER_PLACE_MONTH2 ASC ";
            }
//            System.out.println(sqlString);

            Query query3 = em.createNativeQuery(sqlString);
            List<Object[]> results = (List<Object[]>)query3.getResultList();

            for (Object[] result : results) {
                BigDecimal  totalReq = (BigDecimal) result[0];
                String  orderPlaceMonth = (String ) result[1];
                if(orderPlaceMonth == null) continue;
                months.add(orderPlaceMonth.trim());
                totalReqs.add(totalReq);
                keyValue.put(orderPlaceMonth, totalReq);
            }

            em.getTransaction().commit(); // tnx end


            // Prep work
            /*SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            Session session = sessionFactory.getCurrentSession();
            session.beginTransaction();
            // Get All Employees
            SQLQuery query = session.createSQLQuery(
                    "SELECT\n" +
                            "    COUNT(order_code) AS ORDER_CODE,\n" +
                            "    trunc(order_place_time) AS ORDER_PLACE_DATE\n" +
                            "FROM\n" +
                            "SERVICE_ORDERS\n" +
                            "GROUP BY trunc(order_place_time)");
            List<Object[]> rows = query.list();
            for(Object[] row : rows){
                System.out.println(rows);
            }*/



        } catch (NoResultException e){
            return null;
        } finally {
            em.close();
        }

        // prepare return JSON Object
        HashMap<String, Object> finalMap = new HashMap<>();
        finalMap.put("months", months);
        finalMap.put("totalReqs", totalReqs);
        finalMap.put("keyValue", keyValue);
        return finalMap;

    }



    public Model loadDashboardComponents( Model model ){

     //   this.loadServiceOrderData(model);
        this.renderUserTrafficCard(model);
        this.renderNumberOfUserCard(model);
        this.renderOnlineTechUserCard(model);
       // this.renderNumberOfServiceRequestCard(model);

        return model;
    }





}
