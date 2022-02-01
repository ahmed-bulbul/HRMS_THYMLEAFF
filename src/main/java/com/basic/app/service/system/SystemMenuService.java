package com.basic.app.service.system;

import com.basic.app.domain.system.SystemMenu;
import com.basic.app.repository.system.SystemMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SystemMenuService {

    private final SystemMenuRepository repository;

    @Autowired
    SystemMenuService(SystemMenuRepository repository){
        this.repository = repository;
    }


    public List<SystemMenu> getAll() {
        List<SystemMenu> result = repository.findAll();

        if(result.size() > 0) {
            return result;
        } else {
            return new ArrayList<>();
        }
    }


    public Page< SystemMenu > getAllPaginated(int pageNum, int pageSize, String sortField, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        return repository.findAll(pageable);

    }


    public SystemMenu findById(Long id) throws Exception {
        Optional<SystemMenu> entity = repository.findById(id);

        if(entity.isPresent()) {
            return entity.get();
        } else {
            throw new Exception("No record exist for given id");
        }
    }

    public SystemMenu getById(Long id) throws Exception {
        return this.findById(id);
    }


    public void setAttributeForCreateUpdate(){
    }

    public SystemMenu createOrUpdate(SystemMenu entity) {

        this.setAttributeForCreateUpdate();

        if(entity.getId() == null) {
            entity = repository.save(entity);

        } else {
            Optional<SystemMenu> entityOptional = repository.findById(entity.getId());
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
        Optional<SystemMenu> entity = repository.findById(id);

        if(entity.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new Exception("No record exist for given id");
        }
    }



    // Others helper methods ///////////////////////////////////////////////////////////////////////////////////////////
    public Map<Long, String> getMapAllParentMenus() {

        List<SystemMenu> result = repository.getAllByParentMenuIsNull();

        Map<Long, String> map = new HashMap<>();
        for (SystemMenu menu : result) {
            map.put(menu.getId(), menu.getId().toString() + " - " + menu.getDescription());
        }
        return map;
    }


}
