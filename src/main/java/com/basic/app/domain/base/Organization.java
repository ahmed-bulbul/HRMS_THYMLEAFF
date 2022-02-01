package com.basic.app.domain.base;

import javax.persistence.*;

@Entity
@Table(name="ORGANIZATION")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "OrganizationEntity [id=" + id + ", name=" + name + "]";
    }


}
