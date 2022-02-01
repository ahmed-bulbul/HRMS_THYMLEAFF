package com.basic.app.util;

import javax.servlet.http.HttpServletRequest;

public class PaginationHelper {

    HttpServletRequest request;

    public int pageNum = 1;   //default page number is 0 (yes it is weird)
    public int pageSize = 5;  //default page size is 10
    public String sortField = "id";
    public String sortDir = "desc";

    public PaginationHelper(HttpServletRequest request){
        this.request = request;
        if (this.request.getParameter("pageNum") != null && !this.request.getParameter("pageNum").isEmpty()) this.pageNum = Integer.parseInt(this.request.getParameter("pageNum"));
        if (this.request.getParameter("pageSize") != null && !this.request.getParameter("pageSize").isEmpty()) this.pageSize = Integer.parseInt(this.request.getParameter("pageSize"));
        if (this.request.getParameter("sortField") != null && !this.request.getParameter("sortField").isEmpty()) this.sortField = this.request.getParameter("sortField");
        if (this.request.getParameter("sortDir") != null && !this.request.getParameter("sortDir").isEmpty()) this.sortDir = this.request.getParameter("sortDir");
    }

    public void setDefaultSortDir(String sortField, String sortDir){
        this.sortField = sortField;
        this.sortDir = sortDir;
    }


}
