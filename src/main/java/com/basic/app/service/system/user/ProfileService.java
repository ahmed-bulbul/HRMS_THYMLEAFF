package com.basic.app.service.system.user;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Service
public class ProfileService {


    private EntityManagerFactory emf;
    private UserRepository userRepository;

    private Long profileId;


    ProfileService(){
    }


    @Autowired
    public void setInjectedBean(
                                UserRepository userRepository,
                                EntityManagerFactory emf
    ) {
        this.userRepository = userRepository;
        this.emf = emf;
    }


    private String getLoginUsername(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username; //get logged in username
        username = auth.getName();
        return username;
    }

    public Long getLoginUserId(){
        String username = this.getLoginUsername();
        User user = this.userRepository.getUserByUsername(username);
        return user.getId();
    }


    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }


    @SuppressWarnings({"SqlNoDataSourceInspection", "unchecked", "SqlDialectInspection"})
    public BigDecimal getTotalOrderReceive(){

        BigDecimal totalOrderRcv = null;

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    technician_user_id = "+this.profileId+"";
        System.out.println(sqlString);

        EntityManager em = this.emf.createEntityManager();
        try {

            Query query3 = em.createNativeQuery(sqlString);
            List<Object[]> results = (List<Object[]>)query3.getResultList();
//            for (Object[] result : results) {
//                totalOrderRcv = (BigDecimal) result[0];
//            }
            for (Object result : results) {
                totalOrderRcv = (BigDecimal)result;
            }

        } catch ( NoResultException e ){
            return null;
        } finally {
            em.close();
        }

        return totalOrderRcv;

    }



    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getTotalOrderComplete(){

        BigDecimal totalOrderCmp = null;

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    status = 2\n" +
                "    AND technician_user_id = "+this.profileId+"";

        EntityManager em = this.emf.createEntityManager();
        try {

            Query query3 = em.createNativeQuery(sqlString);
            List<Object[]> results = (List<Object[]>)query3.getResultList();
            for (Object result : results) {
                totalOrderCmp = (BigDecimal)result;
            }

        } catch ( NoResultException e ){
            return null;
        } finally {
            em.close();
        }


        // update record in DB
        if(totalOrderCmp != null){
            User user = this.userRepository.getOne(this.profileId);
            this.userRepository.save(user);
        }

        return totalOrderCmp;

    }



    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getTotalOrderPending(){

        BigDecimal totalOrderPnd = null;

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    (status = 1 OR status = 0 OR status = 3 OR status is null )\n" +
                "    AND technician_user_id = "+this.profileId+"";
        System.out.println(sqlString);

        EntityManager em = this.emf.createEntityManager();
        try {

            Query query3 = em.createNativeQuery(sqlString);
            List<Object[]> results = (List<Object[]>)query3.getResultList();
            for (Object result : results) {
                totalOrderPnd = (BigDecimal)result;
            }

        } catch ( NoResultException e ){
            return null;
        } finally {
            em.close();
        }

        // update record in DB
        if(totalOrderPnd != null){
            User user = this.userRepository.getOne(this.profileId);
            this.userRepository.save(user);
        }

        return totalOrderPnd;

    }


    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getCompanyChargeAmount(){

        BigDecimal totalOrderPnd = null;

        String sqlString = "" +
                "SELECT\n" +
                "    SUM(com_charge_amount) AS charge_amount\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    (status = 2)\n" +
                "    AND technician_user_id = "+this.profileId+"";
        System.out.println(sqlString);

        EntityManager em = this.emf.createEntityManager();
        try {

            Query query3 = em.createNativeQuery(sqlString);
            List<Object[]> results = (List<Object[]>)query3.getResultList();
            for (Object result : results) {
                totalOrderPnd = (BigDecimal)result;
            }

        } catch ( NoResultException e ){
            return null;
        } finally {
            em.close();
        }

        return totalOrderPnd;

    }




    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getTodayTotalOrderReceive(){

        BigDecimal totalOrderRcv = BigDecimal.valueOf(0.00);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String todayDate = sdf.format(new Date());

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    technician_user_id = "+this.profileId+"" +
                "    AND order_place_time > TO_DATE('"+todayDate+"', 'YYYY-MM-DD')";
        System.out.println(sqlString);

        EntityManager em = this.emf.createEntityManager();

        Query query3 = em.createNativeQuery(sqlString);
        List<Object[]> results = (List<Object[]>)query3.getResultList();
        for (Object result : results) {
            totalOrderRcv = (BigDecimal)result;
        }

        em.close();

        return totalOrderRcv;

    }



    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getTodayTotalOrderComplete(){

        BigDecimal totalOrderRcv = BigDecimal.valueOf(0.00);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String todayDate = sdf.format(new Date());

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    technician_user_id = "+this.profileId+"" +
                "    AND order_place_time > TO_DATE('"+todayDate+"', 'YYYY-MM-DD')" +
                "    AND status = 2";

        EntityManager em = this.emf.createEntityManager();

        Query query3 = em.createNativeQuery(sqlString);
        List<Object[]> results = (List<Object[]>)query3.getResultList();
        for (Object result : results) {
            totalOrderRcv = (BigDecimal)result;
        }

        em.close();

        return totalOrderRcv;

    }


    @SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection", "unchecked"})
    public BigDecimal getTodayTotalOrderPending(){

        BigDecimal totalOrderPnd = null;
        String todayDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        String sqlString = "" +
                "SELECT\n" +
                "    COUNT(*) AS total_order_rcv\n" +
                "FROM\n" +
                "    service_orders\n" +
                "WHERE\n" +
                "    (status = 1 OR status = 0 OR status = 3 OR status is null )\n" +
                "    AND technician_user_id = "+this.profileId+"" +
                "    AND order_place_time > TO_DATE('"+todayDate+"', 'YYYY-MM-DD')";
        System.out.println(sqlString);

        EntityManager em = this.emf.createEntityManager();

        Query query3 = em.createNativeQuery(sqlString);
        List<Object[]> results = (List<Object[]>)query3.getResultList();
        for (Object result : results) {
            totalOrderPnd = (BigDecimal)result;
        }

        em.close();

        return totalOrderPnd;

    }




}
