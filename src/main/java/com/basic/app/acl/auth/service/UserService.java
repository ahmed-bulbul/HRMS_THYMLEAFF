package com.basic.app.acl.auth.service;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

//    @Autowired
//    UserRepository repository;
    private final UserRepository repository;
//    private final UserRoleRepository userRoleRepository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
        //this.userRoleRepository = userRoleRepository;
    }



    public List<User> getAll() {
        List<User> result = repository.findAll();

        if(result.size() > 0) {
            return result;
        } else {
            return new ArrayList<>();
        }
    }


    // Search Operation;
    public Page< User > getAllPaginated(Map<String, String> clientParams, int pageNum, int pageSize, String sortField, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);

        // return repository.findAll(pageable);
        return repository.findAll((Specification<User>) (root, cq, cb) -> {
            Predicate p = cb.conjunction();
            // always fix
            // p = cb.and(p, cb.like(root.get("userType"), "Technician"));
            // dynamic by params
            if(!clientParams.isEmpty()){

                if(clientParams.containsKey("username")){
                    if (!StringUtils.isEmpty(clientParams.get("username"))) {
                        p = cb.and(p, cb.like(root.get("username"), "%" + clientParams.get("username") + "%"));
                    }
                }
                if(clientParams.containsKey("phoneNumber")){
                    if (!StringUtils.isEmpty(clientParams.get("phoneNumber"))) {
                        p = cb.and(p, cb.like(root.get("phoneNumber"), "%" + clientParams.get("phoneNumber") + "%"));
                    }

                }

                if(clientParams.containsKey("expertiseArea")){
                    if (!StringUtils.isEmpty(clientParams.get("expertiseArea"))) {
                        p = cb.and(p, cb.like(root.get("expertiseArea"), "%" + clientParams.get("expertiseArea") + "%"));
                    }


                }

                return p;
            }
            return null;
        }, pageable);

    }
    //End Search Operation;


    public User findById(Long id) throws Exception {
        Optional<User> entity = repository.findById(id);

        if(entity.isPresent()) {
            return entity.get();
        } else {
            throw new Exception("No record exist for given id");
        }
    }

    public User getById(Long id) throws Exception {
        return this.findById(id);
    }


    public void setAttributeForCreateUpdate(){
        System.out.println("Abc");
    }


    public User createOrUpdate(User entity) {

        this.setAttributeForCreateUpdate();

        if(entity.getId() == null) {
            entity.setPassword(new BCryptPasswordEncoder().encode( entity.getPassword()));
            entity = repository.save(entity);

        } else {
            Optional<User> entityOptional = repository.findById(entity.getId());
            if(entityOptional.isPresent()) {
                User editEntity = entityOptional.get();
                String oldPassword = editEntity.getPassword();
                String tnxPassword = entity.getPassword();
                if(!oldPassword.equals(tnxPassword)) entity.setPassword(new BCryptPasswordEncoder().encode( entity.getPassword()));
//                editEntity.setDisplayName(entity.getDisplayName());
//                editEntity.setPhoneNumber(entity.getPhoneNumber());
//                editEntity = repository.save(editEntity);
//                return editEntity;
             //   List<UserRole>  userRoleList = userRoleRepository.getAllByUser(entity);
                entity = repository.save(entity);
                // after save-push roles again
//                for (UserRole userRole : userRoleList) {
//                    UserRole userRole1 = new UserRole();
//                    userRole1.setRole(userRole.getRole());
//                    userRole1.setUser(userRole.getUser());
//                    userRoleRepository.save(userRole1);
//                }
            }
        }
        return entity;

    }


    public void deleteById(Long id) throws Exception {
        Optional<User> entity = repository.findById(id);

        if(entity.isPresent()) {
            // repository.deleteById(id);
            User entityInst = entity.get();
            entityInst.setRoles(null);
            repository.delete(entityInst);
        } else {
            throw new Exception("No record exist for given id");
        }
    }

}
