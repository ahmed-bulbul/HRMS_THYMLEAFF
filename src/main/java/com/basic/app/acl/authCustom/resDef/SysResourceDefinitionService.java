package com.basic.app.acl.authCustom.resDef;


import com.basic.app.exception.MessageResponse;
import com.basic.app.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.Map;

@Service
public class SysResourceDefinitionService {
    @Autowired
    private SysResourceDefinitionRepository repository;


    public SysResourceDefinition create(SysResourceDefinition sysResourceDefinition) {
        return this.repository.save(sysResourceDefinition);
    }


    public Page<SysResourceDefinition> getAllPaginatedSysDef(Map<String, String> clientParams, int pageNum, int pageSize, String sortField, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);

        return this.repository.findAll((Specification<SysResourceDefinition>) (root, cq, cb) -> {
            Predicate p = cb.conjunction();
            if(!clientParams.isEmpty()){
                if(clientParams.containsKey("id")){
                    if (StringUtils.hasLength(clientParams.get("id"))) {
                        p = cb.and(p, cb.equal(root.get("id"), clientParams.get("id")));
                    }
                }
                if(clientParams.containsKey("entityName")){
                    if (StringUtils.hasLength(clientParams.get("entityName"))) {
                        p = cb.and(p, cb.like(root.get("entityName"), "%"+clientParams.get("entityName")+"%"));
                    }
                }

                if(clientParams.containsKey("backendUrl")){
                    if (StringUtils.hasLength(clientParams.get("backendUrl"))) {
                        p = cb.and(p, cb.like(root.get("backendUrl"), "%"+clientParams.get("backendUrl")+"%"));
                    }
                }

                if(clientParams.containsKey("resourceType")){
                    if (StringUtils.hasLength(clientParams.get("resourceType"))) {
                        p = cb.and(p, cb.like(root.get("resourceType"), "%"+clientParams.get("resourceType")+"%"));
                    }
                }

                return p;
            }
            return null;
        }, pageable);

    }


    public SysResourceDefinition update(Long id, SysResourceDefinition entity) throws ResourceNotFoundException {
        SysResourceDefinition resourceDefinitionInst = repository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Resource Definition not found for this id :: " + id));

        resourceDefinitionInst.setClientReqUrl(entity.getClientReqUrl());
        resourceDefinitionInst.setBackendUrl(entity.getBackendUrl());
        resourceDefinitionInst.setResourceType(entity.getResourceType());
        resourceDefinitionInst.setResourceCode(entity.getResourceCode());
        resourceDefinitionInst.setResourceElement(entity.getResourceElement());
        resourceDefinitionInst.setResourceTitle(entity.getResourceTitle());
        resourceDefinitionInst.setEntityName(entity.getEntityName());
        resourceDefinitionInst.setEntityDescription(entity.getEntityDescription());
        resourceDefinitionInst.setOpenUrl(entity.getOpenUrl());
        resourceDefinitionInst.setChkAuthorization(entity.getChkAuthorization());
        resourceDefinitionInst.setChkAuthorizationChar(entity.getChkAuthorizationChar());
        resourceDefinitionInst.setAdminAccessOnly(entity.getAdminAccessOnly());
        resourceDefinitionInst.setSuperAdminAccessOnly(entity.getSuperAdminAccessOnly());
        resourceDefinitionInst.setSequence(entity.getSequence());
        resourceDefinitionInst.setActive(entity.getActive());

        return this.repository.save(resourceDefinitionInst);
    }


    public ResponseEntity<?> delete(Long id) throws ResourceNotFoundException {
        SysResourceDefinition resourceDefinitionInst = repository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Resource Definition not found for this id :: " + id));
        repository.delete(resourceDefinitionInst);
        return ResponseEntity.ok(new MessageResponse("Successfully Deleted Data",true,"200"));
    }

    public Page<SysResourceDefinition> getAllPaginated(int pageNum, int pageSize, String sortField, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        return repository.findAll(pageable);

    }

}
