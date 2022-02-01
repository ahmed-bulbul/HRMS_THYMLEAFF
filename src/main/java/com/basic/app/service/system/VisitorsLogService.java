package com.basic.app.service.system;


import com.basic.app.domain.system.VisitorsLog;
import com.basic.app.repository.system.VisitorsLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VisitorsLogService {
    private final VisitorsLogRepository repository;

    @Autowired
    public VisitorsLogService (VisitorsLogRepository repository){
        this.repository = repository;
    }


    public List<VisitorsLog> getAll() {
        List<VisitorsLog> result = repository.findAll();

        if(result.size() > 0) {
            return result;
        } else {
            return new ArrayList<>();
        }
    }


    // Search Operation;
    public Page< VisitorsLog > getAllPaginated(Map<String, String> clientParams, int pageNum, int pageSize, String sortField, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        // Search Operation;
        // return repository.findAll(pageable);
        return repository.findAll((Specification<VisitorsLog>) (root, cq, cb) -> {
            Predicate p = cb.conjunction();
            // always fix
            // p = cb.and(p, cb.like(root.get("userType"), "Technician"));
            // dynamic by params
            if(!clientParams.isEmpty()){

                if(clientParams.containsKey("ipAddress")){
                    if (!StringUtils.hasLength(clientParams.get("ipAddress"))) {
                        p = cb.and(p, cb.like(root.get("ipAddress"), "%" + clientParams.get("ipAddress") + "%"));
                    }
                }
                if(clientParams.containsKey("userId")){
                    if (!StringUtils.hasLength(clientParams.get("userId"))) {
                        p = cb.and(p, cb.like(root.get("userId"), "%" + clientParams.get("userId") + "%"));
                    }

                }

                if(clientParams.containsKey("visitUrl")){
                    if (!StringUtils.hasLength(clientParams.get("visitUrl"))) {
                        p = cb.and(p, cb.like(root.get("visitUrl"), "%" + clientParams.get("visitUrl") + "%"));
                    }


                }

                return p;
            }
            return null;
        }, pageable);

    }
    //End Search Operation;



    public VisitorsLog findById(Long id) throws Exception {
        Optional<VisitorsLog> entity = repository.findById(id);

        if(entity.isPresent()) {
            return entity.get();
        } else {
            throw new Exception("No record exist for given id");
        }
    }

    public VisitorsLog getById(Long id) throws Exception {
        return this.findById(id);
    }


    public void setAttributeForCreateUpdate(){

    }

    public VisitorsLog createOrUpdate(VisitorsLog entity) {

        this.setAttributeForCreateUpdate();

        if(entity.getId() == null) {
            entity = repository.save(entity);

        } else {
            Optional<VisitorsLog> entityOptional = repository.findById(entity.getId());
            if(entityOptional.isPresent()) {
//                SystemMenu editEntity = entityOptional.get();
//                editEntity.setDisplayName(entity.getDisplayName());
//                editEntity.setPhoneNumber(entity.getPhoneNumber());
//                editEntity = repository.save(editEntity);
//                return editEntity;
                entity = repository.save(entity);
            }
        }
        return entity;

    }


    public void deleteById(Long id) throws Exception {
        Optional<VisitorsLog> entity = repository.findById(id);

        if(entity.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new Exception("No record exist for given id");
        }
    }

}
