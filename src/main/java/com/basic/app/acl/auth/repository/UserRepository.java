package com.basic.app.acl.auth.repository;

import com.basic.app.acl.auth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> , JpaSpecificationExecutor<User> {
    //public interface UserRepository extends CrudRepository<User, Long> {

    User getUserByUsername(String username);
    User getUserByEmail(String email);
    List<User> findByActiveOnlineAndUserType( Boolean activeOnline, String userType );

}

