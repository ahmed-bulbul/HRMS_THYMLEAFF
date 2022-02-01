package com.basic.app.acl.authCustom.resDef;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "ACL_SYSTEM_RESOURCE_DEF")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SysResourceDefinition {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;

    @Column(unique = true, nullable = false)
    String clientReqUrl;            // Client Request URL // Menu URL
    @Column(unique = true, nullable = false)
    String backendUrl;              // Backend API + Normal URL
    String resourceType;            /* 1. entity 2. menu 3. process 4. job scheduler 5. entity + menu, 6. Others */
    String resourceCode;            // EMP_REF_PROFILE --> Employee Reference Profile
    String resourceTitle;           // ResCode Elaboration
    String resourceElement;

    String entityName;              // no space allow : Domain Class (Ex: SystemMenu)
    String entityDescription;       // (Ex: System Menu)
    String openUrl;

    // Auth properties
    String chkAuthorization;        // [Yes, No] default yes
    String chkAuthorizationChar;    // [C, R, U, D, Q, A, S]
    Boolean adminAccessOnly;
    Boolean superAdminAccessOnly;

    Integer sequence;
    Boolean active;

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
