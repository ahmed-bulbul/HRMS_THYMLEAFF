package com.basic.app.acl.auth.repository;

import com.basic.app.acl.auth.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role getRoleByAuthority(String authority);

    // find all native query
    @Query(value = "select * from role", nativeQuery = true)
    List<Role> findAllNative();
}
