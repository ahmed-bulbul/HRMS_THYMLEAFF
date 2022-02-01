package com.basic.app.acl.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "AUTH_ROLE")
public class Role implements Serializable {

    private static final long serialVersionUID = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;
    String authority;
    String description;

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


    public Role(Long id, String authority, String description, Date creationDateTime, String creationUser, Date lastUpdateDateTime, String lastUpdateUser) {
        this.id = id;
        this.authority = authority;
        this.description = description;
        this.creationDateTime = creationDateTime;
        this.creationUser = creationUser;
        this.lastUpdateDateTime = lastUpdateDateTime;
        this.lastUpdateUser = lastUpdateUser;
    }


    @ManyToMany(targetEntity = User.class,mappedBy = "roles",
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<User> users;

}
