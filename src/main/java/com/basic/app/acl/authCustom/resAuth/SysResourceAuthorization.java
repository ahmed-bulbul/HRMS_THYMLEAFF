package com.basic.app.acl.authCustom.resAuth;


import com.basic.app.acl.auth.domain.Role;
import com.basic.app.acl.authCustom.resDef.SysResourceDefinition;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "ACL_SYSTEM_RESOURCE_AUTH")
public class SysResourceAuthorization {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;

    // system resource, which one, we want to check authorization
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SYSTEM_RESOURCE_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    SysResourceDefinition systemResource;

    @Column(name = "SYSTEM_RESOURCE_NAME")
    String systemResourceName;              // Entity Name, Menu and Others ....

    String createAuth;                      // form/object
    String readAuth;                        // form/object
    String updateAuth;                      // form/object
    String deleteAuth;                      // form/object
    String queryAuth;                       // list/collection query permission
    String submitAuth;                      // parameter request / single form --- has not domain class

    String crudqsString;
    String othersString;
    String fullPrivilegeString;

    Boolean visibleToAll; // one row will be inserted with blank user and tik this attribute

    // this resource authorization by
    // 1. user or group wise auth
    String username;                        // can be user or group user
    // 2. role base auth
    @ManyToOne
    Role role;

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

}
