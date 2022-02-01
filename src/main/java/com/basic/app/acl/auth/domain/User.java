package com.basic.app.acl.auth.domain;

import com.basic.app.domain.base.Organization;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="AUTH_USER")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator="UserPkIdSeq")
    @SequenceGenerator(name="UserPkIdSeq",sequenceName="USER_PKID_SEQ", allocationSize=5)
    @Column(name = "ID")
    private Long id; // userId

    @Size(max = 15)
    @NotEmpty
    @NotBlank(message = "*Name is mandatory")
    @Column(name = "USERNAME", length = 15, nullable = false, unique = true)
    private String username;
    @NotBlank(message = "*Password is mandatory")
    @Column(name = "PASSWORD")
    private String password;
    @Value("${true}")
    @Column(columnDefinition = "boolean default true")
    private boolean enabled;
//    private boolean enabled = true;
    private boolean accountExpired;
    boolean accountLocked;
    boolean passwordExpired;

    // added attributes
    String phoneNumber;          // as username // maximum length of 15 digits
    String firstName;
    String lastName;
    @Column(nullable=false)
    String displayName;          // marge firstName and lastName
    String profession;

    @Email(message="{errors.invalid_email}")
    @Column(name="email",nullable = false, unique = true)
    String email;                // [user]@[mysite].com = 64 + 255, but it should be 254
    String city;                 // [Dhaka, Chattogram, Sylhet...]
    String fullAddress;
    String userType;             // Group Checkbox [client, technician-default technician now]

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    Date registrationDate;
    Boolean isApproved;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    Date approvalDate;

    String deviceType;
    String deviceToken;
    Boolean activeOnline;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_id", referencedColumnName = "id")
    private Organization organization;


    @Column(name = "PROFILE_PIC_PATH", length = 300)
    String profilePicPath;

    @Column(name = "PROFILE_PIC_PATH2", length = 300)
    String profilePicPath2;




//    @JsonIgnore
//    @ManyToMany(targetEntity =Role.class,cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.DETACH}, fetch = FetchType.EAGER)
//    @JoinTable(name = "auth_user_role",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id")
//    )
//    private Set<Role> roles = new HashSet<>();



    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="auth_user_role",
            joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
            inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id")})
    private Set<Role> roles = new HashSet<>();
//
//    public Set<Role> getRoles() {
//        return roles;
//    }
//    public void setRoles(Set<Role> roles) {
//        this.roles = roles;
//    }



    // System log fields
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "CREATION_DATETIME")
    private Date creationDateTime;
    @Column(name = "CREATION_USER")
    private String creationUser;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "LAST_UPDATE_DATETIME")
    private Date lastUpdateDateTime;
    @Column(name = "LAST_UPDATE_USER")
    private String lastUpdateUser;






}
