package com.basic.app.acl.auth.domain;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpMethod;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Entity
@Table(name = "AUTH_REQUEST_URL")
public class RequestUrl implements Serializable {

    private static final long serialVersionUID = 1;


    // "request_url_seq" is Oracle sequence name.
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REQ_URL_SEQ")
    @SequenceGenerator(sequenceName = "request_url_seq", allocationSize = 1, name = "REQ_URL_SEQ")
    private Long id;

    String url;
    String configAttribute;
    HttpMethod httpMethod;

    // System log fields
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "CREATION_DATETIME")
    Date creationDateTime;
    @Column(name = "CREATION_USER")
    String creationUser;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "LAST_UPDATE_DATETIME")
    Date lastUpdateDateTime;
    @Column(name = "LAST_UPDATE_USER")
    String lastUpdateUser;

    public RequestUrl(){
    }

    public RequestUrl(String url, String configAttribute, HttpMethod httpMethod, Date creationDateTime, String creationUser) {
        this.url = url;
        this.configAttribute = configAttribute;
        this.httpMethod = httpMethod;
        this.creationDateTime = creationDateTime;
        this.creationUser = creationUser;
    }


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfigAttribute() {
        return configAttribute;
    }

    public void setConfigAttribute(String configAttribute) {
        this.configAttribute = configAttribute;
    }

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Date creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public String getCreationUser() {
        return creationUser;
    }

    public void setCreationUser(String creationUser) {
        this.creationUser = creationUser;
    }

    public Date getLastUpdateDateTime() {
        return lastUpdateDateTime;
    }

    public void setLastUpdateDateTime(Date lastUpdateDateTime) {
        this.lastUpdateDateTime = lastUpdateDateTime;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public void setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
    }



}
