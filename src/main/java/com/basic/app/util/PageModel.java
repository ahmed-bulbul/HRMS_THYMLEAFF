package com.basic.app.util;

import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;

// src
// Video
// 0. https://www.youtube.com/watch?v=NQh6jbxNKpQ
// 1. https://www.youtube.com/watch?v=Aie8n12EFQc

// Article
// 0. https://www.javaguides.net/2020/06/pagination-and-sorting-with-spring-boot-thymeleaf-spring-data-jpa-hibernate-mysql.html
// 1. https://attacomsian.com/blog/spring-boot-thymeleaf-pagination
// 2. https://platoiscoding.com/2019/04/30/spring-boot-pagination-with-thymeleaf-and-spring-data-jpa/
// 3. https://www.baeldung.com/spring-thymeleaf-pagination

@Component
public class PageModel {

    private static int PAGE = 0;
    private static int SIZE = 5;


    private final HttpServletRequest request;

    public PageModel(HttpServletRequest request) {
        this.request = request;
    }

    public void initPageAndSize(){
        if (request.getParameter("page") != null && !request.getParameter("page").isEmpty()) {
            PAGE = Integer.parseInt(request.getParameter("page")) - 1;
        }

        if (request.getParameter("size") != null && !request.getParameter("size").isEmpty()) {
            PAGE = Integer.parseInt(request.getParameter("size"));
        }
    }

    public static void setSIZE(int SIZE) {
        PageModel.SIZE = SIZE;
    }

    public static int getPAGE() {
        return PAGE;
    }

    public static int getSIZE() {
        return SIZE;
    }


}
