package com.basic.app.domain.system;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="SYSTEM_MENU_AUTHORIZATION")
public class SystemMenuAuthorization {

    @Id
    @GeneratedValue(generator="SysPkIdSeq")
    @SequenceGenerator(name="SysPkIdSeq",sequenceName="SYS_PKID_SEQ", allocationSize=5)
    Long id;
    String menuCode;
    String parentMenuCode;
    String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_menu_id", nullable = false)
    SystemMenu systemMenu;

    Boolean canSee;
    Integer sequence;

    // System log fields
    Date creationDateTime;
    String creationUser;
    Date lastUpdateDateTime;
    String lastUpdateUser;




}
