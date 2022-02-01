package com.basic.app.acl.authCustom.resDef;


import com.basic.app.exception.MessageResponse;
import com.basic.app.exception.ResourceNotFoundException;
import com.basic.app.util.PaginationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SysResourceDefinitionController {
    @Autowired
    private SysResourceDefinitionService service;
    public Map<String, String> clientParams;

    @RequestMapping(path = "/systemResDef/create")
    public String create() {
        return "view/auth/authCustom/resDef/create";
    }

    /** Creating Instance api*/
    @PostMapping(value = "/api/acl/systemResDef/save")
    public ResponseEntity<MessageResponse> save(@RequestBody SysResourceDefinition sysResourceDefinition){
        try{
            this.service.create(sysResourceDefinition);
            return new ResponseEntity<>(new MessageResponse("Successfully created",true,"200"), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new MessageResponse("Failed to create : " + e.getMessage(),false,"500"), HttpStatus.OK);
        }

    }


    /**
     @ Getting instance api
     @ Receiving parameter
     @ Pagination support
     */
    @RequestMapping(value = "/systemResDef/getList",method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    ResponseEntity<Map<String, Object>> getAllPaginatedSysDef(HttpServletRequest request, @RequestParam Map<String,String> clientParams){

        this.clientParams = clientParams;
        PaginationHelper pSrv = new PaginationHelper(request);
        pSrv.sortField = "sequence";
        pSrv.sortDir = "asc";
        Page<SysResourceDefinition> page = this.service.getAllPaginatedSysDef(this.clientParams,pSrv.pageNum, pSrv.pageSize, pSrv.sortField, pSrv.sortDir);
        List<SysResourceDefinition> listData = page.getContent();

        Map<String, Object> response = new HashMap<>();
        response.put("objectList", listData);
        response.put("currentPage", page.getNumber());
        response.put("totalPages", page.getTotalPages());
        response.put("totalItems", page.getTotalElements());
        response.put("reverseSortDir", (pSrv.sortDir.equals("asc") ? "desc" : "asc"));
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @RequestMapping("/systemResDef")
    public String callIndexPage() {
        return "view/auth/authCustom/resDef/index";
    }


    /**
     @ Updating instance api
     @ Passing id and instance
     * */
    @PutMapping(value = "/update/{id}")
    public SysResourceDefinition update(@PathVariable(name = "id") Long id,@RequestBody SysResourceDefinition entity) throws ResourceNotFoundException {
        return this.service.update(id,entity);
    }

    /**
     @  Deleting instance api
     @  delete by instance
     *  */
    @DeleteMapping(value = "/systemResDef/delete/{id}")
    public ResponseEntity<?> delete (@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        return this.service.delete(id);
    }


}
