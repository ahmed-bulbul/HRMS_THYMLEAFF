package com.basic.app.acl.authCustom.resDef;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface SysResourceDefinitionRepository extends JpaRepository<SysResourceDefinition,Long>, JpaSpecificationExecutor<SysResourceDefinition> {

    SysResourceDefinition findByBackendUrl(String url);

    List<SysResourceDefinition> findByResourceType(String resourceType);

    List<SysResourceDefinition> findByResourceCodeAndResourceType(String resCode, String form);

    SysResourceDefinition findByResourceElementAndResourceType(String resCode, String form);
}